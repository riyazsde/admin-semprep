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
  deleteSubject,
  deleteSubSubject,
  getAllSubjects,
  getAllSubSubjects,
} from "../../services/exportFunctions";
import { generateCsv } from "../../services/exportComponents";

const SubSubjects = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    getAllSubSubjects({ setIsLoading, setData, params });
  };
  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);

  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Sub Subjects</h6>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link to={"/subsubjects/add-subsubjects"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW Sub-Subject</h6>
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
                    ["SubSubject Name", "Subject Name"],
                    data?.data?.map((item) => [item.name, item.subject?.name]),
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
                  <th>Goal Category</th>
                  <th>Goal Exam</th>
                  <th>Subject Name</th>
                  <th> Sub-Subject Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.data &&
                  data?.data?.map((data, index) => (
                    <tr key={index}>
                      <td>{data.goalCategory?.name}</td>
                      <td>{data.goal?.name}</td>
                      <td>{data.subject?.name}</td>
                      <td>{data?.name}</td>

                      <td>
                        <div className="handwrittennotes-table-icons">
                          <div className="handwrittennotes-icon">
                            <MdArrowOutward />
                          </div>
                          <div className="handwrittennotes-icon">
                            <FiEdit3
                              onClick={() =>
                                navigate(
                                  `/subsubjects/edit-subsubjects/${data._id}`
                                )
                              }
                            />
                          </div>
                          <div className="handwrittennotes-icon">
                            <AiOutlineDelete
                              onClick={() =>
                                deleteSubSubject({
                                  addFun: getData(),
                                  id: data._id,
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

export default HOC(SubSubjects);
