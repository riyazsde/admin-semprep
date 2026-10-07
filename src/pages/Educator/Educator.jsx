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
  deleteEducator,
  getAllEducators,
} from "../../services/exportFunctions";
import { generateCsv } from "../../services/exportComponents";

const Educator = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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
    getAllEducators({ setIsLoading, setData, params });
  };
  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);
  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Educator</h6>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link to={"/add-educator"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW Educator</h6>
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
                    ["Name", "Bio", "Email", "Goal", "Goal Exam"],
                    data?.data?.map((item) => [
                      item.name,
                      item.desc,
                      item.email,
                      item.goal?.name,
                      item.goalCategory?.name,
                    ]),
                    "users.csv"
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
                  <th>Bio</th>
                  <th>Cost per Hour</th>
                  <th>Number of Hrs</th>
                  <th>Goal</th>
                  <th>Goal Exam</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((data, index) => (
                  <tr key={index}>
                    <td>
                      {data.image ? (
                        <img
                          className="educator-image"
                          src={data.image}
                          alt="educator"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td>{data.name || ""}</td>
                    <td>{data.desc || ""}</td>
                    <td>{data.costPerHour || ""}</td>
                    <td>{data.numberOfHour || ""}</td>
                    <td>{data.goal?.name || ""}</td>
                    <td>{data.goalCategory?.name || ""}</td>
                    <td>
                      <div className="handwrittennotes-table-icons">
                        {/* <div className="handwrittennotes-icon">
                          <MdArrowOutward />
                        </div> */}
                        {/* <div className="handwrittennotes-icon">
                          <FiEdit3
                            onClick={() =>
                              navigate(`/edit-educator/${data._id}`)
                            }
                          />
                        </div> */}
                        <div className="handwrittennotes-icon">
                          <AiOutlineDelete
                            onClick={() => {
                              deleteEducator({
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
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(Educator);
