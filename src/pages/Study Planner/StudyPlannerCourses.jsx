import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";

import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import Pagination from "../../components/Pagination/Pagination";
import {
  getAllStudyPlans,
  getStudyPlannerPlans,
  deleteStudyPlannerPlan,
} from "../../services/exportFunctions";
import { generateCsv, getFormattedDate } from "../../services/exportComponents";

const StudyPlannerCourses = () => {
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
    getStudyPlannerPlans({ setIsLoading, setData, params });
  };
  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);
  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Student Study Plans</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/study-planner")}
            />
            Study Planner /<span> Study Study Plans</span>
          </p>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link to={"/study-planner/add-student-studyplan"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW Study Plan</h6>
              </div>
            </Link>
            <div className="handwrittennotes-search">
              <IoSearch color="#ADB5BD" />
              <input type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
            </div>
            {data?.docs?.length > 0 && (
              <div
                onClick={() =>
                  generateCsv(
                    ["Title", "Description", "Created At"],
                    data?.docs?.map((item) => [
                      item.title,
                      item.description,
                      item.createdAt
                        ?.slice(0, 10)
                        ?.split("-")
                        ?.reverse()
                        ?.join("-"),
                    ]),
                    `student-study-plans-${currentPage}.csv`
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
                  <th>Image</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Created At</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.docs?.map((data, index) => (
                  <tr key={index}>
                    <td className="d-flex justify-content-center align-items-center">
                      <img
                        style={{ width: "100px", height: "100px" }}
                        src={data.image}
                        alt="image"
                      />
                    </td>
                    <td>{data.title || ""}</td>
                    <td>{data.description || ""}</td>
                    <td>{getFormattedDate(data.createdAt) || ""}</td>

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
                                `/study-planner/edit-student-studyplan/${data._id}`
                              )
                            }
                          />
                        </div>
                        <div className="handwrittennotes-icon">
                          <AiOutlineDelete
                            onClick={() =>
                              deleteStudyPlannerPlan({
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
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(StudyPlannerCourses);
