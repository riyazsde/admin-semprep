import React, { useEffect, useState, useRef } from "react";
import HOC from "../../components/HOC/HOC";

import { GoArrowLeft } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
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
// Helper — extract array from any response shape
// ─────────────────────────────────────────────────────────────
const extractList = (res) => {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data?.data)) return res.data.data;
  if (Array.isArray(res.data?.result)) return res.data.result;
  if (Array.isArray(res.result)) return res.result;
  return [];
};

// Normalize a value that might be a string ID or a populated object
const asId = (val) =>
  typeof val === "object" && val !== null ? val?._id : val;

const EditHandwrittenNotes = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { register, handleSubmit, watch, reset } = useForm();

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

  // ─── PDF state ─────────────────────────────────────────────
  const [existingPdfs, setExistingPdfs] = useState([]);
  const [newPdfFiles, setNewPdfFiles] = useState([]);
  const [deletedPdfs, setDeletedPdfs] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  // ─── Initial data load ─────────────────────────────────────
  useEffect(() => {
    getStudyPlannerPlans({ setIsLoading, setData: setStudyplannerStudyPlans });

    getHandwrittenNoteById({
      id,
      setIsLoading,
      setData: (res) => {
        const noteData = res?.data || {};

        // Normalize populated objects → string IDs for the form
        reset({
          ...noteData,
          goalCategory: asId(noteData?.goalCategory),
          goal: asId(noteData?.goal),
          semester: asId(noteData?.semester),
        });

        if (noteData?.subjects) setFormSubjects(noteData.subjects);
        if (noteData?.handWrittenNotesPdf)
          setExistingPdfs(noteData.handWrittenNotesPdf);
      },
    });

    getGoalCategory({ setIsLoading, setData });
  }, [id, reset]);

  // ─── Dependent dropdowns ───────────────────────────────────
  const goalCategory = watch("goalCategory");

  useEffect(() => {
    if (goalCategory) {
      const params = {
        page: 1,
        limit: 100,
        search: "",
        goalCategoryId: goalCategory,
      };
      getGoalExamByGoalCategory({ setIsLoading, setData: setAllGoals, params });
    }
  }, [goalCategory]);

  // Normalize goalExamId (may be string or populated object)
  const goalExamIdRaw = watch("goal");
  const goalExamId = asId(goalExamIdRaw);

  // ─── Semesters (client-side filtered by goal) ──────────────
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

        // Backend may return all semesters — filter client-side
        const filtered = list.filter((sem) => {
          const semGoalId = asId(sem?.goal);
          return String(semGoalId) === String(goalExamId);
        });

        setSemesters(filtered);
      },
      params,
    });
  }, [goalExamId]);

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

  const subjectId = asId(watch("subject"));

  useEffect(() => {
    if (subjectId) {
      const params = { page: 1, limit: 100, search: "", subjectId };
      getAllSubSubjects({ setIsLoading, setData: setSubSubjects, params });
    }
  }, [subjectId]);

  const subSubjectId = asId(watch("subSubject"));

  useEffect(() => {
    if (subjectId || subSubjectId) {
      const params = { page: 1, limit: 100, search: "" };
      if (subjectId) params.subjectId = subjectId;
      if (subSubjectId) params.subSubjectId = subSubjectId;
      getAllSubjectsByGoalExam({ setIsLoading, setData: setChapters, params });
    }
  }, [subjectId, subSubjectId]);

  const chapterId = asId(watch("chapter"));

  useEffect(() => {
    if (chapterId) {
      const params = { page: 1, limit: 100, search: "", chapterId };
      getTopicsByChapter({ setIsLoading, setData: setTopics, params });
    }
  }, [chapterId]);

  const topicId = asId(watch("topic"));

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

      const payload = {
        ...formData,
        subjects: formSubjects,
        handWrittenNotesPdf: finalPdfs,
        ...(deletedPdfs.length && { deletedPdfs }),
      };

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
              <select
                {...register("goalCategory", { required: true })}
                className="ehw-input"
              >
                <option value="">Select Goal Category</option>
                {data?.data?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="ehw-field">
              <label>
                Goal Exam <span className="req">*</span>
              </label>
              <select
                {...register("goal", { required: true })}
                className="ehw-input"
              >
                <option value="">Select Goal Exam</option>
                {allGoals?.data?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ✅ Semester dropdown */}
          <div className="ehw-grid ehw-grid-2" style={{ marginTop: "1rem" }}>
            <div className="ehw-field">
              <label>
                Semester <span className="req">*</span>
              </label>
              <select
                {...register("semester", { required: true })}
                className="ehw-input"
                disabled={!goalExamId}
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
                Bundle Name <span className="req">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter bundle name"
                {...register("bundleName", { required: true })}
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

        {/* ── Section: Pricing & Duration ───────────────── */}
        <section className="ehw-section">
          <header className="ehw-section-head">
            <h3>Pricing &amp; Duration</h3>
            <p>Set the price and study duration.</p>
          </header>

          <div className="ehw-grid ehw-grid-2">
            <div className="ehw-field">
              <label>
                Price (₹) <span className="req">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter price"
                {...register("price", { required: true })}
                className="ehw-input"
              />
            </div>

            <div className="ehw-field">
              <label>
                Duration <span className="req">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 12 hours"
                {...register("duration", { required: true })}
                className="ehw-input"
              />
            </div>

            <div className="ehw-field">
              <label>Visibility</label>
              <select {...register("isUsed")} className="ehw-input" required>
                <option value={false}>Show in Handwritten Notes</option>
                <option value={true}>Hide from Handwritten Notes</option>
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
            <p>
              Upload, replace, or remove the PDF files attached to this note.
            </p>
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