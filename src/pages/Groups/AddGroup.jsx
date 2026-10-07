import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";

import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { addGroup, allPermissions } from "../../services/exportFunctions";
import { useForm } from "react-hook-form";

const AddGroup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [allGroups, setAllGroups] = useState([]);

  const { register, handleSubmit, watch } = useForm();

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
      userType: "PARTNER",
    };
    allPermissions({ setIsLoading, setData, params });
  };

  const togglePermission = (id) => {
    const updatedPermissions = selectedPermissions.includes(id)
      ? selectedPermissions.filter((item) => item !== id)
      : [...selectedPermissions, id];

    setSelectedPermissions(updatedPermissions);

    const allIds = data?.data?.map((item) => item.id) || [];
    setSelectAll(
      allIds.length > 0 && updatedPermissions.length === allIds.length
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedPermissions([]);
    } else {
      const allIds = data?.data?.map((item) => item._id) || [];
      setSelectedPermissions(allIds);
    }
    setSelectAll(!selectAll);
  };

  const savePermissions = () => {
    console.log("Selected Permissions:", selectedPermissions);
  };

  useEffect(() => {
    getData();
  }, [limit, currentPage, search]);

  const onSubmit = (data) => {
    console.log(data);
    const payload = {
      name: data.name,
      permissions: selectedPermissions,
      description: data.description,
    };

    addGroup({
      data: payload,
      setIsLoading,
      addFun: () => navigate("/groups"),
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dashboardcontainer">
          <div className="dashboardcontainer-header">
            <h6>Groups</h6>
            <p>
              <GoArrowLeft
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              Groups /<span> Add Group</span>
            </p>
          </div>
          <div className="homepagecontent">
            <div className="studyplanner-container">
              <div className="addgroups-inpute" style={{gap:12}}>
                <h6>
                  Group Name <span>*</span>
                </h6>
                <div className="input-container-addgroup">
                  <input
                    type="text"
                    id="email"
                    required
                    {...register("name")}
                  />
                  {/* <label htmlFor="">Enter group name</label> */}
                </div>
              </div>
              <div className="addgroups-inpute mt-3" style={{gap:12}}>
                <h6>
                  Description <span>*</span>
                </h6>
                <div className="input-container-addgroup">
                  <input
                    type="text"
                    id="email"
                    required
                    {...register("description")}
                  />
                  {/* <label htmlFor="">Enter group description</label> */}
                </div>
              </div>
              <div className="addgroups-searchbar">
                <div className="addgroups-searchbar-left">
                  <label htmlFor="">
                    Permissions <span>*</span>
                  </label>
                  <div className="addgroups-search" style={{paddingInline:10}}>
                    <IoSearch color="#718EBF" size={20} />
                    <input
                      type="text"
                      placeholder="Search "
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="addgroups-searchbar-right" style={{display:"flex", gap: 5, alignItems: "center"}}>
                  <div className="userlist7">
                    <label className="switch">
                      <input
                        type="checkbox"
                        id="select-all"
                        checked={selectAll}
                        onChange={toggleSelectAll}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <p>Select all</p>
                </div>
              </div>
              <div className="addgroups-main-part">
                <div className="addgroups-main-div">
                  <p>Employee Management</p>
                  <div>
                    <div className="addgroups-radio-div-Byme">
                      {data?.data?.map((item) => (
                        <div
                          className="addgroups-radio-div-radio"
                          key={item.id}
                        >
                          <div className="userlist7">
                            <label className="switch">
                              <input
                                type="checkbox"
                                id={`permission-${item.id}`}
                                checked={selectedPermissions.includes(item._id)}
                                onChange={() => togglePermission(item._id)}
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <h5>{item?.name}</h5>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="addhandwritennotes-submit">
            <div className="handwritten-button">
              <button onClick={savePermissions}>Save</button>
            </div>
            <div className="handwritten-button-addnote">
              <button onClick={() => navigate("/groups")}>
                Save and add another
              </button>
            </div>
            <div className="handwritten-button-addnote">
              <button onClick={() => navigate("/groups")}>
                Save and continue
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default HOC(AddGroup);
