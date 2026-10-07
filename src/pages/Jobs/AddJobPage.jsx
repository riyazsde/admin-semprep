import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import HOC from "../../components/HOC/HOC";
import { addJob } from "../../services/exportFunctions";

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
      salaryCurrency: "USD",
      salaryMin: "",
      salaryMax: "",
      salaryType: "Yearly",
      expMin: "",
      expMax: "",
      expLevel: "",
      education: "",
      description: "",
      requirements: "",
      desirable: "",
      benefits: "",
      expiresAt: "",
      featured: false,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      description: form.description || "",
      requirements: parseLines(form.requirements),
      desirable: parseLines(form.desirable),
      benefits: parseLines(form.benefits),
      expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : null,
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
              {/* ===== Title ===== */}
              <div className="addhandwrittennotes-input" style={{gap:12}}>
                <h6>
                  Job Title<span>*</span>
                </h6>
                <div className="input-container">
                  <input
                    {...register("title", { required: true })}
                    type="text"
                  />
                  {/* <label>Enter Job Title</label> */}
                </div>
              </div>

              {/* ===== Company ===== */}
              <div className="addhandwrittennotes-input" style={{gap:12}}>
                <h6>
                  Company Name<span>*</span>
                </h6>
                <div className="input-container">
                  <input
                    {...register("companyName", { required: true })}
                    type="text"
                  />
                  {/* <label>Enter Company Name</label> */}
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{gap:12}}>
                <h6>Company Logo URL</h6>
                <div className="input-container">
                  <input
                    {...register("companyLogo")}
                    type="text"
                    placeholder="https://example.com/logo.png"
                  />
                  {/* <label>Enter Logo URL</label> */}
                </div>
              </div>

              {/* ===== Location ===== */}
              <div className="addhandwrittennotes-input" style={{gap:12}}>
                <h6>
                  Location<span>*</span>
                </h6>
                <div className="input-container">
                  <input
                    {...register("location", { required: true })}
                    type="text"
                  />
                  {/* <label>Enter Location</label> */}
                </div>
              </div>

              {/* ===== Work Type ===== */}
              <div className="addhandwrittennotes-input" style={{gap:12}}>
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
                  {/* <label>Work Type</label> */}
                </div>
              </div>

              {/* ===== Mode ===== */}
              <div className="addhandwrittennotes-input" style={{gap:12}}>
                <h6>Mode</h6>
                <div className="input-container">
                  <select {...register("mode")}>
                    <option value="In-Office">In-Office</option>
                    <option value="Remote">Remote</option>
                  </select>
                  {/* <label>Mode</label> */}
                </div>
              </div>

              {/* ===== Salary (separated fields) ===== */}
              <div className="addhandwrittennotes-input" style={{gap:12}}>
                <h6>Salary Currency</h6>
                <div className="input-container">
                  <input {...register("salaryCurrency")} placeholder="USD" />
                  {/* <label>Currency</label> */}
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{gap:12}}>
                <h6>
                  Minimum Salary<span>*</span>
                </h6>
                <div className="input-container">
                  <input
                    {...register("salaryMin", { required: true })}
                    type="number"
                    placeholder="Enter Minimum Salary"
                  />
                  {/* <label>Min Salary</label> */}
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{gap:12}}>
                <h6>
                  Maximum Salary<span>*</span>
                </h6>
                <div className="input-container">
                  <input
                    {...register("salaryMax", { required: true })}
                    type="number"
                    placeholder="Enter Maximum Salary"
                  />
                  {/* <label>Max Salary</label> */}
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{gap:12}}>
                <h6>Salary Type</h6>
                <div className="input-container">
                  <select {...register("salaryType")}>
                    <option value="Yearly">Yearly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                  {/* <label>Salary Type</label> */}
                </div>
              </div>

              {/* ===== Experience (separated fields) ===== */}
              <div className="addhandwrittennotes-input" style={{gap:12}}>
                <h6>Minimum Experience (Years)</h6>
                <div className="input-container">
                  <input
                    {...register("expMin")}
                    type="number"
                    placeholder="Min Years"
                  />
                  {/* <label>Minimum Experience</label> */}
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{gap:12}}>
                <h6>Maximum Experience (Years)</h6>
                <div className="input-container">
                  <input
                    {...register("expMax")}
                    type="number"
                    placeholder="Max Years"
                  />
                  {/* <label>Maximum Experience</label> */}
                </div>
              </div>

              <div className="addhandwrittennotes-input" style={{gap:12}}>
                <h6>Experience Level</h6>
                <div className="input-container">
                  <select {...register("expLevel")}>
                    <option value="">Select Level</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Senior Level">Senior Level</option>
                  </select>
                  {/* <label>Experience Level</label> */}
                </div>
              </div>

              {/* ===== Education ===== */}
              <div className="addhandwrittennotes-input" style={{gap:12}}>
                <h6>Education</h6>
                <div className="input-container">
                  <input {...register("education")} type="text" />
                  {/* <label>Enter Education</label> */}
                </div>
              </div>

              {/* ===== Description ===== */}
              <div className="addhandwrittennotes-input" style={{gap:12}}>
                <h6>Description</h6>
                <div className="input-container">
                  <textarea style={{outline:"none", border:"none", width:"100%"}} {...register("description")} rows={5} />
                  {/* <label>Job Description</label> */}
                </div>
              </div>

              {/* ===== Requirements ===== */}
              <div className="addhandwrittennotes-input" style={{gap:12}}>
                <h6>Requirements (one per line)</h6>
                <div className="input-container">
                  <textarea style={{outline:"none", border:"none", width:"100%"}} {...register("requirements")} rows={4} />
                  {/* <label>Requirements</label> */}
                </div>
              </div>

              {/* ===== Desirable ===== */}
              <div className="addhandwrittennotes-input" style={{gap:12}}>
                <h6>Desirable (one per line)</h6>
                <div className="input-container">
                  <textarea style={{outline:"none", border:"none", width:"100%"}} {...register("desirable")} rows={3} />
                  {/* <label>Desirable</label> */}
                </div>
              </div>

              {/* ===== Benefits ===== */}
              <div className="addhandwrittennotes-input" style={{gap:12}}>
                <h6>Benefits (one per line)</h6>
                <div className="input-container">
                  <textarea style={{outline:"none", border:"none", width:"100%"}} {...register("benefits")} rows={3} />
                  {/* <label>Benefits</label> */}
                </div>
              </div>

              {/* ===== Expiry ===== */}
              <div className="addhandwrittennotes-input" style={{gap:12}}>
                <h6>Expires At</h6>
                <div className="input-container">
                  <input {...register("expiresAt")} type="datetime-local" />
                  {/* <label>Expiry Date</label> */}
                </div>
              </div>

              {/* ===== Featured ===== */}
              <div className="addhandwrittennotes-input" style={{gap:12}}>
                <h6>Featured</h6>
                <div className="input-container flex items-center gap-2">
                  <input {...register("featured")} type="checkbox" />
                  {/* <label>Mark as featured</label> */}
                </div>
              </div>
            </div>

            {/* ===== Submit Button ===== */}
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
