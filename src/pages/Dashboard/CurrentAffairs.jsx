import React from "react";
import {
  addBannerByPosition,
  deleteHandwrittenNote,
  getAllHandwrittenNotes,
  getAllSkills,
  getBannerByPosition,
  updateBannerByPosition,
} from "../../services/exportFunctions";
import { useState, useEffect } from "react";

import HOC from "../../components/HOC/HOC";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { IoImageOutline } from "react-icons/io5";
import { IoNewspaperSharp } from "react-icons/io5";

const CurrentAffairs = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const [bannerData, setBannerData] = useState([]);

  const [imagePreview, setImagePreview] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (newLimit) => {
    console.log("Limit per Page:", newLimit);
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
      params: { type: "Skills", position: "TOP" },
      setData: setBannerData,hideMsg:true
    });
    getAllSkills({ setIsLoading, setData, params });
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

  useEffect(() => {
    const currentBanner = bannerData?.find(
      (banner) => banner.type === "Skills"
    );
    setImagePreview(currentBanner?.image);
    setImageId(currentBanner?._id);
  }, [bannerData]);

  const updateBanner = () => {
    if (!imageFile) return;

    const payload = new FormData();
    payload.append("image", imageFile);
    payload.append("type", "Skills");
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
  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Current Affairs Page Content</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Dashboard /<span> Current Affairs</span>
          </p>
        </div>
          {/* <div className="homepagecontent">
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
          </div> */}
        <div className="handwrittennotes-list">
          <div className="dashboardmain">
            <Link to={"/dashboard/current-affairs/daily-news"} className="link">
              <div className="coursepageContent-div">
                <IoNewspaperSharp />
                <h6>Daily News</h6>
              </div>
            </Link>
            <Link to={"/dashboard/current-affairs/daily-news/pdf"} className="link">
              <div className="coursepageContent-div">
                <IoNewspaperSharp />
                <h6>Daily News PDF</h6>
              </div>
            </Link>
            <Link
              to={"/dashboard/current-affairs/editorial-analysis"}
              className="link"
            >
              <div className="coursepageContent-div">
                <IoNewspaperSharp />
                <h6>Editorial Analysis</h6>
              </div>
            </Link>
            {/* <Link to={"/dashboard/current-affairs/daily-quiz"} className="link">
              <div className="coursepageContent-div">
                <IoNewspaperSharp />
                <h6>Daily Quiz</h6>
              </div>
            </Link> */}
            

            <Link
              to={"/dashboard/current-affairs/target-current-affairs"}
              className="link"
            >
              <div className="coursepageContent-div">
                <IoNewspaperSharp />
                <h6>Target Current Affairs</h6>
              </div>
            </Link>
            <Link
              to={"/dashboard/current-affairs/youtube-videos"}
              className="link"
            >
              <div className="coursepageContent-div">
                <IoNewspaperSharp />
                <h6>Youtube Videos</h6>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(CurrentAffairs);
