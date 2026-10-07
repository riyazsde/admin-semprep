import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import HOC from "../../../components/HOC/HOC";
import Pagination from "../../../components/Pagination/Pagination";
import {
  deleteEducator,
  deleteNewsPDF,
  getAllDailyNews,
  getAllEducators,
} from "../../../services/exportFunctions";
import { AiOutlineDelete } from "react-icons/ai";

// import "./DailyQuizPDF.css";

const DailyQuizPDF = () => {
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
    getAllDailyNews({ setIsLoading, setData, params });
  };
  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);
  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Daily Quiz PDF</h6>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link to={"/dashboard/current-affairs/daily-news/add-pdf"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW DAILY NEWS PDF</h6>
              </div>
            </Link>
          </div>
          <div className="handwrittennotes-list-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Link</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {console.log(data)}
                {data?.data?.map((data, index) => (
                  <tr key={index}>
                    <td style={{ width: "150px" }}>
                      {data.date
                        ?.slice(0, 10)
                        ?.split("-")
                        .reverse()
                        .join("-") || ""}
                    </td>
                    <td>{data.pdfLink || ""}</td>
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
                              deleteNewsPDF({
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
            {/* <Pagination /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(DailyQuizPDF);
