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
  addUserToGroup,
  deleteEducator,
  deleteStudent,
  getAllGroups,
  getAllStudents,
} from "../../services/exportFunctions";
import { generateCsv } from "../../services/exportComponents";

const Employees = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [allGroups, setAllGroups] = useState([]);

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
      userType: "PARTNER",
    };
    getAllStudents({ setIsLoading, setData, params });
    getAllGroups({ setIsLoading, setData: setAllGroups });
  };
  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);

  const handleGroupSelect = (groupId, userId) => {
    console.log(groupId, userId);
    addUserToGroup({
      setIsLoading,
      data: {
        roleId: groupId,
        userId,
      },
      addFun: () => getData(),
    });
    // navigate(`/group/${groupId}/${userId}`)
  };

  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Employees</h6>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link to={"/add-employee"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW Employee</h6>
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
                    ["Employee Name", "Email", "Mobile Number", "Group"],
                    data?.data?.map((item) => [
                      item?.user?.fullName,
                      item?.user?.email,
                      item?.user?.mobileNumber,
                      item?.group?.name,
                    ]),
                    `students-${currentPage}.csv`
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
                  <th>Employee Name</th>
                  <th>Email</th>
                  <th>Mobile Number</th>
                  <th>Group</th>
                  <th>Employee Id</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((data, index) => (
                  <tr key={index}>
                    <td>{data?.user?.fullName}</td>
                    <td>{data?.user?.email}</td>
                    <td>{data?.user?.mobileNumber}</td>
                    <td>
                      <select
                        onChange={(e) =>
                          handleGroupSelect(e.target.value, data?._id)
                        }
                       value={data?.user?.roles?.[0]?._id}
                      >
                        <option value="">Select Group</option>
                        {allGroups?.data?.map((group, index) => (
                          <option value={group._id} key={index}>
                            {group.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{data?.user?.userId}</td>
                    <td>
                      <div className="handwrittennotes-table-icons">
                        {/* <div className="handwrittennotes-icon">
                          <MdArrowOutward />
                        </div> */}
                        {/* <div className="handwrittennotes-icon">
                          <FiEdit3
                            onClick={() =>
                              navigate(`/edit-employee/${data?._id}`)
                            }
                          />
                        </div> */}
                        <div className="handwrittennotes-icon">
                          <AiOutlineDelete
                            onClick={() => {
                              deleteStudent({
                                id: data?.user?._id,
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

export default HOC(Employees);
