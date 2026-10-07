import React from 'react'
import HOC from '../../components/HOC/HOC'

import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from 'react-router-dom';





const AddPolls = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className='dashboardcontainer'>
                <div className='dashboardcontainer-header'>
                    <h6>Polls</h6>
                    <p>
                        <GoArrowLeft
                            size={25}
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(-1)}
                        />
                        Student area / Polls /<span> Add Polls</span>
                    </p>
                </div>
                <div className='handwrittennotes-list'>
                    <div className='studyplanner-container'>
                        <div className='addpolls-main'>
                            <div className='addhandwrittennotes-input'>
                                <h6>Question<span>*</span></h6>
                                <div className="input-container">
                                    <input type="text" id="email" required />
                                    <label htmlFor="">Enter question here</label>
                                </div>
                            </div>
                            <div className='addhandwrittennotes-input question'>
                                <h6>Created by</h6>
                                <div className="input-container">
                                    <select name="" id=""></select>
                                    <label htmlFor="">Select created by</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='addhandwritennotes-submit'>
                    <div className='handwritten-button'>
                        <button onClick={() => navigate('/student-area/polls')}>Save & Continue</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AddPolls)