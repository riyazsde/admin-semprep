import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";

import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { IoImageOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";

import Pagination from "../../components/Pagination/Pagination";
import {
  addBannerByPosition,
  addPYQContantents,
  deleteHandwrittenNote,
  getAllHandwrittenNotes,
  getBannerByPosition,
  getPYQContantents,
  updateBannerByPosition,
  updatePYQContantents,
} from "../../services/exportFunctions";
import { showNotification } from "../../services/exportComponents";

const PYQWithVideoPageContent = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const [bannerData, setBannerData] = useState([]);
  const [desc1, setDesc1] = useState("");
  const [desc2, setDesc2] = useState("");
  const [heading, setHeading] = useState("");

  const [imagePreview, setImagePreview] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const getData = () => {
    const params = {
      page: currentPage,
      limit: limit,
      search,
    };
    getPYQContantents({
      setIsLoading,

      setData: (res) => setData(res?.data?.[res?.data?.length - 1] || {}),
    });
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
    if (data) {
      setImagePreview(data?.tileImage || "");
      setImageId(data?._id);

      setDesc1(data?.desc1 || "");
      setDesc2(data?.desc2 || "");
      setHeading(data?.heading || "");
    }
  }, [data]);

  const updateData = () => {
    const updatedData = {
      ...data,
      desc1,
      desc2,
      heading,
    };

    const payload = new FormData();
    if (imageFile) payload.append("image", imageFile);
    payload.append("desc1", updatedData.desc1);
    payload.append("desc2", updatedData.desc2);
    payload.append("heading", updatedData.heading);

    if (imageId) {
      updatePYQContantents({
        id: imageId,
        data: payload,
        addFun: () => getData(),
      });
    } else {
      addPYQContantents({
        data: payload,
        addFun: () => getData(),
      });
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < rating ? <IoMdStar key={i} /> : <IoIosStarOutline key={i} />
      );
    }
    return <div className="table-star">{stars}</div>;
  };
  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>PYQ's with video Page Content</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            {console.log(data, "BOSS")}
            Dashboard /<span> PYQ's with video</span>
          </p>
        </div>
        <div className="homepagecontent">
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
          </div>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-table">
            <div>
              <div className="aboutexam-container-main">
                <div className="pyq-with-video-container-div mb-3">
                  <h6>
                    <span>Description</span>
                    <span></span>
                  </h6>
                  <div
                    contentEditable
                    onBlur={(e) => setDesc1(e.target.innerText)}
                    suppressContentEditableWarning={true}
                    className="editable-content"
                  >
                    <h5> {data?.desc1 || ""}</h5>
                  </div>
                </div>
                <div className="pyq-with-video-container-div mb-3">
                  <h6>
                    <span>Heading Text</span>
                    <span></span>
                  </h6>
                  <div
                    contentEditable
                    onBlur={(e) => setHeading(e.target.innerText)}
                    suppressContentEditableWarning={true}
                    className="editable-content"
                  >
                    <h5>{data?.heading || ""}</h5>
                  </div>
                </div>
                <div className="pyq-with-video-container-div mb-3">
                  <h6>
                    <span>Description 2</span>
                    <span></span>
                  </h6>
                  <div
                    contentEditable
                    onBlur={(e) => setDesc2(e.target.innerText)}
                    suppressContentEditableWarning={true}
                    className="editable-content"
                  >
                    <h5>{data?.desc2 || ""}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {" "}
            <div className="handwritten-button-container">
              <div className="handwritten-button">
                <button onClick={() => updateData()}>Update </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(PYQWithVideoPageContent);
