import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { TableModal } from "../../components/Modals/Modals";

import { GoArrowLeft } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import { IoImageOutline } from "react-icons/io5";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { SlCloudUpload } from "react-icons/sl";
import {
  addEducator,
  getAllSubjects,
  getGoalCategory,
  getGoalExamByGoalCategory,
  updateEducator,
} from "../../services/exportFunctions";
import { useForm } from "react-hook-form";
import { showNotification } from "../../services/exportComponents";
import { uploadImage } from "../../services/otherFunction";

const EditEducator = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [show, setShow] = useState(false);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const { register, handleSubmit, watch, reset } = useForm();
  const {id}=useParams();
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
    // console.log("Form Data:", data,image);
    console.log("image", imageFile);
    if (!image) {
      showNotification({
        type: "error",
        message: "Please upload an image",
      });
      return;
    }

    try {
      const imageUrl = await uploadImage({ data: imageFile || image });

      const payload = {
        ...data,
        image: imageUrl,
        subjects: [data.subject],
        costPerHour: parseInt(data.costPerHour),
        numberOfHour: parseInt(data.numberOfHour),
        experience: parseInt(data.experience),
      };
      delete payload.subject;
      updateEducator({
        setIsLoading,
        data: payload,
        id,
        addFun: () => navigate("/educator"),
      });

      console.log("Payload:", payload);
    } catch (error) {
      console.error("Error resolving image promise:", error);
      showNotification({
        type: "error",
        message: "Failed to upload image or create payload.",
      });
    }
  };

  return (
    <>
      <TableModal show={show} onHide={() => setShow(false)} />
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Edit Educator</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Dashboard / Educator /<span> Edit Educator</span>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="handwrittennotes-list">
            <div className="studyplanner-container">
              <div className="addhandwritten-inputs">
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input">
                    <div>
                      <h6 className="mb-4">
                        Goal <span>*</span>
                      </h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <select
                            {...register("goalCategory", { required: true })}
                          >
                            <option value="">Select Goal</option>
                            {data?.data?.map((item) => (
                              <option key={item._id} value={item._id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="">Select Goal</label>
                        </div>
                        <div className="addhandwritten-inputs-icons">
                          {/* <AiFillPlusCircle onClick={() => setShow(true)} />
                          <MdOutlineRemoveRedEye />
                          <AiFillEdit /> */}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h6 className="mb-4">
                        Goal Exam<span>*</span>
                      </h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <select {...register("goal", { required: true })}>
                            <option value="">Select Goal Exam</option>
                            {allGoals?.data?.map((item) => (
                              <option key={item._id} value={item._id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="">Select Goal Exam</label>
                        </div>
                        <div className="addhandwritten-inputs-icons">
                          {/* <AiFillPlusCircle onClick={() => setShow(true)} />
                      <MdOutlineRemoveRedEye />
                      <AiFillEdit /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="addhandwritten-input">
                    <div style={{ width: "80%" }}>
                      <h6 className="mb-2">Image</h6>
                      <div className="addcourse-upload-file">
                        {image ? (
                          <img
                            src={image}
                            alt="Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <SlCloudUpload />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{
                            position: "absolute",
                            opacity: 0,
                            width: "100px",
                            height: "100px",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input">
                    <h6>
                      Subject<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <select {...register("subject", { required: true })}>
                          <option value="">Select Subject</option>
                          {subject?.data?.map((item) => (
                            <option key={item.id} value={item._id}>
                              {item?.name}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="">Select Subject</label>
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
                      Cost per Hour <span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input type="text" />
                        <label htmlFor="">Enter the Cost</label>
                      </div>
                      <div className="addhandwritten-inputs-icons">
                        {/* <AiFillPlusCircle /> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input">
                    <h6>Name</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("name", { required: true })}
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
                    <h6>Qualifications</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("qualifications", { required: true })}
                        />
                        <label htmlFor="">Enter Qualification</label>
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
                      Description <span>*</span>{" "}
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="text"
                          {...register("desc", { required: true })}
                        />
                        <label htmlFor=""> Enter Description</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input">
                    <h6>Experience</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="number"
                          {...register("experience", { required: true })}
                        />
                        <label htmlFor="">Enter Experience</label>
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
                      Number per Hour <span>*</span>{" "}
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="number"
                          {...register("numberOfHour", { required: true })}
                        />
                        <label htmlFor="">Enter Number per Hour</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input">
                    <h6>
                      Contract Start Date <span>*</span>{" "}
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="date"
                          {...register("contractStartDate", { required: true })}
                        />
                        <label htmlFor="">Select Start Date</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
                    </div>
                  </div>
                  <div className="addhandwritten-input">
                    <h6>
                      Contract End Date <span>*</span>{" "}
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="date"
                          {...register("contractEndDate", { required: true })}
                        />
                        <label htmlFor="">Select End Date</label>
                      </div>
                      <div className="addhandwritten-inputs-icons"></div>
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

export default HOC(EditEducator);
