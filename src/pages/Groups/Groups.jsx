import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { FaCircle } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";

import { RiDeleteBin6Line } from "react-icons/ri";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deleteGroup, getAllGroups } from "../../services/exportFunctions";

const Groups = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

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
      userType: "PARTNER",
    };
    getAllGroups({ setIsLoading, setData, params });
  };
  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);
  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Groups</h6>
        </div>
        <div className="groups-container">
          <div className="groups-header">
            <div className="groups-header-left">
              <FaCircle />
              <h5>Active Groups</h5>
              <p>{data?.data?.length}</p>
            </div>
            <div className="groups-header-right">
              <MdAddBox onClick={() => navigate("/groups/permsissions")} />
            </div>
          </div>
          <div className="groups-main">
            {data?.data?.map((i, index) => (
              <div className="groups-div">
                <div className="groups-div-header">
                  <div className="groups-div-header-left">
                    <h6>{i?.name}</h6>
                    <p>{i?.description}</p>
                  </div>
                  <div className="groups-div-header-right">
                    {/* <MdOutlineRemoveRedEye /> */}
                    <RiDeleteBin6Line
                      onClick={() =>
                        deleteGroup({ id: i?._id, addFun: () => getData() })
                      }
                    />
                  </div>
                </div>
                <div className="groups-div-main">
                  <h6>{i?.permissions?.map((j) => j?.name).join(" | ")}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(Groups);
