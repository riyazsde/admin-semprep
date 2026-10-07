import React from "react";
import HOC from "../../components/HOC/HOC";

import { Link } from "react-router-dom";
import { FaCalendarDays } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";
import { MdHandshake } from "react-icons/md";
import { FaPoll } from "react-icons/fa";
import { BsFillClipboardDataFill } from "react-icons/bs";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { RiFileListFill } from "react-icons/ri";
import { FaFireFlameCurved } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { FaHeart } from "react-icons/fa";

const Studentarea = () => {
  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Student area</h6>
        </div>
        <div className="dashboardmain">
          <Link to={"/student-area/activity-logs"} className="link">
            <div className="dashboardcontent">
              <FaCalendarDays />
              <h6>Activity Logs</h6>
            </div>
          </Link>
          {/* <Link to={"/dashboard/community"} className="link">
            <div className="dashboardcontent">
              <MdMessage />
              <h6>Comments</h6>
            </div>
          </Link>
          <Link to={"/dashboard/community"} className="link">
            <div className="dashboardcontent">
              <MdHandshake />
              <h6>Communities</h6>
            </div>
          </Link> */}
          {/* <Link to={"/student-area/poll-options"} className="link">
            <div className="dashboardcontent">
              <FaPoll />
              <h6>Poll Options</h6>
            </div>
          </Link> */}
          <Link to={"/student-area/polls"} className="link">
            <div className="dashboardcontent">
              <BsFillClipboardDataFill />
              <h6>Polls</h6>
            </div>
          </Link>
          {/* <Link to={"/dashboard/community"} className="link">
            <div className="dashboardcontent">
              <RiFileListFill />
              <h6>Posts</h6>
            </div>
          </Link> */}
          <Link to={"/student-area/purchased-items"} className="link">
            <div className="dashboardcontent">
              <FaFileInvoiceDollar />
              <h6>Purchased Items</h6>
            </div>
          </Link>
          {/* <Link to={"/student-area/redemptions"} className="link">
            <div className="dashboardcontent">
              <FaFireFlameCurved />
              <h6>Redemptions</h6>
            </div>
          </Link> */}
          <Link to={"/student-area/user-carts"} className="link">
            <div className="dashboardcontent">
              <IoMdCart />
              <h6>User Carts</h6>
            </div>
          </Link>
          <Link to={"/student-area/user-wishlist"} className="link">
            <div className="dashboardcontent">
              <FaHeart />
              <h6>User Wishlist</h6>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HOC(Studentarea);
