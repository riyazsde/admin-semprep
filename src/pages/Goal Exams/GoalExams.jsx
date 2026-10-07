import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";

import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Pagination from "../../components/Pagination/Pagination";
import { deleteGoalExam, getGoalExam } from "../../services/exportFunctions";
import { generateCsv } from "../../services/exportComponents";

const GoalExams = () => {
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
    console.log("Limit per Page:", newLimit);
    setLimit(newLimit);
  };
  const getData = () => {
    const params = {
      page: currentPage,
      limit: 10,
      search,
    };
    getGoalExam({ setIsLoading, setData, params });
  };
  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);
  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Courses</h6>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link to={"/goalexams/add-goalexam"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW Course</h6>
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
                    [
                      "Goal Exam",
                      "Goal Category",
                    ],
                    data?.data?.map((item) => [
                      item.name,
                      item.goalCategory?.name,
                    ]),
                    `Goal Exams-${currentPage}.csv`
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
                  <th>Courses</th>
                  <th>University</th>

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
                            style={{ width: "150px ", height: "100px", objectFit: "contain", borderRadius: "8px" }}
                            alt="goal exam"
                          />
                        )}
                      </td>
                      <td>{data.name}</td>
                      <td>{data.goalCategory?.name}</td>

                      <td>
                        <div className="handwrittennotes-table-icons">
                          {/* <div className="handwrittennotes-icon">
                            <MdArrowOutward />
                          </div> */}
                          <div className="handwrittennotes-icon">
                            <FiEdit3
                              onClick={() =>
                                navigate(`/goalexams/edit-goalexam/${data._id}`)
                              }
                            />
                          </div>
                          <div className="handwrittennotes-icon">
                            <AiOutlineDelete
                              onClick={() => {
                                deleteGoalExam({
                                  id: data?._id,
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

export default HOC(GoalExams);
