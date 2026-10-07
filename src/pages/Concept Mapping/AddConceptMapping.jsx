import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { AddGoalsExamModal } from "../../components/Modals/Modals";

import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import {
  addConceptMapping,
  addVideo,
  getAllEducatorNotes,
  getAllHandwrittenNotes,
  getAllPracticeQuestions,
  getAllPYQs,
  getAllSubjects,
  getAllSubjectsByGoalExam,
  getAllSubSubjects,
  getAllTestSeries,
  getAllVideos,
  getGoalCategory,
  getGoalExamByGoalCategory,
  getTopicsByChapter,
  getVideoById,
} from "../../services/exportFunctions";
import { useForm } from "react-hook-form";

const AddConceptMapping = () => {
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
  const [allVideos, setAllVideos] = useState([]);
  const [isSamePage, setIsSamePage] = useState(false);
  const [handwrittennotes, setHandwrittenNotes] = useState([]);
  const [educatorNotes, setEducatorNotes] = useState([]);
  const [testSeries, setTestSeries] = useState([]);
  const [allPracticeQuestions, setAllPracticeQuestions] = useState([]);
  const [allPYQ, setAllPYQ] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoData, setVideoData] = useState({});

  useEffect(() => {
    getGoalCategory({ setIsLoading, setData });
  }, []);

  const goalCategory = watch("goalCategory");

  useEffect(() => {
    if (goalCategory) {
      const params = {
        page: 1,
        limit: 100,
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
        limit: 100,
        search: "",
        goalCategory,
        goalId: goalExamId,
      };
      const testParams = {
        page: 1,
        limit: 100,
        search: "",
        goalCategory,
        goal: goalExamId,
      };

      getAllPracticeQuestions({
        setIsLoading,
        setData: setAllPracticeQuestions,
        params: testParams,
      });
      getAllPYQs({ setIsLoading, setData: setAllPYQ, params: testParams });

      getAllTestSeries({
        setIsLoading,
        setData: setTestSeries,
        params: testParams,
      });
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

  const chapterId = watch("chapter");

  useEffect(() => {
    if (chapterId) {
      const params = {
        page: 1,
        limit: 100,
        search: "",
        chapterId,
      };
      getTopicsByChapter({ setIsLoading, setData: setTopics, params });
    }
  }, [chapterId]);

  const topicId = watch("topic");

  useEffect(() => {
    if (topicId) {
      const params = {
        page: 1,
        limit: 100,
        search: "",
        topicId,
      };
      getAllVideos({ setIsLoading, setData: setAllVideos, params });
    }
  }, [topicId]);

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

  const videoId = watch("vods");

  useEffect(() => {
    if (videoId) {
      getVideoById({ setIsLoading, setData: setSelectedVideo, id: videoId });
    }
  }, [videoId]);

  const onSubmit = (formData) => {
    const payload = formData;
    const userId = localStorage.getItem("userId");
    if (!payload.subSubject) delete payload.subSubject;
    payload.handwrittenNotes = [payload.handwrittenNotes];
    payload.educatorNotes = [payload.educatorNotes];
    payload.practiceQuestions = [payload.practiceQuestions];
    payload.vods = [payload.vods];
    payload.updatedBy = userId;

    const addFun = () => {
      reset();
      if (!isSamePage) navigate("/concept-mapping");
      setIsSamePage(false);
    };

    addConceptMapping({ data: payload, addFun });
  };
  return (
    <>
      <AddGoalsExamModal
        show={show}
        onHide={() => setShow(false)}
        topic={true}
      />
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Concept Mapping</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Concept Mapping /<span> Add Concept Mapping</span>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="studentprofile-container">
            <div className="studyplanner-container">
              <div className="addhandwritten-inputs">
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input">
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
                        {/* <AiFillPlusCircle onClick={() => setShow(true)} />
                      <MdOutlineRemoveRedEye />
                      <AiFillEdit /> */}
                      </div>
                    </div>
                  </div>
                  <div className="addhandwritten-input">
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
                        {/* <AiFillPlusCircle onClick={() => setShow(true)} />
                      <MdOutlineRemoveRedEye />
                      <AiFillEdit /> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input">
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
                        {/* <AiFillPlusCircle />
                      <MdOutlineRemoveRedEye />
                      <AiFillEdit /> */}
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
                        {/* <AiFillPlusCircle /> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input">
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
                        <label htmlFor="">Enter Chapter</label>
                      </div>
                      <div className="addhandwritten-inputs-icons">
                        {/* <AiFillPlusCircle />
                      <MdOutlineRemoveRedEye />
                      <AiFillEdit /> */}
                      </div>
                    </div>
                  </div>
                  <div className="addhandwritten-input">
                    <h6>Topic</h6>
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
                        <label htmlFor="">Select Topic</label>
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
                          {...register("locale", { required: true })}
                          defaultValue={"English"}
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
                  <div className="addhandwritten-input">
                    <h6>Vods</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select {...register("vods", { required: true })}>
                          <option value="">Select Vods</option>
                          {allVideos?.data?.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item?.videoName}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="">Select vods</label>
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
                    <h6>Test Series</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select {...register("testSeries")}>
                          <option value="">Select Test Series</option>
                          {testSeries?.data?.map((item) => (
                            <option key={item.id} value={item._id}>
                              {item?.bundleName}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="">Select test series</label>
                      </div>
                      <div className="addhandwritten-inputs-icons">
                        {/* <AiFillPlusCircle />
                                            <MdOutlineRemoveRedEye />
                                            <AiFillEdit /> */}
                      </div>
                    </div>
                  </div>
                  <div className="addhandwritten-input">
                    <h6>Previous Year Questions</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select {...register("previousYearQuestions")}>
                          <option value="">
                            Select Previous Year Questions
                          </option>
                          {allPYQ?.data?.map((item) => (
                            <option key={item.id} value={item._id}>
                              {item?.bundleName}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="">Select previous year questions</label>
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
                    <h6>Practice Questions</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select {...register("practiceQuestions")}>
                          <option value="">
                            Select Previous Year Questions
                          </option>
                          {allPracticeQuestions?.data?.map((item) => (
                            <option key={item.id} value={item._id}>
                              {item?.bundleName}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="">Select practice questions</label>
                      </div>
                      <div className="addhandwritten-inputs-icons">
                        {/* <AiFillPlusCircle />
                      <MdOutlineRemoveRedEye />
                      <AiFillEdit /> */}
                      </div>
                    </div>
                  </div>
                  <div className="addhandwritten-input">
                    <h6>Educator Name</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          value={selectedVideo?.educatorName?.name || ""}
                          disabled
                        />
                        {/* <label htmlFor="">Enter educator name</label> */}
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
                    <h6>Educator Notes</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select {...register("educatorNotes")}>
                          {selectedVideo?.educatorNotes?.map((item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                        <label htmlFor=""> Select Educator Notes</label>{" "}
                      </div>
                      <div className="addhandwritten-inputs-icons">
                        {/* <AiFillPlusCircle />
                      <MdOutlineRemoveRedEye />
                      <AiFillEdit /> */}
                      </div>
                    </div>
                  </div>
                  <div className="addhandwritten-input">
                    <h6>Concept Mapping Name</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("conceptMappingName")}
                        />
                        <label htmlFor="">Enter Name here</label>
                      </div>
                      <div className="addhandwritten-inputs-icons">
                        {/* <AiFillPlusCircle />
                      <MdOutlineRemoveRedEye />
                      <AiFillEdit /> */}
                      </div>
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
        </form>
      </div>
    </>
  );
};

export default HOC(AddConceptMapping);
