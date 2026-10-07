import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";

import { useNavigate, useParams } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { addCourseType, addGoalExam, editCourseType, getCourseCategoryById, getCourseTypeById, getGoalCategory, updateCourseCategoryById } from "../../services/exportFunctions";

const EditCourseType = () => {
  const navigate = useNavigate();
  const {id}=useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getCourseCategoryById({ addFun: () => {}, id,setData:(res)=>reset({
      ...res?.data
    }) });
  },[id])
 

  const onSubmit = (data) => {
    const payload = new FormData();
    payload.append("name", data.name);
    payload.append("desc", data.desc);
    payload.append("status", true);
    

    updateCourseCategoryById({
      data: payload,
      addFun: () => navigate("/course-type"),
      id
    });
  };
  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Edit Course Type</h6>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="studentprofile-container">
          <div className="studyplanner-container">
            <div className="addhandwritten-inputs">
              <div className="addhandwritten-input-two-div">
                <div className="addhandwritten-input">
                  <h6>
                    Course Type<span>*</span>
                  </h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <input
                        type="text"
                        {...register("name", { required: true })}
                      />
                      <label htmlFor="">Enter course type</label>
                    </div>
                    <div className="addhandwritten-inputs-icons">
                      {/* <AiFillPlusCircle />
                      <MdOutlineRemoveRedEye />
                      <AiFillEdit /> */}
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input">
                  <h6>
                    Description<span>*</span>
                  </h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container p-1">
                      <textarea
                        style={{ width: "100%" }}
                        id="desc"
                        rows={0}
                        {...register("desc", {
                          required: "Description is required.",
                        })}
                      />
                      {/* <label htmlFor="">Enter Description</label> */}
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
              <button type="submit">Submit</button>
            </div>
          </div>
        </div>
        </form>
      </div>
    </>
  );
};

export default HOC(EditCourseType);
