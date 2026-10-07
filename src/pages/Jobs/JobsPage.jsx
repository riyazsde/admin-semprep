import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import HOC from "../../components/HOC/HOC";
import Pagination from "../../components/Pagination/Pagination";
import { deleteJob, getAllJobs } from "../../services/exportFunctions";

const Jobs = () => {
  const navigate = useNavigate();
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
    getAllJobs({ setIsLoading, setData, params });
  };

  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);

  const rows = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.jobs)
    ? data.jobs
    : [];

  const totalPages =
    data?.pagination?.totalPages ??
    data?.pagination?.totalPagesCount ??
    Math.ceil((data?.count ?? rows.length) / limit);

  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Jobs</h6>
        </div>

        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link to={"/jobs/add-job"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW Job</h6>
              </div>
            </Link>

            {/* <div className="handwrittennotes-search">
              <IoSearch color="#ADB5BD" />
              <input
                type="search"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
              />
            </div> */}
            {/*
            {rows.length > 0 && (
              <div
                onClick={() =>
                  generateCsv(
                    [
                      "Title",
                      "Company",
                      "Location",
                      "Work Type",
                      "Salary Min",
                      "Salary Max",
                      "Posted At",
                    ],
                    rows.map((item) => [
                      item.title,
                      item.company?.name ?? item.company,
                      item.location,
                      item.workType ?? item.mode,
                      item.salary?.min ?? "",
                      item.salary?.max ?? "",
                      item.postedAt ?? item.createdAt ?? "",
                    ]),
                    `Jobs-${currentPage}.csv`
                  )
                }
                className="handwrittennotes-export"
              >
                <span>Export CSV</span>
              </div>
            )} */}
          </div>

          <div className="handwrittennotes-list-table">
            <table>
              <thead>
                <tr>
                  {/* <th>Logo</th> */}
                  <th>Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Work Type</th>
                  <th>Salary</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {rows &&
                  rows.map((job, index) => (
                    <tr key={job._id ?? job.id ?? index}>
                      {/* <td>
                        {job.company?.logoUrl ? (
                          <img
                            src={job.company.logoUrl}
                            style={{
                              width: "100px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                            alt="logo"
                          />
                        ) : null}
                      </td> */}

                      <td>{job.title}</td>
                      <td>{job.company?.name ?? job.company}</td>
                      <td>{job.location}</td>
                      <td>{job.workType ?? job.mode}</td>
                      <td>
                        {job.salary
                          ? `${job.salary.currency ?? ""} ${
                              job.salary.min ?? ""
                            }${job.salary.max ? ` - ${job.salary.max}` : ""} ${
                              job.salary.type ? `(${job.salary.type})` : ""
                            }`
                          : "—"}
                      </td>

                      <td>
                        <div className="handwrittennotes-table-icons">
                          {/* <div className="handwrittennotes-icon">
                            <FiEdit3
                              onClick={() =>
                                navigate(`/jobs/edit-job/${job._id ?? job.id}`)
                              }
                            />
                          </div> */}
                          <div className="handwrittennotes-icon">
                            <Link to={`/jobs/applicants/${job?._id}`}>
                              <AiOutlineEye />
                            </Link>
                          </div>
                          <div className="handwrittennotes-icon">
                            <AiOutlineDelete
                              onClick={() => {
                                deleteJob({
                                  id: job._id ?? job.id,
                                  addFun: getData,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                {rows.length === 0 && !isLoading && (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-6 text-sm text-gray-500"
                    >
                      No jobs found
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

export default HOC(Jobs);
