import HOC from "../../components/HOC/HOC";

import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { RiUploadCloud2Fill } from "react-icons/ri";
import {
  addDashboradAboutExam,
  deleteDashboradAboutExam,
  getDashboradAboutExam,
  getGoalExam,
} from "../../services/exportFunctions";
import { useEffect, useState } from "react";
import { CustomModal, UniversalForm } from "../../services/ModalComponent";
import { AboutExamPageContantFormFields } from "../../services/formFields";
import { MdAddBox } from "react-icons/md";

const AboutExam = () => {
  const navigate = useNavigate();

  const [editmode, setEditMode] = useState(false);
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const getData = () => {
    getDashboradAboutExam({ setIsLoading, setData });
    getGoalExam({
      setIsLoading: setIsLoading2,
      setData: setData2,
      params: { page: 1, limit: 1000 },
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const toggle = () => {
    setEditMode(!editmode);
  };

  const [showModal, setShowModal] = useState(false);
  const [isViewItem, setIsViewItem] = useState({});
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [mode, setMode] = useState("view");
  const handleFormSubmit = (values) => {

    const formData = new FormData();
    {
      Object.keys(values).map((key) => formData.append(key, values[key]));
    }
    if (mode === "edit") {
    } else if (mode === "add") {
      console.log('r')
      addDashboradAboutExam({ addFun: getData, data: formData, setShowModal });
    }
  };
  return (
    <>
      <CustomModal
        show={showModal}
        size="lg"
        onHide={handleCloseModal}
        title={mode ? "About Exam" : "Edit About Exam"}
        bodyContent={
          <div>
            <UniversalForm
              mode={mode}
              formFields={[
                {
                  type: "select",
                  name: "goalId",
                  label: "Goal",
                  required: true,
                  disabled: mode === "view",
                  options: data2?.data?.map((item) => ({
                    value: item._id,
                    label: item.name,
                  })),
                },
                ...AboutExamPageContantFormFields,
              ]}
              initialData={isViewItem || {}}
              onSubmit={(data) => {
                handleFormSubmit(data);
              }}
            />
          </div>
        }
      />
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>About Exam Page Content</h6>
          <div className="d-flex justify-content-between">
            <p>
              <GoArrowLeft
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              Dashboard /<span> About Exam</span>
            </p>
            <div className="groups-header-right">
              <MdAddBox
                onClick={() => {
                  setMode("add");
                  setShowModal(true);
                  setIsViewItem({});
                }}
              />
            </div>
          </div>
        </div>
        <div className="homepagecontent">
          {data &&
            data?.map((item, index) => (
              <div className="studyplanner-container">
                <div className="homepagecontent-left-header">
                  <h6>Hero Image</h6>
                  {!editmode && (
                    <p className="d-flex g-3">
                      <FaEdit
                        onClick={() => {
                          setMode("edit");
                          setIsViewItem(item);
                          setShowModal(true);
                        }}
                      />
                      <FaTrashAlt
                        onClick={() => {
                          deleteDashboradAboutExam({
                            addFun: getData,
                            id: item._id,
                          });
                        }}
                      />
                    </p>
                  )}
                </div>
                <div className="studyplanner-image">
                  {editmode ? (
                    <>
                      <RiUploadCloud2Fill />
                      <h6>Upload new image here</h6>
                      <p>Note: (Image size should be less than 20MB)</p>
                    </>
                  ) : item?.image ? (
                    <img
                      src={item.image}
                      alt="Advertisement"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  ) : (
                    <IoImageOutline size={40} />
                  )}
                </div>
                <div className="aboutexam-container">
                  <p>Heading Text</p>
                  <div className="aboutexam-container-box">
                    <span>{item?.name}</span>
                  </div>
                  <div className="aboutexam-container-main">
                    <div className="aboutexam-divs">
                      <h6>About the Exam</h6>
                      {editmode ? (
                        <h5>
                          The Union Public Service Commission (UPSC) Combined
                          Defence Services (CDS) examination is a gateway to
                          officer-rank positions in the Indian Army, Indian
                          Navy, and Indian Air Force. CDS 1 2025 is the upcoming
                          exam for aspiring defense personnel.
                        </h5>
                      ) : (
                        <p>{item?.description}</p>
                      )}
                    </div>
                    <div className="aboutexam-divs">
                      <h6>Eligibility Criteria</h6>
                      {editmode ? (
                        <h5>
                          Candidates must be unmarried and between the ages of
                          21 and 30 years (as on 1st January 2025).
                        </h5>
                      ) : (
                        <p>{item?.eligibilityCriteria}</p>
                      )}
                    </div>
                    <div className="aboutexam-divs">
                      <h6>Important Dates:</h6>
                      {editmode ? (
                        <h5>
                          The CDS 1 exam for 2025 is scheduled for April 13,
                          2025. Meanwhile, the notification for CDS 2 2025 will
                          be published on May 28, 2025, with the application
                          deadline set for June 17, 2025
                        </h5>
                      ) : (
                        <p>{item?.importantDates}</p>
                      )}
                    </div>
                    <div className="aboutexam-divs">
                      <h6>Syllabus</h6>
                      {editmode ? (
                        <h5>
                          The UPSC CDS 1 2025 syllabus covers a wide range of
                          topics across three main subjects: English, General
                          Knowledge, and Elementary Mathematics (for IMA, INA,
                          and AFA candidates only).
                        </h5>
                      ) : (
                        <p>{item?.syllabus}</p>
                      )}
                    </div>
                    <div className="aboutexam-divs">
                      <h6>Exam Pattern</h6>
                      {editmode ? (
                        <h5>
                          The exam consists of three papers: English, General
                          Knowledge, and Elementary Mathematics.
                        </h5>
                      ) : (
                        <p>{item?.examPattern}</p>
                      )}
                    </div>
                    <div className="aboutexam-divs">
                      <h6>Any Important thing to show (Data)</h6>
                      {editmode ? (
                        <h5>
                          The complete CDS 2025 selection procedure will be
                          release by UPSC on the website through online mode.
                          There will be two stages of CDS selection procedure –
                          a written exam and an SSB Interview. Those candidates
                          who will qualify the exam will be called to
                          participate for SSB Interview round. Selection
                          procedure will be held to test the candidates aptitude
                          and reasoning ability. Selected candidates in this
                          procedure will be called for SSB Interview for 5 days.
                        </h5>
                      ) : (
                        <p>{item?.additionalInfo}</p>
                      )}
                    </div>
                    <div
                      className="aboutexam-divs"
                      style={{ border: "none", paddingBottom: "0" }}
                    >
                      <h6>Important Links (Main website to apply)</h6>
                      <div className="aboutexam-container-box">
                        <span>{item?.importantLinks}</span>
                      </div>
                    </div>
                    {editmode && (
                      <div className="aboutexam-divs-edit">
                        <div className="handwritten-button">
                          <button onClick={toggle}>Update Changes</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default HOC(AboutExam);
