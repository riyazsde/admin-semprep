import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { AddGoalsExamModal } from "../../components/Modals/Modals";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import {
  getMVPQuestionById,
  getGoalCategory,
  getGoalExamByGoalCategory,
  updateMVPQuestion,
} from "../../services/exportFunctions";

const EditCdsQuestions = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { register, handleSubmit, watch, control, reset } = useForm({
    defaultValues: {
      options: [{ value: "", response: "", additionalInfo: "" }],
    },
  });
  const { id } = useParams();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [goalExam, setGoalExam] = useState([]);
  const [questionData, setQuestionData] = useState(null);

  const getData = () => {
    setIsLoading(true);
    getMVPQuestionById({
      id,
      addFun: (res) => {
        if (res && res.data) {
          setQuestionData(res.data);
        }
        setIsLoading(false);
      },
    });

    getGoalCategory({
      setIsLoading,
      setData: (res) => setData(res),
      params: { limit: 1000 },
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (questionData) {
      reset(questionData);
    }
  }, [questionData, reset]);

  const selectedGoalCategory = watch("goalCategory");
  useEffect(() => {
    if (selectedGoalCategory) {
      const params = {
        page: 1,
        limit: 1000,
        search: "",
        goalCategoryId: selectedGoalCategory,
      };
      getGoalExamByGoalCategory({
        setIsLoading,
        setData: (res) => setGoalExam(res),
        params,
      });
    }
  }, [selectedGoalCategory]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      options: data.options.map((option) => ({
        ...option,
        isEligible: true,
      })),
      order: data.srNo,
    };

    if (
      data?.category === "Physical & Medical" &&
      data?.inputType === "group"
    ) {
      payload.subQuestions = [
        {
          questionText: "Please enter your height.",
          inputType: "number",
          placeholder: "Height in cm",
          options: [
            {
              value: "AnyHeight",
              response: "Thank you for providing your details...",
              additionalInfo: "The minimum height for male candidates...",
              isEligible: true,
            },
          ],
          validation: {
            required: true,
            min: 100,
            max: 250,
          },
          order: 1,
        },
        {
          questionText: "Please enter your weight.",
          inputType: "number",
          placeholder: "Weight in kg",
          options: [
            {
              value: "AnyWeight",
              response: "Thank you for providing your details...",
              additionalInfo: "Ensure your weight is within...",
              isEligible: true,
            },
          ],
          validation: {
            required: true,
            min: 30,
            max: 150,
          },
          order: 2,
        },
      ];
    } else {
      delete payload.subQuestions;
    }

    try {
      await updateMVPQuestion({
        id,
        data: payload,
      });
      setShow(true);
      navigate("/mvp");
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const examTags = [
    "UPSC CDS",
    "UPSC NDA",
    "JEE",
    "VITEEE",
    "NEET",
    "BITSAT",
    "12th CBSE",
    "11th CBSE",
  ];

  const categories = [
    "Introduction",
    "Personal Information",
    "Eligibility",
    "Physical & Medical",
    "Study Plan",
    "Study Duration Analysis",
  ];

  const inputTypes = ["text", "checkbox", "dropdown", "group"];

  return (
    <>
      <AddGoalsExamModal show={show} onHide={() => setShow(false)} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="dashboardcontainer">
            <div className="dashboardcontainer-header">
              <h6>Edit Questions</h6>
              <p>
                <GoArrowLeft
                  size={25}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(-1)}
                />
                MVP /<span> Edit  Questions</span>
              </p>
            </div>
            <div className="studentprofile-container">
              <div className="studyplanner-container">
                <div className="addhandwritten-inputs">
                  <div className="addhandwritten-input-two-div">
                    <div className="addhandwritten-input">
                      <h6>
                        Goal Category<span>*</span>
                      </h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <select
                            {...register("goalCategory", { required: true })}
                          >
                            <option value="">Select Goal Category</option>
                            {data?.data?.map((item) => (
                              <option key={item._id} value={item._id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                          <label>Select Goal Category</label>
                        </div>
                      </div>
                    </div>
                    <div className="addhandwritten-input">
                      <h6>
                        Goal Exam<span>*</span>
                      </h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <select
                            {...register("goal", { required: true })}
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Select Goal Exam
                            </option>
                            {goalExam?.data?.map((item) => (
                              <option key={item._id} value={item._id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                          <label>Select Goal Exam</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="addhandwritten-input-two-div">
                    <div className="addhandwritten-input">
                      <h6>
                        Sr No<span>*</span>
                      </h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <input
                            type="number"
                            {...register("srNo", { required: true })}
                          />
                          <label>Sr No</label>
                        </div>
                      </div>
                    </div>
                    <div className="addhandwritten-input">
                      <h6>
                        Exam Tag<span>*</span>
                      </h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <select {...register("examTag", { required: true })}>
                            <option value="" disabled>
                              Select Exam Tag
                            </option>
                            {examTags.map((tag) => (
                              <option key={tag} value={tag}>
                                {tag}
                              </option>
                            ))}
                          </select>
                          <label>Select Exam Tag</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="addhandwritten-input-two-div">
                    <div className="addhandwritten-input">
                      <h6>
                        Category<span>*</span>
                      </h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <select {...register("category", { required: true })}>
                            <option value="" disabled>
                              Select Category
                            </option>
                            {categories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                          <label>Select Category</label>
                        </div>
                      </div>
                    </div>
                    <div className="addhandwritten-input">
                      <h6>
                        Input Type<span>*</span>
                      </h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <select
                            {...register("inputType", { required: true })}
                          >
                            <option value="" disabled>
                              Select Input Type
                            </option>
                            {inputTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                          <label>Select Input Type</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="addhandwritten-input-two-div">
                    <div className="addhandwritten-input">
                      <h6>
                        Question Text<span>*</span>
                      </h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <input
                            type="text"
                            {...register("questionText", { required: true })}
                          />
                          <label>Question Text</label>
                        </div>
                      </div>
                    </div>
                    <div className="addhandwritten-input">
                      <h6>
                        Description<span>*</span>
                      </h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <input
                            type="text"
                            {...register("description", { required: true })}
                          />
                          <label>Description</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="addhandwritten-input-two-div">
                    <div className="addhandwritten-input">
                      <h6>
                        Required<span>*</span>
                      </h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <select {...register("required", { required: true })}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </select>
                          <label>Required</label>
                        </div>
                      </div>
                    </div>
                    <div className="addhandwritten-input">
                      <h6>Link</h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <input type="text" {...register("link")} />
                          <label>Link</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="addhandwritten-input-two-div">
                    <div className="addhandwritten-input">
                      <h6>Source</h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <input type="text" {...register("source")} />
                          <label>Source</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="addhandwritten-input1">
                    <h6>
                      SME Instructions<span></span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <textarea
                          style={{ width: "100%" }}
                          {...register("smeInstructions")}
                        />
                        <label>SME Instructions</label>
                      </div>
                    </div>
                  </div>
                  <div className="addhandwritten-input1">
                    <h6>Options</h6>
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="addhandwritten-inputs-div mb-4"
                      >
                        <div className="input-container">
                          <input
                            type="text"
                            {...register(`options.${index}.value`)}
                            placeholder="Value"
                          />
                          <input
                            type="text"
                            {...register(`options.${index}.response`)}
                            placeholder="Response"
                          />
                          <input
                            type="text"
                            {...register(`options.${index}.additionalInfo`)}
                            placeholder="Additional Info"
                          />
                          <button type="button" onClick={() => remove(index)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        append({
                          value: "",
                          response: "",
                          additionalInfo: "",
                        })
                      }
                    >
                      Add Option
                    </button>
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
      )}
    </>
  );
};

export default HOC(EditCdsQuestions);
