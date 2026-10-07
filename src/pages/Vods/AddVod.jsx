import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";

import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useForm } from "react-hook-form";
import {
  addTopic,
  addVideo,
  getAllEducatorNotes,
  getAllHandwrittenNotes,
  getAllPracticeQuestions,
  getAllSubjects,
  getAllSubjectsByGoalExam,
  getAllSubSubjects,
  getAllTestSeries,
  getAllTopics,
  getGoalCategory,
  getGoalExamByGoalCategory,
  getTopicsByChapter,
  getAllSemstersCommon,
} from "../../services/exportFunctions";

const AddVod = () => {
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
  const [topics, setTopics] = useState([]);
  const [isSamePage, setIsSamePage] = useState(false);
  const [handwrittennotes, setHandwrittenNotes] = useState([]);
  const [educatorNotes, setEducatorNotes] = useState([]);
  const [practiceQuestions, setPracticeQuestions] = useState([]);
  const [testSeries, setTestSeries] = useState([]);
  const [semesters, setSemesters] = useState([]);



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
        goalCategory,
        goalId: goalExamId,
      };
       const paramsSub = {
        page: 1,
           limit: 1000,
        search: "",
        goalCategoryId:goalCategory,
        goalId: goalExamId,
        semesterId:watchSemester
      };
      getAllTestSeries({ setIsLoading, setData: setTestSeries, params });
      getAllPracticeQuestions({
        setIsLoading,
        setData: setPracticeQuestions,
        params,
      });
      getAllSubjects({ setIsLoading, setData: setSubject, params: paramsSub });
    }
  }, [goalExamId, goalCategory,watchSemester]);

      useEffect(() => {
    if (goalExamId && goalCategory) {
      getAllSemstersCommon({
        setIsLoading,
        setData: setSemesters,
        params: {
          limit: 1000,
          goalCategory: goalCategory,
          goal: goalExamId,
        },
      });
    }
  }, [goalCategory, goalExamId]);

  useEffect(() => {
    getGoalCategory({ setIsLoading, setData, params: { limit: 1000 } });
    // getAllSemstersCommon({ setIsLoading, setData: setSemesters });
  }, []);

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

  const chapterId = watch("chapter");

  useEffect(() => {
    if (chapterId) {
      const params = {
        page: 1,
        limit: 1000,
        search: "",
        chapterId,
      };
      getTopicsByChapter({ setIsLoading, setData: setTopics, params });
    }
  }, [chapterId]);

  useEffect(() => {
    getAllHandwrittenNotes({
      setIsLoading,
      setData: setHandwrittenNotes,
      params: { limit: 3000 },
    });
  }, []);

  useEffect(() => {
    getAllEducatorNotes({
      setIsLoading,
      setData: setEducatorNotes,
      params: { limit: 3000 },
    });
  }, []);

  const onSubmit = (formData) => {
    const payload = formData;

    if (!payload.subSubject) delete payload.subSubject;
    payload.handwrittenNotes = [payload.handwrittenNotes];
    payload.educatorNotes = [payload.educatorNotes];
    payload.testSeries = [payload.testSeries];
    payload.practiceQuestions = [payload.practiceQuestions];

    const addFun = () => {
      reset();
      if (!isSamePage) navigate("/vods");
      setIsSamePage(false);
    };

    addVideo({ data: payload, addFun });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dashboardcontainer">
          <div className="dashboardcontainer-header">
            <h6>Videos</h6>
            <p>
              <GoArrowLeft
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              Videos /<span> Add Video</span>
            </p>
          </div>
          <div className="studentprofile-container">
            <div className="studyplanner-container">
              <div className="addhandwritten-inputs">
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input" style={{gap: "12px"}}>
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
                        {/* <label htmlFor="">Select University</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{gap: "12px"}}>
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
                   <div className="addhandwritten-input" style={{gap: "12px"}}>
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
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{gap: "12px"}}>
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
                  <div className="addhandwritten-input" style={{gap: "12px"}}>
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
                  <div className="addhandwritten-input" style={{gap: "12px"}}>
                    <h6>
                      Chapter<span>*</span>
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
                  <div className="addhandwritten-input" style={{gap: "12px"}}>
                    <h6>
                      Topic<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select {...register("topic", { required: true })}>
                          <option value="">Select Topic</option>
                          {topics?.data?.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item?.name}
                            </option>
                          ))}
                        </select>
                        {/* <label htmlFor="">Select Topic</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{gap: "12px"}}>
                    <h6>
                      Video Name<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("videoName", { required: true })}
                        />
                        {/* <label htmlFor="">Enter Video Name here</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input" style={{gap: "12px"}}>
                    <h6>
                      Duration of the Video<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="number"
                          {...register("videoDuration", { required: true })}
                        />
                        {/* <label htmlFor="">Enter Duration in min</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{gap: "12px"}}>
                    <h6>
                      Video Link<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("videoLink", { required: true })}
                        />
                        {/* <label htmlFor="">Enter Link here</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input" style={{gap: "12px"}}>
                    <h6>Handwritten Notes (Optional)</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select {...register("handwrittenNotes")}>
                          <option value="">Select Handwritten Notes</option>
                          {handwrittennotes?.data?.map((item) => (
                            <option key={item.id} value={item._id}>
                              {item?.bundleName}
                            </option>
                          ))}
                        </select>
                        {/* <label htmlFor="">Select handwritten notes</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{gap: "12px"}}>
                    <h6>
                      Educator Name (Optional)
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select {...register("educatorName")}>
                          <option value="">Select Educator</option>
                          {educatorNotes?.data?.map((item) => (
                            <option key={item.id} value={item._id}>
                              {item?.name}
                            </option>
                          ))}
                        </select>
                        {/* <label htmlFor="">Enter Name here</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input" style={{gap: "12px"}}>
                    <h6>
                      Educator Notes (Optional)
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("educatorNotes")}
                        />
                        {/* <label htmlFor="">Upload educator notes Link</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{gap: "12px"}}>
                    <h6>
                      Test Series (Optional)
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select {...register("testSeries")}>
                          <option value="">Select Test Series</option>
                          {testSeries?.data?.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item?.bundleName}
                            </option>
                          ))}
                        </select>
                        {/* <label htmlFor="">Select Test Series</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
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
        </div>
      </form>
    </>
  );
};

export default HOC(AddVod);
