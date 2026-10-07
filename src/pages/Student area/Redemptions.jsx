import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";

import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { GoArrowLeft } from "react-icons/go";
import Pagination from "../../components/Pagination/Pagination";
import {
  deleteRedemption,
  getAllCarts,
  getAllRedumptions,
} from "../../services/exportFunctions";

const Redemptions = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

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
      userType: "USER",
    };
    getAllRedumptions({ setIsLoading, setData, params });
  };
  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);
  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Redemptions</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Student area /<span> Redemptions</span>
          </p>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link
              to={"/student-area/redemptions/add-redemptions"}
              className="link"
            >
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW Redemptions</h6>
              </div>
            </Link>
            {/* <div className="handwrittennotes-search">
              <IoSearch color="#ADB5BD" />
              <input type="search" placeholder="Search..." />
            </div> */}
            {/* <div className="handwrittennotes-export">
              <span>Export CSV</span>
            </div> */}
          </div>
          <div className="handwrittennotes-list-table">
            <table>
              <thead>
                <tr>
                  <th>Reward</th>
                  <th>Redeemed type</th>
                  <th>Redeemed at</th>
                  <th>Redeem ID</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((data, index) => (
                  <tr key={index}>
                    <td>{data.reward}</td>
                    <td>{data.redeemedType}</td>
                    <td>
                      {data.updatedAt
                        ?.slice(0, 10)
                        ?.split("-")
                        ?.reverse()
                        ?.join("-")}
                    </td>
                    <td>{data._id}</td>
                    <td>
                      <div className="handwrittennotes-table-icons">
                        <div
                          className="handwrittennotes-icon"
                          onClick={() => navigate(`/students/${data._id}`)}
                        >
                          <MdArrowOutward />
                        </div>
                        <div className="handwrittennotes-icon">
                          <FiEdit3
                            onClick={() =>
                              navigate(
                                `/student-area/redemptions/edit-redemptions/${data._id}`
                              )
                            }
                          />
                        </div>
                        <div className="handwrittennotes-icon">
                          <AiOutlineDelete
                            onClick={() =>
                              deleteRedemption({
                                id: data._id,
                                addFun: () => getData(),
                              })
                            }
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(Redemptions);
