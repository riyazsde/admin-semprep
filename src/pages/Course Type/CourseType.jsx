import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";

import { useNavigate } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useForm } from "react-hook-form";
import {
  addCourseType,
  addGoalExam,
  getGoalCategory,
  getGoalExamByGoalCategory,
} from "../../services/exportFunctions";

const CourseType = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [goalExam, setGoalExam] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = () => {
    getGoalCategory({ setIsLoading, setData, params: { limit: 1000 } });
  };
  useEffect(() => {
    getData();
  }, []);

  const selectedGoalCategory = watch("goalCategory");
  useEffect(() => {
    if (selectedGoalCategory) {
      const params = {
        page: 1,
        limit: 1000,
        search: "",
        goalCategoryId: selectedGoalCategory,
      };

      getGoalExamByGoalCategory({ setIsLoading, setData: setGoalExam, params });
    }
  }, [selectedGoalCategory]);

  const onSubmit = (data) => {
    const payload = new FormData();
    payload.append("goal", data.goal);
    payload.append("goalCategory", data.goalCategory);
    payload.append("name", data.name);
    payload.append("desc", data.desc);
    payload.append("status", true);
    payload.append("image", data.image[0]);

    addCourseType({
      data: payload,
      addFun: () => navigate("/course-type"),
    });
  };
  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Course Type</h6>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="studentprofile-container">
            <div className="studyplanner-container">
              <div className="addhandwritten-inputs">
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>
                      Goal Category<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select
                          name=""
                          id=""
                          {...register("goalCategory", { required: true })}
                        >
                          <option value=""> Select University</option>
                          {data?.data?.map((item, index) => (
                            <option key={index} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        {/* <label htmlFor="">Select University</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons">
                        <AiFillPlusCircle onClick={() => setShow(true)} />
                        <MdOutlineRemoveRedEye />
                        <AiFillEdit />
                      </div> */}
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>
                      Courses<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select
                          name=""
                          id=""
                          {...register("goal", { required: true })}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select Courses
                          </option>
                          {goalExam?.data?.map((item, index) => (
                            <option key={index} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        {/* <label htmlFor="">Select Goal Category</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons">
                        <AiFillPlusCircle onClick={() => setShow(true)} />
                        <MdOutlineRemoveRedEye />
                        <AiFillEdit />
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>
                      Course Type<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("name", { required: true })}
                        />
                        {/* <label htmlFor="">Enter course type</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"> */}
                        {/* <AiFillPlusCircle />
                      <MdOutlineRemoveRedEye />
                      <AiFillEdit /> */}
                      {/* </div> */}
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>
                      Description (optional)
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container p-1">
                        <textarea
                          style={{ width: "100%", border:"none", outline:"none" }}
                          id="desc"
                          rows={0}
                          {...register("desc")}
                        />
                        {/* <label htmlFor="">Enter Description</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"> */}
                        {/* <AiFillPlusCircle />
                      <MdOutlineRemoveRedEye />
                      <AiFillEdit /> */}
                      {/* </div> */}
                    </div>
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
              </div>
            </div>
            <div className="addhandwritennotes-submit">
              <div className="handwritten-button">
                <button type="submit">Submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default HOC(CourseType);
