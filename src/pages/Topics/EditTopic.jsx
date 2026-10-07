import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { AddGoalsExamModal } from "../../components/Modals/Modals";

import { GoArrowLeft } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useForm } from "react-hook-form";
import {
  addChapter,
  addTopic,
  editTopic,
  getAllChapters,
  getAllSubjects,
  getAllSubjectsByGoalExam,
  getAllSubSubjects,
  getGoalCategory,
  getGoalExamByGoalCategory,
  getTopicById,
} from "../../services/exportFunctions";

const EditTopic = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const { register, handleSubmit, watch, reset } = useForm();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [goalExam, setGoalExam] = useState([]);
  const [allGoals, setAllGoals] = useState([]);
  const [subject, setSubject] = useState([]);
  const [subSubjects, setSubSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [isSamePage, setIsSamePage] = useState(false);

  useEffect(() => {
    getGoalCategory({ setIsLoading, setData ,params:{limit:1000}});
    getTopicById({
      id,
      setIsLoading,
      setData: (res) => {
        reset({
         name: res?.data?.name,
         language: res?.data?.language,
        });
      },
    });
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

  useEffect(() => {
    if (goalExamId) {
      const params = {
        page: 1,
        limit: 1000,
        search: "",
        goalCategory,
        goalId: goalExamId,
      };
      getAllSubjects({ setIsLoading, setData: setSubject, params });
    }
  }, [goalExamId]);

  const subjectId = watch("subject");

  useEffect(() => {
    if (subjectId) {
      const params = {
        page: 1,
        limit: 100,
        search: "",
        subjectId,
      };
      getAllSubSubjects({ setIsLoading, setData: setSubSubjects, params });
    }
  }, [subjectId]);

  const subSubjectId = watch("subSubject");

  useEffect(() => {
    console.log("subjectId", subjectId, "subSubjectId", subSubjectId);
    if (subjectId || subSubjectId) {
      const params = {
        page: 1,
        limit: 100,
        search: "",
      };
      if (subjectId) params.subjectId = subjectId;
      if (subSubjectId) params.subSubjectId = subSubjectId;
      getAllSubjectsByGoalExam({ setIsLoading, setData: setChapters, params });
    }
  }, [subjectId, subSubjectId]);

  const onSubmit = (formData) => {
    const payload = formData;
    if (!payload.subSubject) delete payload.subSubject;
    console.log("payload", payload);
    const addFun = () => {
      reset();
      if (!isSamePage) navigate("/topics");
      setIsSamePage(false);
    };

    editTopic({ data: payload, addFun, id });
  };

  return (
    <>
      <AddGoalsExamModal
        show={show}
        onHide={() => setShow(false)}
        topic={true}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dashboardcontainer">
          <div className="dashboardcontainer-header">
            <h6>Topics</h6>
            <p>
              <GoArrowLeft
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              Topics /<span> Edit Topic</span>
            </p>
          </div>
          <div className="studentprofile-container">
            <div className="studyplanner-container">
              <div className="addhandwritten-inputs">
                <div className="addhandwritten-input-two-div">
                  {/* <div className="addhandwritten-input">
                    <h6>
                      Goal <span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select
                          {...register("goalCategory", { required: true })}
                        >
                          <option value="">Select Goal</option>
                          {data?.data?.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="">Select Goal</label>
                      </div>
                      <div className="addhandwritten-inputs-icons">
                       
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="addhandwritten-input">
                    <h6>
                      Goal Exam<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select {...register("goal", { required: true })}>
                          <option value="">Select Goal Exam</option>
                          {allGoals?.data?.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="">Select Goal Exam</label>
                      </div>
                      <div className="addhandwritten-inputs-icons">
                    
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="addhandwritten-input-two-div">
                  {/* <div className="addhandwritten-input">
                    <h6>
                      Subject<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select {...register("subject", { required: true })}>
                          <option value="">Select Subject</option>
                          {subject?.data?.map((item) => (
                            <option key={item.id} value={item._id}>
                              {item?.name}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="">Select Subject</label>
                      </div>
                      <div className="addhandwritten-inputs-icons">
                        
                      </div>
                    </div>
                  </div>
                  <div className="addhandwritten-input">
                    <h6>Sub Subjects (Optional)</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select {...register("subSubject")}>
                          <option value="">Select Sub Subject</option>
                          {subSubjects?.data?.map((item) => (
                            <option key={item.id} value={item._id}>
                              {item?.name}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="">Enter sub subject</label>
                      </div>
                      <div className="addhandwritten-inputs-icons">
                       
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="addhandwritten-input-two-div">
                  {/* <div className="addhandwritten-input">
                    <h6>
                      Chapter <span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select {...register("chapter", { required: true })}>
                          <option value="">Select Chapter</option>
                          {chapters?.data?.map((item) => (
                            <option key={item.id} value={item._id}>
                              {item?.name}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="">Enter Chapter</label>
                      </div>
                      <div className="addhandwritten-inputs-icons">
                       
                      </div>
                    </div>
                  </div> */}
                  <div className="addhandwritten-input">
                    <h6>Topic Name</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("name", { required: true })}
                        />
                        <label htmlFor="">Enter Topic Name</label>
                      </div>
                      <div className="addhandwritten-inputs-icons">
                        {/* <AiFillPlusCircle />
                      <MdOutlineRemoveRedEye />
                      <AiFillEdit /> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input">
                    <h6>Locale</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("language", { required: true })}
                          defaultValue="English"
                        />
                        <label htmlFor="">Enter Language here</label>
                      </div>
                      <div className="addhandwritten-inputs-icons">
                        {/* <AiFillPlusCircle />
                        <MdOutlineRemoveRedEye />
                        <AiFillEdit /> */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="addhandwritten-input">
                  <h6>Updated by</h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <select name="" id="">
                        <option value=""></option>
                      </select>
                      <label htmlFor="">Select</label>
                    </div>
                    <div className="addhandwritten-inputs-icons">
                      <AiFillPlusCircle />
                      <MdOutlineRemoveRedEye />
                      <AiFillEdit />
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
            <div className="addhandwritennotes-submit">
              <div className="handwritten-button">
                <button type="submit">Save</button>
              </div>
              {/* <div className="handwritten-button-addnote">
                <button onClick={() => setIsSamePage(true)} type="submit">
                  Save and add another
                </button>
              </div> */}
              {/* <div className="handwritten-button-addnote">
                <button onClick={() => navigate("/subjects")}>
                  Save and continue
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default HOC(EditTopic);
