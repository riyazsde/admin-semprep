import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { GoArrowLeft } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import { LuClock9 } from "react-icons/lu";
import { LuAlarmClock } from "react-icons/lu";
import { GiBookCover } from "react-icons/gi";

import img from "../../assest/img10.png";
import {
  getAllStudents,
  getDashboardDataByUserId,
  getStudentById,
} from "../../services/exportFunctions";

const StudentProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const { id } = useParams();
  const getData = () => {
    getStudentById({ setIsLoading, setData, id });
    getDashboardDataByUserId({ setIsLoading, setData: setDashboardData, id });
  };
  useEffect(() => {
    if (id) getData();
  }, []);
  const percentage = 82;

  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Students</h6>
          {console.log(data)}
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Students /<span> Student Profile</span>
          </p>
        </div>
        <div className="studentprofile-container">
          <div className="studyplanner-container">
            <div className="studentprofile-heading">
              <h6>General Info</h6>
            </div>
            <div className="studentprofile-info">
              <div className="studentprofile-info-items">
                <p>Profile Image</p>
                <div className="studentprofile-info-image">
                  <img src={data?.image || img} alt="" />
                </div>
              </div>
              <div className="studentprofile-info-items">
                <p>Name</p>
                <div className="studentprofile-info-input">
                  <span>{data?.fullName || ""}</span>
                </div>
              </div>
              <div className="studentprofile-info-items">
                <p>Email ID</p>
                <div className="studentprofile-info-input">
                  <span>{data?.email || ""}</span>
                </div>
              </div>
              <div className="studentprofile-info-items">
                <p>Phone Number</p>
                <div className="studentprofile-info-input">
                  <span>{data?.mobileNumber || ""}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="studentprofile-analysis">
            <h6>Course Analysis</h6>
            <div className="studentprofile-analsis-div">
              <div className="studentprofile-analysis-div-main">
                <LuClock9 />
                <h5>
                  <span>
                    {dashboardData?.data?.courseCompletionPercentage ||0} %
                  </span>{" "}
                  Course completion
                </h5>
              </div>
              <div className="studentprofile-analysis-div-main">
                <LuAlarmClock />
                <h5>
                  <span>{dashboardData?.data?.overAllTimeSpent || 0} </span>{" "}
                  Overall time spent
                </h5>
              </div>
            </div>
          </div>

          <div className="studyplanner-container">
            <div className="studentprofile-progress-heading">
              <h6>Overall Progress </h6>
            </div>
          {dashboardData?.data?.weeklyData&&  <div>
              {Object.entries(dashboardData?.data?.weeklyData || {}).map(
                ([week, data]) => (
                  <div key={week}>
                    <h5 className="mt-2 mb-2">{week}</h5>
                    <div className="d-flex justify-content-between flex-wrap">
                      {Object.entries(data).map(([key, value]) => {
                        const totalValue =
                          dashboardData?.data?.totalVideos || 1;
                        const percentage =
                          key === "videosCompleted"
                            ? (value / totalValue) * 100
                            : value;

                        return (
                          <div
                            key={key}
                            className="studentprofile-progress-bar"
                          >
                            <svg style={{ height: 0 }}>
                              <defs>
                                <linearGradient
                                  id={`gradientPathColor-${week}-${key}`}
                                  x1="0%"
                                  y1="0%"
                                  x2="100%"
                                  y2="0%"
                                >
                                  <stop offset="0%" stopColor="#7DE079" />
                                  <stop offset="100%" stopColor="#447A42" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <CircularProgressbar
                              value={value || 0}
                              text={`${value} %`}
                              styles={buildStyles({
                                rotation: 0.35,
                                strokeLinecap: "butt",
                                textSize: "16px",
                                pathTransitionDuration: 0.5,
                                textColor: "#6090F7",
                                trailColor: "#D9D9D9",
                                pathColor: `url(#gradientPathColor-${week}-${key})`,
                              })}
                            />
                            <h6>
                              {key === "videosCompleted"
                                ? "Videos"
                                : key === "practiceQuestionsSolved"
                                ? "Practice Questions"
                                : key === "notesCompleted"
                                ? "Notes"
                                : key === "testsCompleted"
                                ? "Test "
                                : "Time Spent"}
                            </h6>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              )}
            </div>}
          </div>
          <div className="studentprofile-topics-container">
            {data?.strongTopics && (
              <div className="studyplanner-container">
                <div className="studentprofile-progress-heading">
                  <h6>Strong topics</h6>
                </div>
                <div className="studentprofile-topics-main">
                  {data?.strongTopics?.length > 0 &&
                    data?.strongTopics?.map((item, index) => (
                      <div className="studentprofile-topics-div">
                        <GiBookCover />
                        <p>Topic 1</p>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {dashboardData?.data?.weakTopics && (
              <div className="studyplanner-container">
                <div className="studentprofile-progress-heading">
                  <h6>Weak Topics </h6>
                </div>
                <div className="studentprofile-topics-main">
                  {data?.weakTopics?.length > 0 &&
                    data?.weakTopics?.map((item, index) => (
                      <div className="studentprofile-topics-div">
                        <GiBookCover />
                        <p>Topic 1</p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
          <div className="studyplanner-container">
            <div className="studentprofile-progress-heading">
              <h6>Module wise time spent</h6>
            </div>
            <div className="studentprofile-progress-bars">
              <div className="studentprofile-progress-bar">
                <svg style={{ height: 0 }}>
                  <defs>
                    <linearGradient
                      id="gradientPathColor5"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#FD5602" />
                      <stop offset="100%" stopColor="#973301" />
                    </linearGradient>
                  </defs>
                </svg>
                <CircularProgressbar
                  value={
                    dashboardData?.data?.ModuleWiseTimeSpent?.videosCompleted ||
                    0
                  }
                  text={`${
                    dashboardData?.data?.ModuleWiseTimeSpent?.videosCompleted ||
                    0
                  } %`}
                  styles={buildStyles({
                    rotation: 0.35,
                    strokeLinecap: "butt",
                    textSize: "20px",
                    pathTransitionDuration: 0.5,
                    textColor: "#6090F7",
                    trailColor: "#D9D9D9",
                    pathColor: "url(#gradientPathColor5)",
                  })}
                />
                <h6>Videos</h6>
              </div>
              {/* <div className="studentprofile-progress-bar">
                <svg style={{ height: 0 }}>
                  <defs>
                    <linearGradient
                      id="gradientPathColor5"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#FD5602" />
                      <stop offset="100%" stopColor="#973301" />
                    </linearGradient>
                  </defs>
                </svg>
                <CircularProgressbar
                  value={
                    dashboardData?.data?.ModuleWiseTimeSpent
                      ?.practiceQuestionsSolved || 0
                  }
                  text={`${
                    dashboardData?.data?.ModuleWiseTimeSpent
                      ?.practiceQuestionsSolved || 0
                  }%`}
                  styles={buildStyles({
                    rotation: 0.35,
                    strokeLinecap: "butt",
                    textSize: "20px",
                    pathTransitionDuration: 0.5,
                    textColor: "#6090F7",
                    trailColor: "#D9D9D9",
                    pathColor: "url(#gradientPathColor5)",
                  })}
                />
                <h6>Practice</h6>
              </div> */}
              <div className="studentprofile-progress-bar">
                <svg style={{ height: 0 }}>
                  <defs>
                    <linearGradient
                      id="gradientPathColor5"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#FD5602" />
                      <stop offset="100%" stopColor="#973301" />
                    </linearGradient>
                  </defs>
                </svg>
                <CircularProgressbar
                  value={
                    dashboardData?.data?.ModuleWiseTimeSpent?.notesCompleted ||
                    0
                  }
                  text={`${
                    dashboardData?.data?.ModuleWiseTimeSpent?.notesCompleted ||
                    0
                  }%`}
                  styles={buildStyles({
                    rotation: 0.35,
                    strokeLinecap: "butt",
                    textSize: "20px",
                    pathTransitionDuration: 0.5,
                    textColor: "#6090F7",
                    trailColor: "#D9D9D9",
                    pathColor: "url(#gradientPathColor5)", // Reference the gradient ID
                  })}
                />
                <h6>Notes</h6>
              </div>
              <div className="studentprofile-progress-bar">
                <svg style={{ height: 0 }}>
                  <defs>
                    <linearGradient
                      id="gradientPathColor5"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#FD5602" />
                      <stop offset="100%" stopColor="#973301" />
                    </linearGradient>
                  </defs>
                </svg>
                <CircularProgressbar
                  value={
                    dashboardData?.data?.ModuleWiseTimeSpent?.testsCompleted ||
                    0
                  }
                  text={`${
                    dashboardData?.data?.ModuleWiseTimeSpent?.testsCompleted ||
                    0
                  }%`}
                  styles={buildStyles({
                    rotation: 0.35,
                    strokeLinecap: "butt",
                    textSize: "20px",
                    pathTransitionDuration: 0.5,
                    textColor: "#6090F7",
                    trailColor: "#D9D9D9",
                    pathColor: "url(#gradientPathColor5)", // Reference the gradient ID
                  })}
                />
                <h6>Test</h6>
              </div>
            </div>
          </div>
          {/* <div className="studyplanner-container">
            <div className="studentprofile-bottom">
              <h5>{dashboardData?.data?.expectedQuestionsCutoff || 0}</h5>
              <h4>Expected Questions Cutoff for Exam</h4>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default HOC(StudentProfile);
