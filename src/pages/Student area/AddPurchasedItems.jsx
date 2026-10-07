import React  from 'react'
import HOC from '../../components/HOC/HOC'


import { useNavigate } from 'react-router-dom';
import { AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { GoArrowLeft } from "react-icons/go";




const AddPurchasedItems = () => {
    const navigate = useNavigate()

 


    return (
        <>
            <div className='dashboardcontainer'>
                <div className='dashboardcontainer-header'>
                    <h6>Purchased Items</h6>
                    <p>
                        <GoArrowLeft
                            size={25}
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(-1)}
                        />
                        Student area / Purchased Items /<span> Add Purchased Items</span>
                    </p>
                </div>
                <div className='studentprofile-container'>
                    <div className='studyplanner-container'>
                        <div className='addhandwritten-inputs'>
                            <div className='addhandwritten-input-two-div'>
                                <div className='addhandwritten-input'>
                                    <h6>Student<span>*</span></h6>
                                    <div className='addhandwritten-inputs-div'>
                                        <div className="input-container">
                                            <select name="" id=""></select>
                                            <label htmlFor="">Select Student</label>
                                        </div>
                                        <div className='addhandwritten-inputs-icons'>
                                            <AiFillPlusCircle />
                                            <MdOutlineRemoveRedEye />
                                            <AiFillEdit />
                                        </div>
                                    </div>
                                </div>
                                <div className='addhandwritten-input'>
                                    <h6>Test Series</h6>
                                    <div className='addhandwritten-inputs-div'>
                                        <div className="input-container">
                                            <select name="" id=""></select>
                                            <label htmlFor="">Select test series</label>
                                        </div>
                                        <div className='addhandwritten-inputs-icons'>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='addhandwritten-input-two-div'>
                                <div className='addhandwritten-input'>
                                    <h6>Skill<span>*</span></h6>
                                    <div className='addhandwritten-inputs-div'>
                                        <div className="input-container">
                                            <select name="" id=""></select>
                                            <label htmlFor="">Select Skill</label>
                                        </div>
                                        <div className='addhandwritten-inputs-icons'>

                                        </div>
                                    </div>
                                </div>
                                <div className='addhandwritten-input'>
                                    <h6>Engagement Metrics</h6>
                                    <div className='addhandwritten-inputs-div'>
                                        <div className="input-container">
                                            <input type="text" />
                                            <label htmlFor="">Enter engagement metrics</label>
                                        </div>
                                        <div className='addhandwritten-inputs-icons'>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='addhandwritten-input-two-div'>
                                <div className='addhandwritten-input'>
                                    <h6>Pyq<span>*</span></h6>
                                    <div className='addhandwritten-inputs-div'>
                                        <div className="input-container">
                                            <select name="" id=""></select>
                                            <label htmlFor="">Select Pyq</label>
                                        </div>
                                        <div className='addhandwritten-inputs-icons'>

                                        </div>
                                    </div>
                                </div>
                                <div className='addhandwritten-input'>
                                    <h6>Grace Period Days</h6>
                                    <div className='addhandwritten-inputs-div'>
                                        <div className="input-container">
                                            <select name="" id=""></select>
                                            <label htmlFor="">Select grace period days</label>
                                        </div>
                                        <div className='addhandwritten-inputs-icons'>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='addhandwritten-input-two-div'>
                                <div className='addhandwritten-input'>
                                    <h6>Course<span>*</span></h6>
                                    <div className='addhandwritten-inputs-div'>
                                        <div className="input-container">
                                            <select name="" id=""></select>
                                            <label htmlFor="">Select Course</label>
                                        </div>
                                        <div className='addhandwritten-inputs-icons'>

                                        </div>
                                    </div>
                                </div>
                                <div className='addhandwritten-input'>
                                    <h6>Handwritten Notes<span>*</span></h6>
                                    <div className='addhandwritten-inputs-div'>
                                        <div className="input-container">
                                            <select name="" id=""></select>
                                            <label htmlFor="">Select handwritten notes</label>
                                        </div>
                                        <div className='addhandwritten-inputs-icons'>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='addhandwritten-input-two-div'>
                                <div className='addhandwritten-input'>
                                    <h6>Study Planner Course</h6>
                                    <div className='addhandwritten-inputs-div'>
                                        <div className="input-container">
                                            <select name="" id=""></select>
                                            <label htmlFor="">Select study planner course</label>
                                        </div>
                                        <div className='addhandwritten-inputs-icons'>

                                        </div>
                                    </div>
                                </div>
                                <div className='addhandwritten-input'>
                                    <h6>Transaction ID</h6>
                                    <div className='addhandwritten-inputs-div'>
                                        <div className="input-container">
                                            <select name="" id=""></select>
                                            <label htmlFor="">Select transaction id</label>
                                        </div>
                                        <div className='addhandwritten-inputs-icons'>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='addhandwritennotes-submit'>
                        <div className='handwritten-button'>
                            <button onClick={()=>navigate('/student-area/purchased-items')}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AddPurchasedItems)