import React, { useState } from "react";
import HOC from "../../components/HOC/HOC";
import { TableModal } from "../../components/Modals/Modals";

import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { IoImageOutline } from "react-icons/io5";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { SlCloudUpload } from "react-icons/sl";

const SkillsPageCopy = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [show, setShow] = useState(false);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <TableModal show={show} onHide={() => setShow(false)} />
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Skills</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Dashboard / Skills /<span> Add Ski</span>
          </p>
        </div>
        <div className="homepagecontent">
          <div className="studyplanner-container">
            <div className="homepagecontent-left-header">
              <h6>Tile Image</h6>
            </div>
            <div className="studyplanner-image">
              <IoImageOutline />
            </div>
            <div className="handwritten-notes">
              <p>Note* ( Image size should be less than 20mb )</p>
              <p>Image format should be PNG, JPEG or SVG*</p>
            </div>
            <div className="handwritten-button-container">
              <div className="handwritten-button">
                <button>Upload Image</button>
              </div>
            </div>
          </div>
        </div>
        <div className="handwrittennotes-list">
          <div className="studyplanner-container">
            <div className="homepagecontent-left-header">
              <h6>Basic Info</h6>
            </div>
            <div className="addhandwrittennotes-main">
              <div className="addhandwrittennotes-input">
                <h6>Name of the Bundle</h6>
                <div className="input-container">
                  <input type="text" id="email" required />
                  <label htmlFor="">Enter name here</label>
                </div>
              </div>
              <div className="addhandwrittennotes-input">
                <h6>Include Course Count</h6>
                <div className="input-container">
                  <input type="text" id="email" required />
                  <label htmlFor="">Enter no.of courses</label>
                </div>
              </div>
              <div className="addhandwrittennotes-input">
                <h6>Duration (Min)</h6>
                <div className="input-container">
                  <input type="text" id="email" required />
                  <label htmlFor="">Enter duration ( hrs )</label>
                </div>
              </div>
              <div className="addhandwrittennotes-input">
                <h6>Subjects</h6>
                <div className="input-container">
                  <input type="text" id="email" required />
                  <label htmlFor="">Enter no.of subjects</label>
                </div>
              </div>
              <div className="addhandwrittennotes-input">
                <h6>Price</h6>
                <div className="input-container">
                  <input type="text" id="email" required />
                  <label htmlFor="">Enter price</label>
                </div>
              </div>
              <div className="addhandwrittennotes-input">
                <h6>Locale</h6>
                <div className="input-container">
                  <input type="text" id="email" required />
                  <label htmlFor="">Enter locale</label>
                </div>
              </div>
              <div className="addhandwrittennotes-input">
                <h6>Test Bundle</h6>
                <div className="input-container">
                  <input type="text" id="email" required />
                  <label htmlFor="">Select test bundle here</label>
                </div>
              </div>
              <div className="addhandwrittennotes-input">
                <h6>Course Highlights</h6>
                <div className="input-container">
                  <input type="text" id="email" required />
                  <label htmlFor="">Enter Course highlights</label>
                </div>
              </div>
              <div className="addhandwrittennotes-input">
                <h6>Overview Points</h6>
                <div className="input-container">
                  <input type="text" id="email" required />
                  <label htmlFor="">Enter overview points</label>
                </div>
              </div>
              <div className="addhandwrittennotes-input">
                <h6>What you will Learn point 1</h6>
                <div className="input-container">
                  <input type="text" id="email" required />
                  <label htmlFor="">Enter point 1</label>
                </div>
              </div>
              <div className="addhandwrittennotes-input">
                <h6>What you will Learn point 2</h6>
                <div className="input-container">
                  <input type="text" id="email" required />
                  <label htmlFor="">Enter point 2</label>
                </div>
              </div>
              <div className="addhandwrittennotes-input">
                <h6>What you will Learn point 3</h6>
                <div className="input-container">
                  <input type="text" id="email" required />
                  <label htmlFor="">Enter point 3</label>
                </div>
              </div>
              <div className="addhandwrittennotes-input">
                <h6>End of the course point 1</h6>
                <div className="input-container">
                  <input type="text" id="email" required />
                  <label htmlFor="">Enter point 1</label>
                </div>
              </div>
              <div className="addhandwrittennotes-input">
                <h6>End of the course point 2</h6>
                <div className="input-container">
                  <input type="text" id="email" required />
                  <label htmlFor="">Enter point 2</label>
                </div>
              </div>

              <div className="addhandwrittennotes-input">
                <h6>End of the course point 3</h6>
                <div className="input-container">
                  <input type="text" id="email" required />
                  <label htmlFor="">Enter point 3</label>
                </div>
              </div>
            </div>
            <div className="handwritten-button-container">
              <div className="handwritten-button">
                <button>Save</button>
              </div>
            </div>
          </div>
        </div>
        <div className="handwrittennotes-list">
          <div className="studyplanner-container">
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
                    <div className="addhandwritten-inputs-icons">
                      <AiFillPlusCircle />
                      <MdOutlineRemoveRedEye />
                      <AiFillEdit />
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input">
                  <h6>
                    Threshold Marks<span>*</span>
                  </h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <input type="text" />
                      <label htmlFor="">Enter threshold marks</label>
                    </div>
                    <div className="addhandwritten-inputs-icons">
                      {/* <AiFillPlusCircle /> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="addhandwritten-input-two-div">
                <div className="addhandwritten-input">
                  <h6>
                    Subject<span>*</span>
                  </h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <select name="" id="">
                        <option value=""></option>
                      </select>
                      <label htmlFor="">Select Subject</label>
                    </div>
                    <div className="addhandwritten-inputs-icons">
                      <AiFillPlusCircle />
                      <MdOutlineRemoveRedEye />
                      <AiFillEdit />
                    </div>
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
                      <AiFillPlusCircle />
                    </div>
                  </div>
                </div>
              </div>
              <div className="addhandwritten-input-two-div">
                <div className="addhandwritten-input">
                  <h6>Vods Link</h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <select name="" id="">
                        <option value=""></option>
                      </select>
                      <label htmlFor="">Select link here</label>
                    </div>
                    <div className="addhandwritten-inputs-icons">
                      {/* <AiFillPlusCircle />
                                            <MdOutlineRemoveRedEye />
                                            <AiFillEdit /> */}
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input">
                  <h6>Handwritten Notes</h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <select name="" id="">
                        <option value=""></option>
                      </select>
                      <label htmlFor="">Select tagged notes here</label>
                    </div>
                    <div className="addhandwritten-inputs-icons"></div>
                  </div>
                </div>
              </div>
              <div className="addhandwritten-input-two-div">
                <div className="addhandwritten-input">
                  <h6>Educator Name</h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <input type="text" />
                      <label htmlFor="">Select educator name here</label>
                    </div>
                    <div className="addhandwritten-inputs-icons">
                      {/* <AiFillPlusCircle />
                                            <MdOutlineRemoveRedEye />
                                            <AiFillEdit /> */}
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input">
                  <h6>Educator Notes</h6>
                  <div className="addhandwritten-inputs-div">
                    <div className="input-container">
                      <select name="" id="">
                        <option value=""></option>
                      </select>
                      <label htmlFor="">Select educator notes ( pdf )</label>
                    </div>
                    <div className="addhandwritten-inputs-icons"></div>
                  </div>
                </div>
              </div>

              <div className="addhandwritten-input-two-div">
                <div className="addhandwritten-input">
                  <h6>
                    Select type of Test<span>*</span>
                  </h6>
                  <div className="addcourse-radios-btns">
                    <div className="addcourse-radios">
                      <input
                        type="radio"
                        value="option1"
                        checked={selectedOption === "option1"}
                        onChange={handleChange}
                      />
                      <p>Mock Test</p>
                    </div>
                    <div className="addcourse-radios">
                      <input
                        type="radio"
                        value="option2"
                        checked={selectedOption === "option2"}
                        onChange={handleChange}
                      />
                      <p>Subject Test</p>
                    </div>
                    <div className="addcourse-radios">
                      <input
                        type="radio"
                        value="option3"
                        checked={selectedOption === "option3"}
                        onChange={handleChange}
                      />
                      <p>Chapter Test</p>
                    </div>
                    <div className="addcourse-radios">
                      <input
                        type="radio"
                        value="option4"
                        checked={selectedOption === "option4"}
                        onChange={handleChange}
                      />
                      <p>Partial Test</p>
                    </div>
                  </div>
                </div>
                <div className="addhandwritten-input">
                  <h6>Cost of the Test</h6>
                  <div className="addcourse-radios-btns">
                    <div className="addcourse-radios">
                      <input type="radio" />
                      <p>Paid Test</p>
                    </div>
                    <div className="addcourse-radios">
                      <input type="radio" />
                      <p>Free Test</p>
                    </div>
                  </div>
                </div>
              </div>
              {selectedOption === "option2" && (
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input">
                    <h6>
                      Subject<span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input type="text" />
                        <label htmlFor="">Select educator name here</label>
                      </div>
                      <div className="addhandwritten-inputs-icons">
                        {/* <AiFillPlusCircle />
                                            <MdOutlineRemoveRedEye />
                                            <AiFillEdit /> */}
                      </div>
                    </div>
                  </div>
                  <div className="addhandwritten-input">
                    <h6>Upload Test Series</h6>
                    <div className="addcourse-upload-file">
                      <SlCloudUpload />
                    </div>
                  </div>
                </div>
              )}
              {selectedOption === "option3" && (
                <>
                  <div className="addhandwritten-input-two-div">
                    <div className="addhandwritten-input">
                      <h6>
                        Subject<span>*</span>
                      </h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <select name="" id=""></select>
                          <label htmlFor="">Select subject</label>
                        </div>
                        <div className="addhandwritten-inputs-icons">
                          {/* <AiFillPlusCircle />
                                            <MdOutlineRemoveRedEye />
                                            <AiFillEdit /> */}
                        </div>
                      </div>
                    </div>
                    <div className="addhandwritten-input">
                      <h6>Sub Subject</h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <select name="" id=""></select>
                          <label htmlFor="">Select sub subject</label>
                        </div>
                        <div className="addhandwritten-inputs-icons">
                          {/* <AiFillPlusCircle />
                                            <MdOutlineRemoveRedEye />
                                            <AiFillEdit /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="addhandwritten-input-two-div">
                    <div className="addhandwritten-input">
                      <h6>Chapter</h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <select name="" id=""></select>
                          <label htmlFor="">Select chapter</label>
                        </div>
                        <div className="addhandwritten-inputs-icons">
                          {/* <AiFillPlusCircle />
                                        <MdOutlineRemoveRedEye />
                                        <AiFillEdit /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {selectedOption === "option4" && (
                <>
                  <div className="addhandwritten-input-two-div">
                    <div className="addhandwritten-input">
                      <h6>
                        Subject<span>*</span>
                      </h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <select name="" id=""></select>
                          <label htmlFor="">Select subject</label>
                        </div>
                        <div className="addhandwritten-inputs-icons">
                          {/* <AiFillPlusCircle />
                                            <MdOutlineRemoveRedEye />
                                            <AiFillEdit /> */}
                        </div>
                      </div>
                    </div>
                    <div className="addhandwritten-input">
                      <h6>Sub Subject</h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <select name="" id=""></select>
                          <label htmlFor="">Select sub subject</label>
                        </div>
                        <div className="addhandwritten-inputs-icons">
                          {/* <AiFillPlusCircle />
                                            <MdOutlineRemoveRedEye />
                                            <AiFillEdit /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="addhandwritten-input-two-div">
                    <div className="addhandwritten-input">
                      <h6>Chapter</h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <select name="" id=""></select>
                          <label htmlFor="">Select chapter</label>
                        </div>
                        <div className="addhandwritten-inputs-icons">
                          {/* <AiFillPlusCircle />
                                        <MdOutlineRemoveRedEye />
                                        <AiFillEdit /> */}
                        </div>
                      </div>
                    </div>
                    <div className="addhandwritten-input">
                      <h6>Topic</h6>
                      <div className="addhandwritten-inputs-div">
                        <div className="input-container">
                          <select name="" id=""></select>
                          <label htmlFor="">Select topic</label>
                        </div>
                        <div className="addhandwritten-inputs-icons">
                          {/* <AiFillPlusCircle />
                                        <MdOutlineRemoveRedEye />
                                        <AiFillEdit /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="addhandwritten-input-two-div">
                <div className="addhandwritten-input">
                  <h6>Instruction File</h6>
                  <div className="addcourse-upload-file">
                    <SlCloudUpload />
                  </div>
                </div>
                <div
                  className="addhandwritten-input"
                  onClick={() => setShow(true)}
                >
                  <h6>Final Test</h6>
                  <div className="addcourse-upload-file">
                    <SlCloudUpload />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(SkillsPageCopy);
