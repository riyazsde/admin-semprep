import { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { AddGoalsExamModal } from "../../components/Modals/Modals";

import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import {
  addTopic,
  getAllSemstersCommon,
  getAllSubjects,
  getAllSubjectsByGoalExam,
  getAllSubSubjects,
  getGoalCategory,
  getGoalExamByGoalCategory
} from "../../services/exportFunctions";

const AddTopic = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const { register, handleSubmit, watch, reset } = useForm();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [goalExam, setGoalExam] = useState([]);
  const [allGoals, setAllGoals] = useState([]);
  const [subject, setSubject] = useState([]);
  const [subSubjects, setSubSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [isSamePage, setIsSamePage] = useState(false);
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

  const subjectId = watch("subject");

  useEffect(() => {
    if (subjectId) {
      const params = {
        page: 1,
        limit: 1000,
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
        limit: 1000,
        search: "",
      };
      if (subjectId) params.subjectId = subjectId;
      if (subSubjectId) params.subSubjectId = subSubjectId;
      getAllSubjectsByGoalExam({ setIsLoading, setData: setChapters, params });
    }
  }, [subjectId, subSubjectId]);

  useEffect(() => {
    if(goalExamId && goalCategory){
     getAllSemstersCommon({ setIsLoading, setData: setSemesters, params: { goal: goalExamId ,goalCategory:goalCategory} });
    }
  }, [goalExamId,goalCategory]);

  const onSubmit = (formData) => {
    const payload = formData;
    if (!payload.subSubject) delete payload.subSubject;
    if (formData?.semester) {
      payload.semester = formData.semester;
    }
    console.log("payload", payload);
    const addFun = () => {
      reset();
      if (!isSamePage) navigate("/topics");
      setIsSamePage(false);
    };

    addTopic({ data: payload, addFun });
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
              Topics /<span> Add Topic</span>
            </p>
          </div>
          <div className="studentprofile-container">
            <div className="studyplanner-container">
              <div className="addhandwritten-inputs">
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>
                      University <span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select
                          {...register("goalCategory", { required: true })}
                        >
                          <option value="">Select University</option>
                          {data?.data?.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        {/* <label htmlFor="">Select Goal</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>
                      Courses<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select {...register("goal", { required: true })}>
                          <option value="">Select Course</option>
                          {allGoals?.data?.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        {/* <label htmlFor="">Select Goal Exam</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input-two-div">
                   <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>Semester<span>*</span></h6>
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
                        {/* <label htmlFor="">Select Semester</label> */}
                      </div>
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{gap:12}}>
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
                        {/* <label htmlFor="">Select Subject</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                 
                </div>
                <div className="addhandwritten-input-two-div">
                   <div className="addhandwritten-input" style={{gap:12}}>
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
                        {/* <label htmlFor="">Enter sub subject</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{gap:12}}>
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
                        {/* <label htmlFor="">Enter Chapter</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input-two-div">
                 
                  <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>Topic Name</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("name", { required: true })}
                        />
                        {/* <label htmlFor="">Enter Topic Name</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{gap:12}}>
                    {/* <h6>Locale</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("language", { required: true })}
                          defaultValue="English"
                        />
                        <label htmlFor="">Enter Language here</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div> */}
                  </div>
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
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default HOC(AddTopic);
