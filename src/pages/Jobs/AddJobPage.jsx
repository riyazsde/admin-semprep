import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import HOC from "../../components/HOC/HOC";
import {
  addJob,
  getAllSemstersCommon,
} from "../../services/exportFunctions";

const AddJob = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      companyName: "",
      companyLogo: "",
      location: "",
      workType: "",
      mode: "In-Office",
      salaryCurrency: "INR",
      salaryMin: "",
      salaryMax: "",
      salaryType: "Yearly",
      expMin: "",
      expMax: "",
      expLevel: "",
      education: "",
      semester: "",
      description: "",
      requirements: "",
      desirable: "",
      benefits: "",
      expiresAt: "",
      featured: false,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [semesters, setSemesters] = useState([]);

  /* ---- Fetch all semesters for the dropdown ---- */
  useEffect(() => {
    getAllSemstersCommon({
      setIsLoading: () => {},
      setData: (res) => {
        const list = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res)
          ? res
          : [];
        setSemesters(list);
      },
      params: { page: 1, limit: 200, search: "" },
    });
  }, []);

  const parseLines = (val) =>
    !val
      ? []
      : val
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);

  const onSubmit = (form) => {
    setIsSubmitting(true);

    const required = [
      "title",
      "companyName",
      "location",
      "workType",
      "salaryMin",
      "salaryMax",
    ];
    for (const field of required) {
      if (!form[field]) {
        alert(`${field} is required`);
        setIsSubmitting(false);
        return;
      }
    }

    const payload = {
      title: form.title,
      company: {
        name: form.companyName,
        logoUrl: form.companyLogo || "",
      },
      location: form.location,
      workType: form.workType,
      mode: form.mode,
      salary: {
        currency: form.salaryCurrency,
        min: Number(form.salaryMin),
        max: Number(form.salaryMax),
        type: form.salaryType,
      },
      experience: {
        minYears: Number(form.expMin) || 0,
        maxYears: Number(form.expMax) || 0,
        level: form.expLevel || "",
      },
      education: form.education || "",
      // ✅ NEW — only send if chosen
      ...(form.semester && { semester: form.semester }),
      description: form.description || "",
      requirements: parseLines(form.requirements),
      desirable: parseLines(form.desirable),
      benefits: parseLines(form.benefits),
      expiresAt: form.expiresAt
        ? new Date(form.expiresAt).toISOString()
        : null,
      featured: form.featured ? true : false,
    };

    addJob({
      data: payload,
      addFun: () => navigate("/jobs"),
      setIsLoading: setIsSubmitting,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Jobs</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Jobs /<span> Add Job</span>
          </p>
        </div>

        <div className="studentprofile-container min-h-0">
          <div className="studyplanner-container min-h-0">
            <div className="addhandwrittennotes-main overflow-auto">
              {/* Title, Company, Logo, Location, WorkType, Mode, Salary,
                  Experience, Education — UNCHANGED from your existing file */}

              {/* ===== Title ===== */}
              <div className="addhandwrittennotes-input" style={{ gap: 12 }}>
                <h6>
                  Job Title<span>*</span>
                </h6>
                <div className="input-container">
                  <input {...register("title", { required: true })} type="text" />
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{ gap: 12 }}>
                <h6>
                  Company Name<span>*</span>
                </h6>
                <div className="input-container">
                  <input
                    {...register("companyName", { required: true })}
                    type="text"
                  />
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{ gap: 12 }}>
                <h6>Company Logo URL</h6>
                <div className="input-container">
                  <input
                    {...register("companyLogo")}
                    type="text"
                    placeholder="https://example.com/logo.png"
                  />
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{ gap: 12 }}>
                <h6>
                  Location<span>*</span>
                </h6>
                <div className="input-container">
                  <input
                    {...register("location", { required: true })}
                    type="text"
                  />
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{ gap: 12 }}>
                <h6>
                  Work Type<span>*</span>
                </h6>
                <div className="input-container">
                  <select {...register("workType", { required: true })}>
                    <option value="">Select Work Type</option>
                    <option value="FULL-TIME">FULL-TIME</option>
                    <option value="PART-TIME">PART-TIME</option>
                    <option value="INTERNSHIP">INTERNSHIP</option>
                  </select>
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{ gap: 12 }}>
                <h6>Mode</h6>
                <div className="input-container">
                  <select {...register("mode")}>
                    <option value="In-Office">In-Office</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{ gap: 12 }}>
                <h6>Salary Currency</h6>
                <div className="input-container">
                  <input {...register("salaryCurrency")} placeholder="INR" />
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{ gap: 12 }}>
                <h6>
                  Minimum Salary<span>*</span>
                </h6>
                <div className="input-container">
                  <input
                    {...register("salaryMin", { required: true })}
                    type="number"
                    placeholder="Enter Minimum Salary"
                  />
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{ gap: 12 }}>
                <h6>
                  Maximum Salary<span>*</span>
                </h6>
                <div className="input-container">
                  <input
                    {...register("salaryMax", { required: true })}
                    type="number"
                    placeholder="Enter Maximum Salary"
                  />
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{ gap: 12 }}>
                <h6>Salary Type</h6>
                <div className="input-container">
                  <select {...register("salaryType")}>
                    <option value="Yearly">Yearly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{ gap: 12 }}>
                <h6>Minimum Experience (Years)</h6>
                <div className="input-container">
                  <input
                    {...register("expMin")}
                    type="number"
                    placeholder="Min Years"
                  />
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{ gap: 12 }}>
                <h6>Maximum Experience (Years)</h6>
                <div className="input-container">
                  <input
                    {...register("expMax")}
                    type="number"
                    placeholder="Max Years"
                  />
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{ gap: 12 }}>
                <h6>Experience Level</h6>
                <div className="input-container">
                  <select {...register("expLevel")}>
                    <option value="">Select Level</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Senior Level">Senior Level</option>
                  </select>
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{ gap: 12 }}>
                <h6>Education</h6>
                <div className="input-container">
                  <input {...register("education")} type="text" />
                </div>
              </div>

              {/* ===== ✅ NEW: Semester ===== */}
              <div className="addhandwrittennotes-input" style={{ gap: 12 }}>
                <h6>Semester</h6>
                <div className="input-container">
                  <select {...register("semester")}>
                    <option value="">Select Semester (optional)</option>
                    {semesters.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.semesterNumber
                          ? `Semester ${s.semesterNumber}`
                          : "Semester"}
                        {s.goal?.name ? ` — ${s.goal.name}` : ""}
                        {s.durationYears ? ` • ${s.durationYears}` : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <small style={{ fontSize: 12, color: "#6b7280" }}>
                  Optional. Filter jobs by semester on the user side.
                </small>
              </div>

              {/* ===== Description, Requirements, Desirable, Benefits,
                        Expiry, Featured — UNCHANGED ===== */}

              <div className="addhandwrittennotes-input" style={{ gap: 12 }}>
                <h6>Description</h6>
                <div className="input-container">
                  <textarea
                    style={{
                      outline: "none",
                      border: "none",
                      width: "100%",
                    }}
                    {...register("description")}
                    rows={5}
                  />
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{ gap: 12 }}>
                <h6>Requirements (one per line)</h6>
                <div className="input-container">
                  <textarea
                    style={{
                      outline: "none",
                      border: "none",
                      width: "100%",
                    }}
                    {...register("requirements")}
                    rows={4}
                  />
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{ gap: 12 }}>
                <h6>Desirable (one per line)</h6>
                <div className="input-container">
                  <textarea
                    style={{
                      outline: "none",
                      border: "none",
                      width: "100%",
                    }}
                    {...register("desirable")}
                    rows={3}
                  />
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{ gap: 12 }}>
                <h6>Benefits (one per line)</h6>
                <div className="input-container">
                  <textarea
                    style={{
                      outline: "none",
                      border: "none",
                      width: "100%",
                    }}
                    {...register("benefits")}
                    rows={3}
                  />
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{ gap: 12 }}>
                <h6>Expires At</h6>
                <div className="input-container">
                  <input {...register("expiresAt")} type="datetime-local" />
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{ gap: 12 }}>
                <h6>Featured</h6>
                <div className="input-container flex items-center gap-2">
                  <input {...register("featured")} type="checkbox" />
                </div>
              </div>
            </div>

            <div className="handwritten-button-container mt-8">
              <div className="handwritten-button">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating…" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default HOC(AddJob);