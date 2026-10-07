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
  deleteHandwrittenNote,
  getAllHandwrittenNotes,
  getBannerByPosition,
  updateBannerByPosition,
} from "../../services/exportFunctions";
import { generateCsv } from "../../services/exportComponents";

const HandwrittenNotes = () => {
  const [show, setShow] = useState(false);
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
      params: { type: "HandwrittenNotes", position: "TOP" },
      setData: setBannerData,
    });
    getAllHandwrittenNotes({ setIsLoading, setData, params });
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
      (banner) => banner.type === "HandwrittenNotes"
    );
    setImagePreview(currentBanner?.image);
    setImageId(currentBanner?._id);
  }, [bannerData]);

  const updateBanner = () => {
    if (!imageFile) return;

    const payload = new FormData();
    payload.append("image", imageFile);
    payload.append("type", "HandwrittenNotes");
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
          <h6>Handwritten Notes Page Content</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Dashboard /<span> Handwritten Notes</span>
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
          <div className="handwrittennotes-list-header">
            <Link to={"/quizapp/add-handwritten-notes"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW Notes</h6>
              </div>
            </Link>
            <div className="handwrittennotes-search">
              <IoSearch color="#ADB5BD" />
              <input type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
            </div>
            {data?.data?.length > 0 && (
              <div
                onClick={() =>
                  generateCsv(
                    [
                      "Goal Category",
                      "Goal",
                      "Bundle Name",
                      "Toppers Name",
                    ],
                    data?.data?.map((item) => [
                      item?.goalCategory?.name,
                      item?.goal?.name,
                      item?.bundleName,
                      item?.topperName,
                    ]),
                    `students-${currentPage}.csv`
                  )
                }
                className="handwrittennotes-export"
              >
                <span>Export CSV</span>
              </div>
            )}
          </div>
          <div className="handwrittennotes-list-table">
            <table>
              <thead>
                <tr>
                  <th>Goal Category</th>
                  <th>Goal Exam</th>
                  <th>Bundle Name</th>
                  <th>Toppers Name</th>
                  <th>Tile Image</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((data, index) => (
                  <tr key={index}>
                    <td>{data.goalCategory?.name}</td>
                    <td>{data.goal?.name}</td>
                    <td>{data?.bundleName}</td>
                    <td>{data?.topperName}</td>
                    <td>
                      {data?.image ? (
                        <img
                          style={{
                            width: "190px",
                            height: "120px",
                          }}
                          src={data?.image}
                          alt="tileImage"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>

                    <td>
                      <div className="handwrittennotes-table-icons">
                        <div className="handwrittennotes-icon">
                          <MdArrowOutward
                            onClick={() =>
                              navigate(`/quizapp/handwritten-notes`)
                            }
                          />
                        </div>
                        {/* <div className="handwrittennotes-icon">
                          <FiEdit3 />
                        </div> */}
                        <div className="handwrittennotes-icon">
                          <AiOutlineDelete
                            onClick={() =>
                              deleteHandwrittenNote({
                                id: data._id,
                                addFun: getData,
                              })
                            }
                          />
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

export default HOC(HandwrittenNotes);
