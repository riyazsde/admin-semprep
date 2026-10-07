import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import HOC from "../../components/HOC/HOC";
import { addUniversityCourse } from "../../services/exportFunctions";

const AddUniversityCourse = () => {
  const navigate = useNavigate();
  const { id: universityId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsSubmitting(true);

    const payload = {
      university: universityId,
      name: data.name,
      code: data.code,
      durationYears: Number(data.durationYears),
      stream: data.stream,
    };

    const onSuccess = () => {
      setIsSubmitting(false);

      navigate(`/university/${universityId}/university-courses`);
    };

    const onError = () => {
      setIsSubmitting(false);
    };

    addUniversityCourse({
      data: payload,
      addFun: onSuccess,
      errorFun: onError,
      setIsLoading: setIsSubmitting,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Add University Course</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            University Course /<span> Add Course</span>
          </p>
        </div>

        <div className="studentprofile-container">
          <div className="studyplanner-container">
            <div className="addhandwrittennotes-main">
              <div className="addhandwrittennotes-input">
                <h6>
                  Course Name<span>*</span>
                </h6>
                <div className="input-container">
                  <input
                    {...register("name", { required: true })}
                    type="text"
                  />
                  <label>Enter Course Name</label>
                </div>
              </div>

              <div className="addhandwrittennotes-input">
                <h6>Course Code</h6>
                <div className="input-container">
                  <input {...register("code")} type="text" />
                  <label>Enter Course Code</label>
                </div>
              </div>

              <div className="addhandwrittennotes-input">
                <h6>Duration (Years)</h6>
                <div className="input-container">
                  <input
                    {...register("durationYears", { valueAsNumber: true })}
                    type="number"
                    step="0.5"
                  />
                  <label>Enter Duration in Years</label>
                </div>
              </div>

              <div className="addhandwrittennotes-input">
                <h6>Stream</h6>
                <div className="input-container">
                  <input {...register("stream")} type="text" />
                  <label>Enter Stream (e.g. Science)</label>
                </div>
              </div>
            </div>
          </div>

          <div
            className="handwritten-button-container"
            style={{ marginTop: "2rem" }}
          >
            <div className="handwritten-button">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default HOC(AddUniversityCourse);
