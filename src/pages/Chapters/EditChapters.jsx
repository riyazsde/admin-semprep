import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { AddGoalsExamModal } from "../../components/Modals/Modals";
import { GoArrowLeft } from "react-icons/go";
import { AiFillPlusCircle } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  addChapter,
  editChapter,
  getAllSubjects,
  getAllSubjectsByGoalExam,
  getAllSubSubjects,
  getChapterById,
  getGoalCategory,
  getGoalExamByGoalCategory,
} from "../../services/exportFunctions";

const EditChapters = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [goalExam, setGoalExam] = useState([]);
  const [allGoals, setAllGoals] = useState([]);
  const [subject, setSubject] = useState([]);
  const [subSubjects, setSubSubjects] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getGoalCategory({ setIsLoading, setData });

    getChapterById({
      setIsLoading,
      setData: async (res) => {
        const initialData = {
          goalCategory: res?.data?.goalCategory,
          goal: res.data?.goal,
          subject: res.data?.subject?._id,
          subSubject: res.data?.subSubject,
          name: res.data?.name,
          language: res.data?.language,
        };
        reset(initialData);
        getGoalCategory({
          setIsLoading,
          setData: (res) => {
            setGoalExam(res);
            reset({ ...initialData, goalCategory: initialData.goalCategory });
          },
        });
        if (initialData.goalCategory && data) {
          reset({ goalCategory: initialData.goalCategory });
          const params = {
            page: 1,
            limit: 100,
            search: "",
            goalCategoryId: initialData.goalCategory,
          };
          getGoalExamByGoalCategory({
            setIsLoading,
            setData: (res) => {
              setAllGoals(res);
              reset({ ...initialData, goal: initialData.goal });
            },
            params,
          });
        }

        if (initialData.goal && data) {
          reset({ goal: initialData.goal });
          const params = {
            page: 1,
            limit: 100,
            search: "",
            goalCategory: initialData.goalCategory,
            goalId: initialData.goal,
          };
          getAllSubjects({
            setIsLoading,
            setData: (res) => {
              setSubject(res);
              reset({ ...initialData, subject: initialData.subject });
            },
            params,
          });
        }

        if (initialData.subject && subject) {
          reset({ subject: initialData.subject });
          const params = {
            page: 1,
            limit: 100,
            search: "",
            subjectId,
          };
          getAllSubSubjects({
            setIsLoading,
            setData: (res) => {
              setSubSubjects(res);
              reset({ ...initialData, subSubject: initialData.subSubject });
            },
            params,
          });
        }
      },
      id,
    });
  }, []);

  const goalCategory = watch("goalCategory");

  useEffect(() => {
    if (goalCategory) {
      const params = {
        page: 1,
        limit: 100,
        search: "",
        goalCategoryId: goalCategory,
      };
      getGoalExamByGoalCategory({ setIsLoading, setData: setAllGoals, params });
    }
  }, [goalCategory]);

  const goalExamId = watch("goal");

  useEffect(() => {
    if (goalExamId) {
      const params = {
        page: 1,
        limit: 100,
        search: "",
        goalCategory,
        goalId: goalExamId,
      };
      getAllSubjects({ setIsLoading, setData: setSubject, params });
    }
  }, [goalExamId]);

  const subjectId = watch("subject");

  useEffect(() => {
    if (subjectId) {
      const params = {
        page: 1,
        limit: 100,
        search: "",
        subjectId,
      };
      getAllSubSubjects({ setIsLoading, setData: setSubSubjects, params });
    }
  }, [subjectId]);

  const onSubmit = (formData) => {
    const payload = formData;
    if (!payload.subSubject) delete payload.subSubject;

    editChapter({ id, data: payload, addFun: () => navigate("/chapters") });
  };

  return (
    <>
      <AddGoalsExamModal show={show} onHide={() => setShow(false)} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dashboardcontainer">
          <div className="dashboardcontainer-header">
            <h6>Chapters</h6>
            <p>
              <GoArrowLeft
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              Chapters /<span> Edit Chapter</span>
            </p>
          </div>
          <div className="studentprofile-container">
            <div className="studyplanner-container">
              <div
                style={{ display: "grid" }}
                className="addhandwritten-inputs"
              >
                               
                <div className="addhandwritten-input">
                  <h6>
                    Goal<span>*</span>
                  </h6>
                  <div className="input-container">
                    <select {...register("goalCategory")}>
                      <option value="">Select Goal</option>
                      {data?.data?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Goal Exam */}
                <div className="addhandwritten-input">
                  <h6>
                    Goal Exam<span>*</span>
                  </h6>
                  <div className="input-container">
                    <select {...register("goal")}>
                      <option value="">Select Goal Exam</option>
                      {allGoals?.data?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div className="addhandwritten-input">
                  <h6>
                    Subject<span>*</span>
                  </h6>
                  <div className="input-container">
                    <select {...register("subject")}>
                      <option value="">Select Subject</option>
                      {subject?.data?.map((item) => (
                        <option key={item.id} value={item._id}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Sub Subjects */}
                {/* <div className="addhandwritten-input">
                  <h6>Sub Subjects (Optional)</h6>
                  <div className="input-container">
                    <select {...register("subSubject")}>
                      <option value="">Select Sub Subject</option>
                      {subSubjects?.data?.map((item) => (
                        <option key={item.id} value={item._id}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div> */}

                {/* Chapter */}
                <div className="addhandwritten-input">
                  <h6>Chapter</h6>
                  <div className="input-container">
                    <input
                      type="text"
                      {...register("name")}
                      placeholder="Enter Chapter"
                    />
                  </div>
                </div>

                {/* Locale */}
                <div className="addhandwritten-input">
                  <h6>Locale</h6>
                  <div className="input-container">
                    <input
                      type="text"
                      {...register("language")}
                      placeholder="Enter Language"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="handwritten-button">
                <button type="submit">Save</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default HOC(EditChapters);
