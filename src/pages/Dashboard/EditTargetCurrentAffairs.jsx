import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
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
  editTargetCurrentAffairs,
  getTargetCurrentAffairsById,
} from "../../services/exportFunctions";
import {
  uploadInstructionFile,
  uploadTestSeriesFile,
} from "../../services/otherFunction";

const EditTargetCurrentAffairs = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [allGoals, setAllGoals] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isSamePage, setIsSamePage] = useState(false);
  const { id } = useParams();
  const [instructionFileId, setInstructionFileId] = useState("");
  const [testSeriesFileId, setTestSeriesFileId] = useState("");

  const { register, handleSubmit, watch, reset } = useForm();

  const goalCategory = watch("goalCategory");
  const goalExamId = watch("goal");

  const currentAffairType = watch("type");
  useEffect(() => {
    getTargetCurrentAffairsById({
      setIsLoading,
      setData: (data) => {
        console.log(data);
        reset({
          month: data.month,
          type: data.type,
          questions: data.questions,
          marks: data.marks,
        });
      },
      id,
    });
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
      getTopicsByChapter({ setIsLoading, setData: setTopics, params });
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
    };
    delete payload.testSeriesFile;
    delete payload.instructionFile;
    {
      currentAffairType !== "Topic Wise MCQs" && delete payload.topic;
    }
    {
      currentAffairType !== "Monthly MCQs" && delete payload.month;
    }

    // console.log("payload", payload);
    // return;
    const addFun = () => {
      reset();
      if (!isSamePage)
        navigate("/dashboard/current-affairs/target-current-affairs");
      setIsSamePage(false);
    };

    editTargetCurrentAffairs({ data: payload, addFun, id, setIsLoading });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dashboardcontainer">
          <div className="dashboardcontainer-header">
            <h6>Edit Target Current Affairs</h6>
            <p>
              <GoArrowLeft
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              Dashboard / Current Affairs /
              <span> Edit Target Current Affairs</span>
            </p>
          </div>
          <div className="studentprofile-container">
            <div className="studyplanner-container">
              <div className="addhandwritten-inputs">
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
                        <option value="Topic Wise MCQs">Topic Wise MCQs</option>
                      </select>
                      <label>Select Type</label>
                    </div>
                    <div className="addhandwritten-inputs-icons"></div>
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

export default HOC(EditTargetCurrentAffairs);
