import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { GoArrowLeft } from "react-icons/go";
import { SlCloudUpload } from "react-icons/sl";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdClose, MdCheckCircle, MdError } from "react-icons/md";
import HOC from "../../components/HOC/HOC";
import { uploadImage } from "../../services/otherFunction";
import {
  getGoalCategory,
  getGoalExamByGoalCategory,
} from "../../services/exportFunctions";

const API_BASE_URL =
  "https://prep-project-zej8.onrender.com/api/v1/admin/test-series";

/* =====================================================================
   TOKEN HELPER
   ===================================================================== */
const getAccessToken = () => {
  const keys = [
    "accessToken",
    "token",
    "adminToken",
    "authToken",
    "admin_access_token",
    "jwt",
    "jwtToken",
  ];
  for (const key of keys) {
    const val = localStorage.getItem(key);
    if (val && typeof val === "string" && val.length > 10) {
      return val.startsWith("Bearer ") ? val.slice(7) : val;
    }
  }
  for (const key of keys) {
    const val = sessionStorage.getItem(key);
    if (val && typeof val === "string" && val.length > 10) {
      return val.startsWith("Bearer ") ? val.slice(7) : val;
    }
  }
  return null;
};

/* =====================================================================
   AXIOS INTERCEPTOR
   ===================================================================== */
axios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* =====================================================================
   HELPER — Safely extract _id from a populated or raw value
   ===================================================================== */
const extractId = (val) => {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && val._id) return val._id;
  return "";
};

/* =====================================================================
   MAIN COMPONENT
   ===================================================================== */
const TestSeries = () => {
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({});
  const [listLoading, setListLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [toasts, setToasts] = useState([]);

  const addToast = (type, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const removeToast = (id) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  /* ---------- DROPDOWN STATE ---------- */
  const [universities, setUniversities] = useState([]); // = Goal Categories
  const [courses, setCourses] = useState([]);           // = Goals

  const [image, setImage] = useState(null);
  const [tileImageUrl, setTileImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  /* =====================================================================
     INITIAL AUTH CHECK
     ===================================================================== */
  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      addToast(
        "error",
        "No access token found. Please log in again to continue."
      );
    }
  }, []);

  /* =====================================================================
     LOAD UNIVERSITIES (= Goal Categories) on mount
     ===================================================================== */
  useEffect(() => {
    getGoalCategory({ setIsLoading: () => {}, setData: setUniversities });
  }, []);

  /* =====================================================================
     LIST FETCH
     ===================================================================== */
  useEffect(() => {
    const t = setTimeout(() => fetchList(), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const fetchList = async () => {
    setListLoading(true);
    try {
      const res = await axios.get(API_BASE_URL, {
        params: { page, limit, search: search || undefined },
      });
      setList(res.data?.data || []);
      setPagination(res.data?.pagination || {});
    } catch (err) {
      const status = err.response?.status;
      const msg =
        err.response?.data?.message || err.message || "Failed to load list";
      addToast(
        "error",
        status === 401 || status === 403
          ? `Authentication failed (${status}). Please log in again.`
          : msg
      );
    } finally {
      setListLoading(false);
    }
  };

  /* =====================================================================
     DEPENDENT DROPDOWN: University → Courses
     ===================================================================== */
  const university = watch("university");
  useEffect(() => {
    if (university) {
      getGoalExamByGoalCategory({
        setIsLoading: () => {},
        setData: setCourses,
        params: {
          page: 1,
          limit: 100,
          search: "",
          goalCategoryId: university,
        },
      });
    } else {
      setCourses([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [university]);

  /* =====================================================================
     MODAL OPEN / CLOSE
     ===================================================================== */
  const openCreate = () => {
    reset();
    setImage(null);
    setTileImageUrl(null);
    setCourses([]);
    setModalMode("create");
    setEditingId(null);
    setModalOpen(true);
  };

  const openEdit = async (series) => {
    reset();
    setModalMode("edit");
    setEditingId(series._id);
    setModalOpen(true);

    /* ---------- Extract IDs (prefer goalCategory/goal, fall back to
                  university/universityCourse — they mean the same thing) ---------- */
    const universityId =
      extractId(series.goalCategory) || extractId(series.university);
    const courseId =
      extractId(series.goal) || extractId(series.universityCourse);

    /* ---------- Set text/number fields ---------- */
    setValue("bundleName", series.bundleName || "");
    setValue("bundleDescription", series.bundleDescription || "");
    setValue("bundleCost", series.bundleCost ?? "");
    setValue("bundleDuration", series.bundleDuration || "");
    setValue("testCount", series.testCount ?? "");
    setValue("freeTestsCount", series.freeTestsCount ?? "");
    setValue("locale", series.locale || "");
    setValue("isUsed", String(series.isUsed ?? false));

    /* ---------- Set the 2 visible ID fields ---------- */
    setValue("university", universityId);
    setValue("course", courseId);

    /* ---------- Preload courses dropdown so the selected option shows ---------- */
    if (universityId) {
      try {
        await getGoalExamByGoalCategory({
          setIsLoading: () => {},
          setData: setCourses,
          params: {
            page: 1,
            limit: 100,
            search: "",
            goalCategoryId: universityId,
          },
        });
      } catch (e) {
        console.warn("Failed to preload courses:", e);
      }
    }

    /* ---------- Image ---------- */
    if (series.tileImage) {
      setTileImageUrl(series.tileImage);
      setImage(series.tileImage);
    } else {
      setTileImageUrl(null);
      setImage(null);
    }
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
    reset();
    setImage(null);
    setTileImageUrl(null);
    setEditingId(null);
    setCourses([]);
  };

  /* =====================================================================
     IMAGE UPLOAD
     ===================================================================== */
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      const url = await uploadImage({ data: file });
      setTileImageUrl(url);
      addToast("success", "Image uploaded successfully.");
    } catch (err) {
      console.error("Image upload failed:", err);
      addToast("error", "Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  /* =====================================================================
     SUBMIT — SEND THE SAME IDS TO BOTH PAIRS OF FIELDS
     ===================================================================== */
  const onSubmit = async (formValues) => {
    setSaving(true);

    try {
      const selectedUniversity = formValues.university || null;
      const selectedCourse = formValues.course || null;

      const payload = {
        bundleName: formValues.bundleName,
        bundleDescription: formValues.bundleDescription,
        bundleCost: Number(formValues.bundleCost) || 0,
        bundleDuration: formValues.bundleDuration || "",
        testCount: Number(formValues.testCount) || 0,
        freeTestsCount: Number(formValues.freeTestsCount) || 0,
        locale: formValues.locale || "",
        isUsed:
          formValues.isUsed === "true" || formValues.isUsed === true,

        // ✅ Send SAME value to BOTH pairs so backend is happy either way
        goalCategory: selectedUniversity,
        university: selectedUniversity,
        goal: selectedCourse,
        universityCourse: selectedCourse,

        // semester not used in this UI — omit or send null
        semester: null,
      };

      /* Only send tileImage if it has a value (avoid wiping it) */
      if (tileImageUrl) {
        payload.tileImage = tileImageUrl;
      }

      /* CREATE: backend requires `tests` array → send []
         EDIT:   preserve existing tests → omit `tests` key */
      if (modalMode === "create") {
        payload.tests = [];
      }

      console.log(
        "📤 Test Series payload:",
        JSON.stringify(payload, null, 2)
      );

      if (modalMode === "edit" && editingId) {
        await axios.put(`${API_BASE_URL}/${editingId}`, payload);
        addToast("success", "Test series updated successfully!");
      } else {
        await axios.post(API_BASE_URL, payload);
        addToast("success", "Test series created successfully!");
      }

      closeModal();
      fetchList();
    } catch (err) {
      console.error("Test Series Save Error:", err);
      console.error("Backend response:", err.response?.data);

      const status = err.response?.status;
      const backendMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to save";

      addToast(
        "error",
        status === 401 || status === 403
          ? `Authentication failed (${status}). Log in again.`
          : status === 400 || status === 500
          ? `Save error: ${backendMsg}`
          : backendMsg
      );
    } finally {
      setSaving(false);
    }
  };

  /* =====================================================================
     DELETE
     ===================================================================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this test series?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      addToast("success", "Deleted successfully!");
      fetchList();
    } catch (err) {
      addToast(
        "error",
        err.response?.data?.message || err.message || "Failed to delete"
      );
    }
  };

  const totalPages = pagination?.totalPages || 1;
  const canPrev = page > 1;
  const canNext = page < totalPages;

  /* =====================================================================
     RENDER
     ===================================================================== */
  return (
    <>
      <style>{`
        .ts-toast-wrap {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
        }
        .ts-toast {
          pointer-events: auto;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          min-width: 280px;
          max-width: 460px;
          padding: 14px 16px;
          border-radius: 10px;
          background: #fff;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06);
          font-size: 13.5px;
          font-weight: 500;
          animation: tsToastIn 0.25s ease;
          border-left: 4px solid #6366f1;
        }
        .ts-toast.success { border-left-color: #10b981; color: #065f46; }
        .ts-toast.success .ts-toast-icon { color: #10b981; }
        .ts-toast.error { border-left-color: #ef4444; color: #991b1b; }
        .ts-toast.error .ts-toast-icon { color: #ef4444; }
        .ts-toast-icon { flex-shrink: 0; font-size: 20px; margin-top: 1px; }
        .ts-toast-body { flex: 1; line-height: 1.45; word-break: break-word; }
        .ts-toast-close {
          background: transparent;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          font-size: 16px;
          line-height: 1;
          padding: 0;
          margin-top: 1px;
        }
        .ts-toast-close:hover { color: #4b5563; }
        @keyframes tsToastIn {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 640px) {
          .ts-toast-wrap { top: 12px; right: 12px; left: 12px; }
          .ts-toast { min-width: 0; max-width: 100%; }
        }

        .ts-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .ts-search {
          flex: 1;
          max-width: 400px;
          padding: 10px 14px;
          border: 1.5px solid #e5e7eb;
          border-radius: 9px;
          font-size: 14px;
          outline: none;
          transition: all 0.15s;
        }
        .ts-search:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99,102,241,0.1);
        }
        .ts-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 18px;
          background: #6366f1;
          color: #fff;
          border: none;
          border-radius: 9px;
          font-weight: 600;
          font-size: 13.5px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .ts-btn-primary:hover {
          background: #4f46e5;
          transform: translateY(-1px);
        }
        .ts-btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .ts-table-wrap {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .ts-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .ts-table thead {
          background: #f9fafb;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        .ts-table th {
          padding: 14px 16px;
          font-size: 12px;
          font-weight: 700;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .ts-table td {
          padding: 14px 16px;
          border-bottom: 1px solid #f3f4f6;
          vertical-align: middle;
          color: #111827;
        }
        .ts-table tbody tr:hover { background: #fafafa; }
        .ts-table tbody tr:last-child td { border-bottom: none; }

        .ts-td-image {
          width: 60px;
          height: 44px;
          object-fit: cover;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
          background: #f3f4f6;
        }
        .ts-td-name { font-weight: 600; color: #111827; }
        .ts-td-sub {
          font-size: 12px;
          color: #6b7280;
          display: block;
          margin-top: 2px;
          max-width: 320px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .ts-badge {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11.5px;
          font-weight: 600;
        }
        .ts-badge-green { background: #ecfdf5; color: #047857; }
        .ts-badge-blue { background: #eff6ff; color: #1d4ed8; }
        .ts-badge-gray { background: #f3f4f6; color: #4b5563; }

        .ts-actions {
          display: flex;
          gap: 6px;
          justify-content: flex-end;
        }
        .ts-icon-btn {
          width: 32px;
          height: 32px;
          border-radius: 7px;
          border: 1px solid #e5e7eb;
          background: #fff;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }
        .ts-icon-btn:hover { transform: translateY(-1px); }
        .ts-icon-btn.edit { color: #6366f1; }
        .ts-icon-btn.edit:hover {
          background: #eef2ff;
          border-color: #c7d2fe;
        }
        .ts-icon-btn.delete { color: #dc2626; }
        .ts-icon-btn.delete:hover {
          background: #fef2f2;
          border-color: #fecaca;
        }

        .ts-pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
          font-size: 13px;
          color: #6b7280;
        }
        .ts-pagination-btns { display: flex; gap: 8px; }
        .ts-page-btn {
          padding: 6px 14px;
          border: 1px solid #e5e7eb;
          background: #fff;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.15s;
        }
        .ts-page-btn:hover:not(:disabled) { background: #f3f4f6; }
        .ts-page-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .ts-empty {
          text-align: center;
          padding: 60px 20px;
          color: #9ca3af;
        }

        .ts-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(17, 24, 39, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: tsFade 0.15s ease;
        }
        @keyframes tsFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes tsSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ts-modal {
          background: #fff;
          border-radius: 14px;
          width: 100%;
          max-width: 780px;
          max-height: 92vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: tsSlideUp 0.2s ease;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
        }
        .ts-modal form {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }
        .ts-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #f3f4f6;
          flex-shrink: 0;
        }
        .ts-modal-header h5 {
          margin: 0;
          font-size: 17px;
          font-weight: 700;
          color: #111827;
        }
        .ts-modal-close {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          border: none;
          background: #f3f4f6;
          color: #6b7280;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
          font-size: 18px;
        }
        .ts-modal-close:hover { background: #e5e7eb; color: #111827; }

        .ts-modal-body {
          padding: 24px;
          overflow-y: auto;
          flex: 1;
          min-height: 0;
        }
        .ts-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px 18px;
        }
        .ts-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ts-field-full { grid-column: 1 / -1; }
        .ts-field label {
          font-size: 12.5px;
          font-weight: 600;
          color: #4b5563;
        }
        .ts-field label span { color: #dc2626; }
        .ts-field input,
        .ts-field select,
        .ts-field textarea {
          padding: 10px 12px;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          color: #111827;
          background: #fff;
          outline: none;
          transition: all 0.15s;
          width: 100%;
          box-sizing: border-box;
        }
        .ts-field input:focus,
        .ts-field select:focus,
        .ts-field textarea:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99,102,241,0.1);
        }
        .ts-field textarea {
          resize: vertical;
          min-height: 70px;
        }
        .ts-field-error {
          font-size: 11.5px;
          color: #dc2626;
        }

        .ts-upload {
          position: relative;
          width: 130px;
          height: 100px;
          border: 1.5px dashed #d1d5db;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 6px;
          cursor: pointer;
          background: #f9fafb;
          transition: all 0.15s;
          overflow: hidden;
        }
        .ts-upload:hover {
          border-color: #6366f1;
          background: #eef2ff;
        }
        .ts-upload img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .ts-upload-overlay {
          position: absolute;
          inset: 0;
          background: rgba(17,24,39,0.5);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          opacity: 0;
          transition: opacity 0.15s;
        }
        .ts-upload:hover .ts-upload-overlay { opacity: 1; }
        .ts-upload input[type="file"] {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
        }
        .ts-upload-text {
          font-size: 11px;
          color: #6b7280;
        }
        .ts-upload-uploading {
          font-size: 11px;
          color: #6366f1;
          font-weight: 600;
        }

        .ts-modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding: 16px 24px;
          border-top: 1px solid #f3f4f6;
          background: #fafafa;
          flex-shrink: 0;
        }
        .ts-btn-ghost {
          padding: 10px 20px;
          border: 1.5px solid #e5e7eb;
          background: #fff;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          transition: all 0.15s;
        }
        .ts-btn-ghost:hover:not(:disabled) { background: #f3f4f6; }
        .ts-btn-ghost:disabled { opacity: 0.6; cursor: not-allowed; }

        @media (max-width: 640px) {
          .ts-form-grid { grid-template-columns: 1fr; }
          .ts-toolbar { flex-direction: column; align-items: stretch; }
          .ts-search { max-width: 100%; }
        }
      `}</style>

      <div className="ts-toast-wrap">
        {toasts.map((t) => (
          <div key={t.id} className={`ts-toast ${t.type}`}>
            <span className="ts-toast-icon">
              {t.type === "success" ? <MdCheckCircle /> : <MdError />}
            </span>
            <div className="ts-toast-body">{t.message}</div>
            <button
              className="ts-toast-close"
              onClick={() => removeToast(t.id)}
              aria-label="Dismiss"
            >
              <MdClose />
            </button>
          </div>
        ))}
      </div>

      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Test Series</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Quiz app /<span> Test Series</span>
          </p>
        </div>

        <div className="studyplanner-container" style={{ padding: 16 }}>
          <div className="ts-toolbar">
            <input
              type="text"
              className="ts-search"
              placeholder="Search by bundle name…"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />
            <button className="ts-btn-primary" onClick={openCreate}>
              + Add Test Series
            </button>
          </div>

          {listLoading ? (
            <div className="ts-empty">Loading…</div>
          ) : list.length === 0 ? (
            <div className="ts-empty">No test series found</div>
          ) : (
            <div className="ts-table-wrap">
              <table className="ts-table">
                <thead>
                  <tr>
                    <th style={{ width: 80 }}>Image</th>
                    <th>Bundle</th>
                    <th>Tests</th>
                    <th>Cost</th>
                    <th>Locale</th>
                    <th>Status</th>
                    <th style={{ width: 100, textAlign: "right" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((s) => (
                    <tr key={s._id}>
                      <td>
                        {s.tileImage ? (
                          <img
                            src={s.tileImage}
                            alt=""
                            className="ts-td-image"
                          />
                        ) : (
                          <div className="ts-td-image" />
                        )}
                      </td>
                      <td>
                        <span className="ts-td-name">
                          {s.bundleName || "Untitled"}
                        </span>
                        <span className="ts-td-sub">
                          {s.bundleDescription || "No description"}
                        </span>
                      </td>
                      <td>
                        <span className="ts-badge ts-badge-blue">
                          {s.testCount ?? 0}
                        </span>
                      </td>
                      <td>₹{s.bundleCost ?? 0}</td>
                      <td>{s.locale || "—"}</td>
                      <td>
                        <span
                          className={`ts-badge ${
                            s.isUsed ? "ts-badge-green" : "ts-badge-gray"
                          }`}
                        >
                          {s.isUsed ? "Active" : "Draft"}
                        </span>
                      </td>
                      <td>
                        <div className="ts-actions">
                          <button
                            className="ts-icon-btn edit"
                            title="Edit"
                            onClick={() => openEdit(s)}
                          >
                            <AiFillEdit size={16} />
                          </button>
                          <button
                            className="ts-icon-btn delete"
                            title="Delete"
                            onClick={() => handleDelete(s._id)}
                          >
                            <AiFillDelete size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="ts-pagination">
                <span>
                  Page {page} of {totalPages} • {pagination?.totalDocs ?? 0}{" "}
                  total
                </span>
                <div className="ts-pagination-btns">
                  <button
                    className="ts-page-btn"
                    disabled={!canPrev}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Prev
                  </button>
                  <button
                    className="ts-page-btn"
                    disabled={!canNext}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div
          className="ts-modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="ts-modal">
            <div className="ts-modal-header">
              <h5>
                {modalMode === "edit" ? "Edit Test Series" : "Add Test Series"}
              </h5>
              <button
                className="ts-modal-close"
                onClick={closeModal}
                aria-label="Close"
              >
                <MdClose />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="ts-modal-body">
                <div className="ts-form-grid">
                  {/* ---------- TILE IMAGE ---------- */}
                  <div className="ts-field ts-field-full">
                    <label>Tile Image</label>
                    <div className="ts-upload">
                      {image ? (
                        <>
                          <img src={image} alt="Preview" />
                          <div className="ts-upload-overlay">
                            {uploading ? "Uploading…" : "Change"}
                          </div>
                        </>
                      ) : (
                        <>
                          <SlCloudUpload size={20} color="#9ca3af" />
                          <span className="ts-upload-text">
                            {uploading ? "Uploading…" : "Click to upload"}
                          </span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={uploading}
                      />
                    </div>
                    {uploading && (
                      <span className="ts-upload-uploading">
                        Uploading image…
                      </span>
                    )}
                  </div>

                  {/* ---------- UNIVERSITY (= Goal Category) ---------- */}
                  <div className="ts-field">
                    <label>
                      University <span>*</span>
                    </label>
                    <select {...register("university", { required: true })}>
                      <option value="">Select University</option>
                      {universities?.data?.map((u) => (
                        <option key={u._id} value={u._id}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                    {errors.university && (
                      <span className="ts-field-error">
                        University is required
                      </span>
                    )}
                  </div>

                  {/* ---------- COURSE (= Goal) ---------- */}
                  <div className="ts-field">
                    <label>
                      Course <span>*</span>
                    </label>
                    <select {...register("course", { required: true })}>
                      <option value="">Select Course</option>
                      {courses?.data?.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {errors.course && (
                      <span className="ts-field-error">
                        Course is required
                      </span>
                    )}
                  </div>

                  {/* ---------- BUNDLE NAME ---------- */}
                  <div className="ts-field">
                    <label>
                      Bundle Name <span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CDS Foundation 2025"
                      {...register("bundleName", { required: true })}
                    />
                    {errors.bundleName && (
                      <span className="ts-field-error">
                        Bundle name is required
                      </span>
                    )}
                  </div>

                  {/* ---------- LOCALE ---------- */}
                  <div className="ts-field">
                    <label>
                      Locale <span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. English"
                      {...register("locale", { required: true })}
                    />
                    {errors.locale && (
                      <span className="ts-field-error">
                        Locale is required
                      </span>
                    )}
                  </div>

                  {/* ---------- DESCRIPTION ---------- */}
                  <div className="ts-field ts-field-full">
                    <label>
                      Bundle Description <span>*</span>
                    </label>
                    <textarea
                      placeholder="Short description of this bundle"
                      {...register("bundleDescription", { required: true })}
                    />
                    {errors.bundleDescription && (
                      <span className="ts-field-error">
                        Description is required
                      </span>
                    )}
                  </div>

                  {/* ---------- COST ---------- */}
                  <div className="ts-field">
                    <label>
                      Cost of Bundle (₹) <span>*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      {...register("bundleCost", { required: true })}
                    />
                    {errors.bundleCost && (
                      <span className="ts-field-error">
                        Cost is required
                      </span>
                    )}
                  </div>

                  {/* ---------- DURATION ---------- */}
                  <div className="ts-field">
                    <label>Bundle Duration</label>
                    <input
                      type="text"
                      placeholder="e.g. 6 months"
                      {...register("bundleDuration")}
                    />
                  </div>

                  {/* ---------- TOTAL TESTS ---------- */}
                  <div className="ts-field">
                    <label>Total Tests</label>
                    <input
                      type="number"
                      placeholder="0"
                      {...register("testCount")}
                    />
                  </div>

                  {/* ---------- FREE TESTS ---------- */}
                  <div className="ts-field">
                    <label>Free Tests</label>
                    <input
                      type="number"
                      placeholder="0"
                      {...register("freeTestsCount")}
                    />
                  </div>

                  {/* ---------- IS USED ---------- */}
                  <div className="ts-field ts-field-full">
                    <label>Show In Test Series</label>
                    <select {...register("isUsed")}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="ts-modal-footer">
                <button
                  type="button"
                  className="ts-btn-ghost"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ts-btn-primary"
                  disabled={saving || uploading}
                >
                  {saving
                    ? "Saving…"
                    : modalMode === "edit"
                    ? "Update"
                    : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default HOC(TestSeries);