import React, { useState, useEffect } from "react";
import HOC from "../../components/HOC/HOC";

import { MdAddBox } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { IoImageOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

import {
  addBannerByPosition,
  getBannerByPosition,
  getGoalExam,
  updateBannerByPosition,
} from "../../services/exportFunctions";

const StudyPlannerAI = () => {
  const navigate = useNavigate();
  const [bannerData, setBannerData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading2, setIsLoading2] = useState(false);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };
  const getData = () => {
    const params = {
      page: currentPage,
      limit: limit,
      search,
    };
    getBannerByPosition({
      setIsLoading,
      params: { type: "StudyPlanner", position: "TOP" },
      setData: setBannerData,
    });
    getGoalExam({ setIsLoading: setIsLoading2, setData });
  };

  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const updateBanner = () => {
    if (!imageFile) return;

    const payload = new FormData();
    payload.append("image", imageFile);
    payload.append("type", "StudyPlanner");
    payload.append("position", "TOP");
    {
      imageId
        ? updateBannerByPosition({
            id: imageId,
            data: payload,
            addFun: () => {
              getData();
            },
          })
        : addBannerByPosition({
            data: payload,
            addFun: () => {
              getData();
            },
          });
    }
  };

  useEffect(() => {
      const currentBanner = bannerData?.find(
        (banner) => banner.type === "StudyPlanner"
      );
      setImagePreview(currentBanner?.image);
      setImageId(currentBanner?._id);
    }, [bannerData]);
  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Study Planner AI Page Content</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Dashboard /<span> Study Planner AI</span>
          </p>
        </div>
        <div className="homepagecontent">
          <div className="studyplanner-container">
            <div className="studyplanner-container">
              <div className="studyplanner-container">
                <div className="homepagecontent-left-header">
                  <h6>Hero Image</h6>
                </div>
                <div className="studyplanner-image">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      onClick={() =>
                        document.getElementById("image-upload").click()
                      }
                      style={{
                        width: "90%",
                        height: "170px",
                        marginTop: "1rem",
                        borderRadius: "10px",
                      }}
                    />
                  ) : (
                    <IoImageOutline
                      onClick={() =>
                        document.getElementById("image-upload").click()
                      }
                    />
                  )}
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
                <div className="handwritten-notes">
                  <p>Note* ( Image size should be less than 20mb )</p>
                  <p>Image format should be PNG, JPEG or SVG*</p>
                </div>
                <div className="handwritten-button-container">
                  <div className="handwritten-button">
                    <button onClick={() => updateBanner()}>Update Image</button>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="studyplanner-image">
              <IoImageOutline />
            </div> */}
            <div className="studyplanner-center-header">
              <h6>Popular Exams</h6>
              <MdAddBox className="cursor-pointer" onClick={() => navigate("/goalexams/add-goalexam")} />
            </div>
            <div className="studyplanner-exams">
              {data?.data &&
                data?.data?.map((data, index) => (
                  <div className="studyplanner-exam">
                    <img
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                      }}
                      src={data?.image}
                      alt=""
                    />
                    <h6>{data?.name}</h6>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(StudyPlannerAI);
