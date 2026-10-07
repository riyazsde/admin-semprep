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
  deleteAllNotifications,
  deleteGoalExam,
  deleteNotification,
  getAllNotifications,
  getGoalExam,
} from "../../services/exportFunctions";
import { generateCsv } from "../../services/exportComponents";
import { Icon } from "@iconify/react/dist/iconify.js";

const Notification = () => {
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
      limit: limit,
      search,
    };
    getAllNotifications({ setIsLoading, setData, params });
  };
  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);
  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Notifications </h6>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link to={"/create-notification"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW Notification</h6>
              </div>
            </Link>
            {/* <div className="handwrittennotes-search">
              <IoSearch color="#ADB5BD" />
              <input
                type="search"   
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
              />
            </div> */}
            <div
              onClick={() => deleteAllNotifications({ addFun: getData })}
              className="d-flex gap-2 text-md-start cursor-pointer"
            >
              <span>Delete All</span>
              <span>
                <Icon
                  style={{ color: "red" }}
                  icon="ant-design:delete-outlined"
                />
              </span>
            </div>
          </div>
          <div className="handwrittennotes-list-table">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Content</th>
                  <th>User</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.data &&
                  data?.data?.map((data, index) => (
                    <tr key={index}>
                      <td>{data.title}</td>
                      <td>{data.content}</td>
                      <td>{data.recipient?.fullName}</td>

                      <td>
                        <div className="handwrittennotes-table-icons">
                          <div className="handwrittennotes-icon">
                            <AiOutlineDelete
                              onClick={() => {
                                deleteNotification({
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
            {/* <Pagination
              totalPages={data?.pagination?.totalPages}
              onPageChange={handlePageChange}
              onLimitChange={handleLimitChange}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(Notification);
