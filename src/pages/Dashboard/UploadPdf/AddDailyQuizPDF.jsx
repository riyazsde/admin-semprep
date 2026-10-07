import React from "react";

import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addGoalCategory, addNewsPDF } from "../../../services/exportFunctions";
import HOC from "../../../components/HOC/HOC";

const AddDailyQuizPDF = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
   
    const addFun = (id) => {
      navigate("/dashboard/current-affairs/daily-news/pdf");
    };

    addNewsPDF({
      data,
      addFun: addFun,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dashboardcontainer">
          <div className="dashboardcontainer-header">
            <h6>Add Daily Quiz</h6>
            <p>
              <GoArrowLeft
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              Daily Quiz /<span> Add Daily Quiz</span>
            </p>
          </div>
          <div className="studentprofile-container">
            <div className="studyplanner-container">
              <div className="addhandwrittennotes-main">
                <div className="addhandwrittennotes-input">
                  <h6>
                    Date<span>*</span>
                  </h6>
                  <div className="input-container">
                    <input
                      type="date"
                      id="email"
                      required
                      {...register("date", { required: true })}
                    />
                    <label htmlFor="">Select Date</label>
                  </div>
                </div>
               
              </div>
              <div className="addhandwrittennotes-main">
                <div className="addhandwrittennotes-input">
                  <h6>
                    PDF Link <span>*</span>
                  </h6>
                  <div className="input-container">
                    <input
                      type="text"
                      id="email"
                      required
                      {...register("pdfLink", { required: true })}
                    />
                    <label htmlFor="">Enter PDF Link</label>
                  </div>
                </div>
               
              </div>
            </div>
            <div
              className="handwritten-button-container"
              style={{ marginTop: "2rem" }}
            >
              <div className="handwritten-button">
                <button type="submit">Create</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default HOC(AddDailyQuizPDF);
