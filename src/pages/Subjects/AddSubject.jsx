import { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { AddGoalsExamModal } from "../../components/Modals/Modals";

import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import {
  addSubject,
  getAllSemstersCommon,
  getGoalCategory,
  getGoalExamByGoalCategory,
} from "../../services/exportFunctions";

const AddSubject = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [goalExam, setGoalExam] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState("");

  const getData = () => {
    getGoalCategory({ setIsLoading, setData, params: { limit: 1000 } });
  };

  useEffect(() => {
    getData();
  }, []);

  const selectedGoalCategory = watch("goalCategory");
  const selectedGoalExam = watch("goalExam");

  useEffect(() => {
    if (selectedGoalCategory) {
      const params = {
        page: 1,
        limit: 1000,
        search: "",
        goalCategoryId: selectedGoalCategory,
      };

      getGoalExamByGoalCategory({
        setIsLoading,
        setData: setGoalExam,
        params,
      });
    }
  }, [selectedGoalCategory]);

  useEffect(() => {
    if (selectedGoalExam && selectedGoalCategory) {
      getAllSemstersCommon({
        setIsLoading,
        setData: setSemesters,
        params: {
          limit: 1000,
          goalCategory: selectedGoalCategory,
          goal: selectedGoalExam,
        },
      });
    }
  }, [selectedGoalCategory, selectedGoalExam]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setValue("media", file);

    if (file.type.startsWith("image")) {
      setFileType("image");
    } else if (file.type.startsWith("video")) {
      setFileType("video");
    }

    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("goalCategoryId", data.goalCategory);
    formData.append("goalExamId", data.goalExam);

    if (data?.semester) {
      formData.append("semester", data.semester);
    }

    if (data?.media) {
      formData.append("media", data.media);
    }

    addSubject({
      data: formData,
      isFormData: true,
      setShowModal: setShow,
      addFun: () => navigate("/subjects"),
    });
  };

  return (
    <>
      <AddGoalsExamModal show={show} onHide={() => setShow(false)} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dashboardcontainer">
          <div className="dashboardcontainer-header">
            <h6>Subjects</h6>

            <p>
              <GoArrowLeft
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              Subjects /<span> Add Subject</span>
            </p>
          </div>

          <div className="studentprofile-container">
            <div className="studyplanner-container">
              <div className="addhandwritten-inputs">
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input" style={{ gap: 12 }}>
                    <h6>
                      University<span>*</span>
                    </h6>

                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select
                          {...register("goalCategory", { required: true })}
                        >
                          <option value=""> Select University</option>

                          {data?.data?.map((item, index) => (
                            <option key={index} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="addhandwritten-input" style={{ gap: 12 }}>
                    <h6>
                      Courses<span>*</span>
                    </h6>

                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select
                          {...register("goalExam", { required: true })}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select Course
                          </option>

                          {goalExam?.data?.map((item, index) => (
                            <option key={index} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input" style={{ gap: 12 }}>
                    <h6>
                      Semester <span>*</span>
                    </h6>

                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select
                          {...register("semester", { required: true })}
                          defaultValue=""
                        >
                          <option value="">Select Semester</option>

                          {semesters?.data?.map((sem) => (
                            <option key={sem._id} value={sem._id}>
                              {sem.semesterNumber
                                ? `Semester ${sem.semesterNumber}`
                                : sem.name || sem._id}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{ gap: 12 }}>
                    <h6>
                      Subject Name<span>*</span>
                    </h6>

                    <div className="addhandwritten-inputs-div">
                      <div
                        className="input-container"
                        style={{ width: "100%" }}
                      >
                        <input
                          type="text"
                          {...register("name", { required: true })}
                        />
                      </div>
                    </div>
                  </div>

                </div>

                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input" style={{ gap: 12 }}>
                    <h6>Upload Image / Video (Optional)</h6>

                    <div className="addhandwritten-inputs-div">
                      <div
                        className="input-container"
                        style={{ width: "100%" }}
                      >
                        <input
                          type="file"
                          accept="image/*,video/*"
                          // {...register("media")}
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>

                    {preview && (
                      <div style={{ marginTop: 12 }}>
                        {fileType === "image" ? (
                          <img
                            src={preview}
                            alt="preview"
                            style={{
                              width: 200,
                              height: 140,
                              objectFit: "contain",
                              borderRadius: 10,
                            }}
                          />
                        ) : (
                          <video
                            src={preview}
                            controls
                            style={{
                              width: 250,
                              borderRadius: 10,
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="addhandwritennotes-submit">
              <div className="handwritten-button">
                <button type="submit">
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default HOC(AddSubject);