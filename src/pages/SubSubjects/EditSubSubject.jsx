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
  addSubSubject,
  editSubSubject,
  getAllSubjects,
  getGoalCategory,
  getGoalExamByGoalCategory,
  getSubSubjectById,
} from "../../services/exportFunctions";

const EditSubSubject = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [goalExam, setGoalExam] = useState([]);
const {id}=useParams();

  const getData = () => {
    getAllSubjects({ setIsLoading, setData });
    getSubSubjectById({ setIsLoading, setData:(res)=>reset({
      name: res?.data?.name,
      subjectId: res?.data?.subject
    }), id });
  };
  useEffect(() => {
    getData();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    editSubSubject({
      data,
      setShowModal: setShow,
      addFun: () => navigate("/subsubjects"),
      id
    });
  };
  return (
    <>
      <AddGoalsExamModal show={show} onHide={() => setShow(false)} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dashboardcontainer">
          <div className="dashboardcontainer-header">
            <h6>Sub-Subjects</h6>
            <p>
              <GoArrowLeft
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              Sub-Subjects /<span> Add Sub-Subject</span>
            </p>
          </div>
          <div className="studentprofile-container">
            <div className="studyplanner-container">
              <div className="addhandwritten-inputs">
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input">
                    {/* <h6>
                      Subject <span>*</span>
                    </h6> */}
                    <div className="addhandwritten-inputs-div">
                      {/* <div className="input-container">
                        <select
                          name=""
                          id=""
                          {...register("subject", { required: true })}
                        >
                          <option value="" disabled>
                            {" "}
                            Select Subject
                          </option>
                          {data?.data?.map((item, index) => (
                            <option key={index} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="">Select Subject</label>
                      </div> */}
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
                      Sub-Subject Name<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("name", { required: true })}
                        />
                        <label htmlFor="">Sub-Subject Name</label>
                      </div>
                      <div className="addhandwritten-inputs-icons">
                        {/* <AiFillPlusCircle />
                                            <MdOutlineRemoveRedEye />
                                            <AiFillEdit /> */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="addhandwritten-input">
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
                       
                      </div>
                    </div>
                  </div> */}
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

export default HOC(EditSubSubject);
