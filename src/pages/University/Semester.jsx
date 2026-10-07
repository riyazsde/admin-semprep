import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import HOC from "../../components/HOC/HOC";
import Pagination from "../../components/Pagination/Pagination";
import { generateCsv } from "../../services/exportComponents";
import {
  deleteSemester,
  getSemsterByUniversityId,
} from "../../services/exportFunctions";

const Semester = () => {
  const navigate = useNavigate();
  const { id, courseId } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const handlePageChange = (page) => setCurrentPage(page);
  const handleLimitChange = (newLimit) => setLimit(newLimit);

  const fetchData = async () => {
    setIsLoading(true);
    getSemsterByUniversityId({
      setData,
      setIsLoading,
      params: {
        page: currentPage,
        limit,
        search,
        universityId: id,
        courseId: courseId,
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, limit, search, id]);

  const semesters = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data)
    ? data
    : data?.data?.data ?? [];

  const totalPages = data?.pagination?.totalPages ?? null;

  return (
    <div className="dashboardcontainer">
      <div className="dashboardcontainer-header">
        <h6>Semesters</h6>
      </div>

      <div className="handwrittennotes-list">
        <div className="handwrittennotes-list-header">
          <Link to={`/university/${id}/${courseId}/add-semester`} className="link">
            <div className="handwrittennotes-add">
              <FaPlus />
              <h6>Add NEW Semester</h6>
            </div>
          </Link>


        </div>

        <div className="handwrittennotes-list-table">
          <table>
            <thead>
              <tr>
                <th>University</th>
                {/* <th>Course</th> */}
                <th>Semester #</th>
                <th>Duration (yrs)</th>
                <th>Stream</th>
                {/* <th>Subjects</th> */}
                {/* <th>Status</th> */}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center" }}>
                    Loading...
                  </td>
                </tr>
              )}

              {!isLoading && semesters.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center" }}>
                    No semesters found.
                  </td>
                </tr>
              )}

              {!isLoading &&
                semesters.length > 0 &&
                semesters.map((item, index) => (
                  <tr key={item?._id || index}>
                    <td>{item?.university?.name || "-"}</td>
                    {/* <td>{item?.universityCourse?.name || "-"}</td> */}
                    <td>{item?.semesterNumber ?? "-"}</td>
                    <td>{item?.durationYears ?? "-"}</td>
                    <td>{item?.stream || "-"}</td>
                    {/* <td>
                      {Array.isArray(item?.subjects) && item.subjects.length > 0
                        ? item.subjects.map((sub) => sub.name).join(", ")
                        : "-"}
                    </td> */}
                    {/* <td>
                      {typeof item?.isActive === "boolean"
                        ? item.isActive
                          ? "Active"
                          : "Inactive"
                        : "-"}
                    </td> */}
                    <td>
                      <div className="handwrittennotes-table-icons">
                        <div className="handwrittennotes-icon">
                          <AiOutlineDelete
                            onClick={() =>
                              deleteSemester({
                                id: item?._id,
                                addFun: fetchData,
                              })
                            }
                          />
                        </div>

                        <div className="handwrittennotes-icon">
                          <Link
                            to={`/university/${id}/${courseId}/${item?._id}/semester-courses`}
                          >
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

export default HOC(Semester);
