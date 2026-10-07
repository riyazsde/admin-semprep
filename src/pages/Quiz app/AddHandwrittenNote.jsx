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

// Human-readable label for a semester object
const getSemesterLabel = (s) => {
  if (!s) return "";
  const num = s.semesterNumber ? `Semester ${s.semesterNumber}` : "Semester";
  const goalName = s.goal?.name || "";
  const uniName = s.goalCategory?.name || s.university?.name || "";
  const year = s.durationYears ? ` • ${s.durationYears}` : "";
  const meta = goalName || uniName;
  return meta ? `${num} — ${meta}${year}` : `${num}${year}`;
};

// ─────────────────────────────────────────────────────────────
// Helpers to safely extract an ID out of many possible shapes
// ─────────────────────────────────────────────────────────────
const pickId = (v) => {
  if (!v) return "";
  if (typeof v === "string") return v;
  return v._id || v.id || "";
};

// Normalize subjects into the nested shape the API expects
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

// Count every topic across the nested tree
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

  // ✅ Defaults matched to what WORKING notes in the user list use:
  //    isUsed: false  (sample notes with isUsed:false DO appear on user side)
  //    locale: "en"   (lowercase, matching the working sample notes)
  const { register, handleSubmit, watch, reset, setValue } = useForm({
    defaultValues: {
      isUsed: "false",
      locale: "en",
      topicsCount: "",
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

  // ── Initial data loads ────────────────────────────────────
  useEffect(() => {
    getStudyPlannerPlans({ setIsLoading, setData: setStudyplannerStudyPlans });
    getGoalCategory({ setIsLoading, setData });
  }, []);

  const goalCategory = watch("goalCategory");
  const goalExamId = watch("goal");
  const semesterId = watch("semester");

  // 👇 Load goal exams + semesters whenever university changes
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

  // 👇 Client-side filter: keep semesters matching selected uni + goal
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

  // Clear selected semester if it's no longer valid
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
      setValue("image", fileUrl, { shouldValidate: true });

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
    let fileUrl = uploadedFileUrl;

    if (notesFile && !fileUrl) {
      try {
        fileUrl = await handleFileUpload();
      } catch (err) {
        return;
      }
    }

    // ✅ Require the notes PDF
    if (!fileUrl) {
      toast.error("Please upload a notes file before saving.");
      return;
    }

    if (!formSubjects || formSubjects.length === 0) {
      toast.error("Please add at least one subject before saving.");
      return;
    }

    if (!formData.semester) {
      toast.error("Please select a semester.");
      return;
    }

    const isUsedBool =
      formData.isUsed === "true" ||
      formData.isUsed === true ||
      formData.isUsed === "Yes";

    // ✅ Convert whatever shape the child gave us into the nested API shape
    const normalizedSubjects = normalizeSubjects(formSubjects);

    if (normalizedSubjects.length === 0) {
      toast.error(
        "Subjects were provided but none had a valid subject id. Please re-select."
      );
      return;
    }

    // ✅ Auto-derive topicsCount if blank
    const derivedTopics = countTopics(normalizedSubjects);
    const explicitTopics = Number(formData.topicsCount) || 0;

    // ✅ Minimal payload — matches exactly what the working sample notes
    //    in the user list have. No isActive / status / isPublished fields
    //    (those may trigger strict-schema rejection).
    const payload = {
      topperName: formData.topperName || "",
      bundleName: formData.bundleName,
      desc: formData.desc || "",
      pagesCount: Number(formData.pagesCount),
      duration: formData.duration,
      topicsCount: explicitTopics || derivedTopics,
      price: Number(formData.price),
      locale: formData.locale || "en",   // ✅ lowercase to match sample notes
      isUsed: isUsedBool,
      goalCategory: formData.goalCategory,
      goal: formData.goal,
      semester: formData.semester,
      image: formData.image || "",
      handWrittenNotesPdf: [fileUrl],
      subjects: normalizedSubjects,
    };

    console.log(
      "POSTING HANDWRITTEN NOTE PAYLOAD:",
      JSON.stringify(payload, null, 2)
    );

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

              <div className="ahw-grid ahw-grid-2">
                <div className="ahw-field">
                  <label>Topper's Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ananya Sharma"
                    {...register("topperName")}
                  />
                </div>
                <div className="ahw-field">
                  <label>
                    Bundle Name <span className="ahw-req">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Complete Modern History Notes"
                    {...register("bundleName", { required: true })}
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
                <div className="ahw-field">
                  <label>Tile Image URL (optional)</label>
                  <input
                    type="text"
                    placeholder="https://… (thumbnail shown in listing)"
                    {...register("image")}
                  />
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
                        setValue("image", "");
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

            {/* ── Section 4: Pricing & Visibility ───────── */}
            <section className="ahw-section">
              <header className="ahw-section-head">
                <h3>Pricing &amp; Visibility</h3>
                <p>Set the price, duration and listing status.</p>
              </header>

              <div className="ahw-grid ahw-grid-4">
                <div className="ahw-field">
                  <label>
                    Price (₹) <span className="ahw-req">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 199"
                    {...register("price", { required: true })}
                  />
                </div>
                <div className="ahw-field">
                  <label>
                    Duration <span className="ahw-req">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 6 months"
                    {...register("duration", { required: true })}
                  />
                </div>
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