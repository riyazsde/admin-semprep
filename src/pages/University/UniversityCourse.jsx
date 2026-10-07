import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import HOC from "../../components/HOC/HOC";
import Pagination from "../../components/Pagination/Pagination";
import { generateCsv } from "../../services/exportComponents";
import {
  deleteUniversity,
  deleteUniversityCourse,
  getAllUniversityCourses,
} from "../../services/exportFunctions";

const UniversityCourse = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const { id } = useParams();

  const handlePageChange = (page) => setCurrentPage(page);
  const handleLimitChange = (newLimit) => setLimit(newLimit);

  const fetchData = async () => {
    setIsLoading(true);
    getAllUniversityCourses({
      setData,
      setIsLoading,
      params: { page: currentPage, limit, search, universityId: id },
    });
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, limit, search, id]);

  const courses = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data)
    ? data
    : Array.isArray(data?.data?.data)
    ? data.data.data
    : [];

  const totalPages = data?.pagination?.totalPages ?? null;

  return (
    <div className="dashboardcontainer">
      <div className="dashboardcontainer-header">
        <h6>University Courses</h6>
      </div>

      <div className="handwrittennotes-list">
        <div className="handwrittennotes-list-header">
          <Link
            to={`/university/${id}/add-university-courses`}
            className="link"
          >
            <div className="handwrittennotes-add">
              <FaPlus />
              <h6>Add NEW University</h6>
            </div>
          </Link>
        </div>

        <div className="handwrittennotes-list-table">
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Course Code</th>
                <th>University</th>
                <th>Duration (yrs)</th>
                <th>Stream</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    Loading...
                  </td>
                </tr>
              )}

              {!isLoading && courses.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    No courses found.
                  </td>
                </tr>
              )}

              {!isLoading &&
                courses.length > 0 &&
                courses.map((item, index) => (
                  <tr key={item?._id || index}>
                    <td>{item?.name || "-"}</td>
                    <td>{item?.code || "-"}</td>
                    <td>{item?.university?.name || "-"}</td>
                    <td>{item?.durationYears ?? "-"}</td>
                    <td>{item?.stream || "-"}</td>
                    <td>
                      {item?.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      <div className="handwrittennotes-table-icons">
                        <div className="handwrittennotes-icon">
                          <AiOutlineDelete
                            onClick={() =>
                              deleteUniversityCourse({
                                id: item?._id,
                                addFun: fetchData,
                              })
                            }
                          />
                        </div>

                        <div className="handwrittennotes-icon">
                          <Link to={`/university/view-semester/${id}/${item?._id}`}>
                            <AiOutlineEye />
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {totalPages ? (
            <Pagination
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onLimitChange={handleLimitChange}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HOC(UniversityCourse);
