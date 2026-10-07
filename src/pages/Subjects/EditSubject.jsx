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
  addSubject,
  editSubject,
  getGoalCategory,
  getGoalExamByGoalCategory,
  getSubjectById,
} from "../../services/exportFunctions";

const EditSubject = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [goalExam, setGoalExam] = useState([]);
  const { id } = useParams();

  const getData = () => {
    getGoalCategory({ setIsLoading, setData ,params:{limit:1000}});
    getSubjectById({
      setIsLoading,
      setData: (res) =>
        reset({
          goalCategory: res?.data?.goalCategory,
          goal: res?.data?.goal,
          name: res?.data?.name,
          language: res?.data?.language,
        }),
      id,
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const selectedGoalCategory = watch("goalCategory");
  useEffect(() => {
    if (selectedGoalCategory) {
      const params = {
        page: 1,
        limit: 1000,
        search: "",
        goalCategoryId: selectedGoalCategory,
      };

      getGoalExamByGoalCategory({ setIsLoading, setData: setGoalExam, params });
    }
  }, [selectedGoalCategory]);

  const onSubmit = (data) => {
    editSubject({
      data,
      setShowModal: setShow,
      addFun: () => navigate("/subjects"),
      id,
    });
  };
  return (
    <>
      <AddGoalsExamModal show={show} onHide={() => setShow(false)} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dashboardcontainer">
          <div className="dashboardcontainer-header">
            <h6>Subjects</h6>
            <p>
              <GoArrowLeft
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              Subjects /<span> Edit Subject</span>
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
                          name=""
                          id=""
                          {...register("goalCategory", { required: true })}
                        >
                          <option value="" disabled>
                            {" "}
                            Select Goal Category
                          </option>
                          {data?.data?.map((item, index) => (
                            <option key={index} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="">Select Goal Category</label>
                      </div>
                      {/* <div className="addhandwritten-inputs-icons">
                        <AiFillPlusCircle onClick={() => setShow(true)} />
                        <MdOutlineRemoveRedEye />
                        <AiFillEdit />
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input">
                    <h6>
                      Goal Exam<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select
                          name=""
                          id=""
                          {...register("goal", { required: true })}
                        >
                          <option value="" disabled>
                            Select Goal Exam
                          </option>
                          {goalExam?.data?.map((item, index) => (
                            <option key={index} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="">Select Goal Exam</label>
                      </div>
                      {/* <div className="addhandwritten-inputs-icons">
                        <AiFillPlusCircle onClick={() => setShow(true)} />
                        <MdOutlineRemoveRedEye />
                        <AiFillEdit />
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input">
                    <h6>
                      Subject Name<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("name", { required: true })}
                        />
                        <label htmlFor="">Subject Name</label>
                      </div>
                      <div className="addhandwritten-inputs-icons">
                        {/* <AiFillPlusCircle />
                                            <MdOutlineRemoveRedEye />
                                            <AiFillEdit /> */}
                      </div>
                    </div>
                  </div>
                  <div className="addhandwritten-input">
                    <h6>Language</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("language", { required: true })}
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
                    <h6>Sub Subjects (Optional)</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input type="text" />
                        <label htmlFor="">Enter sub subject</label>
                      </div>
                      <div className="addhandwritten-inputs-icons">
                        <AiFillPlusCircle />
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="addhandwritten-input-two-div">
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
                <button onClick={() => navigate("/subjects")}>
                  Save and add another
                </button>
              </div>
              <div className="handwritten-button-addnote">
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

export default HOC(EditSubject);
