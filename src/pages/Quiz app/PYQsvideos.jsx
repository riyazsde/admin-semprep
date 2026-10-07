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
  deletePracticeQuestion,
  deletePYQ,
  deleteTestSeries,
  deleteTopic,
  getAllPracticeQuestions,
  getAllPYQs,
  getAllTestSeries,
  getAllTopics,
} from "../../services/exportFunctions";
import { deleteRequest } from "../../services/apiService";
import { GoArrowLeft } from "react-icons/go";

const PYQsvideos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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
    getAllPYQs({ setIsLoading, setData, params });
  };
  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);

  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>PYQ's with videos</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Quiz app /<span> PYQ's with videos</span>
          </p>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link to={"/quizapp/add-pyqs-videos"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add PYQ's with videos</h6>
              </div>
            </Link>
            <div className="handwrittennotes-search">
              <IoSearch color="#ADB5BD" onChange={(e) => setSearch(e.target.value)} />
              <input
                type="search"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* <div className="handwrittennotes-export">
              <span>Export CSV</span>
            </div> */}
          </div>
          <div className="handwrittennotes-list-table">
            <table>
              <thead>
                <tr>
                  <th>Goal Category</th>
                  <th>Goal Exam</th>
                  <th>Bundle Name</th>
                  <th>Bundle Description</th>
                  <th>Tile Image</th>
                  <th>Test Count</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((data, index) => (
                  <tr key={index}>
                    <td>{data.goalCategory?.name}</td>
                    <td>{data.goal?.name}</td>
                    <td>{data?.bundleName}</td>
                    <td>{data?.bundleDescription}</td>
                    <td>
                      {data?.tileImage ? (
                        <img
                          style={{
                            width: "190px",
                            height: "120px",
                          }}
                          src={data?.tileImage}
                          alt="tileImage"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>{data.testCount}</td>

                    <td>
                      <div className="handwrittennotes-table-icons">
                        {/* <div className="handwrittennotes-icon">
                          <MdArrowOutward />
                        </div> */}
                        <div className="handwrittennotes-icon">
                          <FiEdit3
                            onClick={() =>
                              navigate(`/quizapp/edit-pyqs-videos/${data._id}`)
                            }
                          />
                        </div>
                        <div className="handwrittennotes-icon">
                          <AiOutlineDelete
                            onClick={() =>
                              deletePYQ({
                                id: data._id,
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

export default HOC(PYQsvideos);
