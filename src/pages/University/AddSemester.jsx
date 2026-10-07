import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import HOC from "../../components/HOC/HOC";
import { addSemester } from "../../services/exportFunctions";

const AddSemester = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id, courseId } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      university: id,
      semesterNumber: "",
      durationYears: "",
      stream: "",
    },
  });

  useEffect(() => {
    if (id) setValue("university", id);
  }, [id, setValue]);

  const onSubmit = (data) => {
    setIsSubmitting(true);

    const payload = {
      university: id,
      semesterNumber: Number(data.semesterNumber),
      durationYears: Number(data.durationYears),
      stream: data.stream,
      universityCourse: courseId,
    };

    const onSuccess = () => {
      setIsSubmitting(false);
      if (id) navigate(-1);
      else navigate(`/university/view-semester/${id}/${courseId}`);
    };

    const onError = () => setIsSubmitting(false);

    addSemester({ data: payload, addFun: onSuccess, errorFun: onError });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Add Semester</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Semester /<span> Add Semester</span>
          </p>
        </div>

        <div className="studentprofile-container">
          <div className="studyplanner-container">
            <div className="addhandwrittennotes-main">
              <div className="addhandwrittennotes-input">
                <h6>
                  Semester Number<span>*</span>
                </h6>
                <div className="input-container">
                  <input
                    {...register("semesterNumber", { required: true, min: 1 })}
                    type="number"
                  />
                  <label>Enter Semester Number</label>
                </div>
                {errors.semesterNumber && (
                  <span className="error">
                    Valid semester number is required
                  </span>
                )}
              </div>

              <div className="addhandwrittennotes-input">
                <h6>
                  Duration (years)<span>*</span>
                </h6>
                <div className="input-container">
                  <input
                    {...register("durationYears", { required: true, min: 0 })}
                    type="number"
                    step="0.1"
                  />
                  <label>Enter Duration in Years</label>
                </div>
                {errors.durationYears && (
                  <span className="error">Duration is required</span>
                )}
              </div>

              <div className="addhandwrittennotes-input">
                <h6>
                  Stream<span>*</span>
                </h6>
                <div className="input-container">
                  <input
                    {...register("stream", { required: true })}
                    type="text"
                  />
                  <label>Enter Stream</label>
                </div>
                {errors.stream && (
                  <span className="error">Stream is required</span>
                )}
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

export default HOC(AddSemester);
