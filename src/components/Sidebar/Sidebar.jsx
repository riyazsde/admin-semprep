import { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { FaRegCalendar, FaRegListAlt } from "react-icons/fa";
import { FaRegMoneyBill1, FaUserTie } from "react-icons/fa6";
import { FiBookOpen } from "react-icons/fi";
import { MdGroups2, MdOutlineQuiz } from "react-icons/md";
import { PiExamBold, PiStudentBold, PiVideoFill } from "react-icons/pi";
import {
  RiDashboardFill,
  RiLogoutCircleLine,
  RiVideoLine
} from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import logoImg from "../../assest/favicon.png";
import { getRequest } from "../../services/apiService";
import { endpoints } from "../../services/endPoints";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const storedUserData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;
  const userData = storedUserData;
  const userType = userData ? userData.userType : null;
  const userPermissions = userData?.roles?.[0]?.permissions || [];

  const sidebarItems = [
    { name: "Dashboard", icon: <RiDashboardFill />, link: "/dashboard" },
    { name: "Groups", icon: <MdGroups2 />, link: "/groups" },
    { name: "Students", icon: <PiStudentBold />, link: "/students" },
    { name: "Employees", icon: <FaUserTie />, link: "/employees" },
    { name: "Educator", icon: <FaUserTie />, link: "/educator" },
    // {
    //   name: "Concept Mapping",
    //   icon: <BiNetworkChart />,
    //   link: "/concept-mapping",
    // },
    { name: "University", icon: <PiExamBold />, link: "/goal/goals" },
    { name: "University Course", icon: <PiExamBold />, link: "/goalexams" },
    { name: "Semester", icon: <PiExamBold />, link: "/my-semester" },
    { name: "Subjects", icon: <FaRegListAlt />, link: "/subjects" },
    { name: "Sub-Subjects", icon: <FaRegListAlt />, link: "/subsubjects" },
    { name: "Units", icon: <FaRegCalendar />, link: "/chapters" },
    { name: "Topics", icon: <FiBookOpen />, link: "/topics" },
    { name: "Videos", icon: <RiVideoLine />, link: "/vods" },
    { name: "Course Type", icon: <CgNotes />, link: "/course-type" },
    { name: "Add Course Content", icon: <CgNotes />, link: "/dashboard/course-page/courses/add-course" },
    { name: "Payment", icon: <FaRegMoneyBill1 />, link: "/payments" },
    { name: "Quiz app", icon: <MdOutlineQuiz />, link: "/quizapp" },
    // { name: "University", icon: <MdOutlineQuiz />, link: "/university" },
    // { name: "Student area", icon: <BsChatLeftDots />, link: "/student-area" },
    { name: "Study Planner", icon: <CgNotes />, link: "/study-planner" },
    { name: "Skills", icon: <PiVideoFill />, link: "/dashboard/skills" },
    { name: "Jobs", icon: <PiVideoFill />, link: "/jobs" },
    {
      name: "Landing Page Data",
      icon: <PiVideoFill />,
      link: "/landing-page-data",
    },
    {
      name: "Tutorial Videos",
      icon: <PiVideoFill />,
      link: "/tutorial-videos",
    },
    {
      name: "Coupons",
      icon: <PiVideoFill />,
      link: "/coupons",
    },
    {
      name: "Subscriptions",
      icon: <PiVideoFill />,
      link: "/subscriptions",
    },
  ];

  // Normalize string: remove spaces, dashes, and underscores; convert to lowercase.
  const normalizeKey = (str) => str.replace(/[\s\-_]/g, "").toLowerCase();

  // SUPER-ADMIN sees everything.
  // Other users see ONLY items they have permission for.
  // If a user has NO permissions at all, show everything (fallback so sidebar isn't empty).
  const filteredSidebarItems =
    userType === "SUPER-ADMIN" || userPermissions.length === 0
      ? sidebarItems
      : sidebarItems.filter((item) =>
          userPermissions.some(
            (perm) => normalizeKey(perm.key) === normalizeKey(item.name)
          )
        );

  const logout = () => {
    navigate("/");
  };

  useEffect(() => {
    getRequest({
      endpoint: endpoints.getUserProfile,
      setIsLoading,
    }).then((res) => {
      if (res) setData(res.data);
    });
  }, []);

  return (
    <div className="sidebarcontainer">
      <div className="side-logo">
        <img src={logoImg} alt="Complete Prep" className="logo-img" style={{ width: "100px" }} />
        {/* <h6 className="logo-title">Complete Prep</h6> */}
      </div>
      <div className="sideitems">
        {filteredSidebarItems.map((item) => (
          <NavLink
            key={item.link}
            to={item.link}
            className={({ isActive }) =>
              isActive ? "sideitemactive" : "sideitem"
            }
          >
            <span className="min-w-8 w-8">{item.icon}</span>
            <p>{item.name}</p>
          </NavLink>
        ))}
      </div>
      <div className="sidelogoutbtn" onClick={logout}>
        <RiLogoutCircleLine />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;