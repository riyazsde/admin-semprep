import React from "react";
import HOC from "../../components/HOC/HOC";

import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { IoImageOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Pagination from "../../components/Pagination/Pagination";
import {
  addBannerByPosition,
  deleteHandwrittenNote,
  getAllHandwrittenNotes,
  getAllSkills,
  getBannerByPosition,
  updateBannerByPosition,
} from "../../services/exportFunctions";
import { useState, useEffect } from "react";

const SkillsPage = () => {
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
      setData: setBannerData,
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
          <h6>Skills Page Content</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            SkillsPage /<span> Skills</span>
          </p>
        </div>
        {/* <div className="studyplanner-container">
          <div className="homepagecontent-left-header">
            <h6>Hero Image</h6>
          </div>
          <div className="studyplanner-image">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                onClick={() => document.getElementById("image-upload").click()}
                style={{
                  width: "90%",
                  height: "170px",
                  marginTop: "1rem",
                  borderRadius: "10px",
                }}
              />
            ) : (
              <IoImageOutline
                onClick={() => document.getElementById("image-upload").click()}
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
        </div> */}
        {/* <div className="homepagecontent">
          <div className="studyplanner-container">
            <div className="homepagecontent-left-header">
              <h6>Hero Image</h6>
            </div>
            <div className="studyplanner-image">
              <IoImageOutline />
            </div>
            <div className="handwritten-notes">
              <p>Note* ( Image size should be less than 20mb )</p>
              <p>Image format should be PNG, JPEG or SVG*</p>
            </div>
            <div className="handwritten-button-container">
              <div className="handwritten-button">
                <button>Upload New Image</button>
              </div>
            </div>
          </div>
        </div> */}
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link to={"/dashboard/skills/add-skill"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW skill</h6>
              </div>
            </Link>
            {/* <div className="handwrittennotes-search">
              <IoSearch
                color="#ADB5BD"
                onChange={(e) => setSearch(e.target.value)}
              />
              <input type="search" placeholder="Search..." />
            </div>
            <div className="handwrittennotes-export">
              <span>Export CSV</span>
            </div> */}
          </div>
          <div className="handwrittennotes-list-table">
            <table>
              <thead>
                <tr>
                  <th>Skill Name</th>
                  <th>Price</th>
                  <th>Duration ( Min )</th>
                  <th>Heighlights</th>
                  <th>Number of Courses</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((data, index) => (
                  <tr>
                    <td>{data?.name}</td>
                    <td>{data?.price}</td>
                    <td>{data?.duration}</td>
                    <td>{data?.courseHighlights}</td>
                    <td>{data?.numberOfCourses}</td>
                    <td>
                      <div className="handwrittennotes-table-icons">
                        <div className="handwrittennotes-icon">
                          <MdArrowOutward />
                        </div>
                        <div className="handwrittennotes-icon">
                          <FiEdit3 />
                        </div>
                        <div className="handwrittennotes-icon">
                          <AiOutlineDelete />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              totalPages={data?.pagination?.totalPages}
              onPageChange={handlePageChange}
              onLimitChange={handleLimitChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(SkillsPage);
