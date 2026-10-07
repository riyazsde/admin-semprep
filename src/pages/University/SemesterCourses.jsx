import { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";

import { AiOutlineDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import { GoArrowLeft } from "react-icons/go";
import { IoIosStarOutline, IoMdStar } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";

import Pagination from "../../components/Pagination/Pagination";
import {
  deleteCourse,
  getDashboardAllCourses,
} from "../../services/exportFunctions";

const SemesterCourses = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isViewItem, setIsViewItem] = useState({});
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const {id,semId ,courseId} = useParams();

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
      semester: semId,
    };
    getDashboardAllCourses({ setIsLoading, setData, params });
  };
  useEffect(() => {
    getData();
  }, [currentPage, limit, search]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < rating ? <IoMdStar key={i} /> : <IoIosStarOutline key={i} />
      );
    }
    return <div className="table-star">{stars}</div>;
  };

  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Semester Courses</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            University/ Semester/ Semester <span> Course</span>
          </p>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link
              to={`/university/${id}/${courseId}/${semId}/add-course`}
              className="link"
            >
              <div className="handwrittennotes-add">
                <FaPlus />

                <h6>Add NEW Semester Course</h6>
              </div>
            </Link>
            {/* <div className="handwrittennotes-search">
              <IoSearch color="#ADB5BD" />
              <input
                type="search"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
            <div className="handwrittennotes-export">
              <span>Export CSV</span>
            </div> */}
          </div>
          <div className="handwrittennotes-list-table">
            <table>
              <thead>
                <tr>
                  <th>Goal Category</th>
                  <th>Goal</th>
                  {/* <th>Course Category</th> */}
                  <th>Course</th>
                  <th>Duration ( Min )</th>
                  <th>Description</th>
                  {/* <th>Rating</th> */}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((data, index) => (
                  <tr key={index}>
                    <td>{data.goalCategory?.name}</td>
                    <td>{data.goal?.name}</td>
                    {/* <td>{data.courseCategoryId?.name}</td> */}
                    <td>{data.title}</td>
                    <td>{data.duration}</td>
                    <td>{data.description}</td>
                    {/* <td>{renderStars(data.totalRating || 0)}</td> */}
                    <td>
                      <div className="handwrittennotes-table-icons">
                        {/* <div className="handwrittennotes-icon">
                          <MdArrowOutward />
                        </div> */}
                        {/* <div className="handwrittennotes-icon">
                          <FiEdit3
                            onClick={() =>
                              navigate(
                                `/dashboard/course-page/courses/edit-course/${data._id}`
                              )
                            }
                          />
                        </div> */}
                        <div className="handwrittennotes-icon">
                          <AiOutlineDelete
                            onClick={() =>
                              deleteCourse({ id: data._id, addFun: getData })
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

export default HOC(SemesterCourses);
