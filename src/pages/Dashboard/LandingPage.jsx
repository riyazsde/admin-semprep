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
  getBannerByPosition,
  getHomePageContentBanner,
  getHomePageContentRewards,
  getHomePageContentTopContent,
  updateHomePageContentBanner,
} from "../../services/exportFunctions";
import { CustomModal, UniversalForm } from "../../services/ModalComponent";
import {
  HomePageAddAdvertisment,
  HomePageAddRewardsFormFields,
  HomePageAddTopContentFormFields,
} from "../../services/formFields";
import { uploadImage } from "../../services/otherFunction";
import { AiFillEdit, AiFillPlusCircle } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";

const LandingPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [rewards, setRewards] = useState(null);
  const [topContent, setTopContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isViewItem, setIsViewItem] = useState(null);
  const [mode, setMode] = useState("view");

  const getData = () => {
    getBannerByPosition({
      setIsLoading,
      setData,
      params: { type: "WebSiteImage" },
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [showModel2, setShowModel2] = useState(false);
  const [showModel3, setShowModel3] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleFormSubmit = (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append("type", "WebSiteImage");
    formData.append("image", values.image);
    if (mode === "add")
      addHomePageContentBanner({
        addFun: () => {
          getData();
          setShowModal(false);
        },
        data: formData,
        setShowModal,
      });
    if (mode === "edit")
      updateHomePageContentBanner({
        addFun: () => {
          getData();
          setShowModal(false);
        },
        data: formData,
        setShowModal,
        id: isViewItem?._id,
      });
  };

  return (
    <>
      <CustomModal
        show={showModal}
        onHide={handleCloseModal}
        title={
          mode === "view"
            ? "View Image"
            : mode === "edit"
            ? "Edit Image"
            : "Add Website Image"
        }
        bodyContent={
          <div>
            <UniversalForm
              mode={mode}
              formFields={[
                {
                  type: "file",
                  name: "image",
                  label: "Image",
                  required: true,
                },
              ]}
              initialData={isViewItem || {}}
              onSubmit={(data) => {
                handleFormSubmit(data);
              }}
            />
          </div>
        }
      />

      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Landing Page Content</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Dashboard /<span> Landing Page Content</span>
          </p>
        </div>
        <div className="homepagecontent">
          <div className="homepagecontent-top">
            <div className="homepagecontent-left">
              <div className="homepagecontent-left-header">
                <h6>Website Images</h6>
                {/* <MdAddBox
                  onClick={() => {
                    setMode("add");
                    setIsViewItem(null);
                    handleOpenModal();
                  }}
                /> */}
              </div>
              <div className="homepagecontent-left-table">
                <table>
                  <thead>
                    <tr>
                      <th>Ad Images</th>
                      {/* <th>Display Order</th> */}
                      <th>Ad Section</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data?.map((item, index) => (
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
                          {/* <td>
                            <div className="totalorders">
                              <span>{index + 1}</span>
                            </div>
                          </td> */}
                          <td>
                            <div className="totalorders text-bg-danger">
                              {index === 0
                                ? "Above Join India’s #1 Learning platform"
                                : index === 1
                                ? "In Master Your Exam Prep with Comprehensive Section"
                                : index === 2
                                ? "Background Image to Unlock Exclusive Handwritten Notes by Toppers"
                                : "Above Join India’s #4 Learning platform"}
                            </div>
                          </td>
                          <td>
                            <div className="actiontable">
                              <IoMdEye
                                onClick={() => {
                                  setMode("view");
                                  setIsViewItem(item);
                                  setShowModal(true);
                                }}
                              />
                              <FiEdit3
                                onClick={() => {
                                  setMode("edit");
                                  setIsViewItem(item);
                                  setShowModal(true);
                                }}
                              />

                              {/* <RiDeleteBin6Line
                                onClick={() =>
                                  deleteHomePageContentBanner({
                                    addFun: getData,
                                    id: item?._id,
                                  })
                                }
                              /> */}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(LandingPage);
