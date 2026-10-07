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
  deleteConceptMapping,
  getAllConceptMapping,
  getAllCourseTypes,
} from "../../services/exportFunctions";
import { generateCsv } from "../../services/exportComponents";

const ConceptMapping = () => {
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

    setLimit(newLimit);
  };
  const getData = () => {
    const params = {
      page: currentPage,
      limit: limit,
      search,
    };
    getAllConceptMapping({ setIsLoading, setData, params });
  };
  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);
  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Concept Mapping</h6>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link to={"/concept-mapping/add-concept-mapping"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW Concept mapping</h6>
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
                    [
                      "Concept Mapping Name",
                      "Goal Exam",
                      "Subject",
                      "Sub Subject",
                      "Chapter",
                      "Topic",
                      "Language",
                    ],
                    data?.data?.map((item) => [
                      item.conceptMappingName,
                      item.goalexam?.name,
                      item.subject?.name,
                      item.subsubject?.name || "N/A",
                      item.chapter?.name,
                      item.topic?.name,
                      item.language,
                    ]),
                    `Concept Mapping-${currentPage}.csv`
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
                  <th>Concept Mapping Name</th>
                  <th>Goal Exam</th>
                  <th>Subject</th>
                  <th>Sub Subject</th>
                  <th>Chapter</th>
                  <th>Topic</th>
                  <th>Language</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((data, index) => (
                  <tr key={index}>
                    <td>{data.conceptMappingName}</td>
                    <td>{data.goalexam?.name}</td>
                    <td>{data.subject?.name}</td>
                    <td>{data.subsubject?.name || "N/A"}</td>
                    <td>{data.chapter?.name}</td>
                    <td>{data.topic?.name}</td>
                    <td>{data.locale}</td>
                    <td>
                      <div className="handwrittennotes-table-icons">
                        {/* <div
                          className="handwrittennotes-icon"
                          onClick={() => navigate("/students/student-profile")}
                        >
                          <MdArrowOutward />
                        </div> */}
                        {/* <div className="handwrittennotes-icon">
                          <FiEdit3
                            onClick={() =>
                              navigate(`/edit-concept-mapping/${data._id}`)
                            }
                          />
                        </div> */}
                        <div className="handwrittennotes-icon">
                          <AiOutlineDelete
                            onClick={() =>
                              deleteConceptMapping({
                                id: data._id,
                                addFun: () => getData(),
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

export default HOC(ConceptMapping);
