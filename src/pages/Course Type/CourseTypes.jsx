import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";

import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Pagination from "../../components/Pagination/Pagination";
import {
  deleteCourseType,
  deleteGoalExam,
  getAllCourseTypes,
  getGoalExam,
} from "../../services/exportFunctions";
import { generateCsv } from "../../services/exportComponents";

const CourseTypes = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (newLimit) => {
 
    setLimit(newLimit);
  };
  const getData = () => {
    const params = {
      page: currentPage,
      limit: limit,
      search,
    };
    getAllCourseTypes({ setIsLoading, setData, params });
  };
  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);
  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Course Types</h6>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link to={"/add-course-type"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW Course Type</h6>
              </div>
            </Link>
            <div className="handwrittennotes-search">
              <IoSearch color="#ADB5BD" />
              <input
                type="search"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
              />
            </div>
            {data?.data?.length > 0 && (
              <div
                onClick={() =>
                  generateCsv(
                    ["Name", "Description"],
                    data?.data?.map((item) => [item?.name, item?.desc]),
                    `Course Types-${currentPage}.csv`
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
                  <th>Name</th>
                  <th>Description</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.data &&
                  data?.data?.map((data, index) => (
                    <tr key={index}>
                      <td>
                        {data?.image && (
                          <img
                            src={data?.image}
                            style={{ width: "150px ", height: "100px" }}
                            alt="image"
                          />
                        )}
                      </td>
                      <td style={{ width: "200px" }}>{data.name}</td>
                      <td style={{ wordBreak: "break-word" }}> {data.desc}</td>

                      <td>
                        <div className="handwrittennotes-table-icons">
                          {/* <div className="handwrittennotes-icon">
                            <MdArrowOutward />
                          </div> */}
                          <div className="handwrittennotes-icon">
                            <FiEdit3
                              onClick={() =>
                                navigate(`/edit-course-type/${data._id}`)
                              }
                            />
                          </div>
                          <div className="handwrittennotes-icon">
                            <AiOutlineDelete
                              onClick={() => {
                                deleteCourseType({
                                  id: data._id,
                                  addFun: getData,
                                });
                              }}
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

export default HOC(CourseTypes);
