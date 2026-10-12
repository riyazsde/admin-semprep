import React, { useEffect, useState, useRef } from "react";
import HOC from "../../components/HOC/HOC";

import { GoArrowLeft } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { FiUpload, FiTrash2, FiFileText, FiX } from "react-icons/fi";
import { toast } from "sonner";
import {
  getAllHandwrittenNotes,
  getGoalCategory,
  getGoalExamByGoalCategory,
  getHandwrittenNoteById,
  getStudyPlannerPlans,
  getAllSubjects,
  getAllSubSubjects,
  getAllSubjectsByGoalExam,
  getTopicsByChapter,
  getAllVideos,
  getAllEducatorNotes,
  updateHandwrittenNote,
  uploadHandwrittenNotesFile,
  getAllSemstersCommon,
} from "../../services/exportFunctions";
import HandwrittenNotesFormComponent from "../../services/HandwrittenNotesFormComponent";

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
const extractList = (res) => {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data?.data)) return res.data.data;
  if (Array.isArray(res.data?.result)) return res.data.result;
  if (Array.isArray(res.data?.docs)) return res.data.docs;
  if (Array.isArray(res.result)) return res.result;
  return [];
};

const asId = (val) =>
  typeof val === "object" && val !== null ? val?._id : val;

/**
 * Resolve the semester ID for a note.
 * 1. Top-level `note.semester` (if the backend ever starts returning it)
 * 2. `note.subjects[].subject.semester` (what your API actually sends today)
 * 3. `note.subjects[].semester` (looser fallback)
 */
const deriveSemesterId = (note) => {
  if (!note) return "";

  // 1️⃣ Top-level
  const top = asId(note.semester);
  if (top) return top;

  // 2️⃣ Nested inside subjects
  if (Array.isArray(note.subjects)) {
    for (const s of note.subjects) {
      const nested = asId(s?.subject?.semester) || asId(s?.semester);
      if (nested) return nested;
    }
  }

  return "";
};

const EditHandwrittenNotes = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { register, handleSubmit, watch, reset, setValue, control } = useForm();

  // ─── State ─────────────────────────────────────────────────
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allGoals, setAllGoals] = useState([]);
  const [subject, setSubject] = useState([]);
  const [subSubjects, setSubSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isSamePage, setIsSamePage] = useState(false);
  const [handwrittennotes, setHandwrittenNotes] = useState([]);
  const [educatorNotes, setEducatorNotes] = useState([]);
  const [studyplannerStudyPlans, setStudyplannerStudyPlans] = useState([]);
  const [formSubjects, setFormSubjects] = useState([]);
  const [semesters, setSemesters] = useState([]);

  // ─── Edit hydration ────────────────────────────────────────
  const [noteData, setNoteData] = useState(null);
  const [categoryLoaded, setCategoryLoaded] = useState(false);

  const [injectedCategory, setInjectedCategory] = useState(false);
  const [injectedGoal, setInjectedGoal] = useState(false);
  const [injectedSemester, setInjectedSemester] = useState(false);

  // ─── PDF state ─────────────────────────────────────────────
  const [existingPdfs, setExistingPdfs] = useState([]);
  const [newPdfFiles, setNewPdfFiles] = useState([]);
  const [deletedPdfs, setDeletedPdfs] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  const categoryList = extractList(data);
  const goalList = extractList(allGoals);

  // ─── Watch fields ──────────────────────────────────────────
  const goalCategory = watch("goalCategory");
  const goalExamIdRaw = watch("goal");
  const goalExamId = asId(goalExamIdRaw);
  const subjectId = asId(watch("subject"));
  const subSubjectId = asId(watch("subSubject"));
  const chapterId = asId(watch("chapter"));
  const topicId = asId(watch("topic"));

  // ─── Initial load ──────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    getStudyPlannerPlans({ setIsLoading, setData: setStudyplannerStudyPlans });

    getGoalCategory({
      setIsLoading,
      setData: (res) => {
        if (cancelled) return;
        setData(res);
        setCategoryLoaded(true);
      },
    });

    getHandwrittenNoteById({
      id,
      setIsLoading,
      setData: (res) => {
        if (cancelled) return;
        const nd = res?.data || res;

        const derivedSemesterId = deriveSemesterId(nd);

        console.log("📥 FULL NOTE:", nd);
        console.log(
          "📥 semester top-level:",
          nd?.semester,
          "| derived:",
          derivedSemesterId
        );

        const hydrated = {
          ...nd,
          semester: derivedSemesterId || "",
        };

        setNoteData(hydrated);
        if (nd?.subjects) setFormSubjects(nd.subjects);
        if (nd?.handWrittenNotesPdf)
          setExistingPdfs(nd.handWrittenNotesPdf);
      },
    });

    return () => {
      cancelled = true;
    };
  }, [id]);

  // ─── Reset form once data is ready ─────────────────────────
  useEffect(() => {
    if (!noteData || !categoryLoaded) return;

    reset({
      ...noteData,
      goalCategory: asId(noteData?.goalCategory),
      goal: asId(noteData?.goal),
      semester: asId(noteData?.semester),
      subject: asId(noteData?.subject),
      subSubject: asId(noteData?.subSubject),
      chapter: asId(noteData?.chapter),
      topic: asId(noteData?.topic),
    });
  }, [noteData, categoryLoaded, reset]);

  // ─── Inject saved Goal Category ────────────────────────────
  useEffect(() => {
    if (!noteData || injectedCategory) return;
    if (!categoryLoaded) return;

    const savedCatId = asId(noteData.goalCategory);
    if (!savedCatId) {
      setInjectedCategory(true);
      return;
    }

    const exists = categoryList.some((c) => asId(c) === savedCatId);
    if (!exists) {
      const fallback =
        typeof noteData.goalCategory === "object" &&
        noteData.goalCategory !== null
          ? noteData.goalCategory
          : { _id: savedCatId, name: `Category ${savedCatId.slice(-4)}` };
      setData((prev) => {
        const list = extractList(prev);
        if (list.some((c) => asId(c) === savedCatId)) return prev;
        return [...list, fallback];
      });
    }
    setInjectedCategory(true);
  }, [noteData, categoryLoaded, categoryList, injectedCategory]);

  // ─── Fetch goals when category set ─────────────────────────
  useEffect(() => {
    if (!goalCategory) return;

    const params = {
      page: 1,
      limit: 100,
      search: "",
      goalCategoryId: goalCategory,
    };

    getGoalExamByGoalCategory({
      setIsLoading,
      setData: (res) => setAllGoals(res),
      params,
    });
  }, [goalCategory]);

  // ─── Inject saved Goal Exam ────────────────────────────────
  useEffect(() => {
    if (!noteData || injectedGoal) return;
    if (!goalCategory) return;
    if (!goalList.length && !allGoals.length) return;

    const savedGoalId = asId(noteData.goal);
    if (!savedGoalId) {
      setInjectedGoal(true);
      return;
    }

    const exists = goalList.some((g) => asId(g) === savedGoalId);
    if (!exists) {
      const fallback =
        typeof noteData.goal === "object" && noteData.goal !== null
          ? noteData.goal
          : { _id: savedGoalId, name: `Goal ${savedGoalId.slice(-4)}` };
      setAllGoals((prev) => {
        const list = extractList(prev);
        if (list.some((g) => asId(g) === savedGoalId)) return prev;
        return [...list, fallback];
      });
    }
    setInjectedGoal(true);
  }, [noteData, goalCategory, goalList, allGoals, injectedGoal]);

  // ─── Fetch semesters when goal set ─────────────────────────
  useEffect(() => {
    if (!goalExamId) {
      setSemesters([]);
      return;
    }

    const params = {
      page: 1,
      limit: 100,
      search: "",
      goalId: goalExamId,
    };

    getAllSemstersCommon({
      setIsLoading,
      setData: (res) => {
        const list = extractList(res);
        console.log("📥 SEMESTERS fetched:", list);
        setSemesters(list);
      },
      params,
    });
  }, [goalExamId]);

  // ─── Inject saved Semester if not present in fetched list ──
  useEffect(() => {
    if (!noteData || injectedSemester) return;
    if (!goalExamId) return;
    if (!semesters.length) return;

    const savedSemId = asId(noteData.semester);
    if (!savedSemId) {
      setInjectedSemester(true);
      return;
    }

    const exists = semesters.some((s) => asId(s) === savedSemId);
    if (!exists) {
      const fallback =
        typeof noteData.semester === "object" && noteData.semester !== null
          ? noteData.semester
          : {
              _id: savedSemId,
              semesterNumber: "?",
              durationYears: "",
            };
      setSemesters((prev) => {
        if (prev.some((s) => asId(s) === savedSemId)) return prev;
        return [...prev, fallback];
      });
    }
    setInjectedSemester(true);
  }, [noteData, goalExamId, semesters, injectedSemester]);

  // ─── Reconciliation: re-apply values once options exist ────
  // Goal Category
  useEffect(() => {
    if (!noteData) return;
    const savedCat = asId(noteData.goalCategory);
    if (!savedCat) return;
    if (!categoryList.some((c) => asId(c) === savedCat)) return;
    if (watch("goalCategory") === savedCat) return;

    const t = setTimeout(() => {
      setValue("goalCategory", savedCat, {
        shouldDirty: false,
        shouldValidate: false,
      });
    }, 0);
    return () => clearTimeout(t);
  }, [noteData, categoryList, setValue, watch]);

  // Goal Exam
  useEffect(() => {
    if (!noteData) return;
    const savedGoal = asId(noteData.goal);
    if (!savedGoal) return;
    if (!goalList.some((g) => asId(g) === savedGoal)) return;
    if (watch("goal") === savedGoal) return;

    const t = setTimeout(() => {
      setValue("goal", savedGoal, {
        shouldDirty: false,
        shouldValidate: false,
      });
    }, 0);
    return () => clearTimeout(t);
  }, [noteData, goalList, setValue, watch]);

  // Semester — final safety net
  useEffect(() => {
    if (!noteData) return;
    const savedSem = asId(noteData.semester);
    if (!savedSem) return;
    if (!semesters.some((s) => asId(s) === savedSem)) return;
    if (watch("semester") === savedSem) return;

    const t = setTimeout(() => {
      setValue("semester", savedSem, {
        shouldDirty: false,
        shouldValidate: false,
      });
    }, 0);
    return () => clearTimeout(t);
  }, [noteData, semesters, setValue, watch]);

  // ─── Subjects ──────────────────────────────────────────────
  useEffect(() => {
    if (goalExamId) {
      const params = {
        page: 1,
        limit: 100,
        search: "",
        goalCategory,
        goalId: goalExamId,
      };
      getAllSubjects({ setIsLoading, setData: setSubject, params });
    }
  }, [goalExamId, goalCategory]);

  useEffect(() => {
    if (subjectId) {
      const params = { page: 1, limit: 100, search: "", subjectId };
      getAllSubSubjects({ setIsLoading, setData: setSubSubjects, params });
    }
  }, [subjectId]);

  useEffect(() => {
    if (subjectId || subSubjectId) {
      const params = { page: 1, limit: 100, search: "" };
      if (subjectId) params.subjectId = subjectId;
      if (subSubjectId) params.subSubjectId = subSubjectId;
      getAllSubjectsByGoalExam({ setIsLoading, setData: setChapters, params });
    }
  }, [subjectId, subSubjectId]);

  useEffect(() => {
    if (chapterId) {
      const params = { page: 1, limit: 100, search: "", chapterId };
      getTopicsByChapter({ setIsLoading, setData: setTopics, params });
    }
  }, [chapterId]);

  useEffect(() => {
    if (topicId) {
      const params = { page: 1, limit: 100, search: "", topicId };
      getAllVideos({ setIsLoading, setData: () => {}, params });
    }
  }, [topicId]);

  useEffect(() => {
    getAllHandwrittenNotes({
      setIsLoading,
      setData: setHandwrittenNotes,
      params: { limit: 3000 },
    });
    getAllEducatorNotes({
      setIsLoading,
      setData: setEducatorNotes,
      params: { limit: 3000 },
    });
  }, []);

  // ─── PDF handlers ──────────────────────────────────────────
  const handlePdfSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles = [];
    for (const file of files) {
      if (file.type !== "application/pdf") {
        toast.error(`${file.name} is not a PDF`);
        continue;
      }
      if (file.size > 20 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 20MB`);
        continue;
      }
      validFiles.push(file);
    }

    setNewPdfFiles((prev) => [...prev, ...validFiles]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeNewPdf = (index) => {
    setNewPdfFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const markExistingPdfForDelete = (pdf) => {
    const url = typeof pdf === "string" ? pdf : pdf?.url || pdf?.path;
    setDeletedPdfs((prev) => (prev.includes(url) ? prev : [...prev, url]));
    setExistingPdfs((prev) =>
      prev.filter((p) => {
        const u = typeof p === "string" ? p : p?.url || p?.path;
        return u !== url;
      })
    );
  };

  const undoDeletePdf = (pdf) => {
    const url = typeof pdf === "string" ? pdf : pdf?.url || pdf?.path;
    setDeletedPdfs((prev) => prev.filter((u) => u !== url));
    setExistingPdfs((prev) => [...prev, pdf]);
  };

  // ─── Submit ────────────────────────────────────────────────
  const onSubmit = async (formData) => {
    try {
      let uploadedUrls = [];

      if (newPdfFiles.length > 0) {
        setIsUploading(true);
        for (const file of newPdfFiles) {
          const res = await uploadHandwrittenNotesFile({ file });
          const url =
            res?.url ||
            res?.data?.url ||
            res?.fileUrl ||
            res?.data?.fileUrl ||
            res?.path ||
            res?.data?.path;
          if (url) uploadedUrls.push(url);
        }
        setIsUploading(false);
      }

      const existingUrls = existingPdfs.map((p) =>
        typeof p === "string" ? p : p?.url || p?.path
      );

      const finalPdfs = [...existingUrls, ...uploadedUrls];

      const semesterId = asId(formData.semester);

      // ✅ Strip legacy fields (bundleName, price, duration) that may
      //    still be present in formData after hydration from the API.
      const {
        bundleName: _bundleName,
        price: _price,
        duration: _duration,
        ...cleanFormData
      } = formData;

      const payload = {
        ...cleanFormData,
        goalCategory: asId(formData.goalCategory),
        goal: asId(formData.goal),
        semester: semesterId,
        subject: asId(formData.subject),
        subSubject: asId(formData.subSubject),
        chapter: asId(formData.chapter),
        topic: asId(formData.topic),
        subjects: formSubjects,
        handWrittenNotesPdf: finalPdfs,
        ...(deletedPdfs.length && { deletedPdfs }),
      };

      console.log("📤 UPDATE PAYLOAD:", JSON.stringify(payload, null, 2));

      const addFun = () => {
        reset();
        setFormSubjects([]);
        setExistingPdfs([]);
        setNewPdfFiles([]);
        setDeletedPdfs([]);
        setSemesters([]);
        if (!isSamePage) navigate("/quizapp/handwritten-notes");
        setIsSamePage(false);
      };

      await updateHandwrittenNote({ data: payload, addFun, id });
      toast.success("Handwritten note updated successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to update note");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ehw-page">
      {/* ─── Page Header ─────────────────────────────────── */}
      <div className="ehw-header">
        <div className="ehw-header-left">
          <button
            type="button"
            className="ehw-back-btn"
            onClick={() => navigate(-1)}
          >
            <GoArrowLeft size={20} />
          </button>
          <div>
            <h1>Edit Handwritten Note</h1>
            <nav className="ehw-breadcrumb">
              <span>Quiz App</span>
              <span className="sep">/</span>
              <span className="current">Edit Handwritten Note</span>
            </nav>
          </div>
        </div>
      </div>

      {/* ─── Card Body ───────────────────────────────────── */}
      <div className="ehw-card">
        {/* ── Section: Classification ───────────────────── */}
        <section className="ehw-section">
          <header className="ehw-section-head">
            <h3>Classification</h3>
            <p>Associate this note with a goal category, exam, and semester.</p>
          </header>

          <div className="ehw-grid ehw-grid-2">
            <div className="ehw-field">
              <label>
                Goal Category <span className="req">*</span>
              </label>
              <Controller
                name="goalCategory"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <select
                    {...field}
                    key={`cat-${categoryList.length}-${categoryList
                      .map((c) => c._id)
                      .join(",")}`}
                    className="ehw-input"
                  >
                    <option value="">Select Goal Category</option>
                    {categoryList.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            <div className="ehw-field">
              <label>
                Goal Exam <span className="req">*</span>
              </label>
              <Controller
                name="goal"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <select
                    {...field}
                    key={`goal-${goalList.length}-${goalList
                      .map((g) => g._id)
                      .join(",")}`}
                    className="ehw-input"
                  >
                    <option value="">
                      {!goalCategory
                        ? "Select Goal Category first"
                        : goalList.length === 0
                        ? "No goal exams available"
                        : "Select Goal Exam"}
                    </option>
                    {goalList.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
          </div>

          <div className="ehw-grid ehw-grid-2" style={{ marginTop: "1rem" }}>
            <div className="ehw-field">
              <label>
                Semester <span className="req">*</span>
              </label>
              <Controller
                name="semester"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <select
                    {...field}
                    key={`sem-${semesters.length}-${semesters
                      .map((s) => s._id)
                      .join(",")}`}
                    className="ehw-input"
                  >
                    <option value="">
                      {!goalExamId
                        ? "Select Goal Exam first"
                        : semesters.length === 0
                        ? "No semesters available"
                        : "Select Semester"}
                    </option>
                    {semesters.map((sem) => (
                      <option key={sem._id} value={sem._id}>
                        Semester {sem.semesterNumber}
                        {sem.durationYears ? ` (${sem.durationYears})` : ""}
                      </option>
                    ))}
                  </select>
                )}
              />
              <small className="ehw-help">
                Required for filtering handwritten notes by semester.
              </small>
            </div>
          </div>

          {goalCategory && goalExamId && (
            <div className="ehw-subsection">
              <HandwrittenNotesFormComponent
                goalCategory={goalCategory}
                goalExamId={goalExamId}
                setFormSubjects={setFormSubjects}
                initialSubjects={formSubjects}
              />
            </div>
          )}
        </section>

        {/* ── Section: Basic Information ────────────────── */}
        <section className="ehw-section">
          <header className="ehw-section-head">
            <h3>Basic Information</h3>
            <p>General details of the handwritten note bundle.</p>
          </header>

          <div className="ehw-grid ehw-grid-2">
            <div className="ehw-field">
              <label>
                Topper's Name <span className="req">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter topper's name"
                {...register("topperName", { required: true })}
                className="ehw-input"
              />
            </div>

            <div className="ehw-field">
              <label>
                Page Count <span className="req">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 120"
                {...register("pagesCount", { required: true })}
                className="ehw-input"
              />
            </div>

            <div className="ehw-field">
              <label>
                Tile Image Link <span className="req">*</span>
              </label>
              <input
                type="text"
                placeholder="https://..."
                {...register("image", { required: true })}
                className="ehw-input"
              />
            </div>

            <div className="ehw-field ehw-field-full">
              <label>Description</label>
              <textarea
                rows={4}
                placeholder="Enter description"
                {...register("desc")}
                className="ehw-input ehw-textarea"
              />
            </div>
          </div>
        </section>

        {/* ── Section: Visibility ── */}
        <section className="ehw-section">
          <header className="ehw-section-head">
            <h3>Visibility</h3>
            <p>Control whether this bundle appears on the app.</p>
          </header>

          <div className="ehw-grid ehw-grid-2">
            <div className="ehw-field">
              <label>Visibility</label>
              <select {...register("isUsed")} className="ehw-input" required>
                <option value="false">No — hide from users</option>
                <option value="true">Yes — show to users</option>
              </select>
              <small className="ehw-help">
                Controls whether this bundle appears on the app.
              </small>
            </div>
          </div>
        </section>

        {/* ── Section: PDF Files ────────────────────────── */}
        <section className="ehw-section">
          <header className="ehw-section-head">
            <h3>Handwritten Notes PDFs</h3>
            <p>Upload, replace, or remove the PDF files attached to this note.</p>
          </header>

          {existingPdfs.length > 0 && (
            <div className="ehw-file-group">
              <h4 className="ehw-file-group-title">
                Existing Files ({existingPdfs.length})
              </h4>
              <ul className="ehw-file-list">
                {existingPdfs.map((pdf, idx) => {
                  const url =
                    typeof pdf === "string" ? pdf : pdf?.url || pdf?.path;
                  const name =
                    typeof pdf === "string"
                      ? `File ${idx + 1}`
                      : pdf?.name || `File ${idx + 1}`;
                  return (
                    <li key={idx} className="ehw-file-item">
                      <div className="ehw-file-icon">
                        <FiFileText size={18} />
                      </div>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ehw-file-name"
                      >
                        {name}
                      </a>
                      <button
                        type="button"
                        className="ehw-icon-btn ehw-icon-btn-danger"
                        onClick={() => markExistingPdfForDelete(pdf)}
                        title="Remove file"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {deletedPdfs.length > 0 && (
            <div className="ehw-file-group">
              <h4 className="ehw-file-group-title ehw-danger-title">
                Marked for Removal ({deletedPdfs.length})
              </h4>
              <ul className="ehw-file-list">
                {deletedPdfs.map((url, idx) => (
                  <li key={idx} className="ehw-file-item ehw-file-item-deleted">
                    <div className="ehw-file-icon">
                      <FiFileText size={16} />
                    </div>
                    <span className="ehw-file-name">{url}</span>
                    <button
                      type="button"
                      className="ehw-btn-ghost"
                      onClick={() => undoDeletePdf(url)}
                    >
                      Undo
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div
            className="ehw-dropzone"
            onClick={() => fileInputRef.current?.click()}
          >
            <FiUpload size={28} />
            <p className="ehw-dropzone-title">Click to upload PDF files</p>
            <p className="ehw-dropzone-sub">
              Only PDF &middot; Multiple files allowed &middot; Max 20&nbsp;MB each
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              multiple
              style={{ display: "none" }}
              onChange={handlePdfSelect}
            />
          </div>

          {newPdfFiles.length > 0 && (
            <div className="ehw-file-group">
              <h4 className="ehw-file-group-title">
                Ready to Upload ({newPdfFiles.length})
              </h4>
              <ul className="ehw-file-list">
                {newPdfFiles.map((file, idx) => (
                  <li key={idx} className="ehw-file-item ehw-file-item-new">
                    <div className="ehw-file-icon">
                      <FiFileText size={16} />
                    </div>
                    <div className="ehw-file-name">
                      {file.name}
                      <small>{(file.size / 1024).toFixed(1)} KB</small>
                    </div>
                    <button
                      type="button"
                      className="ehw-icon-btn ehw-icon-btn-danger"
                      onClick={() => removeNewPdf(idx)}
                      title="Remove file"
                    >
                      <FiX size={15} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>

      {/* ─── Footer Actions ─────────────────────────────── */}
      <div className="ehw-footer">
        <button
          type="button"
          className="ehw-btn ehw-btn-secondary"
          onClick={() => navigate(-1)}
          disabled={isUploading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="ehw-btn ehw-btn-primary"
          disabled={isUploading || isLoading}
        >
          {isUploading ? "Uploading PDFs..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default HOC(EditHandwrittenNotes);