import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { CreatePostModal } from "../../components/Modals/Modals";

import img from "../../assest/img10.jpg";

import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { IoImageOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineLike } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { RxShare1 } from "react-icons/rx";
import { IoEyeOutline } from "react-icons/io5";
import { BiPin } from "react-icons/bi";
import {
  addBannerByPosition,
  deleteCommunityItem,
  deletePost,
  getAllComunityItems,
  getBannerByPosition,
  getHomePageContentBanner,
  likePost,
  savePost,
  sendPost,
  updateBannerByPosition,
  updateBannerSingle,
} from "../../services/exportFunctions";
import { timeAgo } from "../../services/exportComponents";
import { RiDeleteBin6Line } from "react-icons/ri";

const CommunityPage = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [visibleComments, setVisibleComments] = useState({});
  const [comment, setComment] = useState("");
  const [isView, setIsView] = useState({});
  const [isLike, setIsLike] = useState({});
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
    // getBannerByPosition({
    //   setIsLoading,
    //   params: { type: "Community", position: "TOP" },
    //   setData: setBannerData,
    // });
    getAllComunityItems({ setIsLoading, setData, params });
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

  // useEffect(() => {
  //   const currentBanner = bannerData?.find(
  //     (banner) => banner.type === "Community"
  //   );
  //   setImagePreview(currentBanner?.image);
  //   setImageId(currentBanner?._id);
  // }, [bannerData]);

  const toggleComments = (postId) => {
    setVisibleComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const handleSendMessage = (postId) => {
    sendPost({
      id: postId,
      data: {
        comment,
      },
      addFun: () => {
        setComment("");
        getData();
      },
    });
  };

  const handleLikePost = (postId) => {
    likePost({
      id: postId,
      addFun: () => {
        getData();
      },
    });
  };

  const handleSavePost = (postId) => {
    savePost({
      id: postId,
      addFun: () => {
        getData();
      },
    });
  };

  const updateBanner = () => {
    if (!imageFile) return;

    const payload = new FormData();
    payload.append("image", imageFile);
    payload.append("type", "Community");
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
      <CreatePostModal
        isView={isView}
        show={show}
        onHide={() => setShow(false)}
        onShow={() => setShow(true)}
        getData={getData}
      />
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Community Page Content</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Dashboard /<span> Community </span>
          </p>
        </div>
        <div className="homepagecontent">
          {/* <div className="studyplanner-container">
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
                <button onClick={() => updateBanner()}>Upload New Image</button>
              </div>
            </div>
          </div> */}
          <div className="community-container">
            <div className="community-header">
              <h6>Posts</h6>
              <div className="handwritten-button">
                <button
                  onClick={() => {
                    setIsView(null);
                    setShow(true);
                  }}
                >
                  Create Post
                </button>
              </div>
            </div>
            {data?.posts?.map((post) => (
              <div className="community-main" key={post.id}>
                <div className="community-main-div">
                  <div className="community-main-div-profile">
                    <div className="community-profile">
                      <div className="community-profile-main">
                          {/* <div className="community-profile-image">
                            <img src={post?.user?.image || img} alt="image" />
                          </div> */}
                        <div className="community-profile-content">
                          <h6>{post?.createdBy?.fullName || ""}</h6>
                          <p>{timeAgo(post?.createdAt) || ""}</p>
                        </div>
                      </div>
                      <div className="community-profile-edit">
                        <FaEdit
                          onClick={() => {
                            setIsView(post);
                            setShow(true);
                          }}
                        />
                        <span>
                          <AiOutlineDelete
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              deletePost({
                                id: post._id,
                                addFun: () => {
                                  getData();
                                },
                              });
                            }}
                          />
                        </span>
                      </div>
                    </div>
                    <div className="community-content">
                      {post?.image && (
                        <p className="d-flex justify-content-center align-items-center">
                          <img
                            style={{ width: "100%", maxHeight: "300px" }}
                            src={post?.image}
                            alt="image"
                          />
                        </p>
                      )}
                      <p>{post?.desc || ""}</p>
                    </div>
                  </div>

                  <div className="community-bottom-container">
                    <div className="community-bottom-like">
                      <div className="community-bottom-likes">
                        <AiOutlineLike
                          onClick={() => handleLikePost(post._id)}
                        />
                        <p>{post?.likes?.length || 0}</p>
                      </div>
                      <div
                        className="community-bottom-likes"
                        onClick={() => toggleComments(post._id)}
                      >
                        <BiComment />
                        <p>{post?.comments?.length || 0}</p>
                      </div>
                      {/* <div className="community-bottom-likes">
                        <RxShare1 />
                        <p>Share</p>
                      </div> */}
                    </div>
                    <div className="community-bottom-pins">
                      <div className="community-bottom-likes">
                        <IoEyeOutline />
                        <p>{post?.views || 0}</p>
                      </div>
                      {/* <div
                        onClick={() => handleSavePost(post._id)}
                        className="community-bottom-likes"
                      >
                        <BiPin />
                        <p>Save</p>
                      </div> */}
                    </div>
                  </div>
                </div>

                {visibleComments[post._id] && (
                  <>
                    {post?.comments?.map((comment) => (
                      <div className="community-main-Admin">
                        <div className="d-flex justify-content-between">
                          <p>
                            <span style={{ color: "#FE5C73" }}>
                              {comment?.user?.fullName || ""} :{" "}
                            </span>
                            {comment?.comment}
                          </p>
                          {/* <span>
                            <RiDeleteBin6Line className="delete-icon-main"
                              onClick={(e) =>
                                deleteCommunityItem({
                                  id: comment?._id,
                                  addFun: () => {
                                    getData();
                                  },
                                })
                              }
                            />
                          </span> */}
                        </div>
                        <div className="community-Admin-header">
                          <div>
                            {" "}
                            <h6>Admin</h6>
                          </div>
                        </div>
                        <div className="community-Admin-textarea">
                          <textarea
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Give reply to this comment here..."
                          ></textarea>
                        </div>
                        <div className="sendbutton">
                          <div className="handwritten-button">
                            <button onClick={() => handleSendMessage(post._id)}>
                              Send Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(CommunityPage);
