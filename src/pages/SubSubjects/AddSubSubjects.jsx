import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { AddGoalsExamModal } from "../../components/Modals/Modals";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useForm } from "react-hook-form";
import {
  addSubSubject,
  getAllSubjects,
  getGoalCategory,
  getGoalExamByGoalCategory,
  getAllSemstersCommon,
} from "../../services/exportFunctions";

const AddSubSubjects = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { register, handleSubmit, watch,getValues } = useForm();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allGoals, setAllGoals] = useState([]);
  const [subject, setSubject] = useState([]);
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    getGoalCategory({ setIsLoading, setData, params: { limit: 1000 } });
  }, []);

  const goalCategory = watch("goalCategory");

  useEffect(() => {
    if (goalCategory) {
      const params = {
        page: 1,
        limit: 1000,
        search: "",
        goalCategoryId: goalCategory,
      };
      getGoalExamByGoalCategory({ setIsLoading, setData: setAllGoals, params });
    }
  }, [goalCategory]);

  const goalExamId = watch("goal");
  
const watchSemester=watch("semester");
  useEffect(() => {
    if (goalExamId) {
      const params = {
        page: 1,
        limit: 1000,
        search: "",
        goalCategoryId:goalCategory,
        goalId: goalExamId,
        semesterId:watchSemester
      };
      getAllSubjects({ setIsLoading, setData: setSubject, params });
    }
  }, [goalExamId, goalCategory,watchSemester]);

  useEffect(() => {
    if(goalExamId && goalCategory){
      getAllSemstersCommon({ setIsLoading, setData: setSemesters ,params:{limit:1000,goalCategory,goal:goalExamId}});
    }
  }, [goalExamId,goalCategory]);

  const onSubmit = (formData) => {
    const payload = {
      name: formData.name,
      subject: formData.subject,
      goal: formData.goal,
      goalCategory: formData.goalCategory,
      description: "a",
    };

    if (formData?.semester) {
      payload.semester = formData.semester;
    }

    addSubSubject({
      data: payload,
      setShowModal: setShow,
      addFun: () => navigate("/subsubjects"),
    });
  };

  return (
    <>
      <AddGoalsExamModal show={show} onHide={() => setShow(false)} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dashboardcontainer">
          <div className="dashboardcontainer-header">
            <h6>Sub-Subjects</h6>
            <p>
              <GoArrowLeft
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              Sub-Subjects /<span> Add Sub-Subject</span>
            </p>
          </div>
          <div className="studentprofile-container">
            <div className="studyplanner-container">
              <div className="addhandwritten-inputs">
               <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>
                      University<span>*</span>
                    </h6>
                    <div className="input-container">
                      <select {...register("goalCategory")}>
                        <option value="">Select University</option>
                        {data?.data?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>
                      Course<span>*</span>
                    </h6>
                    <div className="input-container">
                      <select {...register("goal")}>
                        <option value="">Select Course</option>
                        {allGoals?.data?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
               </div>

               <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>Semester <span>*</span></h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select {...register("semester")} defaultValue="">
                          <option value="">Select Semester</option>
                          {semesters?.data?.map((sem) => (
                            <option key={sem._id} value={sem._id}>
                              {sem.semesterNumber
                                ? `Semester ${sem.semesterNumber}`
                                : sem.name || sem._id}
                            </option>
                          ))}
                        </select>
                        {/* <label htmlFor="">Select</label> */}
                      </div>
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>
                      Subject<span>*</span>
                    </h6>
                    <div className="input-container">
                      <select {...register("subject")}>
                        <option value="">Select Subject</option>
                        {subject?.data?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="addhandwritten-input-two-div">
                  
                  <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>
                      Sub-Subject Name<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("name", { required: true })}
                        />
                        {/* <label htmlFor="">Sub-Subject Name</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons" /> */}
                    </div>
                  </div>
                </div>

             

                
              </div>
            </div>

            <div className="addhandwritennotes-submit">
              <div className="handwritten-button">
                <button type="submit">Save</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default HOC(AddSubSubjects);
