import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";

import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Pagination from "../../components/Pagination/Pagination";
import { deleteVideo, getAllVideos } from "../../services/exportFunctions";
import { Table } from "react-bootstrap";
import { generateCsv } from "../../services/exportComponents";

const Vods = () => {
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
    getAllVideos({ setIsLoading, setData, params });
  };
  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);

  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Videos</h6>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link to={"/vods/add-vod"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW Videos</h6>
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
                    [
                      "Goal Category",
                      "Goal",
                      "Subject",
                      "Sub-Subject",
                      "Chapter",
                      "Topic",
                      "Video Name",
                      "Video Link",
                    ],
                    data?.data?.map((item) => [
                      item.goalCategory?.name,
                      item.goal?.name,
                      item.subject?.name,
                      item.subSubjects?.map((sub) => sub.name),
                      item.chapter?.name,
                      item.topic?.name,
                      item.videoName,
                      item.videoLink,
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
            <Table responsive>
              <thead>
                <tr>
                  <th>Goal</th>
                  <th>Goal Category</th>
                  <th>Subject</th>
                  <th>Sub-Subject</th>
                  <th>Chapter</th>
                  <th>Topic</th>
                  <th>Video Name</th>
                  <th>Video Link</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((data, index) => (
                  <tr key={index}>
                    <td>{data.goalCategory?.name}</td>
                    <td>{data.goal?.name}</td>
                    <td>{data.subject?.name}</td>
                    <td>{data.subSubjects?.map((sub) => sub.name)}</td>
                    <td>{data.chapter?.name}</td>
                    <td>{data.topic?.name}</td>
                    <td>{data.videoName}</td>
                    <td style={{ maxWidth: "200px", wordWrap: "break-word" }}>
                      {data.videoLink}
                    </td>

                    <td>
                      <div className="handwrittennotes-table-icons">
                        <a
                          href={data.videoLink}
                          target="_blank"
                          className="link"
                        >
                          {" "}
                          <div className="handwrittennotes-icon">
                            <MdArrowOutward />
                          </div>
                        </a>
                        <div className="handwrittennotes-icon">
                          <FiEdit3
                            onClick={() =>
                              navigate(`/vods/edit-vod/${data._id}`)
                            }
                          />
                        </div>
                        <div className="handwrittennotes-icon">
                          <AiOutlineDelete
                            onClick={() =>
                              deleteVideo({ id: data._id, addFun: getData })
                            }
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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

export default HOC(Vods);
