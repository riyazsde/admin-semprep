import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";

import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Pagination from "../../components/Pagination/Pagination";
import {
  deleteStudyPlannerCourse,
  getAllStudents,
  getAllStudyPlans,
} from "../../services/exportFunctions";
import { FaPlus } from "react-icons/fa";
import { generateCsv } from "../../services/exportComponents";

const StudentStudyPlans = () => {
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
    getAllStudyPlans({ setIsLoading, setData, params });
  };
  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);
  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Study Planner Courses</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Study Planner /<span> Student Study Plans</span>
          </p>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link
              to={
                "/study-planner/study-plannercourses/add-study-plannercourses"
              }
              className="link"
            >
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW STUDY PLANNER COURSE </h6>
              </div>
            </Link>
            <div className="handwrittennotes-search">
              <IoSearch color="#ADB5BD" />
              <input
                type="search"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {data?.docs?.length > 0 && (
              <div
                onClick={() =>
                  generateCsv(
                    [
                      "Goal Category",
                      "Goal Exam",
                      "Study Planner Title",
                      "Description",
                      "Price",
                      "Duration",
                      "Lessons",
                    ],
                    data?.docs?.map((item) => [
                      item.goalCategory?.name || "",
                      item.goal?.name || "",
                      item.title || "",
                      item.description || "",
                      item.price || 0,
                      item.duration || 0,
                      item.lessons || 0,
                    ]),
                    `StudyPlanner-${currentPage}.csv`
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
                  <th>Study Planner Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Duration</th>
                  <th>Lessons </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.docs?.map((data, index) => (
                  <tr key={index}>
                    <td>{data.goalCategory?.name || ""}</td>
                    <td>{data.goal?.name || ""}</td>
                    <td>{data.title || ""}</td>
                    <td>{data.description || ""}</td>
                    <td>{data.price || 0}</td>
                    <td>{data.duration || ""}</td>
                    <td>{data.lessons || ""}</td>

                    <td>
                      <div className="handwrittennotes-table-icons">
                        <div
                          className="handwrittennotes-icon"
                          onClick={() => navigate("/students/student-profile")}
                        >
                          <MdArrowOutward />
                        </div>
                        <div className="handwrittennotes-icon">
                          <FiEdit3
                            onClick={() =>
                              navigate(
                                `/study-planner/study-plannercourses/edit-study-plannercourses/${data._id}`
                              )
                            }
                          />
                        </div>
                        <div className="handwrittennotes-icon">
                          <AiOutlineDelete
                            onClick={() =>
                              deleteStudyPlannerCourse({
                                id: data._id,
                                addFun: () => getData(),
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

export default HOC(StudentStudyPlans);
