import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";

import { GoArrowLeft } from "react-icons/go";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { TbUpload } from "react-icons/tb";
import { IoImageOutline, IoSearch } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import {
  deleteYouTubeVideo,
  getAllStudyPlans,
  getYouTubeVideos,
} from "../../services/exportFunctions";
import { getFormattedDate } from "../../services/exportComponents";

const YoutubeVideos = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

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
      userType: "USER",
    };
    getYouTubeVideos({ setIsLoading, setData, params });
  };
  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);
  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Youtube Videos</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Dashboard / Current Affairs /<span> Youtube Videos</span>
          </p>
        </div>
        <div className="homepagecontent">
          <div className="handwrittennotes-list-header mb-2">
            <Link
              to={"/dashboard/current-affairs/add-youtube-videos"}
              className="link"
            >
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW Youtube Video </h6>
              </div>
            </Link>
            {/* <div className="handwrittennotes-search">
              <IoSearch color="#ADB5BD" />
              <input
                type="search"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div> */}
          </div>
          <div className="studyplanner-container">
            <div className="youtubevideos-container">
              {data?.data?.map((i, index) => (
                <div className="youtubevideos-div">
                  <label htmlFor="">Video 1</label>
                  <div className="youtubevideos-div-div">
                    <div className="youtubevideos-div-left">
                      <h6>Thumbnail</h6>
                      <div className="addimage">
                        {i?.thumbnail ? (
                          <img
                            style={{ width: "130px", height: "100px" }}
                            src={i?.thumbnail}
                            alt=""
                          />
                        ) : (
                          <IoImageOutline />
                        )}
                      </div>
                      <div>
                        <div className="handwritten-button">
                          <button
                            onClick={() =>
                              deleteYouTubeVideo({
                                id: i._id,
                                addFun: () => getData(),
                              })
                            }
                          >
                            Delete Video
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="youtubevideos-div-right">
                      <div className="youtubevideos-right-div">
                        <h6 htmlFor="">Description</h6>
                        <div className="youtubevideos-main-div-div">
                          <p>{i?.description || ""}</p>
                        </div>
                      </div>
                      <div className="youtubevideos-div-bottom">
                        <div className="youtubevideos-div-bottom-div">
                          <h6>Creator Name</h6>
                          <div className="youtubevideos-main-div-div">
                            <p>{i?.creatorName || ""} </p>
                          </div>
                        </div>
                        <div className="youtubevideos-div-bottom-div">
                          <h6>Publish Date</h6>
                          <div className="youtubevideos-main-div-div">
                            <p>{getFormattedDate(i?.publishDate) || ""}</p>
                          </div>
                        </div>
                        <div className="youtubevideos-div-bottom-div">
                          <h6>Video File</h6>
                          <div className="youtubevideos-main-div-div">
                            <p>{i?.videoFileLink || ""}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="addhandwritennotes-submit">
            <div className="handwritten-button">
              <button onClick={() => navigate("/dashboard/current-affairs")}>
                Publish
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default HOC(YoutubeVideos);
