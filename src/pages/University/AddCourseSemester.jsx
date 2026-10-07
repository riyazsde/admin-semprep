import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import HOC from "../../components/HOC/HOC";
import {
  addSemester,
  addSemesterCourse,
  getAllEducatorNotes,
  getAllHandwrittenNotes,
  getAllSemsters,
  getAllSubjects,
  getAllSubjectsByGoalExam,
  getAllSubSubjects,
  getAllVideos,
  getGoalCategory,
  getGoalExamByGoalCategory,
  getStudyPlannerPlans,
  getTopicsByChapter,
} from "../../services/exportFunctions";
import FormComponent from "../../services/StudyPlannerFormComponent";

const AddCourseSemester = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const { register, handleSubmit, watch, reset, setValue } = useForm();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [goalExam, setGoalExam] = useState([]);
  const [allGoals, setAllGoals] = useState([]);
  const [subject, setSubject] = useState([]);
  const [subSubjects, setSubSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [courseCategory, setCourseCategory] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isSamePage, setIsSamePage] = useState(false);
  const [handwrittennotes, setHandwrittenNotes] = useState([]);
  const [educatorNotes, setEducatorNotes] = useState([]);
  const [studyplannerStudyPlans, setStudyplannerStudyPlans] = useState([]);
  const [videoData, setVideoData] = useState({});
  const [formSubjects, setFormSubjects] = useState([]);
  const [testSeries, setTestSeries] = useState([]);
  const [testSeriesSearch, setTestSeriesSearch] = useState("");
  const { id, semId ,courseId} = useParams();
  const fetchTestSeries = async (inputValue) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}admin/test-series`,
        {
          params: { search: inputValue, limit: 40 },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response?.data?.data?.map((item) => ({
        value: item._id,
        label: item.bundleName,
      }));
    } catch (error) {
      console.error("Error fetching test series:", error);
      return [];
    }
  };

  const [selectedTestSeries, setSelectedTestSeries] = useState([]);

  useEffect(() => {
    getStudyPlannerPlans({
      setIsLoading,
      setData: setStudyplannerStudyPlans,
    });
    getAllSemsters({ setIsLoading, setData: setCourseCategory });
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
      getAllVideos({
        setIsLoading,
        setData: (data) => console.log(data?.data?.[0]),
        params,
      });
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

  const onSubmit = async (data) => {
    // if (!data.image) {
    //   showNotification({
    //     type: "error",
    //     message: "Please upload an image",
    //   });
    //   return;
    // }

    try {
      // const imageUrl = await uploadImage({ data: data.image?.[0] });

      const payload = {
        // courseImage: imageUrl,
        subjects: formSubjects,
        goalCategory: data.goalCategory,
        goal: data.goal,
        semester: semId,
        title: data.title,
        count: data.count,
        // description: data.description,
        price: data.price,
        duration: data.duration,
        lessons: data.lessons,
        weeks: data.weeks,
        approvalStatus: "approved",
        courseType: "Paid",
        totalRating: data.totalRating,
        language: data.language,
        // testSeries: selectedTestSeries?.map((item) => item.value) || [],
      };

      addSemesterCourse({
        data: payload,
        addFun: () =>
          navigate(`/university/${id}/${courseId}/${semId}/semester-courses`),
      });
      return;
    } catch (error) {}
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dashboardcontainer">
          <div className="dashboardcontainer-header">
            <h6>Semester Courses</h6>
            <p>
              <GoArrowLeft
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              University / Semester / <span> Add Semester Course</span>
            </p>
          </div>
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
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div>
                </div>

                <FormComponent
                  goalCategory={goalCategory}
                  goalExamId={goalExamId}
                  setFormSubjects={setFormSubjects}
                />

                <div className="addhandwritten-input-two-div">
                  {/* <div className="addhandwritten-input">
                    <h6>
                      Semester<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select {...register("courseCategoryId")}>
                          <option value="">Select Semester Here</option>
                          {courseCategory?.length > 0 &&
                            courseCategory?.map((item) => (
                              <option key={item.id} value={item._id}>
                                {item?.semesterNumber}
                              </option>
                            ))}
                        </select>
                        <label htmlFor="">Select Semester here</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div> */}
                  <div className="addhandwritten-input">
                    <h6>Title</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("title", { required: true })}
                        />
                        <label htmlFor="">Enter Title here</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-inputs-div">
                  <div className="addhandwritten-input">
                    <h6>Price</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="number"
                          {...register("price", { required: true })}
                        />
                        <label htmlFor="">Enter Price here</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div>
                  <div className="addhandwritten-input">
                    <h6>Duration (hr)</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("duration", { required: true })}
                        />
                        <label htmlFor="">Enter Duration in text</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-inputs-div">
                  <div className="addhandwritten-input">
                    <h6>Lessons</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("lessons", { required: true })}
                        />
                        <label htmlFor="">Enter Lessons here</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div>
                  <div className="addhandwritten-input">
                    <h6>Language</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("language", { required: true })}
                          defaultValue={"English"}
                        />
                        <label htmlFor="">Enter Language Here</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div>
                  {/* <div className="addhandwritten-input">
                    <h6>Weeks</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="number"
                          {...register("weeks", { required: true })}
                        />
                        <label htmlFor="">Enter Weeks</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div> */}
                </div>
                <div className="addhandwritten-inputs-div">
                  {/* <div className="addhandwritten-input">
                    <h6>Course Type</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select
                          {...register("courseType")}
                          defaultValue={"Paid"}
                        >
                          <option value="Free">Free</option>
                          <option value="Paid">Paid</option>
                        </select>
                        <label htmlFor="">Enter Course Type here</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div> */}
                  {/* <div className="addhandwritten-input">
                    <h6>Rating</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("totalRating", {
                            required: true,
                            value: 0,
                            min: 0,
                            max: 5,
                          })}
                        />
                        <label htmlFor="">Enter Total Rating</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div> */}
                  {/* <div className="addhandwritten-input">
                    <h6>Course Image</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="file"
                          {...register("image", { required: true })}
                        />
                        <label htmlFor="">Choose Image</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div> */}
                </div>
                <div className="addhandwritten-inputs-div">
                  {/* <div className="addhandwritten-input">
                    <h6>Count</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="number"
                          {...register("count", { required: true })}
                        />
                        <label htmlFor="">Enter Count Here</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div> */}
                </div>
                <div className="addhandwritten-inputs-div">
                  {/* <div className="addhandwritten-input">
                    <h6>Course Description</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("description", { required: true })}
                        />
                        <label htmlFor="">Enter Description</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            {/* <div className="addhandwritten-input">
              <h6>Main Test Series</h6>
              <div className="addhandwritten-inputs-div">
                <div className="input-container">
                  <AsyncSelect
                    isMulti
                    cacheOptions
                    defaultOptions
                    loadOptions={fetchTestSeries}
                    onChange={(options) => {
                      setSelectedTestSeries(options);
                      setValue(
                        "testSeries",
                        options ? options.map((option) => option.value) : []
                      );
                    }}
                    placeholder="Select Test Series"
                  />
                </div>
                <div className="addhandwritten-inputs-icons"></div>
              </div>
            </div> */}
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

export default HOC(AddCourseSemester);
