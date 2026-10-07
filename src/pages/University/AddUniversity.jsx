import React, { useState } from "react";
import HOC from "../../components/HOC/HOC";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addUniversity } from "../../services/exportFunctions";

const AddUniversity = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsSubmitting(true);

    const payload = {
      name: data.name,
      code: data.code,
      establishedYear: Number(data.establishedYear),
      type: data.type,
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        pincode: data.pincode,
      },
      contact: {
        email: data.email,
        phone: data.phone,
        website: data.website,
      },
      logo: data.logo,
      description: data.description,
    };

    const onSuccess = () => {
      setIsSubmitting(false);
      navigate("/university");
    };

    const onError = () => {
      setIsSubmitting(false);
    };

    addUniversity({ data: payload, addFun: onSuccess, errorFun: onError, setIsLoading: setIsSubmitting });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Add University</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            University /<span> Add University</span>
          </p>
        </div>

        <div className="studentprofile-container">
          <div className="studyplanner-container">
            <div className="addhandwrittennotes-main">
              <div className="addhandwrittennotes-input">
                <h6>
                  Name<span>*</span>
                </h6>
                <div className="input-container">
                  <input
                    {...register("name", { required: true })}
                    type="text"
                  />
                  <label>Enter University Name</label>
                </div>
              </div>

              <div className="addhandwrittennotes-input">
                <h6>Code</h6>
                <div className="input-container">
                  <input {...register("code")} type="text" />
                  <label>Enter Code</label>
                </div>
              </div>

              <div className="addhandwrittennotes-input">
                <h6>Established Year</h6>
                <div className="input-container">
                  <input {...register("establishedYear")} type="number" />
                  <label>Enter Year</label>
                </div>
              </div>

              <div className="addhandwrittennotes-input">
                <h6>Type</h6>
                <div className="input-container">
                  <select {...register("type", { required: true })}>
                    <option value="PRIVATE">PRIVATE</option>
                    <option value="PUBLIC">PUBLIC</option>
                  </select>
                  <label>Choose Type</label>
                </div>
              </div>


              <div className="addhandwrittennotes-input">
                <div className="input-container">
                  <input {...register("street")} type="text" />
                  <label>Street</label>
                </div>
              </div>

              <div className="addhandwrittennotes-input">
                <div className="input-container">
                  <input {...register("city")} type="text" />
                  <label>City</label>
                </div>
              </div>

              <div className="addhandwrittennotes-input">
                <div className="input-container">
                  <input {...register("state")} type="text" />
                  <label>State</label>
                </div>
              </div>

              <div className="addhandwrittennotes-input">
                <div className="input-container">
                  <input {...register("country")} type="text" />
                  <label>Country</label>
                </div>
              </div>

              <div className="addhandwrittennotes-input">
                <div className="input-container">
                  <input {...register("pincode")} type="text" />
                  <label>Pincode</label>
                </div>
              </div>

              <h6 style={{ marginTop: "1rem" }}>Contact</h6>

              <div className="addhandwrittennotes-input">
                <div className="input-container">
                  <input {...register("email")} type="email" />
                  <label>Email</label>
                </div>
              </div>

              <div className="addhandwrittennotes-input">
                <div className="input-container">
                  <input {...register("phone")} type="text" />
                  <label>Phone</label>
                </div>
              </div>

              <div className="addhandwrittennotes-input">
                <div className="input-container">
                  <input {...register("website")} type="text" />
                  <label>Website</label>
                </div>
              </div>

              <div className="addhandwrittennotes-input">
                <h6>Logo URL</h6>
                <div className="input-container">
                  <input {...register("logo")} type="text" />
                  <label>Logo URL</label>
                </div>
              </div>

              <div className="addhandwrittennotes-input">
                <h6>Description</h6>
                <div className="input-container">
                  <textarea {...register("description")} rows={4} />
                  <label>Description</label>
                </div>
              </div>
            </div>
          </div>

          <div
            className="handwritten-button-container"
            style={{ marginTop: "2rem" }}
          >
            <div className="handwritten-button">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default HOC(AddUniversity);
