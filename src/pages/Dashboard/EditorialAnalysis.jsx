import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { PriviewNewsModal } from "../../components/Modals/Modals";

import { GoArrowLeft } from "react-icons/go";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";

import { CustomModal, UniversalForm } from "../../services/ModalComponent";
import {
  addDailyNews,
  deleteDailyNews,
  getDailyNews,
  getGoalCategory,
  getGoalExam,
  getGoalExamByGoalCategory,
  updateDailyNews,
} from "../../services/exportFunctions";
import {
  AboutExamPageContantFormFields,
  DailyNewsFormsField,
} from "../../services/formFields";
import { MdAddBox } from "react-icons/md";
import { showNotification } from "../../services/exportComponents";
import { uploadImage } from "../../services/otherFunction";

const EditorialAnalysis = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("edit");
  const [isViewItem, setIsViewItem] = useState({});
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [selectedGoalCategory, setSelectedGoalCategory] = useState(null);
  const [data3, setData3] = useState(null);
  const [isLoading3, setIsLoading3] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    setMode("edit");
  };

  const handleFormSubmit = async (data) => {
    if (!data.image) {
      showNotification({
        type: "error",
        message: "Please upload an image",
      });
      return;
    }

    const payload = new FormData();
    payload.append("content", data.content);
    payload.append("goalCategoryId", data.goalCategoryId);
    payload.append("goalId", data.goalId);
    payload.append("heading", data.heading);
    payload.append("subheading", data.subheading);
    payload.append("image", data.image);
    payload.append("type", "Editorial Analysis");
    payload.append("date", data.date);
    payload.append("status", "Publish");

    if (mode === "add")
      addDailyNews({
        setIsLoading,
        setData,
        data: payload,
        addFun: () => {
          getDailyNews({
            setIsLoading,
            setData,
            params: { type: "Editorial Analysis" },
          });
          setShowModal(false);
        },
      });
    if (mode === "edit")
      updateDailyNews({
        setIsLoading,
        setData,
        id: isViewItem._id,
        data: payload,
        addFun: () => {
          getDailyNews({
            setIsLoading,
            setData,
            params: { type: "Editorial Analysis" },
          });
          setShowModal(false);
        },
      });
  };

  useEffect(() => {
    getDailyNews({
      setIsLoading,
      setData,
      params: { type: "Editorial Analysis" },
    });
    getGoalCategory({ setIsLoading: setIsLoading2, setData: setData2 });
    // getGoalExam({ setIsLoading: setIsLoading2, setData: setData2 });
  }, []);

  useEffect(() => {
    if (selectedGoalCategory) {
      const params = {
        page: 1,
        limit: 100,
        search: "",
        goalCategoryId: selectedGoalCategory,
      };

      getGoalExamByGoalCategory({
        setIsLoading: setIsLoading3,
        setData: setData3,
      });
    }
  }, [selectedGoalCategory]);

  const toggleReadMore = (id) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleGoalCategoryChange = (name, value) => {
    if (name === "goalCategoryId") {
      const params = {
        page: 1,
        limit: 100,
        search: "",
        goalCategoryId: value,
      };

      getGoalExamByGoalCategory({
        setIsLoading: setIsLoading3,
        setData: setData3,
        params,
      });
    }
  };
  return (
    <>
      <CustomModal
        show={showModal}
        size="lg"
        onHide={handleCloseModal}
        title={mode ? "Editorial Analysis" : "Edit Editorial Analysis"}
        bodyContent={
          <div>
            <UniversalForm
              mode={mode}
              formFields={[
                {
                  type: "select",
                  name: "goalCategoryId",
                  label: "Goal Category",
                  required: true,
                  disabled: mode === "view",
                  options: data2?.data?.map((item) => ({
                    value: item._id,
                    label: item.name,
                  })) || [{ value: "", label: "Select Goal Category" }],
                },
                {
                  type: "select",
                  name: "goalId",
                  label: "Goal Exam",
                  required: true,
                  disabled: mode === "view",
                  options: data3?.data?.map((item) => ({
                    value: item._id,
                    label: item.name,
                  })) || [{ value: "", label: "Select Goal Exam" }],
                },
                ...DailyNewsFormsField,
              ]}
              initialData={isViewItem || {}}
              onSelectChange={handleGoalCategoryChange}
              onSubmit={(data) => {
                handleFormSubmit(data);
              }}
            />
          </div>
        }
      />
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Editorial Analysis</h6>
          <p className="d-flex align-items-center justify-content-between">
            <p>
              <GoArrowLeft
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              Dashboard / Current Affairs /<span> Editorial Analysis</span>
            </p>
            <div className="groups-header-right">
              <MdAddBox
                onClick={() => {
                  setMode("add");
                  setShowModal(true);
                  setIsViewItem({});
                }}
              />
            </div>
          </p>
        </div>
        <div className="homepagecontent">
          <div className="preview-container-modal">
            {data &&
              data?.map((item) => (
                <div className="preview-modal-div" key={item._id}>
                  <div className="preview-modal-div-img">
                    <img src={item?.image} alt="" />
                  </div>
                  <div className="preview-modal-div-right">
                    <div className="preview-modal-div-heading">
                      <h1 className="d-flex justify-content-between">
                        <span>{item.heading}</span>
                        <span className="d-flex g-1">
                          <span
                            onClick={() => {
                              setIsViewItem(item);
                              setShowModal(true);
                              setMode("edit");
                            }}
                          >
                            Edit
                          </span>
                          <span
                            onClick={() => {
                              deleteDailyNews({
                                id: item._id,
                                addFun: () =>
                                  getDailyNews({
                                    setIsLoading,
                                    setData,
                                    params: { type: "Editorial Analysis" },
                                  }),
                              });
                            }}
                          >
                            Delete
                          </span>
                        </span>
                      </h1>
                      <h6>{item.subheading}</h6>
                    </div>
                    <div className="preview-modal-div-content">
                      <p>
                        {expandedItems[item._id]
                          ? item.content
                          : item.content?.slice(0, 400) + "..."}
                      </p>
                    </div>
                    <div
                      className="preview-modal-div-readmore"
                      onClick={() => toggleReadMore(item._id)}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      <span>
                        {expandedItems[item._id] ? "Read Less" : "Read More"}
                      </span>
                      {expandedItems[item._id] ? (
                        <FaArrowLeft />
                      ) : (
                        <FaArrowRight />
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(EditorialAnalysis);
