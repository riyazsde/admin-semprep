import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";

import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Pagination from "../../components/Pagination/Pagination";
import {
  deletePYQ,
  getAllPYQs,
} from "../../services/exportFunctions";
import { GoArrowLeft } from "react-icons/go";

const PYQsvideos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const handlePageChange = (page) => setCurrentPage(page);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            Quiz ap /<span> PYQ's with videos</span>
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
              <IoSearch color="#ADB5BD" />
              <input
                type="search"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="handwrittennotes-list-table">
            <table>
              <thead>
                <tr>
                  <th>Goal Category</th>
                  <th>Goal Exam</th>
                  <th>University</th>
                  <th>Course</th>
                  <th>Semester</th>
                  <th>Main Title</th>
                  <th>Bundle Name</th>
                  <th>Bundle Description</th>
                  <th>Tile Image</th>
                  <th>Tests</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((row, index) => {
                  const universityName =
                    row.university?.name ||
                    row.goalCategory?.name ||
                    "—";
                  const courseName =
                    row.universityCourse?.name ||
                    row.goal?.name ||
                    "—";
                  const semesterLabel = row.semester?.semesterNumber
                    ? `Sem ${row.semester.semesterNumber}`
                    : "—";
                  const mainTitle =
                    row.previousYearQuestionMainTitle?.title ||
                    row.previousYearQuestionMainTitle?.name ||
                    "—";
                  const testCount = Array.isArray(row.tests)
                    ? row.tests.length
                    : row.testCount ?? 0;

                  return (
                    <tr key={row._id || index}>
                      <td>{row.goalCategory?.name || "—"}</td>
                      <td>{row.goal?.name || "—"}</td>
                      <td>{universityName}</td>
                      <td>{courseName}</td>
                      <td>{semesterLabel}</td>
                      <td>{mainTitle}</td>
                      <td>{row.bundleName || "—"}</td>
                      <td>{row.bundleDescription || "—"}</td>
                      <td>
                        {row.tileImage ? (
                          <img
                            style={{ width: "190px", height: "120px" }}
                            src={row.tileImage}
                            alt="tileImage"
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td>{testCount}</td>
                      <td>
                        <div className="handwrittennotes-table-icons">
                          <div className="handwrittennotes-icon">
                            <FiEdit3
                              onClick={() =>
                                navigate(
                                  `/quizapp/edit-pyqs-videos/${row._id}`
                                )
                              }
                            />
                          </div>
                          <div className="handwrittennotes-icon">
                            <AiOutlineDelete
                              onClick={() =>
                                deletePYQ({
                                  id: row._id,
                                  addFun: getData,
                                })
                              }
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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