import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useForm } from "react-hook-form";
import {
  addHandwrittenNote,
  getStudyPlannerPlans,
  getGoalCategory,
  getGoalExamByGoalCategory,
  getTopicsByChapter,
  addTargetCurrentAffairs,
  getAllTopics,
} from "../../services/exportFunctions";
import {
  uploadInstructionFile,
  uploadTestSeriesFile,
} from "../../services/otherFunction";

const AddTargetCurrentaffairs = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [allGoals, setAllGoals] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isSamePage, setIsSamePage] = useState(false);

  const [instructionFileId, setInstructionFileId] = useState("");
  const [testSeriesFileId, setTestSeriesFileId] = useState("");

  const { register, handleSubmit, watch, reset } = useForm();

  const goalCategory = watch("goalCategory");
  const goalExamId = watch("goal");
  const currentAffairType = watch("type");

  useEffect(() => {
    getStudyPlannerPlans({ setIsLoading, setData });
    getGoalCategory({ setIsLoading, setData });
  }, []);

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

  useEffect(() => {
    if (goalExamId) {
      const params = {
        page: 1,
        limit: 100,
        search: "",
        goalId: goalExamId,
        goalCategoryId: goalCategory,
      };
      getAllTopics({ setIsLoading, setData: setTopics, params });
    }
  }, [goalExamId, goalCategory]);

  const handleInstructionFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const fileId = await uploadInstructionFile({ data: file });
        setInstructionFileId(fileId);
      } catch (error) {
        console.error("Instruction file upload failed", error);
      }
    }
  };

  const handleTestSeriesFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const fileId = await uploadTestSeriesFile({ data: file });
        setTestSeriesFileId(fileId);
      } catch (error) {
        console.error("Test series file upload failed", error);
      }
    }
  };

  const onSubmit = (formData) => {
    const payload = {
      ...formData,
      status: "Publish",
      topic: [formData.topic],
      testSeriesFiles: [
        {
          testSeriesFile: testSeriesFileId,
          instructionFile: instructionFileId,
        },
      ],
    };
    {
      currentAffairType !== "Topic Wise MCQs" && delete payload.topic;
    }

    delete payload.testSeriesFile;
    delete payload.instructionFile;

    // console.log("payload", payload);
    // return;
    const addFun = () => {
      reset();
      if (!isSamePage)
        navigate("/dashboard/current-affairs/target-current-affairs");
      setIsSamePage(false);
    };

    addTargetCurrentAffairs({ data: payload, addFun });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dashboardcontainer">
          <div className="dashboardcontainer-header">
            <h6>Add Target Current Affairs</h6>
            <p>
              <GoArrowLeft
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              Dashboard / Current Affairs /
              <span> Add Target Current Affairs</span>
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
                        <label>Select Goal</label>
                      </div>
                      <div className="addhandwritten-inputs-icons">
                        {/* Icons if needed */}
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
                        <label>Select Goal Exam</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div>
                </div>

                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input">
                    <h6>
                      Type <span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select {...register("type", { required: true })}>
                          <option value="">Select Type</option>
                          <option value="Daily Quiz">Daily Quiz</option>
                          <option value="Monthly MCQs">Monthly MCQs</option>
                          <option value="Topic Wise MCQs">
                            Topic Wise MCQs
                          </option>
                        </select>
                        <label>Select Type</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div>
                  <div className="addhandwritten-input">
                    <h6>Questions</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="number"
                          {...register("questions", { required: true })}
                        />
                        <label>Enter Questions</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input">
                    <h6>
                      Marks<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="number"
                          {...register("marks", { required: true })}
                        />
                        <label>Enter Marks</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div>
                  {currentAffairType === "Monthly MCQs" && (
                    <div className="addhandwritten-input">
                      <h6>Month</h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <select {...register("month", { required: true })}>
                            <option value="">Select Month</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                          </select>
                          <label>Select Month</label>
                        </div>
                        <div className="addhandwritten-inputs-icons"></div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="addhandwritten-inputs-div">
                  {/* <div className="addhandwritten-input">
                    <h6>Price</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="number"
                          {...register("price", { required: true })}
                        />
                        <label>Enter Price here</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div> */}
                  <div className="addhandwritten-input">
                    <h6>Duration (Min)</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="number"
                          {...register("duration", { required: true })}
                        />
                        <label>Enter Duration in number</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div>
                </div>
                {currentAffairType === "Topic Wise MCQs" && (
                  <div className="addhandwritten-inputs-div">
                    <div className="addhandwritten-input">
                      <h6>Topic</h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <select {...register("topic", { required: true })}>
                            <option value="">Select Topic</option>
                            {topics?.data?.map((item) => (
                              <option key={item._id} value={item._id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                          <label>Select Topic</label>
                        </div>
                        <div className="addhandwritten-inputs-icons"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="addhandwritten-inputs-div">
                  <div className="addhandwritten-input">
                    <h6>Instruction File</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="file"
                          {...register("instructionFile", { required: true })}
                          onChange={handleInstructionFileChange}
                        />
                        <label>Select File</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div>
                  <div className="addhandwritten-input">
                    <h6>Test Series File</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="file"
                          {...register("testSeriesFile", { required: true })}
                          onChange={handleTestSeriesFileChange}
                        />
                        <label>Select File</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
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

export default HOC(AddTargetCurrentaffairs);
