import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import HOC from '../../components/HOC/HOC';
import { showNotification } from '../../services/exportComponents';
import {
  addSubscription,
  getAllSemstersCommon,
  getGoalCategory,
  getGoalExamByGoalCategory,
} from '../../services/exportFunctions';

const AddSubscription = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [goalCategories, setGoalCategories] = useState([]);
  const [goalExam, setGoalExam] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [isFetchingGoals, setIsFetchingGoals] = useState(false);

  const selectedGoalCategory = watch('goalCategory');

  useEffect(() => {
    getGoalCategory({
      setIsLoading,
      setData: setGoalCategories,
      params: { limit: 1000 },
    });
  }, []);

  const selectedGoalExam = watch('goal');

  useEffect(() => {
    if (selectedGoalCategory && selectedGoalExam) {
      getAllSemstersCommon({
        params: {
          limit: 1000,
          goalCategory: selectedGoalCategory,
          goal: selectedGoalExam,
        },
        setIsLoading,
        setData: setSemesters,
      });
    }
  }, [selectedGoalCategory, selectedGoalExam]);
  useEffect(() => {
    if (selectedGoalCategory) {
      setValue('goal', '');

      const params = {
        page: 1,
        limit: 1000,
        search: '',
        goalCategoryId: selectedGoalCategory,
      };

      getGoalExamByGoalCategory({
        setIsLoading: setIsFetchingGoals,
        setData: setGoalExam,
        params,
      });
    } else {
      setGoalExam([]);
      setValue('goal', '');
    }
  }, [selectedGoalCategory, setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        desc: data.desc,
        discount: data.discountActive === 'true' ? Number(data.discount) : 0,
        discountActive: data.discountActive === 'true',
        duration: Number(data.duration),
        endDate: new Date(data.endDate).toISOString(),
        goal: data.goal,
        goalCategory: data.goalCategory,
        isActive: true,
        name: data.name,
        originalPrice: Number(data.originalPrice),
        semester: data.semester,
      };

      addSubscription({
        setIsLoading,
        data: payload,
        addFun: () => navigate('/subscriptions'),
      });
    } catch (error) {
      showNotification({
        type: 'error',
        message: 'Failed to create subscription. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Subscription Plan</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/subscriptions')}
            />
            Subscriptions Page /<span> Add Subscription</span>
          </p>
        </div>
        <div className="">
          <div className="handwrittennotes-list">
            <div className="addhandwritten-inputs">
              <div className="addhandwritten-input-two-div">
                <div className="addhandwritten-input" style={{gap:12}}>
                  <h6>
                    Goal Category <span>*</span>
                  </h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <select {...register('goalCategory', { required: true })}>
                        <option value="">Select Goal Category</option>
                        {goalCategories?.data?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="addhandwritten-input" style={{gap:12}}>
                  <h6>
                    Goal <span>*</span>
                  </h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <select
                        {...register('goal', { required: true })}
                        disabled={!selectedGoalCategory || isFetchingGoals}
                      >
                        <option value="">
                          {isFetchingGoals ? 'Loading...' : 'Select Goal'}
                        </option>
                        {goalExam?.data?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="addhandwritten-input-two-div">
                <div className="addhandwritten-input" style={{gap:12}}>
                  <h6>
                    Semester <span>*</span>
                  </h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <select {...register('semester', { required: true })}>
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
                </div>

                <div className="addhandwritten-input" style={{gap:12}}>
                  <h6>
                    Plan Name <span>*</span>
                  </h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <input
                        type="text"
                        {...register('name', { required: true })}
                        placeholder="Enter Plan Name"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="addhandwritten-input-two-div">
                <div className="addhandwritten-input" style={{gap:12}}>
                  <h6>
                    Duration (Months) <span>*</span>
                  </h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <input
                        type="number"
                        {...register('duration', { required: true })}
                        placeholder="Enter Duration in Months"
                      />
                    </div>
                  </div>
                </div>

                <div className="addhandwritten-input" style={{gap:12}}>
                  <h6>
                    End Date <span>*</span>
                  </h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <input
                        type="date"
                        {...register('endDate', { required: true })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="addhandwritten-input-two-div">
                <div className="addhandwritten-input" style={{gap:12}}>
                  <h6>
                    Original Price (₹) <span>*</span>
                  </h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <input
                        type="number"
                        {...register('originalPrice', { required: true })}
                        placeholder="Enter Original Price"
                      />
                    </div>
                  </div>
                </div>

                <div className="addhandwritten-input" style={{gap:12}}>
                  <h6>
                    Discount Active <span>*</span>
                  </h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <select
                        {...register('discountActive', { required: true })}
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="addhandwritten-input-two-div">
                {watch('discountActive') === 'true' && (
                  <div className="addhandwritten-input" style={{gap:12}}>
                    <h6>
                      Discount (%) <span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input
                          type="number"
                          {...register('discount', { required: true })}
                          placeholder="Enter Discount Percentage"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="addhandwritten-input" style={{gap:12}}>
                  <h6>
                    Description <span>*</span>
                  </h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <textarea style={{outline:"none", border:"none", width:"100%"}}
                        {...register('desc', { required: true })}
                        placeholder="Enter Plan Description"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="addhandwritennotes-submit">
                <div className="handwritten-button">
                  <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default HOC(AddSubscription);
