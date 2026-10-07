import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import HOC from "../../components/HOC/HOC";
import Pagination from "../../components/Pagination/Pagination";
import { generateCsv } from "../../services/exportComponents";
import {
  deleteApplicant,
  getAllApplicants,
} from "../../services/exportFunctions";

const Applicants = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  const getData = () => {
    const params = {
      page: currentPage,
      limit,
      search,
    };
    getAllApplicants({ id, setIsLoading, setData, params });
  };

  useEffect(() => {
    getData();
  }, [limit, currentPage, search, id]);

  const rows = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.applicants)
    ? data.applicants
    : [];

  const totalPages =
    data?.pagination?.totalPages ??
    data?.pagination?.totalPagesCount ??
    (Array.isArray(data)
      ? Math.ceil((data?.length ?? rows.length) / limit)
      : Math.ceil((data?.count ?? rows.length) / limit));

  return (
    <>
      <div className="dashboardcontainer">
        

        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link to={"/applicants/add-applicant"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW Applicant</h6>
              </div>
            </Link>

            {rows.length > 0 && (
              <div
                onClick={() =>
                  generateCsv(
                    [
                      "Full Name",
                      "Email",
                      "Applicant Email",
                      "Job (id/title)",
                      "Status",
                      "Applied At",
                      "Resume URL",
                    ],
                    rows.map((item) => [
                      item.fullName ?? "",
                      item.email ?? "",
                      item.applicant?.email ?? "",
                      item.job?.title ?? item.job ?? "",
                      item.status ?? "",
                      item.createdAt ?? item.appliedAt ?? "",
                      item.resumeUrl ?? item.resume ?? "",
                    ]),
                    `Applicants-${currentPage}.csv`
                  )
                }
                className="handwrittennotes-export"
              >
                <span>Export CSV</span>
              </div>
            )}
          </div>

          <div className="handwrittennotes-list-table">
            <table>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Applicant Email</th>
                  <th>Job</th>
                  <th>Resume </th>
                  <th>Applied At</th>
                  {/* <th></th> */}
                </tr>
              </thead>

              <tbody>
                {rows &&
                  rows.map((app, index) => (
                    <tr key={app._id ?? app.id ?? index}>
                      <td>{app.fullName || "-"}</td>
                      <td>{app.email ?? "-"}</td>
                      <td>{app.applicant?.email ?? "-"}</td>
                      <td>{app.job?.title ?? app.job ?? "-"}</td>
                      <td>
                        <Link
                          to={app.resumeUrl ?? app.resume ?? ""}
                          target="_blank"
                        >
                          View
                        </Link>{" "}
                      </td>
                      <td>{app.createdAt ?? app.appliedAt ?? "-"}</td>
                      {/* <td>
                        <div className="handwrittennotes-table-icons">
                          <div className="handwrittennotes-icon">
                            <AiOutlineDelete
                              onClick={() =>
                                deleteApplicant({
                                  id: app._id ?? app.id,
                                  addFun: getData,
                                })
                              }
                            />
                          </div>
                        </div>
                      </td> */}
                    </tr>
                  ))}

                {rows.length === 0 && !isLoading && (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-6 text-sm text-gray-500"
                    >
                      No applicants found
                    </td>
                  </tr>
                )}
                {isLoading && (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-6 text-sm text-gray-500"
                    >
                      Loading...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <Pagination
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onLimitChange={handleLimitChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(Applicants);
