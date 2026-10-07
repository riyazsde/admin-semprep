import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { MdAddBox } from "react-icons/md";

import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { IoImageOutline } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdGolfCourse } from "react-icons/md";
import {
  addDashboardCoursePageContent,
  deleteDashboardCoursePageContent,
  getDashboardCoursePageContent,
} from "../../services/exportFunctions";
import { CustomModal, UniversalForm } from "../../services/ModalComponent";
import { DashboardCoursePageContentFormFields } from "../../services/formFields";

const CoursePageContent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isViewItem, setIsViewItem] = useState({});
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const getData = () => {
    getDashboardCoursePageContent({ setIsLoading, setData });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleFormSubmit = (values) => {
    const formData = new FormData();
    {
      Object.keys(values).map((key) => formData.append(key, values[key]));
    }
    addDashboardCoursePageContent({
      addFun: getData,
      data: formData,
      setShowModal,
    });
  };
  return (
    <>
      <CustomModal
        show={showModal}
        onHide={handleCloseModal}
        title={isViewItem ? "View Course" : "Add Course"}
        bodyContent={
          <div>
            <UniversalForm
              mode={isViewItem ? "view" : "edit"}
              formFields={DashboardCoursePageContentFormFields}
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
          <h6>Course Page Content</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
           Dashboard /<span> Courses Page</span>
          </p>
        </div>
        <div className="homepagecontent">
          <div className="homepagecontent-bottom">
            <div className="homepagecontent-left">
              <div className="homepagecontent-left-header">
                <h6>Displayed Courses</h6>
                <MdAddBox
                  onClick={() => {
                    setIsViewItem(null);
                    handleShowModal();
                  }}
                />
              </div>
              <div className="homepagecontent-left-table">
                <table>
                  <thead>
                    <tr>
                      <th>Thumbnail</th>
                      <th style={{ textAlign: "left", paddingLeft: "10px" }}>
                        Title
                      </th>
                      <th>Description</th>
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
                                  style={{
                                    maxWidth: "180px",
                                    maxHeight: "100px",
                                  }}
                                  src={item?.image}
                                />
                              ) : (
                                <IoImageOutline />
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="coursepagecontent-box">
                              <span>{item.name}</span>
                            </div>
                          </td>
                          <td>
                            <div className="coursepagecontent-box">
                              <span>{item.desc ? item.desc : "No description available"}</span>
                            </div>
                          </td>
                          <td>
                            <div className="actiontable">
                              <IoMdEye
                                onClick={() => {
                                  setIsViewItem(item);
                                  setShowModal(true);
                                }}
                              />
                              <RiDeleteBin6Line
                                onClick={() => {
                                  deleteDashboardCoursePageContent({
                                    addFun: getData,
                                    id: item._id,
                                  });
                                }}
                              />
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
        <div className="dashboardmain">
          <Link to={"/dashboard/course-page/courses"} className="link">
            <div className="coursepageContent-div">
              <MdGolfCourse />
              <h6>Courses</h6>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HOC(CoursePageContent);
