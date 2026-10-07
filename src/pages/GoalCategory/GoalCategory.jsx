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
  deleteGoalCategory,
  getGoalCategory,
} from "../../services/exportFunctions";
import { generateCsv } from "../../services/exportComponents";

const GoalCategory = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
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
    };
    getGoalCategory({ setIsLoading, setData, params });
  };
  useEffect(() => {
    getData();
  }, [currentPage, limit, search]);

  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>University</h6>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link to={"/goal/add-goal"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add new university</h6>
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
            {data?.data?.length > 0 && (
              <div
                onClick={() =>
                  generateCsv(
                    [
                      "Goal Category",
                      "Is Govt. Exam",
                    ],
                    data?.data?.map((item) => [
                      item.name,
                      item.isGovernmentExam ? "Yes" : "No",
                    ]),
                    `Goal Category-${currentPage}.csv`
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
                  <th>University</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.length > 0 &&
                  data?.data?.map((data, index) => (
                    <tr key={index}>
                      <td>
                        {data?.imageUrl && (
                          <img
                            src={data?.imageUrl}
                            style={{ width: "150px ", height: "100px", objectFit: "contain", borderRadius: "8px" }}
                            alt="goal exam"
                          />
                        )}
                      </td>
                      <td>{data?.name}</td>
                      <td>{data?.description}</td>
                      {/* <td>{data?.isGovernmentExam ? "Yes" : "No"}</td> */}

                      <td>
                        <div className="handwrittennotes-table-icons">
                          {/* <div className="handwrittennotes-icon">
                            <MdArrowOutward />
                          </div>
                          <div className="handwrittennotes-icon">
                            <FiEdit3 />
                          </div> */}
                          <div className="handwrittennotes-icon">
                            <AiOutlineDelete
                              onClick={() =>
                                deleteGoalCategory({
                                  id: data?._id,
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

export default HOC(GoalCategory);
