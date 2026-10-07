import { TableModal } from "../../components/Modals/Modals";
import { useNavigate } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { SlCloudUpload } from "react-icons/sl";
import { GoArrowLeft } from "react-icons/go";
import { useForm } from "react-hook-form";
import {
  addPracticeQuestion,
  addTestSeries,
  getAllSubjects,
  getAllSubjectsByGoalExam,
  getAllSubSubjects,
  getGoalCategory,
  getGoalExamByGoalCategory,
  getTopicsByChapter,
} from "../../services/exportFunctions";
import { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import TestFormComponent from "../../services/TestSeriesFormComponent";
import { uploadImage } from "../../services/otherFunction";
import TestSeriesFormComponentMain from "../../services/TestSeriesFormComponentMain";

const AddPracticeQuestions = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const toggle = () => setShow(!show);
  const { register, handleSubmit, watch, reset } = useForm();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [goalExam, setGoalExam] = useState([]);
  const [allGoals, setAllGoals] = useState([]);
  const [subject, setSubject] = useState([]);
  const [subSubjects, setSubSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [topics, setTopics] = useState([]);
  const [mockTestInstructionFile, setMockTestInstructionFile] = useState(null);
  const [mockTestTestSeriesFile, setMockTestTestSeriesFile] = useState(null);
  const [formData, setFormData] = useState([]);
  const [tileImageUrl, setTileImageUrl] = useState(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const imageUrl = await uploadImage({ data: file });
    setTileImageUrl(imageUrl);
    console.log(imageUrl, "A");
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle file uploads
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMockTestInstructionFile(file);
    }
  };

  const handleFileUpload2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMockTestTestSeriesFile(file);
    }
  };

  // State for selected option
  const [selectedOption, setSelectedOption] = useState("option1");

  // Handle changes for selected option
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Fetch goal categories on component mount
  useEffect(() => {
    getGoalCategory({ setIsLoading, setData });
  }, []);

  // Watch for goal category changes
  const goalCategory = watch("goalCategory");

  // Fetch goal exams based on selected category
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

  // Fetch subjects based on selected goal exam
  const goalId = watch("goal");
  useEffect(() => {
    if (goalId) {
      const params = { page: 1, limit: 100, search: "", goalId };
      getAllSubjects({ setIsLoading, setData: setSubject, params });
    }
  }, [goalId]);

  // Fetch sub-subjects based on selected subject
  const subjectId = watch("subject");
  useEffect(() => {
    if (subjectId) {
      const params = { page: 1, limit: 100, search: "", subjectId };
      getAllSubSubjects({ setIsLoading, setData: setSubSubjects, params });
    }
  }, [subjectId]);

  // Fetch chapters based on selected subject and sub-subject
  const subSubjectId = watch("subSubject");
  useEffect(() => {
    if (subjectId || subSubjectId) {
      const params = { page: 1, limit: 100 };
      if (subjectId) params.subjectId = subjectId;
      if (subSubjectId) params.subSubjectId = subSubjectId;
      getAllSubjectsByGoalExam({ setIsLoading, setData: setChapters, params });
    }
  }, [subjectId, subSubjectId]);

  // Fetch topics based on selected chapter
  const chapterId = watch("chapter");
  useEffect(() => {
    if (chapterId) {
      const params = { page: 1, limit: 100 };
      getTopicsByChapter({ setIsLoading, setData: setTopics, params });
    }
  }, [chapterId]);

  // Handle form submission
  const onSubmit = (data) => {
    const payload = {
      ...data,
      tests: formData,
    };
    if (tileImageUrl) payload.tileImage = tileImageUrl;
    addPracticeQuestion({
      data: payload,
      addFun: () => navigate("/quizapp/test-series"),
    });
  };
  return (
    <>
      <TableModal show={show1} onHide={() => setShow1(false)} />

      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Practice Questions</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Quiz app /<span> Practice Questions</span>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="studentprofile-container">
            <div className="studyplanner-container">
              <div className="addhandwritten-inputs">
                {!show && (
                  <>
                    <div className="addhandwritten-input-two-div">
                      <div className="testseries-inputs">
                        <div className="testseries-input">
                          <h6>
                            Goal <span>*</span>
                          </h6>
                          <div className="addhandwritten-inputs-div">
                            <div className="input-container">
                              <select
                                {...register("goalCategory", {
                                  required: true,
                                })}
                              >
                                <option value="">Select Goal</option>
                                {data?.data?.map((item) => (
                                  <option key={item._id} value={item._id}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              <label htmlFor="">Select Goal </label>
                            </div>
                            <div className="addhandwritten-inputs-icons">
                              {/* <AiFillPlusCircle />
                              <MdOutlineRemoveRedEye />
                              <AiFillEdit /> */}
                            </div>
                          </div>
                        </div>
                        <div className="testseries-input">
                          <h6>
                            Goal Exam <span>*</span>
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
                              <label htmlFor="">Select Goal Exam </label>
                            </div>
                            <div className="addhandwritten-inputs-icons">
                              {/* <AiFillPlusCircle />
                              <MdOutlineRemoveRedEye />
                              <AiFillEdit /> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="addhandwritten-input">
                        <h6>Tile Image</h6>
                        <div
                          style={{ width: "80%" }}
                          className="addcourse-upload-file"
                        >
                          {image ? (
                            <img
                              src={image}
                              alt="Preview"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <>
                              <SlCloudUpload
                                style={{ cursor: "pointer" }}
                                onClick={handleImageChange}
                              />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{
                                  position: "absolute",
                                  opacity: 0,
                                  width: "100px",
                                  height: "100px",
                                  cursor: "pointer",
                                }}
                              />
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{
                              position: "absolute",
                              opacity: 0,
                              width: "100px",
                              height: "100px",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="addhandwritten-input-two-div">
                      <div className="addhandwritten-input">
                        <h6>
                          How many tests are there in this bundle <span>*</span>
                        </h6>
                        <div className="addhandwritten-inputs-div">
                          <div className="input-container">
                            <input type="text" {...register("testCount")} />
                            <label htmlFor="">Enter test count</label>
                          </div>
                          <div className="addhandwritten-inputs-icons"></div>
                        </div>
                      </div>
                      <div className="addhandwritten-input">
                        <h6>
                          Bundle Description<span>*</span>
                        </h6>
                        <div className="addhandwritten-inputs-div">
                          <div className="input-container">
                            <input
                              type="text"
                              {...register("bundleDescription")}
                            />
                            <label htmlFor="">Enter Bundle Description</label>
                          </div>
                          <div className="addhandwritten-inputs-icons"></div>
                        </div>
                      </div>
                    </div>
                    <div className="addhandwritten-input-two-div">
                      {/* <div className="addhandwritten-input">
                        <h6>
                          Cost of the Bundle<span>*</span>
                        </h6>
                        <div className="addhandwritten-inputs-div">
                          <div className="input-container">
                            <input type="number" {...register("bundleCost")} />
                            <label htmlFor="">Enter the cost</label>
                          </div>
                          <div className="addhandwritten-inputs-icons"></div>
                        </div>
                      </div> */}
                      <div className="addhandwritten-input">
                        <h6>Total Duration of the Bundle</h6>
                        <div className="addhandwritten-inputs-div">
                          <div className="input-container">
                            <input
                              type="text"
                              {...register("bundleDuration")}
                            />
                            <label htmlFor="">Enter Duration in text</label>
                          </div>
                          <div className="addhandwritten-inputs-icons"></div>
                        </div>
                      </div>
                      <div className="addhandwritten-input">
                        <h6>Bundle Name</h6>
                        <div className="addhandwritten-inputs-div">
                          <div className="input-container">
                            <input type="text" {...register("bundleName")} />
                            <label htmlFor="">Enter Name here</label>
                          </div>
                          <div className="addhandwritten-inputs-icons"></div>
                        </div>
                      </div>
                    </div>
                    <div className="addhandwritten-input-two-div">
                      <div className="addhandwritten-input">
                        <h6>
                          Locale<span>*</span>
                        </h6>
                        <div className="addhandwritten-inputs-div">
                          <div className="input-container">
                            <input type="text" {...register("locale")} />
                            <label htmlFor="">Enter Language here</label>
                          </div>
                          <div className="addhandwritten-inputs-icons"></div>
                        </div>
                      </div>
                      {/* <div className="addhandwritten-input">
                        <h6>
                          Free Tests<span>*</span>
                        </h6>
                        <div className="addhandwritten-inputs-div">
                          <div className="input-container">
                            <input
                              type="number"
                              {...register("freeTestsCount")}
                            />
                            <label htmlFor="">Enter free tests count</label>
                          </div>
                          <div className="addhandwritten-inputs-icons"></div>
                        </div>
                      </div> */}
                    </div>
                    <div className="addhandwritten-inputs-div">
                      {/* <div className="addhandwritten-input">
                    <h6>Show In Practice Questions</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select
                          {...register("isUsed")}
                          default={false}
                          required
                        >
                          <option value={false}>Yes</option>
                          <option value={true}>No</option>
                        </select>
                        <label htmlFor="">Want Show In Practice Questions</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div> */}
                    </div>
                  </>
                )}
                {show && (
                  <>
                    <TestSeriesFormComponentMain
                      goalCategory={goalCategory}
                      goalExamId={goalId}
                      setFormData={setFormData}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="addhandwritennotes-submit">
              {show && (
                <div className="handwritten-button">
                  <button type="button" onClick={() => setShow(false)}>
                    Back
                  </button>
                </div>
              )}
              {!show && goalCategory && goalId && (
                <div className="handwritten-button">
                  <button type="button" onClick={toggle}>
                    Save & Continue
                  </button>
                </div>
              )}
              <div className="handwritten-button">
                <button type="button" onClick={handleSubmit(onSubmit)}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default HOC(AddPracticeQuestions);
