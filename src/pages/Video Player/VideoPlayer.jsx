import React from 'react'
import HOC from '../../components/HOC/HOC'


import { Link } from 'react-router-dom';
import { MdHistory } from "react-icons/md";
import { MdMessage } from "react-icons/md";





const VideoPlayer = () => {
    return (
        <>
            <div className='dashboardcontainer'>
                <div className='dashboardcontainer-header'>
                    <h6>Video Player</h6>
                </div>
                <div className='dashboardmain'>
                    <Link to={'/video-player/video-comments'} className='link'>
                        <div className='dashboardcontent'>
                            <MdMessage />
                            <h6>Video Comments</h6>
                        </div>
                    </Link>
                    <Link to={'/video-player/video-history'} className='link'>
                        <div className='dashboardcontent'>
                            <MdHistory />
                            <h6>Video History</h6>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default HOC(VideoPlayer)