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
  deleteHandwrittenNote,
  deleteTestSeries,
  deleteTopic,
  getAllHandwrittenNotes,
  getAllTestSeries,
  getAllTopics,
} from "../../services/exportFunctions";
import { deleteRequest } from "../../services/apiService";
import { generateCsv } from "../../services/exportComponents";

const AllHandwrittenNotes = () => {
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
    getAllHandwrittenNotes({ setIsLoading, setData, params });
  };
  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);

  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Handwritten Notes</h6>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link to={"/quizapp/add-handwritten-notes"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add Handwritten Notes</h6>
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
                    ["Goal Category", "Goal", "Bundle Name", "Toppers Name"],
                    data?.data?.map((item) => [
                      item?.goalCategory?.name,
                      item?.goal?.name,
                      item?.bundleName,
                      item?.topperName,
                    ]),
                    `HandwrittenNotes-${currentPage}.csv`
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
                  <th>Bundle Name</th>
                  <th>Toppers Name</th>
                  <th>Tile Image</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((data, index) => (
                  <tr key={index}>
                    <td>{data.goalCategory?.name}</td>
                    <td>{data.goal?.name}</td>
                    <td>{data?.bundleName}</td>
                    <td>{data?.topperName}</td>
                    <td>
                      {data?.image ? (
                        <img
                          style={{
                            width: "190px",
                            height: "120px",
                          }}
                          src={data?.image}
                          alt="tileImage"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>

                    <td>
                      <div className="handwrittennotes-table-icons">
                        {/* <div className="handwrittennotes-icon">
                          <MdArrowOutward />
                        </div> */}
                        <div className="handwrittennotes-icon">
                          <FiEdit3
                            onClick={() =>
                              navigate(
                                `/quizapp/edit-handwritten-notes/${data._id}`
                              )
                            }
                          />
                        </div>
                        <div className="handwrittennotes-icon">
                          <AiOutlineDelete
                            onClick={() =>
                              deleteHandwrittenNote({
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

export default HOC(AllHandwrittenNotes);
