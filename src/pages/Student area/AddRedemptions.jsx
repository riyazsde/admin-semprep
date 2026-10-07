import React, { useState } from "react";
import HOC from "../../components/HOC/HOC";

import { useNavigate } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { GoArrowLeft } from "react-icons/go";
import { useForm } from "react-hook-form";
import { addRedemption } from "../../services/exportFunctions";

const AddRedemptions = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggle = () => {
    setShow(!show);
  };

  const onSubmit = (data) =>
    addRedemption({
      data,
      addFun: () => navigate("/student-area/redemptions"),
    });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dashboardcontainer">
          <div className="dashboardcontainer-header">
            <h6>Redemptions</h6>
            <p>
              <GoArrowLeft
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              Student area / Redemptions /<span> Add Redemptions</span>
            </p>
          </div>
          <div className="studentprofile-container">
            <div className="studyplanner-container">
              <div className="addhandwritten-inputs">
                <div className="addhandwritten-input-two-div">
                  {/* <div className="addhandwritten-input">
                    <h6>
                      Student<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select name="" id=""></select>
                        <label htmlFor="">Select Student</label>
                      </div>
                      <div className="addhandwritten-inputs-icons">
                        <AiFillPlusCircle />
                        <MdOutlineRemoveRedEye />
                        <AiFillEdit />
                      </div>
                    </div>
                  </div> */}
                  <div className="addhandwritten-input">
                    <h6>
                      Reward<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="number"
                          {...register("reward", { required: true })}
                        />
                        <label htmlFor="">Select Reward</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div>
                </div>
                <div className="addhandwrittennotes-input">
                  <h6>
                    Redeemed Type<span>*</span>
                  </h6>
                  <div className="input-container">
                    <input
                      type="text"
                      {...register("redeemedType", { required: true })}
                    />
                    <label htmlFor="">Enter redeemed type</label>
                  </div>
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
    </>
  );
};

export default HOC(AddRedemptions);
