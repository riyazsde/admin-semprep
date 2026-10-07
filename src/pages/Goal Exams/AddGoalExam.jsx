import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";

import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postRequest } from "../../services/apiService";
import {
  addGoalCategory,
  addGoalExam,
  getGoalCategory,
} from "../../services/exportFunctions";

const AddGoalExam = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  const getData = () => {
    getGoalCategory({ setIsLoading, setData,params:{limit:1000} });
  };
  useEffect(() => {
    getData();
  }, []);

  const onSubmit = (data) => {
    const payload = new FormData();
    if (!data.goalCategory) return;
    if (data?.name) payload.append("name", data.name);
    payload.append("goalCategory", data.goalCategory);
    payload.append("image", data.image?.[0]);

    addGoalExam({
      data: payload,
      addFun: () => navigate("/goalexams"),
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dashboardcontainer">
          <div className="dashboardcontainer-header">
            <h6>Courses</h6>
            <p>
              <GoArrowLeft
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              Courses /<span> Add Course</span>
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
                    <select
                      name=""
                      id=""
                      {...register("goalCategory", { required: true })}
                    >
                       <option value="">Select Goal</option>
                      {data?.data?.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {/* <label htmlFor="">Enter Goal</label> */}
                  </div>
                </div>
                <div className="addhandwrittennotes-input">
                  <h6>
                    Course Name<span>*</span>
                  </h6>
                  <div className="input-container">
                    <input {...register("name")} type="text" id="email" />
                    {/* <label htmlFor="">Enter Goal Exam</label> */}
                  </div>
                </div>
                <div className="addhandwrittennotes-input">
                  <h6>
                    Select Image (Optional)
                  </h6>
                  <div className="input-container">
                    <input
                      {...register("image")}
                      type="file"
                      id="email"
                    />
                    {/* <label htmlFor="">Select Image</label> */}
                  </div>
                </div>

                {/* <div className="addhandwrittennotes-input">
                  <h6>Exam</h6>
                  <div className="input-container">
                    <input {...register("nameExam")} type="text" id="email" />
                    <label htmlFor="">Enter Exam</label>
                  </div>
                </div> */}
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

export default HOC(AddGoalExam);
