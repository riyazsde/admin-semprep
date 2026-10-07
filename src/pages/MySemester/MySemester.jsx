import { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";

import { AiOutlineDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { generateCsv } from "../../services/exportComponents";
import { deleteSemester, getAllSemsters } from "../../services/exportFunctions";

const MySemester = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
      limit: limit,
      search,
    };
    getAllSemsters({ setIsLoading, setData, params });
  };

  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);

  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Semester</h6>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link to={"/my-semester/add-semester"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW semester</h6>
              </div>
            </Link>
            <div className="handwrittennotes-search">
              <IoSearch color="#ADB5BD" />
              <input
                type="search"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
              />
            </div>
            {data?.data?.length > 0 && (
              <div
                onClick={() =>
                  generateCsv(
                    [
                      "Semester Number",
                      "Stream",
                      "University",
                      "Goal",
                      "Goal Category",
                      "Status"
                    ],
                    data?.data?.map((item) => [
                      item.semesterNumber,
                      item.stream,
                      item.university?.name,
                      item.goal?.name,
                      item.goalCategory?.name,
                      item.isActive ? "Active" : "Inactive"
                    ]),
                    `semesters-${currentPage}.csv`
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
                  <th>Semester Number</th>
                  {/* <th>Stream</th>
                  <th>University</th> */}
                  <th>Goal</th>
                  <th>Goal Category</th>
                  {/* <th>Status</th> */}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.semesterNumber}</td>
                      {/* <td>{item.stream}</td>
                      <td>{item.university?.name}</td> */}
                      <td>{item.goal?.name}</td>
                      <td>{item.goalCategory?.name}</td>
                      {/* <td>{item.isActive ? "Active" : "Inactive"}</td> */}
                      <td>
                        <div className="handwrittennotes-table-icons">
                          {/* <div className="handwrittennotes-icon">
                            <FiEdit3
                              onClick={() =>
                                navigate(`/my-semester/edit-semester/${item._id}`)
                              }
                            />
                          </div> */}
                          <div className="handwrittennotes-icon">
                            <AiOutlineDelete
                              onClick={() =>
                                deleteSemester({ addFun: getData, id: item._id })
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

export default HOC(MySemester);
