import React, { useEffect } from "react";
import HOC from "../../components/HOC/HOC";
import { MdAddBox } from "react-icons/md";
import { getRequest, useNavigate, useState } from "../../services/exports";
import { GoArrowLeft } from "react-icons/go";
import { IoImageOutline } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { endpoints } from "../../services/endPoints";
import {
  addHomePageContentBanner,
  addHomePageContentRewards,
  addHomePageContentTopContent,
  deleteHomePageContentBanner,
  deleteHomePageContentRewards,
  deleteHomePageContentTopContent,
  getHomePageContentBanner,
  getHomePageContentRewards,
  getHomePageContentTopContent,
} from "../../services/exportFunctions";
import { CustomModal, UniversalForm } from "../../services/ModalComponent";
import {
  HomePageAddAdvertisment,
  HomePageAddRewardsFormFields,
  HomePageAddTopContentFormFields,
} from "../../services/formFields";
import { uploadImage } from "../../services/otherFunction";

const HomePageContent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [rewards, setRewards] = useState(null);
  const [topContent, setTopContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isViewItem, setIsViewItem] = useState(null);

  const getData = () => {
    getHomePageContentBanner({ setIsLoading, setData });
    getHomePageContentRewards({ setIsLoading, setData: setRewards });
    getHomePageContentTopContent({ setIsLoading, setData: setTopContent });
  };
  useEffect(() => {
    getData();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [showModel2, setShowModel2] = useState(false);
  const [showModel3, setShowModel3] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleOpenModal2 = () => setShowModel2(true);
  const handleCloseModal2 = () => setShowModel2(false);

  const handleOpenModal3 = () => setShowModel3(true);
  const handleCloseModal3 = () => setShowModel3(false);

  const handleFormSubmit = (values) => {
    const formData = new FormData();
    formData.append("position", "TOP");

    {
      Object.keys(values).map((key) => formData.append(key, values[key]));
    }
    addHomePageContentBanner({ addFun: getData, data: formData, setShowModal });
  };

  const handleFormSubmit2 = async (values) => {
    console.log(values);
    const formData = new FormData();

    if (values?.image) {
      try {
        const imageUrl = await uploadImage({ data: values.image });
        console.log("Image upload success:", imageUrl);

        if (imageUrl) {
          const payload = {
            ...values,
            image: imageUrl,
            recipient: "ALL",
            isPercent: true,
          };

          addHomePageContentRewards({
            addFun: getData,
            data: payload,
            setShowModal: setShowModel2,
          });
        }
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }

    if (addHomePageContentRewards) {
    }
  };
  const handleFormSubmit3 = async (values) => {
    const formData = new FormData();

    if (values?.image) {
      try {
        const imageUrl = await uploadImage({ data: values.image });
        console.log("Image upload success:", imageUrl);

        if (imageUrl) {
          delete values.image;
          const payload = {
            ...values,
            thumbnail: imageUrl,
            isActive: true,
          };

          addHomePageContentTopContent({
            addFun: getData,
            data: payload,
            setShowModal: setShowModel3,
          });
        }
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }

    if (addHomePageContentRewards) {
    }
  };

  return (
    <>
      <CustomModal
        show={showModal}
        onHide={handleCloseModal}
        title={isViewItem ? "View Banner" : "Add Top Banner"}
        bodyContent={
          <div>
            <UniversalForm
              mode={isViewItem ? "view" : "edit"}
              formFields={HomePageAddAdvertisment}
              initialData={isViewItem || {}}
              onSubmit={(data) => {
                handleFormSubmit(data);
              }}
            />
          </div>
        }
      />
      <CustomModal
        show={showModel2}
        onHide={handleCloseModal2}
        title={isViewItem ? "View Rewards" : "Add Rewards"}
        bodyContent={
          <div>
            <UniversalForm
              mode={isViewItem ? "view" : "edit"}
              formFields={HomePageAddRewardsFormFields}
              initialData={isViewItem || {}}
              onSubmit={(data) => {
                handleFormSubmit2(data);
              }}
            />
          </div>
        }
      />
      <CustomModal
        show={showModel3}
        onHide={handleCloseModal3}
        title={isViewItem ? "View Rewards" : "Add Rewards"}
        bodyContent={
          <div>
            <UniversalForm
              mode={isViewItem ? "view" : "edit"}
              formFields={HomePageAddTopContentFormFields}
              initialData={isViewItem || {}}
              onSubmit={(data) => {
                handleFormSubmit3(data);
              }}
            />
          </div>
        }
      />
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Home Page Content</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Dashboard /<span> Home Page</span>
          </p>
        </div>
        <div className="homepagecontent">
          <div className="homepagecontent-top">
            <div className="homepagecontent-left">
              <div className="homepagecontent-left-header">
                <h6>Advertisements (shows at the top in each sections)</h6>
                <MdAddBox
                  onClick={() => {
                    setIsViewItem(null);
                    handleOpenModal();
                  }}
                />
              </div>
              <div className="homepagecontent-left-table">
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data?.filter((item) => item?.type !== "WebSiteImage")?.map((item, index) => (
                        <tr>
                          <td>
                            <div className="addimage">
                              {item?.image ? (
                                <img
                                  style={{ width: "180px", height: "80px" }}
                                  src={item?.image}
                                />
                              ) : (
                                <IoImageOutline />
                              )}
                            </div>
                          </td>
                          {/* <td>
                            <div className="totalorders">
                              <span>{index + 1}</span>
                            </div>
                          </td>
                          <td>
                            <div className="totalorders">
                              <span>{item?.type}</span>
                            </div>
                          </td> */}
                          <td>
                            <div className="actiontable">
                              <IoMdEye
                                onClick={() => {
                                  setIsViewItem(item);
                                  setShowModal(true);
                                }}
                              />
                              <RiDeleteBin6Line
                                onClick={() =>
                                  deleteHomePageContentBanner({
                                    addFun: getData,
                                    id: item?._id,
                                  })
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <div className="homepagecontent-left">
              <div className="homepagecontent-left-header">
                <h6>Rewards</h6>
                <MdAddBox
                  onClick={() => {
                    setIsViewItem(null);
                    handleOpenModal2();
                  }}
                />
              </div>
              <div className="homepagecontent-left-table">
                <table>
                  <thead>
                    <tr>
                      <th>Reward Image</th>
                      <th>Reward Code</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rewards &&
                      rewards?.map((item, index) => (
                        <tr>
                          <td>
                            <div className="addimage">
                              {item?.image ? (
                                <img
                                  style={{ width: "80px", height: "40px" }}
                                  src={item?.image}
                                />
                              ) : (
                                <IoImageOutline />
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="totalorders">
                              <span>{item?.code}</span>
                            </div>
                          </td>
                          <td>
                            <div className="actiontable">
                              <IoMdEye
                                onClick={() => {
                                  setShowModel2(true);
                                  setIsViewItem(item);
                                }}
                              />
                              <RiDeleteBin6Line
                                onClick={() =>
                                  deleteHomePageContentRewards({
                                    addFun: getData,
                                    id: item?._id,
                                  })
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div> */}
          </div>
          <div className="homepagecontent-bottom">
            {/* <div className="homepagecontent-left">
              <div className="homepagecontent-left-header">
                <h6>Top content this week</h6>
                <MdAddBox
                  onClick={() => {
                    setIsViewItem(null);
                    handleOpenModal3();
                  }}
                />
              </div>
              <div className="homepagecontent-left-table">
                <table>
                  <thead>
                    <tr>
                      <th>Thumbnail</th>
                      <th style={{ textAlign: "left", paddingLeft: "10px" }}>
                        Heading Text
                      </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topContent &&
                      topContent?.map((item, index) => (
                        <tr>
                          <td>
                            <div className="addimage">
                              {item?.thumbnail ? (
                                <img
                                  style={{ width: "80px", height: "40px" }}
                                  src={item?.thumbnail}
                                />
                              ) : (
                                <IoImageOutline />
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="totalorders">
                              <span>{item?.headingText}</span>
                            </div>
                          </td>
                          <td>
                            <div className="actiontable">
                              <IoMdEye
                                onClick={() => {
                                  setIsViewItem(item);
                                  setShowModel3(true);
                                }}
                              />
                              <RiDeleteBin6Line
                                onClick={() =>
                                  deleteHomePageContentTopContent({
                                    addFun: getData,
                                    id: item?._id,
                                  })
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(HomePageContent);
