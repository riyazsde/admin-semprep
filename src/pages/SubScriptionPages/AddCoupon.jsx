import React, { useState } from "react";
import HOC from "../../components/HOC/HOC";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { uploadImage } from "../../services/otherFunction";
import { addCoupon } from "../../services/exportFunctions";
import { showNotification } from "../../services/exportComponents";

const AddCoupon = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      let imageUrl = "";
      if (data.image?.[0]) {
        imageUrl = await uploadImage({ data: data.image[0] });
      }

      const payload = {
        title: data.title,
        // image: imageUrl,
        desc: data.desc,
        code: data.code,
        discount: Number(data.discount),
        isPercent: true,
        startDate: data.startDate,
        expirationDate: data.expirationDate,
        isActive: true,
        recipient: "ALL",
      };

      addCoupon({
        setIsLoading,
        data: payload,
        addFun: () => navigate("/coupons"),
      });
    } catch (error) {
      showNotification({
        type: "error",
        message: "Failed to create coupon. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Coupon</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/coupons")}
            />
            Coupons Page /<span> Add Coupon</span>
          </p>
        </div>
        <div className="">
          <div className="handwrittennotes-list">
            <div className="addhandwritten-inputs">
              <div className="addhandwritten-input" style={{gap:12}}>
                <h6>Title <span>*</span></h6>
                <div className="addhandwritten-inputs-div">
                  <div className="input-container">
                    <input
                      type="text"
                      {...register("title", { required: true })}
                      placeholder="Enter Coupon Title"
                    />
                  </div>
                </div>
              </div>
              <div className="addhandwritten-input" style={{gap:12}}>
                <h6>Description <span>*</span></h6>
                <div className="addhandwritten-inputs-div">
                  <div className="input-container">
                    <textarea style={{outline:"none", border:"none", width:"100%"}}
                      {...register("desc", { required: true })}
                      placeholder="Enter Coupon Description"
                    />
                  </div>
                </div>
              </div>
              <div className="addhandwritten-input" style={{gap:12}}>
                <h6>Coupon Code <span>*</span></h6>
                <div className="addhandwritten-inputs-div">
                  <div className="input-container">
                    <input
                      type="text"
                      {...register("code", { required: true })}
                      placeholder="Enter Coupon Code"
                    />
                  </div>
                </div>
              </div>
              <div className="addhandwritten-input" style={{gap:12}}>
                <h6>Discount <span>*</span></h6>
                <div className="addhandwritten-inputs-div">
                  <div className="input-container">
                    <input
                      type="number"
                      {...register("discount", { required: true })}
                      placeholder="Enter Discount Value"
                    />
                  </div>
                </div>
              </div>
              <div className="addhandwritten-input" style={{gap:12}}>
                <h6>Valid From <span>*</span></h6>
                <div className="addhandwritten-inputs-div">
                  <div className="input-container">
                    <input
                      type="date"
                      {...register("startDate", { required: true })}
                    />
                  </div>
                </div>
              </div>
              <div className="addhandwritten-input" style={{gap:12}}>
                <h6>Valid To <span>*</span></h6>
                <div className="addhandwritten-inputs-div">
                  <div className="input-container">
                    <input
                      type="date"
                      {...register("expirationDate", { required: true })}
                    />
                  </div>
                </div>
              </div>
                {/* <div className="addhandwritten-input" style={{gap:12}}>
                  <h6>Image</h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <input
                        type="file"
                        {...register("image")}
                      />
                    </div>
                  </div>
                </div> */}
              <div className="addhandwritennotes-submit">
                <div className="handwritten-button">
                  <button type="submit" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default HOC(AddCoupon);
