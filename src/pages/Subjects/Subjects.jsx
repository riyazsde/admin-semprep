import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";

import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Pagination from "../../components/Pagination/Pagination";
import { deleteSubject, getAllSubjects } from "../../services/exportFunctions";
import { generateCsv } from "../../services/exportComponents";

const Subjects = () => {
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
    setLimit(newLimit);
  };
  const getData = () => {
    const params = {
      page: currentPage,
      limit: limit,
      search,
    };
    getAllSubjects({ setIsLoading, setData, params });
  };
  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);

  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Subjects</h6>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link to={"/subjects/add-subject"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW subject</h6>
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
                    ["Subject Name", "Language", "Goal Category", "Goal Exam"],
                    data?.data?.map((item) => [
                      item.name,
                      item.language,
                      item.goalCategory?.name,
                      item.goal?.name,
                    ]),
                    `subjects-${currentPage}.csv`
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
                  <th>Subject Name</th>
                  <th>Language</th>
                  <th>Goal Category</th>
                  <th>Goal Exam</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.data &&
                  data?.data?.map((data, index) => (
                    <tr key={index}>
                      <td>{data.name}</td>
                      <td>{data.language}</td>
                      <td>{data.goalCategory?.name}</td>
                      <td>{data.goal?.name}</td>

                      <td>
                        <div className="handwrittennotes-table-icons">
                          {/* <div className="handwrittennotes-icon">
                            <MdArrowOutward />
                          </div> */}
                          <div className="handwrittennotes-icon">
                            <FiEdit3
                              onClick={() =>
                                navigate(`/subjects/edit-subject/${data._id}`)
                              }
                            />
                          </div>
                          <div className="handwrittennotes-icon">
                            <AiOutlineDelete
                              onClick={() =>
                                deleteSubject({ addFun: getData, id: data._id })
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

export default HOC(Subjects);
