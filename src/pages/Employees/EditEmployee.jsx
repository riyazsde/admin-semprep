import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { TableModal } from "../../components/Modals/Modals";

import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { IoImageOutline } from "react-icons/io5";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { SlCloudUpload } from "react-icons/sl";
import {
  addEducator,
  addEmployee,
  getAllSubjects,
  getGoalCategory,
  getGoalExamByGoalCategory,
} from "../../services/exportFunctions";
import { useForm } from "react-hook-form";
import { showNotification } from "../../services/exportComponents";
import { uploadImage } from "../../services/otherFunction";

const EditEmployee = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [show, setShow] = useState(false);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const { register, handleSubmit, watch, reset } = useForm();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [goalExam, setGoalExam] = useState([]);
  const [allGoals, setAllGoals] = useState([]);
  const [subject, setSubject] = useState([]);
  const [subSubjects, setSubSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [isSamePage, setIsSamePage] = useState(false);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    getGoalCategory({ setIsLoading, setData });
  }, []);

  const goalCategory = watch("goalCategory");

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

  const goalExamId = watch("goal");

  useEffect(() => {
    if (goalExamId) {
      const params = {
        page: 1,
        limit: 100,
        search: "",
        goalCategory,
        goalId: goalExamId,
      };
      getAllSubjects({ setIsLoading, setData: setSubject, params });
    }
  }, [goalExamId]);

  const onSubmit = async (data) => {
    if (data?.password !== data?.confirmPassword) {
      return showNotification({
        type: "error",
        message: "Password and Confirm Password must be same",
      });
    }
    const payload = { ...data, userType: "PARTNER" };
    delete payload.confirmPassword;

    // updateEmployee({
    //   setIsLoading,
    //   data: payload,
    //   addFun: () => navigate("/employees"),
    // });
  };

  return (
    <>
      <TableModal show={show} onHide={() => setShow(false)} />
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Edit Employee</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Dashboard / Employee /<span> Edit Employee</span>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="handwrittennotes-list">
            <div className="studyplanner-container">
              <div className="addhandwritten-inputs">
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input">
                    <h6>
                      Name <span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("fullName", { required: true })}
                        />
                        <label htmlFor="">Enter Name</label>
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
                      Email <span>*</span>{" "}
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("email", { required: true })}
                        />
                        <label htmlFor=""> Enter Email</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input">
                    <h6>
                      Mobile Number <span>*</span>{" "}
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("mobileNumber", { required: true })}
                        />
                        <label htmlFor=""> Enter Mobile Number</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div>
                  <div className="addhandwritten-input">
                    <h6>
                      Password <span>*</span>{" "}
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("password", { required: true })}
                        />
                        <label htmlFor="">Enter Password</label>
                      </div>
                      <div className="addhandwritten-inputs-icons">
                        {/* <AiFillPlusCircle />
                      <MdOutlineRemoveRedEye />
                      <AiFillEdit /> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input">
                    <h6>
                      Confirm Password <span>*</span>{" "}
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("confirmPassword", { required: true })}
                        />
                        <label htmlFor="">Enter Confirm Password</label>
                      </div>
                      <div className="addhandwritten-inputs-icons">
                        {/* <AiFillPlusCircle />
                      <MdOutlineRemoveRedEye />
                      <AiFillEdit /> */}
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
          </div>
        </form>
      </div>
    </>
  );
};

export default HOC(EditEmployee);
