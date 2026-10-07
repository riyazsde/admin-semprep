import React from "react";
import HOC from "../../components/HOC/HOC";

import { Link } from "react-router-dom";
import { FaCalendarDays } from "react-icons/fa6";
import { FaFilePen } from "react-icons/fa6";
import { HiMiniBarsArrowUp } from "react-icons/hi2";

const StudyPlanner = () => {
  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Study Planner</h6>
        </div>
        <div className="dashboardmain">
          {/* <Link to={"/study-planner/student-progress"} className="link">
            <div className="dashboardcontent">
              <HiMiniBarsArrowUp />
              <h6>Student Progress </h6>
            </div>
          </Link> */}
          <Link to={"/study-planner/student-studyplans"} className="link">
            <div className="dashboardcontent">
              <FaCalendarDays />
              <h6>Student Study Plans</h6>
            </div>
          </Link>
          <Link to={"/study-planner/study-plannercourses"} className="link">
            <div className="dashboardcontent">
              <FaFilePen />
              <h6>Study Planner Courses</h6>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HOC(StudyPlanner);
