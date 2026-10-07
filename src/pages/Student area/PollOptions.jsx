import React from 'react'
import HOC from '../../components/HOC/HOC'



import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { GoArrowLeft } from "react-icons/go";
import Pagination from '../../components/Pagination/Pagination';


const PollOptions = () => {
    const dummyData = [
        {
            poll: "Poll Name here",
            optionText: "Option text here",
            correctOption: "Details can be displayed here",
            timestamp: "9:33 AM",
            activityID: "DBT_e86de136",
        },
        {
            poll: "Poll Name here",
            optionText: "Option text here",
            correctOption: "Details can be displayed here",
            timestamp: "9:33 AM",
            activityID: "DBT_e86de136",
        },
        {
            poll: "Poll Name here",
            optionText: "Option text here",
            correctOption: "Details can be displayed here",
            timestamp: "9:33 AM",
            activityID: "DBT_e86de136",
        },
        {
            poll: "Poll Name here",
            optionText: "Option text here",
            correctOption: "Details can be displayed here",
            timestamp: "9:33 AM",
            activityID: "DBT_e86de136",
        },
        {
            poll: "Poll Name here",
            optionText: "Option text here",
            correctOption: "Details can be displayed here",
            timestamp: "9:33 AM",
            activityID: "DBT_e86de136",
        },
        {
            poll: "Poll Name here",
            optionText: "Option text here",
            correctOption: "Details can be displayed here",
            timestamp: "9:33 AM",
            activityID: "DBT_e86de136",
        },
        {
            poll: "Poll Name here",
            optionText: "Option text here",
            correctOption: "Details can be displayed here",
            timestamp: "9:33 AM",
            activityID: "DBT_e86de136",
        },
        {
            poll: "Poll Name here",
            optionText: "Option text here",
            correctOption: "Details can be displayed here",
            timestamp: "9:33 AM",
            activityID: "DBT_e86de136",
        },
        {
            poll: "Poll Name here",
            optionText: "Option text here",
            correctOption: "Details can be displayed here",
            timestamp: "9:33 AM",
            activityID: "DBT_e86de136",
        },
        {
            poll: "Poll Name here",
            optionText: "Option text here",
            correctOption: "Details can be displayed here",
            timestamp: "9:33 AM",
            activityID: "DBT_e86de136",
        },
    ];

    const navigate = useNavigate();

    return (
        <>
            <div className='dashboardcontainer'>
                <div className='dashboardcontainer-header'>
                    <h6>Poll Options</h6>
                    <p>
                        <GoArrowLeft
                            size={25}
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(-1)}
                        />
                        Student area /<span> Poll Options</span>
                    </p>
                </div>
                <div className='handwrittennotes-list'>
                    <div className='handwrittennotes-list-header'>
                        <Link to={'/vods/add-vod'} className='link'>
                            <div className='handwrittennotes-add'>
                                <FaPlus />
                                <h6>Add NEW Poll</h6>
                            </div>
                        </Link>
                        <div className='handwrittennotes-search'>
                            <IoSearch color='#ADB5BD' />
                            <input type="search" placeholder='Search...' />
                        </div>
                        <div className='handwrittennotes-export'>
                            <span>Export CSV</span>
                        </div>
                    </div>
                    <div className='handwrittennotes-list-table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Poll</th>
                                    <th>Option Text</th>
                                    <th>Correct Option</th>
                                    <th>Time Stamp</th>
                                    <th>Option ID</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyData.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.poll}</td>
                                        <td>{data.optionText}</td>
                                        <td>{data.correctOption}</td>
                                        <td>{data.timestamp}</td>
                                        <td>{data.activityID}</td>
                                        <td>
                                            <div className="handwrittennotes-table-icons">
                                                <div className="handwrittennotes-icon" onClick={() => navigate('/students/student-profile')}>
                                                    <MdArrowOutward />
                                                </div>
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
                </div>
            </div>
        </>
    )
}

export default HOC(PollOptions)