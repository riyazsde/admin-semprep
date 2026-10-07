import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import HOC from '../../components/HOC/HOC';
import { AddGoalsExamModal } from '../../components/Modals/Modals';
import {
  addChapter,
  getAllSemstersCommon,
  getAllSubjects,
  getAllSubSubjects,
  getGoalCategory,
  getGoalExamByGoalCategory,
} from '../../services/exportFunctions';

const AddChapter = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { register, handleSubmit, watch, setValue } = useForm();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [goalExam, setGoalExam] = useState([]);
  const [allGoals, setAllGoals] = useState([]);
  const [subject, setSubject] = useState([]);
  const [subSubjects, setSubSubjects] = useState([]);
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    getGoalCategory({ setIsLoading, setData, params: { limit: 1000 } });
  }, []);

  const goalCategory = watch('goalCategory');

  useEffect(() => {
    if (goalCategory) {
      const params = {
        page: 1,
        limit: 1000,
        search: '',
        goalCategoryId: goalCategory,
      };
      getGoalExamByGoalCategory({ setIsLoading, setData: setAllGoals, params });
    }
  }, [goalCategory]);

  const goalExamId = watch('goal');

const watchSemester=watch("semester");
  useEffect(() => {
    if (goalExamId) {
      const params = {
        page: 1,
        limit: 1000,
        search: "",
        goalCategoryId:goalCategory,
        goalId: goalExamId,
        semesterId:watchSemester
      };
      getAllSubjects({ setIsLoading, setData: setSubject, params });
    }
  }, [goalExamId, goalCategory,watchSemester]);

  const subjectId = watch('subject');

  useEffect(() => {
    if (subjectId) {
      const params = {
        page: 1,
        limit: 1000,
        search: '',
        subjectId,
      };
      getAllSubSubjects({ setIsLoading, setData: setSubSubjects, params });
    }
  }, [subjectId]);

  useEffect(() => {
    if (goalExamId && goalCategory) {
      getAllSemstersCommon({
        setIsLoading,
        setData: setSemesters,
        params: { goal: goalExamId, goalCategory: goalCategory },
      });
    }
  }, [goalExamId, goalCategory]);

  const onSubmit = (formData) => {
    const payload = formData;
    if (!payload.subSubject) delete payload.subSubject;
    if (formData?.semester) {
      payload.semester = formData.semester;
    }
    addChapter({ data: payload, addFun: () => navigate('/chapters') });
  };

  return (
    <>
      <AddGoalsExamModal show={show} onHide={() => setShow(false)} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dashboardcontainer">
          <div className="dashboardcontainer-header">
            <h6>Units</h6>
            <p>
              <GoArrowLeft
                size={25}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(-1)}
              />
              Units /<span> Add Unit</span>
            </p>
          </div>
          <div className="studentprofile-container">
            <div className="studyplanner-container">
              <div className="addhandwritten-inputs">
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input" style={{gap:"12px"}}>
                    <h6>
                      University<span>*</span>
                    </h6>
                    <div className="input-container">
                      <select {...register('goalCategory')}>
                        <option value="">Select University</option>
                        {data?.data?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="addhandwritten-input" style={{gap:"12px"}}>
                    <h6>
                      Courses<span>*</span>
                    </h6>
                    <div className="input-container">
                      <select {...register('goal')}>
                        <option value="">Select Course</option>
                        {allGoals?.data?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input" style={{gap:"12px"}}>
                    <h6>Semester<span>*</span></h6>
                    <div className="input-container">
                      <select {...register('semester')} defaultValue="">
                        <option value="">Select Semester</option>
                        {semesters?.data?.map((sem) => (
                          <option key={sem._id} value={sem._id}>
                            {sem.semesterNumber
                              ? `Semester ${sem.semesterNumber}`
                              : sem.name || sem._id}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{gap:"12px"}}>
                    <h6>
                      Subject<span>*</span>
                    </h6>
                    <div className="input-container">
                      <select {...register('subject')}>
                        <option value="">Select Subject</option>
                        {subject?.data?.map((item) => (
                          <option key={item.id} value={item._1d || item._id}>
                            {item?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                 
                </div>

                <div className="addhandwritten-input-two-div">
                   <div className="addhandwritten-input" style={{gap:"12px"}}>
                    <h6>Sub Subjects (Optional)</h6>
                    <div className="input-container">
                      <select {...register('subSubject')}>
                        <option value="">Select Sub Subject</option>
                        {subSubjects?.data?.map((item) => (
                          <option key={item.id} value={item._id}>
                            {item?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{gap:"12px"}}>
                    <h6>Units</h6>
                    <div className="input-container">
                      <input
                        type="text"
                        {...register('name')}
                        placeholder="Enter Units"
                      />
                    </div>
                  </div>
                  
                </div>

                {/* <div className="addhandwritten-input" style={{gap:"12px"}}>
                  <h6>Locale</h6>
                  <div className="input-container">
                    <input
                      type="text"
                      {...register('language')}
                      placeholder="Enter Language"
                    />
                  </div>
                </div> */}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
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

export default HOC(AddChapter);
