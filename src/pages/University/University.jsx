import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import HOC from "../../components/HOC/HOC";
import Pagination from "../../components/Pagination/Pagination";
import { generateCsv } from "../../services/exportComponents";
import {
  deleteUniversity,
  getUniversity,
} from "../../services/exportFunctions";

const University = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const {id}=useParams();

  const handlePageChange = (page) => setCurrentPage(page);
  const handleLimitChange = (newLimit) => setLimit(newLimit);

  const fetchData = async () => {
    setIsLoading(true);
    getUniversity({ setData, setIsLoading, params: { page: currentPage, limit, search } });

  };

  useEffect(() => {
    fetchData();
  }, [currentPage, limit, search]);

  const universities = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data)
    ? data
    : data?.data?.data ?? [];

  const totalPages = data?.pagination?.totalPages ?? null;

  return (
    <div className="dashboardcontainer">
      <div className="dashboardcontainer-header">
        <h6>University </h6>
      </div>

      <div className="handwrittennotes-list">
        <div className="handwrittennotes-list-header">
          <Link to={"/university/add-university"} className="link">
            <div className="handwrittennotes-add">
              <FaPlus />
              <h6>Add NEW University</h6>
            </div>
          </Link>

          {/* <div className="handwrittennotes-search">
            <IoSearch color="#ADB5BD" />
            <input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div> */}

          {universities.length > 0 && (
            <div
              onClick={() =>
                generateCsv(
                  [
                    "Name",
                    "Street",
                    "City",
                    "State",
                    "Country",
                    "Pincode",
                    "Email",
                    "Phone",
                    "Website",
                    "Established",
                    "Type",
                    "National Rank",
                    "International Rank",
                    "Accreditation Body",
                    "Accreditation Year",
                    "Accreditation Status",
                  ],
                  universities.map((u) => [
                    u.name || "",
                    u.address?.street || "",
                    u.address?.city || "",
                    u.address?.state || "",
                    u.address?.country || "",
                    u.address?.pincode || "",
                    u.contact?.email || "",
                    u.contact?.phone || "",
                    u.contact?.website || "",
                    u.establishedYear ?? "",
                    u.type || "",
                    u.ranking?.nationalRank ?? "",
                    u.ranking?.internationalRank ?? "",
                    u.accreditation?.body || "",
                    u.accreditation?.year ?? "",
                    u.accreditation?.status || "",
                  ]),
                  `University-${currentPage}.csv`
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
                <th>Name</th>
                <th>City</th>
                <th>Country</th>
                <th>Established</th>
                <th>Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    Loading...
                  </td>
                </tr>
              )}

              {!isLoading && universities.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    No universities found.
                  </td>
                </tr>
              )}

              {!isLoading &&
                universities.length > 0 &&
                universities.map((item, index) => (
                  <tr key={item?._id || index}>
                    <td>{item?.name || "-"}</td>
                    <td>{item?.address?.city || "-"}</td>
                    <td>{item?.address?.country || "-"}</td>
                    <td>{item?.establishedYear ?? "-"}</td>
                    <td>{item?.type || "-"}</td>
                    <td>
                      <div className="handwrittennotes-table-icons">
                        <div className="handwrittennotes-icon">
                          <AiOutlineDelete
                            onClick={() =>
                              deleteUniversity({
                                id: item?._id,
                                addFun: fetchData,
                              })
                            }
                          />
                        </div>

                        <div className="handwrittennotes-icon">
                          <Link
                            to={`/university/${item?._id}/university-courses`}
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

export default HOC(University);
