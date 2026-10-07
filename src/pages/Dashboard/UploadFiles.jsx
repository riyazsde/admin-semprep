import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";

import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getRequest, postRequest } from "../../services/apiService";
import {
  addGoalCategory,
  addGoalExam,
  uploadImage,
} from "../../services/exportFunctions";
import { endpoints } from "../../services/endPoints";
import { showNotification } from "../../services/exportComponents";

const UploadFiles = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(null);
  const [fileData, setFileData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getRequest({
      endpoint: endpoints.getUserProfile,
      setIsLoading,
    }).then((res) => {
      if (res.data) setUserId(res?.data?.user?._id);
      setData(res.data);
    });
  }, []);

  const onSubmit = (data) => {
    if (!userId) return;
    const payload = new FormData();
    payload.append("image", data.file[0]);

    uploadImage({
      data: payload,
      addFun: (res) => {
        console.log(res);
        setFileData(res?.data?.[0]);
      },
      id: userId,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dashboardcontainer">
          <div className="dashboardcontainer-header">
            <h6>Add Files</h6>
            <p>
              <GoArrowLeft
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              Dashboard /<span> Add Files</span>
            </p>
          </div>
          <div className="studentprofile-container">
            <div className="studyplanner-container">
              <div className="addhandwrittennotes-main">
                <div className="addhandwrittennotes-input">
                  <h6>
                    Choose File<span>*</span>
                  </h6>
                  <div className="input-container">
                    <input
                      type="file"
                      id="email"
                      required
                      {...register("file", { required: true })}
                    />
                    <label htmlFor="">Choose File</label>
                  </div>
                </div>
              </div>
             { fileData?.img && <p className="mt-4">
                <p
                  style={{ color: "black", cursor: "pointer" }}
                  onClick={() =>{
                    showNotification({
                      type: "success",
                      message: "Copied to clipboard",
                    })
                    navigator.clipboard.writeText(fileData?.img);
                  }}
                >
                  <span
                    style={{ color: "black", fontWeight: "bold" }}
                    className="text-bold"
                  >
                    Link :-{" "}
                  </span>{" "}
                  <a target="_blank" href={fileData?.img}>
                    {fileData?.img}
                  </a>
                  <span
                    style={{
                      marginLeft: "10px",
                      color: "blue",
                      textDecoration: "underline",
                    }}
                  >
                    (Copy)
                  </span>
                </p>
              </p>}
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

export default HOC(UploadFiles);
