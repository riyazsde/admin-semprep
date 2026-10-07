import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import HOC from "../../components/HOC/HOC";
import { addGoalCategory } from "../../services/exportFunctions";

const AddGoalCategory = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const payload = new FormData();

    payload.append("isGovernmentExam", "false");

    if (data?.name) payload.append("name", data.name);
      if (data?.description) payload.append("description", data.description);
    payload.append("imageUrl", data.image?.[0]);

    const addFun = (id) => {
      navigate("/goal/goals");
    };

    addGoalCategory({
      data: payload,
      addFun: addFun,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dashboardcontainer">
          <div className="dashboardcontainer-header">
            <h6>University</h6>
            <p>
              <GoArrowLeft
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              University /<span> Add University</span>
            </p>
          </div>

          <div className="studentprofile-container">
            <div className="studyplanner-container">
              <div className="addhandwrittennotes-main">

                <div className="addhandwrittennotes-input">
                  <h6>
                    University<span>*</span>
                  </h6>
                  <div className="input-container">
                    <input
                      type="text"
                      id="email"
                      required
                      {...register("name", { required: true })}
                    />
                    {/* <label htmlFor="">Enter Goal</label> */}
                  </div>
                </div>

                <div className="addhandwrittennotes-input">
                  <h6>
                    Select Image<span>*</span>
                  </h6>
                  <div className="input-container">
                    <input
                      {...register("image", { required: true })}
                      type="file"
                      id="email"
                    />
                    {/* <label htmlFor="">Select Image</label> */}
                  </div>
                </div>

                <div className="addhandwrittennotes-input">
                  <h6>
                    Description (Optional)
                  </h6>
                  <div className="input-container">
                    <textarea
                      {...register("description")}
                      rows={1}
                      className="mb-0 university-desc"
                    />
                    {/* <label htmlFor="">Enter Description</label> */}
                  </div>
                </div>

              </div>
            </div>

            <div
              className="handwritten-button-container"
              style={{ marginTop: "2rem" }}
            >
              <div className="handwritten-button">
                <button type="submit">Create</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default HOC(AddGoalCategory);
