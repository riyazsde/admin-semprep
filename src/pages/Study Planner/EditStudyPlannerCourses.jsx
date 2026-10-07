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
  addStudyPlannerPlan,
  editStudyPlannerPlan,
  getAllSubjects,
  getGoalCategory,
  getGoalExamByGoalCategory,
  getStudyPlannerPlansById,
} from "../../services/exportFunctions";
import { useForm } from "react-hook-form";
import { showNotification } from "../../services/exportComponents";
import { uploadImage } from "../../services/otherFunction";

const EditStudyPlannerCourses = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const { register, handleSubmit, watch, reset } = useForm();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    getStudyPlannerPlansById({
      setIsLoading,
      setData: (data) => {
        reset({
          title: data.title,
          description: data.description,
        });
        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
      },
      id,
    });
  }, []);

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

  const onSubmit = async (data) => {
    if (!image) {
      showNotification({
        type: "error",
        message: "Please upload an image",
      });
      return;
    }
    const payload = new FormData();
    payload.append("title", data.title);
    payload.append("description", data.description);
    payload.append("image", imageFile);

    editStudyPlannerPlan({
      addFun: () => navigate("/study-planner/student-studyplans"),
      setIsLoading,
      data: payload,
      id,
    });
  };

  return (
    <>
      <TableModal show={show} onHide={() => setShow(false)} />
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Edit Study Plan</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Dashboard / Study Plan /<span> Add Study Plan</span>
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
                        <div className="addhandwritten-inputs-icons">
                          {/* <AiFillPlusCircle onClick={() => setShow(true)} />
                          <MdOutlineRemoveRedEye />
                          <AiFillEdit /> */}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h6 className="mb-4">
                        Description <span>*</span>
                      </h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <input
                            type="text"
                            {...register("description", { required: true })}
                          />
                          <label htmlFor=""> Enter Description</label>
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

export default HOC(EditStudyPlannerCourses);
