import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import AsyncSelect from "react-select/async";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useForm, useFieldArray } from "react-hook-form";
import { uploadImage } from "../../services/otherFunction";
import {
  addCapsuleCourse,
  addCourse,
  addStudyPlannerCourse,
  addTopic,
  addVideo,
  getAllEducatorNotes,
  getAllHandwrittenNotes,
  getAllSubjects,
  getAllSubjectsByGoalExam,
  getAllSubSubjects,
  getAllTestSeries,
  getAllTopics,
  getAllVideos,
  getDashboardCoursePageContent,
  getGoalCategory,
  getGoalExamByGoalCategory,
  getStudyPlannerPlans,
  getTopicsByChapter,
} from "../../services/exportFunctions";
import FormComponent from "../../services/StudyPlannerFormComponent";
import { showNotification } from "../../services/exportComponents";
import axios from "axios";

const AddSkill = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const { register, handleSubmit, watch, reset, setValue, control } = useForm({
    defaultValues: {
      whatYouWillLearn: [],
    },
  });
  const {
    fields: whatYouWillLearnFields,
    append: appendWhatYouWillLearn,
    remove: removeWhatYouWillLearn,
  } = useFieldArray({
    control,
    name: "whatYouWillLearn",
  });

  const {
    fields: endOfCoursePointsFields,
    append: appendEndOfCoursePoints,
    remove: removeEndOfCoursePoints,
  } = useFieldArray({
    control,
    name: "endOfCoursePoints",
  });
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
  const fetchTestSeries = async (inputValue) => {

    // if (inputValue.length < 3) return [];
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
    getDashboardCoursePageContent({ setIsLoading, setData: setCourseCategory });
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
      const imageUrl = await uploadImage({ data: data.image?.[0] });

      const payload = {
        // courseImage: imageUrl,
        subjects: formSubjects,
        goalCategory: data.goalCategory,
        goal: data.goal,
        // courseCategoryId: data.courseCategoryId,
        name: data.title,
        numberOfCourses: data.numberOfCourses,
        // description: data.description,
        price: data.price,
        duration: data.duration,
        courseHighlights: data.courseHighlights,
        weeks: data.weeks,
        // courseType: data.courseType,
        whatYouWillLearn: data.whatYouWillLearn,
        endOfCoursePoints: data.endOfCoursePoints,

        totalRating: data.totalRating,
        locale: data.language,
        // testSeries: selectedTestSeries?.map((item) => item.value) || [],
      };

      addCapsuleCourse({
        setIsLoading,
        data: payload,
        addFun: () => navigate("/dashboard/skills"),
      });


    } catch (error) {
      console.error("Error resolving image promise:", error);
      showNotification({
        type: "error",
        message: "Failed to upload image or create payload.",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dashboardcontainer">
          <div className="dashboardcontainer-header">
            <h6>Skill</h6>
            <p>
              <GoArrowLeft
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/dashboard/skills`)}
              />
             Skill Page /<span> Add Skill</span>
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
                      {/* <div className="addhandwritten-inputs-icons"> */}
                        {/* <AiFillPlusCircle onClick={() => setShow(true)} />
                      <MdOutlineRemoveRedEye />
                      <AiFillEdit /> */}
                      {/* </div> */}
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>
                      Course<span>*</span>
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

                <FormComponent
                  goalCategory={goalCategory}
                  goalExamId={goalExamId}
                  setFormSubjects={setFormSubjects}
                />

                <div className="addhandwritten-input-two-div">
                  {/* <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>
                      Course Category<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select {...register("courseCategoryId")}>
                          <option value="">Select Course Category</option>
                          {courseCategory?.map((item) => (
                            <option key={item.id} value={item._id}>
                              {item?.name}
                            </option>
                          ))}
                        </select>
                        // <label htmlFor="">Enter Study Plan here</label>
                      </div>
                      // <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div> */}
                  <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>Number of Courses</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="number"
                          {...register("numberOfCourses", { required: true })}
                        />
                        {/* <label htmlFor="">Enter Number of Courses</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>Name</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("title", { required: true })}
                        />
                        {/* <label htmlFor="">Enter Title here</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-inputs-div">
                  <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>Price</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="number"
                          {...register("price", { required: true })}
                        />
                        {/* <label htmlFor="">Enter Price here</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>Duration (Min)</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("duration", { required: true })}
                        />
                        {/* <label htmlFor="">Enter Duration here</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-inputs-div">
                  <div className="addhandwritten-input" style={{gap:12}}>
                    <h6> Highlights</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("courseHighlights", { required: true })}
                        />
                        {/* <label htmlFor="">Enter Course Highlights</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>Overview Points</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("overviewPoints", { required: true })}
                        />
                        {/* <label htmlFor="">Enter Overview Points</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-inputs-div">
                  {/* <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>Course Description</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("description", { required: true })}
                        />
                        // <label htmlFor="">Enter Description</label>
                      </div>
                      // <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div> */}
                  <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>Image Url</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("language", { required: true })}
                        />
                        {/* <label htmlFor="">Enter Image Url Here</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                </div>
                {/* <div className="addhandwritten-input" style={{gap:12}}>
                  <h6>What You Will Learn</h6>
                  {whatYouWillLearnFields.map((field, index) => (
                    <div className="addhandwritten-inputs-div">
                      <div key={field.id} className="input-container">
                        <input
                          type="text"
                          {...register(`whatYouWillLearn.${index}`, {
                            required: true,
                          })}
                          defaultValue={field}
                        />
                        // <label htmlFor="">Enter What You Will Learn Here</label>
                        <button
                          type="button"
                          onClick={() => removeWhatYouWillLearn(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-button"
                    onClick={() => appendWhatYouWillLearn("")}
                  >
                    Add
                  </button>
                </div> */}

                {/* End of Course Points Section */}
                {/* <div className="addhandwritten-input" style={{gap:12}}>
                  <h6>End of Course Points</h6>
                  {endOfCoursePointsFields.map((field, index) => (
                    <div className="addhandwritten-inputs-div">
                      <div key={field.id} className="input-container">
                        <input
                          type="text"
                          {...register(`endOfCoursePoints.${index}`, {
                            required: true,
                          })}
                          defaultValue={field}
                        />
                        // <label htmlFor="">Enter End of Course Point Here</label>
                        <button
                          type="button"
                          onClick={() => removeEndOfCoursePoints(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-button"
                    onClick={() => appendEndOfCoursePoints("")}
                  >
                    Add
                  </button>
                </div> */}
                <div className="addhandwritten-inputs-div"></div>
              </div>
            </div>
            {/* <div className="addhandwritten-input" style={{gap:12}}>
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
                // <div className="addhandwritten-inputs-icons"></div>
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

export default HOC(AddSkill);
