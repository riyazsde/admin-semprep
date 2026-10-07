import React, { useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { QuestionsUploadedModal } from '../../components/Modals/Modals';


import { GoArrowLeft } from "react-icons/go";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { TbUpload } from "react-icons/tb";




import { useNavigate } from 'react-router-dom';


const DailyQuiz = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)


    return (
        <>
            <QuestionsUploadedModal
                show={show}
                onHide={() => setShow(false)}
            />
            <div className='dashboardcontainer'>
                <div className='dashboardcontainer-header'>
                    <h6>Daily Quiz</h6>
                    <p>
                        <GoArrowLeft
                            size={25}
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(-1)}
                        />
                        Dashboard / Current Affairs /<span> Daily Quiz</span>
                    </p>
                </div>
                <div className='homepagecontent'>
                    <div className='studyplanner-container'>
                        <div className='homepagecontent-left-header'>
                            <h6>Create Daily Quiz</h6>
                        </div>

                        <div className='editorial-container'>
                            <div className='editorial-inputes'>
                                <div className='editorial-inpute'>
                                    <label htmlFor="">Goal Exam</label>
                                    <div className='editorial-inpute-div'>
                                        <select name="" id="">
                                            <option value="">Select Goal Exam</option>
                                        </select>
                                        <div className='editorial-inputs-icons'>
                                            <AiFillPlusCircle />
                                            <MdOutlineRemoveRedEye />
                                            <AiFillEdit />
                                        </div>
                                    </div>
                                </div>
                                <div className='editorial-inpute'>
                                    <label htmlFor="">Date</label>
                                    <div className='editorial-inpute-div'>
                                        <input type="date" />
                                        <div className='editorial-inputs-icons'>
                                            {/* <AiFillPlusCircle />
                                            <MdOutlineRemoveRedEye />
                                            <AiFillEdit /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='editorial-editorials'>
                                <div className='daily-quiz'>
                                    <div className='daily-quiz-input'>
                                        <label htmlFor="">Questions</label>
                                        <input type="text" placeholder='Enter Number of questions' />
                                    </div>
                                    <div className='daily-quiz-input'>
                                        <label htmlFor="">Marks</label>
                                        <input type="text" placeholder='Enter How much Marks' />
                                    </div>
                                    <div className='daily-quiz-input'>
                                        <label htmlFor="">Time</label>
                                        <input type="text" placeholder='Enter duration of the exam' />
                                    </div>
                                </div>
                                <div className='daily-quiz'>
                                    <div className='daily-quiz-input'>
                                        <label htmlFor="">Instruction file</label>
                                        {/* <input type="text" placeholder='Upload Instruction file' /> */}
                                        <div className='daily-quiz-file'>
                                            <p>Upload Instruction file</p>
                                            <TbUpload />
                                        </div>
                                    </div>
                                </div>
                                <div className='daily-btn'>
                                    <div className='handwritten-button'>
                                        <button onClick={() => navigate('/dashboard/current-affairs')}>Upload</button>
                                    </div>
                                    <div className='handwritten-button-addnote'>
                                        <button onClick={() => navigate('/vods')}>Upload Questions File </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='addhandwritennotes-submit'>
                        <div className='handwritten-button'>
                            <button onClick={()=>setShow(true)}>Save & Preview</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(DailyQuiz)