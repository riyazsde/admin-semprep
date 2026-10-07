import React, { useState } from "react";
import HOC from "../../components/HOC/HOC";

import { useNavigate, useParams } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { GoArrowLeft } from "react-icons/go";
import { useForm } from "react-hook-form";
import { addRedemption, editRedemption, editUserCart } from "../../services/exportFunctions";

const EditUserCart = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
    editUserCart({
      data,
      addFun: () => navigate("/student-area/user-carts"),
      id,
    });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dashboardcontainer">
          <div className="dashboardcontainer-header">
            <h6>Edit Redemptions</h6>
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
                      Total Price<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="number"
                          {...register("totalPrice", { required: true })}
                        />
                        <label htmlFor="">Enter Total Cart Price</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
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

export default HOC(EditUserCart);
