import React from 'react'
import HOC from '../../components/HOC/HOC'


import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from 'react-router-dom';







const AddVideoComments = () => {
    const navigate = useNavigate()


    return (
        <>
            <div className='dashboardcontainer'>
                <div className='dashboardcontainer-header'>
                    <h6>Video Comments</h6>
                    <p>
                        <GoArrowLeft
                            size={25}
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(-1)}
                        />
                        Video Player / Video Comments /<span> Add Video Comments</span>
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
                                            <select name="" id="">
                                                <option value=""></option>
                                            </select>
                                            <label htmlFor="">Select Student here</label>
                                        </div>
                                        <div className='addhandwritten-inputs-icons'>
                                            {/* <AiFillPlusCircle />
                                            <MdOutlineRemoveRedEye />
                                            <AiFillEdit /> */}
                                        </div>
                                    </div>
                                </div>
                                <div className='addhandwritten-input'>
                                    <h6>Text</h6>
                                    <div className='addhandwritten-inputs-div'>
                                        <div className="input-container">
                                            <select name="" id="">
                                                <option value=""></option>
                                            </select>
                                            <label htmlFor="">Enter text here</label>
                                        </div>
                                        <div className='addhandwritten-inputs-icons'>
                                            {/* <AiFillPlusCircle />
                                            <MdOutlineRemoveRedEye />
                                            <AiFillEdit /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='addhandwritten-input-two-div'>
                                <div className='addhandwritten-input'>
                                    <h6>Vod</h6>
                                    <div className='addhandwritten-inputs-div'>
                                        <div className="input-container">
                                            <select name="" id="">
                                                <option value=""></option>
                                            </select>
                                            <label htmlFor="">Select Vod</label>
                                        </div>
                                        <div className='addhandwritten-inputs-icons'>
                                            {/* <AiFillPlusCircle />
                                            <MdOutlineRemoveRedEye />
                                            <AiFillEdit /> */}
                                        </div>
                                    </div>
                                </div>
                                <div className='addhandwritten-input'>
                                    <h6>Is teacher reply</h6>
                                    <div className='addhandwritten-inputs-div'>
                                        <div className="input-container">
                                            <select name="" id="">
                                                <option value=""></option>
                                            </select>
                                            <label htmlFor="">Select</label>
                                        </div>
                                        <div className='addhandwritten-inputs-icons'>
                                            {/* <AiFillPlusCircle /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='addhandwritennotes-submit'>
                        <div className='handwritten-button'>
                            <button onClick={() => navigate('/video-player/video-comments')}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AddVideoComments)