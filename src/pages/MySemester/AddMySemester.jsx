import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import HOC from "../../components/HOC/HOC";
import {
  addSemesterCourse,
  getGoalCategory,
  getGoalExamByGoalCategory,
} from "../../services/exportFunctions";

const AddMySemester = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [goalExam, setGoalExam] = useState([]);
  const [isFetchingGoals, setIsFetchingGoals] = useState(false);

  const getData = () => {
    getGoalCategory({ setIsLoading, setData, params: { limit: 1000 } });
  };

  useEffect(() => {
    getData();
  }, []);

  const selectedGoalCategory = watch("goalCategory");
  useEffect(() => {
    if (selectedGoalCategory) {
      setIsFetchingGoals(true);
      const params = {
        page: 1,
        limit: 1000,
        search: "",
        goalCategoryId: selectedGoalCategory,
      };
      getGoalExamByGoalCategory({
        setIsLoading: setIsFetchingGoals,
        setData: setGoalExam,
        params
      });
    } else {
      setGoalExam([]);
    }
  }, [selectedGoalCategory]);

  const onSubmit = (data) => {
    const payload = {
      semesterNumber: Number(data.semesterNumber),
      durationYears: Number(data.durationYears),
      goalCategory: data.goalCategory,
      goal: data.goalExam,
      // status: "Active",
    };
    if (data?.description) {
      payload.description = data.description;
    }
    addSemesterCourse({
      data: payload,
      addFun: () => navigate("/my-semester"),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Semester</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Semester /<span> Add Semester</span>
          </p>
        </div>
        <div className="studentprofile-container">
          <div className="studyplanner-container">
            <div className="addhandwritten-inputs">
              <div className="addhandwritten-input-two-div">
                <div className="addhandwritten-input" style={{gap:12}}>
                  <h6>University<span>*</span></h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <select
                        {...register("goalCategory", { required: "University is required" })}
                      >
                        <option value="">Select University</option>
                        {data?.data?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {/* <label>Select University</label> */}
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input" style={{gap:12}}>
                  <h6 style={{display:"flex", alignItems:"center"}}>Course<span>*</span>
                   {!selectedGoalCategory && (
                        <p style={{ color: "red", fontSize: "12px", marginBottom:0, marginLeft:2 }}>
                          {` (Please select a University first)`}
                        </p>
                      )}
                  </h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <select
                        {...register("goalExam", { required: "Course is required" })}
                        disabled={!selectedGoalCategory || isFetchingGoals}
                      >
                        <option value="">Select Course</option>
                        {goalExam?.data?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {/* <label>Select Course</label> */}
                      {selectedGoalCategory && goalExam?.data?.length === 0 && !isFetchingGoals && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          No courses found for this university
                        </p>
                      )}
                    </div>
                     
                  </div>
                </div>
              </div>

              <div className="addhandwritten-input-two-div">
                <div className="addhandwritten-input" style={{gap:12}}>
                  <h6>Semester Number<span>*</span></h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <input
                        type="number"
                        min="1"
                        {...register("semesterNumber", { required: "Semester Number is required" })}
                      />
                      {/* <label>Semester Number</label> */}
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input" style={{gap:12}}>
                  <h6>Duration (Years)<span>*</span></h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <input
                        type="number"
                        step="0.1"
                        min="0.1"
                        {...register("durationYears", { required: "Duration is required" })}
                      />
                      {/* <label>Duration in Years</label> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="addhandwritten-input-two-div">
                <div className="addhandwritten-input" style={{gap:12}}>
                  <h6>Status<span>*</span></h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <select
                        {...register("status", { required: "Status is required" })}
                        defaultValue="upcoming"
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                      </select>
                      <label>Select Status</label>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className="addhandwritten-input-two-div">
                <div className="addhandwritten-input" style={{gap:12}}>
                  <h6>Description (Optional)</h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <textarea
                        rows="4"
                        {...register("description")}
                        style={{ resize: "vertical" }}
                      />
                      <label>Enter description</label>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="addhandwritennotes-submit">
            <div className="handwritten-button">
              <button type="submit">Save</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default HOC(AddMySemester);
