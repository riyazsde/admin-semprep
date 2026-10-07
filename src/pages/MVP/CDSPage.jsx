import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import HOC from "../../components/HOC/HOC";
import Pagination from "../../components/Pagination/Pagination";
import {
  deleteMVPQuestion,
  getAllMVPQuestions,
  getGoalCategory,
  getGoalExamByGoalCategory,
} from "../../services/exportFunctions";

const CDSPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedGoalCategory, setSelectedGoalCategory] = useState("");
  const [selectedGoalExam, setSelectedGoalExam] = useState("");
  const [goalCategories, setGoalCategories] = useState([]);
  const [goalExams, setGoalExams] = useState([]);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (newLimit) => {
    console.log("Limit per Page:", newLimit);
    setLimit(newLimit);
  };

  const getGoalCategories = () => {
    getGoalCategory({
      setIsLoading,
      setData: setGoalCategories,
      params: { limit: 1000 },
    });
  };

  const getData = () => {
    const params = {
      page: currentPage,
      limit: limit,
      search,
      goalCategory: selectedGoalCategory,
      goal: selectedGoalExam,
    };
    getAllMVPQuestions({ setIsLoading, setData, params });
  };

  useEffect(() => {
    getGoalCategories();
  }, []);

  useEffect(() => {
    if (selectedGoalCategory) {
      const params = {
        page: 1,
        limit: 1000,
        search: "",
        goalCategoryId: selectedGoalCategory,
      };
      getGoalExamByGoalCategory({
        setIsLoading,
        setData: setGoalExams,
        params,
      });
    }
  }, [selectedGoalCategory]);

  useEffect(() => {
    getData();
  }, [limit, currentPage, search, selectedGoalCategory, selectedGoalExam]);

  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>All MVP Questions</h6>
        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link to={"/mvp/add-cds-questions"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW Question</h6>
              </div>
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className="">
                <select
                  value={selectedGoalCategory}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setSelectedGoalCategory(e.target.value);
                    setSelectedGoalExam("");
                  }}
                >
                  <option value="">Select Goal Category</option>
                  {goalCategories?.data?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
                <select
                  value={selectedGoalExam}
                  onChange={(e) => setSelectedGoalExam(e.target.value)}
                  disabled={!selectedGoalCategory}
                >
                  <option value="">Select Goal Exam</option>
                  {goalExams?.data?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="handwrittennotes-list-table">
            <Table responsive>
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Goal Category</th>
                  <th>Goal</th>
                  <th>Exam Tag</th>
                  <th>Category</th>
                  <th>Question Text</th>
                  <th>Description</th>
                  <th>Input Type</th>
                  <th>Options</th>
                  <th>Placeholder</th>
                  <th>Is Active</th>
                  <th>Order</th>
                  <th>Required</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((data, index) => (
                  <tr key={index}>
                    <td>{data.srNo}</td>
                    <td>{data.goalCategory?.name}</td>
                    <td>{data.goal?.name}</td>
                    <td>{data.examTag}</td>
                    <td>{data.category}</td>
                    <td>{data.questionText?.slice(0, 20)}</td>
                    <td>{data.description?.slice(0, 20)}</td>
                    <td>{data.inputType}</td>
                    <td>
                      {data?.options?.map((opt) => opt?.value).join(", ")}
                    </td>
                    <td>{data.placeholder}</td>
                    <td>{data.isActive ? "Yes" : "No"}</td>
                    <td>{data.order}</td>
                    <td>{data.required ? "Yes" : "No"}</td>
                    <td>
                      <div className="handwrittennotes-table-icons">
                        <div className="handwrittennotes-icon">
                          <FiEdit3
                            onClick={() =>
                              navigate(`/mvp/edit-cds-questions/${data._id}`)
                            }
                          />
                        </div>
                        <div className="handwrittennotes-icon">
                          <AiOutlineDelete
                            onClick={() =>
                              deleteMVPQuestion({
                                id: data._id,
                                addFun: getData,
                              })
                            }
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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

export default HOC(CDSPage);
