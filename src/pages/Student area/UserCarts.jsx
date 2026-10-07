import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";

import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { GoArrowLeft } from "react-icons/go";
import Pagination from "../../components/Pagination/Pagination";
import { getAllCarts } from "../../services/exportFunctions";

const UserCarts = () => {
  
  
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
    setLimit(newLimit);
  };
  const getData = () => {
    const params = {
      page: currentPage,
      limit: limit,
      search,
      userType: "USER",
    };
    getAllCarts({ setIsLoading, setData, params });
  };
  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);

  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>User Carts</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Student area /<span> User Carts</span>
          </p>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            {/* <Link
              to={"/student-area/user-carts/add-user-carts"}
              className="link"
            >
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW User carts</h6>
              </div>
            </Link> */}
            <div className="handwrittennotes-search">
              <IoSearch color="#ADB5BD" />
              <input type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
            </div>
            {/* <div className="handwrittennotes-export">
              <span>Export CSV</span>
            </div> */}
          </div>
          <div className="handwrittennotes-list-table">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Study Planner</th>
                  <th>Skill</th>
                  <th>Course</th>
                  <th>Capsule Course</th>
                  <th>Test Series</th>
                  <th>Handwritten Notes</th>
                  <th>Cart ID</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((data, index) => (
                  <tr key={index}>
                    <td>{data.user?.fullName}</td>
                    <td>
                      {data.items?.find((item) => item.studyPlanner)?.name}
                    </td>
                    <td>{data.items?.find((item) => item.skill)?.name}</td>
                    <td>
                      {data?.items?.find((item) => item?.course)?.title ||
                        "No course title available"}
                    </td>
                    <td>
                      {data.items?.find((item) => item.capsuleCourse)?.name}
                    </td>
                    <td>
                      {
                        data.items?.find((item) => console.log(item))
                          ?.bundleName
                      }
                    </td>
                    <td>
                      {data.items?.find((item) => item.handwrittenNotes)?.name}
                    </td>

                    <td>{data._id}</td>
                    <td>
                      <div className="handwrittennotes-table-icons">
                        <div
                          className="handwrittennotes-icon"
                          onClick={() =>
                            navigate(`/students/${data.user?._id}`)
                          }
                        >
                          <MdArrowOutward />
                        </div>
                        <div className="handwrittennotes-icon">
                          <FiEdit3
                            onClick={() =>
                              navigate(
                                `/student-area/user-carts-edit/${data._id}`
                              )
                            }
                          />
                        </div>
                        {/* <div className="handwrittennotes-icon">
                          <AiOutlineDelete />
                        </div> */}
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

export default HOC(UserCarts);
