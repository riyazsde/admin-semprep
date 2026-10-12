import React, { useEffect, useMemo, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiUploadCloud, FiCheckCircle, FiX } from "react-icons/fi";
import { toast } from "sonner";
import {
  addHandwrittenNote,
  getAllEducatorNotes,
  getAllHandwrittenNotes,
  getAllSubjects,
  getAllSubjectsByGoalExam,
  getAllSubSubjects,
  getAllVideos,
  getGoalCategory,
  getGoalExamByGoalCategory,
  getTopicsByChapter,
  getStudyPlannerPlans,
  uploadHandwrittenNotesFile,
  getSemsterByUniversityId,
} from "../../services/exportFunctions";
import HandwrittenNotesFormComponent from "../../services/HandwrittenNotesFormComponent";

// ─────────────────────────────────────────────────────────────
// ✅ FIX: URL helpers to prevent broken ImgBB "viewer page" links
// ─────────────────────────────────────────────────────────────

/**
 * Returns true only if the URL is a DIRECT image link
 * (ends with .png/.jpg/.jpeg/.webp/.gif/.svg — optionally with query string).
 */
const isValidDirectImageUrl = (url) => {
  if (!url || typeof url !== "string") return false;
  return /^https?:\/\/.+\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(url.trim());
};

/**
 * Detects the classic ImgBB "viewer page" link (https://ibb.co/XXXXX)
 * which is NOT a direct image and would show broken in <img>.
 */
const isImgbbViewerLink = (url) => {
  if (!url || typeof url !== "string") return false;
  return /^https?:\/\/ibb\.co\//i.test(url.trim());
};

/**
 * Best-effort: convert ImgBB viewer link → direct link host.
 * NOTE: still requires the filename to actually load; used only as a hint.
 */
const toDirectImgbb = (url) => {
  if (!url) return url;
  return url.trim().replace(/^https?:\/\/ibb\.co\//i, "https://i.ibb.co/");
};

// ─────────────────────────────────────────────────────────────
// Robust URL extractor for the upload response
// ─────────────────────────────────────────────────────────────
const extractUrl = (res) => {
  if (!res) return "";
  if (typeof res === "string") return res;

  const pick = (obj) =>
    obj?.url ||
    obj?.fileUrl ||
    obj?.file ||
    obj?.path ||
    obj?.secure_url ||
    obj?.location ||
    "";

  const direct = pick(res);
  if (direct) return direct;

  const d = res.data;

  if (Array.isArray(d) && d.length > 0) {
    const first = d[0];
    if (typeof first === "string") return first;
    if (first && typeof first === "object") {
      const fromObj = pick(first);
      if (fromObj) return fromObj;
    }
  }

  if (d && typeof d === "object") {
    if (Array.isArray(d.files) && d.files.length > 0) {
      const first = d.files[0];
      if (typeof first === "string") return first;
      if (first && typeof first === "object") {
        const fromObj = pick(first);
        if (fromObj) return fromObj;
      }
    }
    const fromData = pick(d);
    if (fromData) return fromData;
  }

  return "";
};

// ─────────────────────────────────────────────────────────────
// Robust semester extractor
// ─────────────────────────────────────────────────────────────
const extractSemesters = (res) => {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data?.data)) return res.data.data;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.data?.semesters)) return res.data.semesters;
  if (Array.isArray(res?.semesters)) return res.semesters;
  if (Array.isArray(res?.result)) return res.result;
  return [];
};

const getSemesterLabel = (s) => {
  if (!s) return "";
  const num = s.semesterNumber ? `Semester ${s.semesterNumber}` : "Semester";
  const goalName = s.goal?.name || "";
  const uniName = s.goalCategory?.name || s.university?.name || "";
  const year = s.durationYears ? ` • ${s.durationYears}` : "";
  const meta = goalName || uniName;
  return meta ? `${num} — ${meta}${year}` : `${num}${year}`;
};

const pickId = (v) => {
  if (!v) return "";
  if (typeof v === "string") return v;
  return v._id || v.id || "";
};

const normalizeSubjects = (formSubjects) => {
  if (!Array.isArray(formSubjects)) return [];

  return formSubjects
    .map((s) => {
      const subjectId =
        pickId(s?.subject) || pickId(s?.subjectId) || pickId(s);

      const rawSubSubjects = Array.isArray(s?.subSubjects)
        ? s.subSubjects
        : [];

      const subSubjects = rawSubSubjects.map((ss) => {
        const subSubjectId =
          pickId(ss?.subSubject) ||
          pickId(ss?.subSubjectId) ||
          pickId(ss);

        const rawChapters = Array.isArray(ss?.chapters) ? ss.chapters : [];

        const chapters = rawChapters.map((ch) => {
          const chapterId =
            pickId(ch?.chapter) || pickId(ch?.chapterId) || pickId(ch);

          const rawTopics = Array.isArray(ch?.topics) ? ch.topics : [];

          const topics = rawTopics.map((t) => {
            const topicId =
              pickId(t?.topic) || pickId(t?.topicId) || pickId(t);

            let handwrittenNotes = [];
            if (Array.isArray(t?.handwrittenNotes)) {
              handwrittenNotes = t.handwrittenNotes.filter(Boolean);
            } else if (t?.handwrittenNotes) {
              handwrittenNotes = [t.handwrittenNotes];
            } else if (t?.handwrittenNote) {
              handwrittenNotes = [t.handwrittenNote];
            }

            return {
              topic: topicId,
              name: t?.name || t?.topicName || "",
              durationOfNotes: t?.durationOfNotes || t?.duration || "",
              handwrittenNotes,
            };
          });

          return { chapter: chapterId, topics };
        });

        return { subSubject: subSubjectId, chapters };
      });

      return { subject: subjectId, subSubjects };
    })
    .filter((s) => s.subject);
};

const countTopics = (subjects) =>
  subjects.reduce(
    (acc, s) =>
      acc +
      (s.subSubjects || []).reduce(
        (a2, ss) =>
          a2 +
          (ss.chapters || []).reduce(
            (a3, ch) => a3 + (ch.topics || []).length,
            0
          ),
        0
      ),
    0
  );

const AddHandwrittenNote = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isUsed: "false",
      locale: "en",
      topicsCount: "",
      image: "",
      topperName: "",
    },
  });

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allGoals, setAllGoals] = useState([]);
  const [isSamePage, setIsSamePage] = useState(false);
  const [handwrittennotes, setHandwrittenNotes] = useState([]);
  const [educatorNotes, setEducatorNotes] = useState([]);
  const [studyplannerStudyPlans, setStudyplannerStudyPlans] = useState([]);
  const [formSubjects, setFormSubjects] = useState([]);
  const [allSemesters, setAllSemesters] = useState([]);

  const [notesFile, setNotesFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [subSubjects, setSubSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [topics, setTopics] = useState([]);

  // ✅ live-watch the image URL field for validation + preview
  const imageUrl = watch("image");

  useEffect(() => {
    getStudyPlannerPlans({ setIsLoading, setData: setStudyplannerStudyPlans });
    getGoalCategory({ setIsLoading, setData });
  }, []);

  const goalCategory = watch("goalCategory");
  const goalExamId = watch("goal");
  const semesterId = watch("semester");

  useEffect(() => {
    if (!goalCategory) {
      setAllGoals([]);
      setAllSemesters([]);
      return;
    }

    setValue("semester", "");

    getGoalExamByGoalCategory({
      setIsLoading,
      setData: setAllGoals,
      params: {
        page: 1,
        limit: 100,
        search: "",
        goalCategoryId: goalCategory,
      },
    });

    getSemsterByUniversityId({
      setIsLoading,
      setData: (res) => {
        console.log("SEMESTER RAW:", res);
        const list = extractSemesters(res);
        console.log("SEMESTER PARSED COUNT:", list.length);
        setAllSemesters(list);
      },
      params: { page: 1, limit: 200 },
    });
  }, [goalCategory]);

  const semesters = useMemo(() => {
    if (!allSemesters?.length) return [];

    return allSemesters
      .filter((s) => {
        const semUniId = s.goalCategory?._id || s.goalCategory;
        if (semUniId && semUniId !== goalCategory) return false;

        if (goalExamId) {
          const semGoalId = s.goal?._id || s.goal;
          if (semGoalId && semGoalId !== goalExamId) return false;
        }

        return true;
      })
      .sort((a, b) => (a.semesterNumber || 0) - (b.semesterNumber || 0));
  }, [allSemesters, goalCategory, goalExamId]);

  useEffect(() => {
    if (!semesterId) return;
    const stillValid = semesters.some((s) => s._id === semesterId);
    if (!stillValid) setValue("semester", "");
  }, [semesters, semesterId]);

  useEffect(() => {
    if (goalExamId) {
      const params = {
        page: 1,
        limit: 100,
        search: "",
        goalCategory,
        goalId: goalExamId,
      };
      getAllSubjects({ setIsLoading, setData: setSubjects, params });
    }
  }, [goalExamId]);

  const subjectId = watch("subject");

  useEffect(() => {
    if (subjectId) {
      const params = { page: 1, limit: 100, search: "", subjectId };
      getAllSubSubjects({ setIsLoading, setData: setSubSubjects, params });
    }
  }, [subjectId]);

  const subSubjectId = watch("subSubject");

  useEffect(() => {
    if (subjectId || subSubjectId) {
      const params = { page: 1, limit: 100, search: "" };
      if (subjectId) params.subjectId = subjectId;
      if (subSubjectId) params.subSubjectId = subSubjectId;
      getAllSubjectsByGoalExam({ setIsLoading, setData: setChapters, params });
    }
  }, [subjectId, subSubjectId]);

  const chapterId = watch("chapter");

  useEffect(() => {
    if (chapterId) {
      const params = { page: 1, limit: 100, search: "", chapterId };
      getTopicsByChapter({ setIsLoading, setData: setTopics, params });
    }
  }, [chapterId]);

  const topicId = watch("topic");

  useEffect(() => {
    if (topicId) {
      const params = { page: 1, limit: 100, search: "", topicId };
      getAllVideos({
        setIsLoading,
        setData: (res) => console.log(res?.data?.[0]),
        params,
      });
    }
  }, [topicId]);

  useEffect(() => {
    getAllHandwrittenNotes({
      setIsLoading,
      setData: setHandwrittenNotes,
      params: { limit: 3000 },
    });
  }, []);

  useEffect(() => {
    getAllEducatorNotes({
      setIsLoading,
      setData: setEducatorNotes,
      params: { limit: 3000 },
    });
  }, []);

  // ── File change ───────────────────────────────────────────
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_MB = 20;
    if (file.size > MAX_MB * 1024 * 1024) {
      toast.error(`File too large. Max ${MAX_MB} MB allowed.`);
      e.target.value = "";
      return;
    }

    setNotesFile(file);
    setUploadedFileUrl("");
  };

  // ── File upload ───────────────────────────────────────────
  const handleFileUpload = async ({ silent = false } = {}) => {
    if (!notesFile) {
      if (!silent) toast.error("Please select a file first");
      throw new Error("No file selected");
    }

    setIsUploading(true);
    const toastId = silent ? undefined : toast.loading("Uploading file…");

    try {
      const response = await uploadHandwrittenNotesFile({
        file: notesFile,
        setIsLoading: setIsUploading,
      });

      const fileUrl = extractUrl(response);

      if (!fileUrl) {
        const msg = "Upload succeeded but no URL was returned. Check console.";
        console.warn("Unrecognized upload response shape:", response);
        if (toastId) toast.error(msg, { id: toastId });
        else if (!silent) toast.error(msg);
        throw new Error("No URL in upload response");
      }

      setUploadedFileUrl(fileUrl);
      // NOTE: do NOT setValue("image", fileUrl) — `image` is the tile image URL.

      if (toastId) toast.success("File uploaded successfully", { id: toastId });
      else if (!silent) toast.success("File uploaded successfully");

      return fileUrl;
    } catch (err) {
      console.error("Upload error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "File upload failed. Please try again.";
      if (toastId) toast.error(msg, { id: toastId });
      else if (!silent) toast.error(msg);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  // ── Submit ────────────────────────────────────────────────
  const onSubmit = async (formData) => {
    // 1. Upload PDF if pending
    let fileUrl = uploadedFileUrl;
    if (notesFile && !fileUrl) {
      try {
        fileUrl = await handleFileUpload();
      } catch (err) {
        return;
      }
    }

    // 2. PDF required
    if (!fileUrl) {
      toast.error("Please upload a notes file before saving.");
      return;
    }

    // 3. ✅ Subject(s) required
    if (!formSubjects || formSubjects.length === 0) {
      toast.error("Please add at least one subject before saving.");
      return;
    }
    const hasValidSubject = formSubjects.some(
      (s) => pickId(s?.subject) || pickId(s?.subjectId) || pickId(s)
    );
    if (!hasValidSubject) {
      toast.error("Please select a valid subject.");
      return;
    }

    // 4. Semester required
    if (!formData.semester) {
      toast.error("Please select a semester.");
      return;
    }

    // 5. Image URL validation
    const rawImage = (formData.image || "").trim();
    if (rawImage) {
      if (isImgbbViewerLink(rawImage)) {
        toast.error(
          "That's the ImgBB page link. Please paste the DIRECT link " +
            "(starts with https://i.ibb.co/ and ends with .png / .jpg)."
        );
        return;
      }
      if (!isValidDirectImageUrl(rawImage)) {
        toast.error(
          "Tile Image URL must be a direct image link ending with " +
            ".png, .jpg, .jpeg, .webp, .gif or .svg"
        );
        return;
      }
    }

    // 6. Normalize subjects
    const isUsedBool =
      formData.isUsed === "true" ||
      formData.isUsed === true ||
      formData.isUsed === "Yes";

    const normalizedSubjects = normalizeSubjects(formSubjects);
    if (normalizedSubjects.length === 0) {
      toast.error(
        "Subjects were provided but none had a valid subject id. Please re-select."
      );
      return;
    }

    // 7. Build payload
    const derivedTopics = countTopics(normalizedSubjects);
    const explicitTopics = Number(formData.topicsCount) || 0;

    const payload = {
      topperName: formData.topperName || "",
      desc: formData.desc || "",
      pagesCount: Number(formData.pagesCount),
      topicsCount: explicitTopics || derivedTopics,
      locale: formData.locale || "en",
      isUsed: isUsedBool,
      goalCategory: formData.goalCategory,
      goal: formData.goal,
      semester: formData.semester,
      image: rawImage,
      handWrittenNotesPdf: [fileUrl],
      subjects: normalizedSubjects,
    };

    console.log(
      "POSTING HANDWRITTEN NOTE PAYLOAD:",
      JSON.stringify(payload, null, 2)
    );

    // 8. Save
    const addFun = () => {
      reset();
      setNotesFile(null);
      setUploadedFileUrl("");
      setFormSubjects([]);
      if (!isSamePage) navigate("/quizapp/handwritten-notes");
      setIsSamePage(false);
    };

    const toastId = toast.loading("Saving handwritten note…");
    try {
      const res = await addHandwrittenNote({ data: payload, addFun });
      console.log("POST RESPONSE:", res);
      toast.success("Handwritten note saved successfully", { id: toastId });
    } catch (err) {
      console.error("Save error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to save handwritten note.";
      toast.error(msg, { id: toastId });
    }
  };

  // ── Live validation hint for the Tile Image URL field ────
  const imageHint = useMemo(() => {
    if (!imageUrl) {
      return {
        type: "info",
        text: "Paste the DIRECT link from ImgBB (starts with i.ibb.co and ends with .png / .jpg).",
      };
    }
    if (isImgbbViewerLink(imageUrl)) {
      return {
        type: "error",
        text:
          "This is the ImgBB viewer page link. Copy the 'Direct link' instead " +
          `(example: ${toDirectImgbb(imageUrl)}/your-file-name.png).`,
      };
    }
    if (!isValidDirectImageUrl(imageUrl)) {
      return {
        type: "error",
        text: "URL must end with .png, .jpg, .jpeg, .webp, .gif or .svg",
      };
    }
    return { type: "ok", text: "Looks good ✓" };
  }, [imageUrl]);

  // ── Render ────────────────────────────────────────────────
  return (
    <div
      className="ahw-page"
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }
      }}
    >
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header ahw-header">
          <h6>Add Handwritten Note</h6>
          <p className="ahw-breadcrumb">
            <GoArrowLeft
              size={22}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            <span>Quiz Ap</span>
            <span className="ahw-breadcrumb-sep">/</span>
            <span className="ahw-breadcrumb-active">Add Handwritten Notes</span>
          </p>
        </div>

        <div className="studentprofile-container">
          <div className="ahw-card">
            {/* ── Section 1: Course Mapping ─────────────── */}
            <section className="ahw-section">
              <header className="ahw-section-head">
                <h3>Course Mapping</h3>
                <p>
                  Choose the university, goal exam and semester this bundle
                  belongs to.
                </p>
              </header>

              <div className="ahw-grid ahw-grid-3">
                <div className="ahw-field">
                  <label>
                    University <span className="ahw-req">*</span>
                  </label>
                  <select {...register("goalCategory", { required: true })}>
                    <option value="">Select University</option>
                    {data?.data?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="ahw-field">
                  <label>
                    Goal Exam <span className="ahw-req">*</span>
                  </label>
                  <select {...register("goal", { required: true })}>
                    <option value="">Select Goal Exam</option>
                    {allGoals?.data?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="ahw-field">
                  <label>
                    Semester <span className="ahw-req">*</span>
                  </label>
                  <select {...register("semester", { required: true })}>
                    <option value="">
                      {!goalCategory
                        ? "Select university first"
                        : semesters.length === 0
                        ? "No semesters for this university"
                        : "Select Semester"}
                    </option>
                    {semesters.map((s) => (
                      <option key={s._id} value={s._id}>
                        {getSemesterLabel(s)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {goalCategory && goalExamId && (
                <div className="ahw-embedded">
                  <HandwrittenNotesFormComponent
                    goalCategory={goalCategory}
                    goalExamId={goalExamId}
                    semester={semesterId}
                    setFormSubjects={setFormSubjects}
                  />
                </div>
              )}
            </section>

            {/* ── Section 2: Bundle Details ─────────────── */}
            <section className="ahw-section">
              <header className="ahw-section-head">
                <h3>Bundle Details</h3>
                <p>Public information shown to students.</p>
              </header>

              <div className="ahw-grid ahw-grid-1">
                <div className="ahw-field">
                  <label>Topper's Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ananya Sharma"
                    {...register("topperName")}
                  />
                </div>
              </div>

              <div className="ahw-grid ahw-grid-3">
                <div className="ahw-field">
                  <label>
                    Page Count <span className="ahw-req">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 120"
                    {...register("pagesCount", { required: true })}
                  />
                </div>
                <div className="ahw-field">
                  <label>Topics Count</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Auto-derived if left blank"
                    {...register("topicsCount")}
                  />
                </div>

                {/* Tile Image URL field with inline validation */}
                <div className="ahw-field">
                  <label>Tile Image URL (optional)</label>
                  <input
                    type="text"
                    placeholder="https://i.ibb.co/xxxx/thumbnail.png"
                    {...register("image")}
                  />

                  {imageHint.type === "error" && (
                    <small style={{ color: "#dc3545", fontSize: 12 }}>
                      ⚠️ {imageHint.text}
                    </small>
                  )}
                  {imageHint.type === "info" && (
                    <small style={{ color: "#6c757d", fontSize: 12 }}>
                      {imageHint.text}
                    </small>
                  )}
                  {imageHint.type === "ok" && (
                    <small style={{ color: "#198754", fontSize: 12 }}>
                      {imageHint.text}
                    </small>
                  )}

                  {imageUrl && isValidDirectImageUrl(imageUrl) && (
                    <img
                      src={imageUrl}
                      alt="Tile preview"
                      style={{
                        marginTop: 8,
                        width: 160,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 8,
                        border: "1px solid #dee2e6",
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                </div>
              </div>
            </section>

            {/* ── Section 3: File Upload ────────────────── */}
            <section className="ahw-section">
              <header className="ahw-section-head">
                <h3>Notes File</h3>
                <p>
                  PDF, DOC, DOCX, JPG or PNG. Max 1 file. This becomes the{" "}
                  <code>handWrittenNotesPdf</code> entry.
                </p>
              </header>

              <div className="ahw-upload-row">
                <label className="ahw-upload">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                  <FiUploadCloud size={28} />
                  <span className="ahw-upload-text">
                    {notesFile ? notesFile.name : "Click to choose a file"}
                  </span>
                  <span className="ahw-upload-hint">
                    {notesFile
                      ? `${(notesFile.size / 1024).toFixed(0)} KB`
                      : "PDF, DOC, DOCX, JPG, PNG"}
                  </span>
                </label>

                {notesFile && !uploadedFileUrl && (
                  <button
                    type="button"
                    className="ahw-btn ahw-btn-primary"
                    onClick={() => handleFileUpload().catch(() => {})}
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading…" : "Upload File"}
                  </button>
                )}

                {uploadedFileUrl && (
                  <div className="ahw-upload-success">
                    <FiCheckCircle size={18} />
                    <span>Uploaded successfully</span>
                    <button
                      type="button"
                      className="ahw-icon-btn"
                      onClick={() => {
                        setUploadedFileUrl("");
                        setNotesFile(null);
                        toast("File removed", { icon: "🗑️" });
                      }}
                      aria-label="Remove file"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* ── Section 4: Visibility ─────────────────── */}
            <section className="ahw-section">
              <header className="ahw-section-head">
                <h3>Visibility</h3>
                <p>Set the locale and listing status.</p>
              </header>

              <div className="ahw-grid ahw-grid-2">
                <div className="ahw-field">
                  <label>Locale</label>
                  <select {...register("locale")}>
                    <option value="en">en (English)</option>
                    <option value="hi">hi (Hindi)</option>
                  </select>
                </div>
                <div className="ahw-field">
                  <label>Published (visible to users)</label>
                  <select {...register("isUsed")}>
                    <option value="false">No — hide from users</option>
                    <option value="true">Yes — show to users</option>
                  </select>
                </div>
              </div>

              <div className="ahw-grid ahw-grid-1">
                <div className="ahw-field">
                  <label>Description</label>
                  <textarea
                    rows={3}
                    placeholder="Short description shown to students…"
                    {...register("desc")}
                  />
                </div>
              </div>
            </section>

            {/* ── Action Bar ────────────────────────────── */}
            <div className="ahw-actions">
              <button
                type="button"
                className="ahw-btn ahw-btn-ghost"
                onClick={() => navigate(-1)}
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                type="button"
                className="ahw-btn ahw-btn-primary"
                onClick={handleSubmit(onSubmit)}
                disabled={isUploading}
              >
                {isUploading ? "Uploading…" : "Save Handwritten Note"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HOC(AddHandwrittenNote);