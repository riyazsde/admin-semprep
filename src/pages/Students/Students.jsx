import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";

import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Pagination from "../../components/Pagination/Pagination";
import { deleteStudent, getAllStudents } from "../../services/exportFunctions";
import { generateCsv } from "../../services/exportComponents";

const Students = () => {
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
      userName: search,
      userType: "USER",
    };
    getAllStudents({ setIsLoading, setData, params });
  };
  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);

  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Students</h6>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            {/* <Link to={"/concept-mapping/add-concept-mapping"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW Student</h6>
              </div>
            </Link> */}
            <div className="handwrittennotes-search">
              <IoSearch color="#ADB5BD" />
              <input
                type="search"
                placeholder="Search... "
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
           {data?.data?.length > 0 && <div
              onClick={() =>
                generateCsv(
                  [
                    "Student Name",
                    "Mobile Number",
                    "Primary Goal",
                    "Goal Exam",
                  ],
                  data?.data?.map((item) => [
                    item.user?.fullName,
                    item.user?.mobileNumber,
                    item.user?.goalCategory?.name,
                    item.user?.goal?.name,
                  ]),
                  `students-${currentPage}.csv`
                )
              }
              className="handwrittennotes-export"
            >
              <span>Export CSV</span>
            </div>}
          </div>
          <div className="handwrittennotes-list-table">
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Mobile Number</th>
                  <th>Primary Goal</th>
                  <th>Goal Exam</th>
                  <th>Student Id</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((data, index) => (
                  <tr key={index}>
                    <td>{data.user?.fullName}</td>
                    <td>{data.user?.mobileNumber}</td>
                    <td>{data.user?.goalCategory?.name}</td>
                    <td>{data.user?.goal?.name}</td>
                    <td>{data.user?.userId}</td>
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
                        {/* <div className="handwrittennotes-icon">
                          <FiEdit3 />
                        </div> */}
                        <div className="handwrittennotes-icon">
                          <AiOutlineDelete
                            onClick={() =>
                              deleteStudent({
                                id: data.user?._id,
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

export default HOC(Students);
