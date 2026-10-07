import React from "react";
import HOC from "../../components/HOC/HOC";

import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { GoArrowLeft } from "react-icons/go";
import Pagination from "../../components/Pagination/Pagination";

const VideoHistory = () => {
  const dummyData = [
    {
      user: "Sandeep Jay",
      vod: "Video Link",
      watchduration: "2 hrs",
      timestamp: "Oct 28 2024, 12:3 pm",
      Isteacherreply: "No",
    },
    {
      user: "Sandeep Jay",
      vod: "Video Link",
      watchduration: "2 hrs",
      timestamp: "Oct 28 2024, 12:3 pm",
      Isteacherreply: "No",
    },
    {
      user: "Sandeep Jay",
      vod: "Video Link",
      watchduration: "2 hrs",
      timestamp: "Oct 28 2024, 12:3 pm",
      Isteacherreply: "No",
    },
    {
      user: "Sandeep Jay",
      vod: "Video Link",
      watchduration: "2 hrs",
      timestamp: "Oct 28 2024, 12:3 pm",
      Isteacherreply: "No",
    },
    {
      user: "Sandeep Jay",
      vod: "Video Link",
      watchduration: "2 hrs",
      timestamp: "Oct 28 2024, 12:3 pm",
      Isteacherreply: "No",
    },
    {
      user: "Sandeep Jay",
      vod: "Video Link",
      watchduration: "2 hrs",
      timestamp: "Oct 28 2024, 12:3 pm",
      Isteacherreply: "No",
    },
    {
      user: "Sandeep Jay",
      vod: "Video Link",
      watchduration: "2 hrs",
      timestamp: "Oct 28 2024, 12:3 pm",
      Isteacherreply: "No",
    },
    {
      user: "Sandeep Jay",
      vod: "Video Link",
      watchduration: "2 hrs",
      timestamp: "Oct 28 2024, 12:3 pm",
      Isteacherreply: "No",
    },
    {
      user: "Sandeep Jay",
      vod: "Video Link",
      watchduration: "2 hrs",
      timestamp: "Oct 28 2024, 12:3 pm",
      Isteacherreply: "No",
    },
    {
      user: "Sandeep Jay",
      vod: "Video Link",
      watchduration: "2 hrs",
      timestamp: "Oct 28 2024, 12:3 pm",
      Isteacherreply: "No",
    },
  ];

  const navigate = useNavigate();

  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Video History</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Video Player /<span> Video History</span>
          </p>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link
              to={"/video-player/video-history/add-video-history"}
              className="link"
            >
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW video History</h6>
              </div>
            </Link>
            <div className="handwrittennotes-search">
              <IoSearch color="#ADB5BD" />
              <input type="search" placeholder="Search..." />
            </div>
            <div className="handwrittennotes-export">
              <span>Export CSV</span>
            </div>
          </div>
          <div className="handwrittennotes-list-table">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Vod</th>
                  <th>Watch Duration</th>
                  <th>Timestamp</th>
                  <th>Completed</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.user}</td>
                    <td>{data.vod}</td>
                    <td>{data.watchduration}</td>
                    <td>{data.timestamp}</td>
                    <td>{data.Isteacherreply}</td>
                    <td>
                      <div className="handwrittennotes-table-icons">
                        <div
                          className="handwrittennotes-icon"
                          onClick={() => navigate("/students/student-profile")}
                        >
                          <MdArrowOutward />
                        </div>
                        <div className="handwrittennotes-icon">
                          <FiEdit3 />
                        </div>
                        <div className="handwrittennotes-icon">
                          <AiOutlineDelete />
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

export default HOC(VideoHistory);
