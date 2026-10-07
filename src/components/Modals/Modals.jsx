import Modal from 'react-bootstrap/Modal';
import Pagination from '../Pagination/Pagination';
import './Modals.css';

// import img from '../../assest/img12.png'
import { AiOutlineDelete } from 'react-icons/ai';
import { FaArrowRight } from 'react-icons/fa';
import { FiEdit3 } from 'react-icons/fi';
import { SlCloudUpload } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import img from '../../assest/img11.png';
import img1 from '../../assest/img12.png';
import img2 from '../../assest/img13.png';
import img3 from '../../assest/img14.png';
import {
  addCommunityItem,
  getGoalCategory,
  getGoalExamByGoalCategory,
} from '../../services/exportFunctions';

const CreatePostModal = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: props.isView?.title || '',
      desc: props.isView?.desc || '',
      goalCategory: '',
      goal: '',
    },
  }); 

  useEffect(() => {
    if (props.isView) {
      reset({
        title: props.isView?.title || '',
        desc: props.isView?.desc || '',
        goalCategory: props.isView?.goalCategory?._id || '',
        goal: props.isView?.goal?._id || '',
      });
    }
  }, [props.isView]);

  const [imageFile2, setImageFile2] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(
    props.isView?.image || null
  );
  const [allGoals, setAllGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [goalCategoryData, setGoalCategoryData] = useState([]);

  const goalCategory = watch('goalCategory');

  useEffect(() => {
    getGoalCategory({ setIsLoading, setData: setGoalCategoryData });
  }, []);

  useEffect(() => {
    if (goalCategory) {
      const params = {
        page: 1,
        limit: 100,
        search: '',
        goalCategoryId: goalCategory,
      };
      getGoalExamByGoalCategory({ setIsLoading, setData: setAllGoals, params });
    }
  }, [goalCategory]);

  const onSubmit = (data) => {
    const payload = new FormData();
    payload.append('title', data.title);
    payload.append('desc', data.desc);
    payload.append('goalCategory', data.goalCategory);
    payload.append('goal', data.goal);
    if (imageFile2) payload.append('image', imageFile2);

    addCommunityItem({
      data: payload,
      addFun: () => {
        setImageFile2(null);
        setImagePreview2(null);
        reset();
        props.getData();
        props.onHide();
      },
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile2(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview2(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="createpost-container-modal">
            <div
              className="createpost-main-modal1"
            >
              <div className="addhandwritten-input-two-div">
                <div className="addhandwritten-input" style={{gap:12}}>
                  <h6>
                    University <span>*</span>
                  </h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <select {...register('goalCategory', { required: true })}>
                        <option value="">Select University</option>
                        {goalCategoryData?.data?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {/* <label>Select Goal</label> */}
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input" style={{gap:12}}>
                  <h6>
                    Courses<span>*</span>
                  </h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <select {...register('goal', { required: true })}>
                        <option value="">Select Course</option>
                        {allGoals?.data?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {/* <label>Select Course</label> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="addhandwritten-input-two-div" style={{ marginTop: '32px' }}>
                <div className="addhandwritten-input" style={{gap:12}}>
                  <h6>Post Title</h6>
                  <div className="input-container">
                    <input
                      type="text"
                      {...register('title', { required: true })}
                      placeholder="Enter title here"
                    />
                    {errors.title && <span>This field is required</span>}
                  </div>
                </div>
                <div className="addhandwritten-input"  style={{gap:12}}>
                  <h6>Content</h6>
                  <div className="input-container">
                    <input
                      type="text"
                      {...register('desc', { required: true })}
                      placeholder="Enter content here"
                    />
                    {errors.desc && <span>This field is required</span>}
                  </div>
                </div>
              </div>

              <div className="createpost-input"></div>

              <div className="createpost-input-bottom">
                <div className="addhandwritten-input" style={{gap:12}}>
                  <h6>Image</h6>
                  <div className="addcourse-upload-file">
                    <label htmlFor="image-upload">
                      {imagePreview2 ? (
                        <img
                          src={imagePreview2}
                          alt="Preview"
                          onClick={() =>
                            document.getElementById('image-upload2').click()
                          }
                          style={{
                            width: '100px',
                            height: '100px',
                            marginTop: '1rem',
                            cursor: 'pointer',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <SlCloudUpload
                          onClick={() =>
                            document.getElementById('image-upload2').click()
                          }
                          style={{ cursor: 'pointer', fontSize: '2rem' }}
                        />
                      )}
                    </label>
                    <input
                      id="image-upload2"
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>

              <div className="createpost-button-modal">
                <div className="handwritten-button">
                  <button type="submit">Create Post</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreatePostModal;

const PriviewNewsModal = (props) => {
  const navigate = useNavigate();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body style={{ padding: '2rem' }}>
        <div className="preview-container-modal">
          <div className="preview-modal-div">
            <div className="preview-modal-div-img">
              <img src={img} alt="" />
            </div>
            <div className="preview-modal-div-right">
              <div className="preview-modal-div-heading">
                <h1>Headline</h1>
                <h6>Sub headline</h6>
              </div>
              <div className="preview-modal-div-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
              <div className="preview-modal-div-readmore">
                <span>Read more</span>
                <FaArrowRight />
              </div>
            </div>
          </div>
          <div className="preview-modal-div">
            <div className="preview-modal-div-img">
              <img src={img1} alt="" />
            </div>
            <div className="preview-modal-div-right">
              <div className="preview-modal-div-heading">
                <h1>Headline</h1>
                <h6>Sub headline</h6>
              </div>
              <div className="preview-modal-div-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
              <div className="preview-modal-div-readmore">
                <span>Read more</span>
                <FaArrowRight />
              </div>
            </div>
          </div>
          <div className="preview-modal-div">
            <div className="preview-modal-div-img">
              <img src={img2} alt="" />
            </div>
            <div className="preview-modal-div-right">
              <div className="preview-modal-div-heading">
                <h1>Headline</h1>
                <h6>Sub headline</h6>
              </div>
              <div className="preview-modal-div-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
              <div className="preview-modal-div-readmore">
                <span>Read more</span>
                <FaArrowRight />
              </div>
            </div>
          </div>
          <div className="preview-modal-div">
            <div className="preview-modal-div-img">
              <img src={img3} alt="" />
            </div>
            <div className="preview-modal-div-right">
              <div className="preview-modal-div-heading">
                <h1>Headline</h1>
                <h6>Sub headline</h6>
              </div>
              <div className="preview-modal-div-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
              <div className="preview-modal-div-readmore">
                <span>Read more</span>
                <FaArrowRight />
              </div>
            </div>
          </div>
          <div className="preview-modal-div">
            <div className="preview-modal-div-img">
              <img src={img} alt="" />
            </div>
            <div className="preview-modal-div-right">
              <div className="preview-modal-div-heading">
                <h1>Headline</h1>
                <h6>Sub headline</h6>
              </div>
              <div className="preview-modal-div-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
              <div className="preview-modal-div-readmore">
                <span>Read more</span>
                <FaArrowRight />
              </div>
            </div>
          </div>
          <div className="preview-modal-btn">
            <div className="handwritten-button">
              <button onClick={() => navigate('/dashboard/current-affairs')}>
                Publish
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const QuestionsUploadedModal = (props) => {
  const navigate = useNavigate();
  const questions = [
    { id: 1, question: 'Question Displays Here' },
    { id: 2, question: 'Question Displays Here' },
    { id: 3, question: 'Question Displays Here' },
    { id: 4, question: 'Question Displays Here' },
    { id: 5, question: 'Question Displays Here' },
    { id: 6, question: 'Question Displays Here' },
    { id: 7, question: 'Question Displays Here' },
    { id: 8, question: 'Question Displays Here' },
    { id: 9, question: 'Question Displays Here' },
    { id: 10, question: 'Question Displays Here' },
  ];
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body style={{ padding: '2rem' }}>
        <div className="questions-container-modal">
          <div className="questions-modal-heading">
            <h6>Questions Uploaded</h6>
          </div>
          <div className="questions-modal-main">
            {questions.map((item, index) => (
              <div className="questions-modal-div" key={item.id}>
                <div className="questions-modal-div-left">
                  <div className="questions-modal-left-count">
                    <h6>{String(index + 1).padStart(2, '0')}</h6>{' '}
                    {/* Add leading zero */}
                  </div>
                  <h4>
                    Question {index + 1}: {item.question}
                  </h4>
                </div>
                <div className="questions-modal-div-right">
                  <p>Edit</p>
                </div>
              </div>
            ))}
          </div>
          <div className="preview-modal-btn">
            <div className="handwritten-button">
              <button onClick={() => navigate('/dashboard/current-affairs')}>
                Save & Publish
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const AddGoalsExamModal = (props) => {
  const navigate = useNavigate();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="addgoals-container-modal">
          <div className="addhandwritten-inputs">
            <div className="addhandwritten-input-two-div">
              <div className="addhandwritten-input">
                <h6>
                  Goal Exam<span>*</span>
                </h6>
                <div className="addhandwritten-inputs-div">
                  <div className="input-container">
                    <select name="" id="">
                      <option value=""></option>
                    </select>
                    <label htmlFor="">Select Goal Exam</label>
                  </div>
                  <div className="addhandwritten-inputs-icons"></div>
                </div>
              </div>
            </div>
            <div className="addhandwritten-input-two-div">
              <div className="addhandwritten-input">
                <h6>Subject</h6>
                <div className="addhandwritten-inputs-div">
                  <div className="input-container">
                    <select name="" id="">
                      <option value=""></option>
                    </select>
                    <label htmlFor="">Select Subject</label>
                  </div>
                  <div className="addhandwritten-inputs-icons"></div>
                </div>
              </div>
              <div className="addhandwritten-input">
                <h6>Sub Subjects (Optional)</h6>
                <div className="addhandwritten-inputs-div">
                  <div className="input-container">
                    <input type="text" />
                    <label htmlFor="">Enter sub subject</label>
                  </div>
                  <div className="addhandwritten-inputs-icons">
                    {/* <AiFillPlusCircle /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="addhandwritten-input-two-div">
              <div className="addhandwritten-input">
                <h6>Chapter</h6>
                <div className="addhandwritten-inputs-div">
                  <div className="input-container">
                    <select name="" id="">
                      <option value=""></option>
                    </select>
                    <label htmlFor="">Select Chapter</label>
                  </div>
                  <div className="addhandwritten-inputs-icons"></div>
                </div>
              </div>
              {props.topic && (
                <div className="addhandwritten-input">
                  <h6>Topic Name</h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <select name="" id="">
                        <option value=""></option>
                      </select>
                      <label htmlFor="">Select Topic Name</label>
                    </div>
                    <div className="addhandwritten-inputs-icons"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="addgoals-modal-btn">
            <div className="handwritten-button">
              <button onClick={props.onHide}>Save</button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const TableModal = (props) => {
  const navigate = useNavigate();

  const dummyData = [
    {
      id: 1,
      questions: 'Question display here',
      options: 'Option1, Option2, Option3',
      solution: 'Option 1',
      video: 'Video Link',
    },
    {
      id: 2,
      questions: 'Question display here',
      options: 'Option1, Option2, Option3',
      solution: 'Option 1',
      video: 'Video Link',
    },
    {
      id: 3,
      questions: 'Question display here',
      options: 'Option1, Option2, Option3',
      solution: 'Option 1',
      video: 'Video Link',
    },
    {
      id: 4,
      questions: 'Question display here',
      options: 'Option1, Option2, Option3',
      solution: 'Option 1',
      video: 'Video Link',
    },
    {
      id: 5,
      questions: 'Question display here',
      options: 'Option1, Option2, Option3',
      solution: 'Option 1',
      video: 'Video Link',
    },
    {
      id: 6,
      questions: 'Question display here',
      options: 'Option1, Option2, Option3',
      solution: 'Option 1',
      video: 'Video Link',
    },
    {
      id: 7,
      questions: 'Question display here',
      options: 'Option1, Option2, Option3',
      solution: 'Option 1',
      video: 'Video Link',
    },
    {
      id: 8,
      questions: 'Question display here',
      options: 'Option1, Option2, Option3',
      solution: 'Option 1',
      video: 'Video Link',
    },
    {
      id: 9,
      questions: 'Question display here',
      options: 'Option1, Option2, Option3',
      solution: 'Option 1',
      video: 'Video Link',
    },
    {
      id: 10,
      questions: 'Question display here',
      options: 'Option1, Option2, Option3',
      solution: 'Option 1',
      video: 'Video Link',
    },
  ];
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="addgoals-container-modal">
          <div className="table-modal">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Questions</th>
                  <th>Options</th>
                  <th>Solution</th>
                  <th>Video</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.id}</td>
                    <td>{data.questions}</td>
                    <td>{data.options}</td>
                    <td>{data.solution}</td>
                    <td>
                      <p className="videolink">{data.video}</p>
                    </td>
                    <td>
                      <div className="handwrittennotes-table-icons">
                        <div className="handwrittennotes-icon">
                          <FiEdit3 />
                        </div>
                        <div className="handwrittennotes-icon">
                          <AiOutlineDelete />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination />
          </div>
          <div className="addgoals-modal-btn">
            <div className="handwritten-button">
              <button onClick={props.onHide}>Save & Close</button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export {
  AddGoalsExamModal,
  CreatePostModal,
  PriviewNewsModal,
  QuestionsUploadedModal,
  TableModal,
};
