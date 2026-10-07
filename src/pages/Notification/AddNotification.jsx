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
  addNotification,
  getAllSubjects,
  getGoalCategory,
  getGoalExamByGoalCategory,
} from "../../services/exportFunctions";
import { useForm } from "react-hook-form";
import { showNotification } from "../../services/exportComponents";
import { uploadImage } from "../../services/otherFunction";
import AsyncSelect from "react-select/async";
import axios from "axios";

const AddNotification = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [show, setShow] = useState(false);

  const [testSeries, setTestSeries] = useState([]);
  const [value, setValue] = useState(null);
  const fetchTestSeries = async (inputValue) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}admin/profile`,
        {
          params: { userName: inputValue, limit: 20, userType: "USER" },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response?.data?.data?.map((item) => ({
        value: item?.user?._id,
        label: item.user?.fullName,
      }));
    } catch (error) {
      console.error("Error fetching test series:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchTestSeries("").then((data) => setTestSeries(data));
  }, []);
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

  const sendTo = watch("total");

  const onSubmit = async (data) => {
    const payload = { ...data, sendTo: "USER", sendVia: "NOTIFICATION" };
    if (sendTo === "SINGLE") {
      payload._id = selectedOption?.value;
    }
    addNotification({
      setIsLoading,
      data: payload,
      addFun: () => navigate("/notifications"),
    });
  };

  return (
    <>
      <TableModal show={show} onHide={() => setShow(false)} />
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Add Notification</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Dashboard / Notification /<span> Add Notification </span>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="handwrittennotes-list">
            <div className="studyplanner-container">
              <div className="addhandwritten-inputs">
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input">
                    <h6>
                      Title <span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("title", { required: true })}
                        />
                        <label htmlFor="">Enter Title</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div>
                  <div className="addhandwritten-input">
                    <h6>
                      Expire Date <span>*</span>{" "}
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="date"
                          {...register("expireIn", { required: true })}
                        />
                        <label htmlFor=""> Enter Expire Date </label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input1">
                  <h6>
                    Content <span>*</span>
                  </h6>
                  <div style={{ width: "90%" }}>
                    <div className="input-container p-1">
                      <textarea
                        id="desc"
                        style={{ width: "100%" }}
                        rows={0}
                        {...register("content", {
                          required: "Description is required.",
                        })}
                      />
                    </div>
                    <div className="addhandwritten-inputs-icons"></div>
                  </div>
                </div>
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input">
                    <h6>
                      Send To <span>*</span>{" "}
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select
                          name=""
                          id=""
                          {...register("total", { required: true })}
                        >
                          <option value="">Select Send To</option>
                          <option value="SINGLE">Single User</option>
                          <option value="ALL">All User</option>
                        </select>

                        <label htmlFor="">Select Send To</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div>
                </div>
                {console.log(sendTo)}
                {sendTo === "SINGLE" && (
                  <div>
                    <AsyncSelect
                      cacheOptions
                      defaultOptions
                      loadOptions={fetchTestSeries}
                      onChange={(selectedOption) =>
                        setSelectedOption(selectedOption)
                      }
                      value={selectedOption}
                      placeholder="Search and select  user..."
                      className="async-select-container"
                      classNamePrefix="async-select"
                      noOptionsMessage={({ inputValue }) =>
                        inputValue
                          ? "No matching users found"
                          : "Start typing to search"
                      }
                    />
                  </div>
                )}

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

export default HOC(AddNotification);
