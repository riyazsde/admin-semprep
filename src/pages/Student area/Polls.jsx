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


const Polls = () => {
    const dummyData = [
        {
            question: "Poll Name here",
            createdby: "Admin",
            createdat: "October 28, 2024, 12:28 pm",
            totalvotes: "0",
            pollID: "DBT_e86de136",
        },
        {
            question: "Poll Name here",
            createdby: "Admin",
            createdat: "October 28, 2024, 12:28 pm",
            totalvotes: "0",
            pollID: "DBT_e86de136",
        },
        {
            question: "Poll Name here",
            createdby: "Admin",
            createdat: "October 28, 2024, 12:28 pm",
            totalvotes: "0",
            pollID: "DBT_e86de136",
        },
        {
            question: "Poll Name here",
            createdby: "Admin",
            createdat: "October 28, 2024, 12:28 pm",
            totalvotes: "0",
            pollID: "DBT_e86de136",
        },
        {
            question: "Poll Name here",
            createdby: "Admin",
            createdat: "October 28, 2024, 12:28 pm",
            totalvotes: "0",
            pollID: "DBT_e86de136",
        },
        {
            question: "Poll Name here",
            createdby: "Admin",
            createdat: "October 28, 2024, 12:28 pm",
            totalvotes: "0",
            pollID: "DBT_e86de136",
        },
        {
            question: "Poll Name here",
            createdby: "Admin",
            createdat: "October 28, 2024, 12:28 pm",
            totalvotes: "0",
            pollID: "DBT_e86de136",
        },
        {
            question: "Poll Name here",
            createdby: "Admin",
            createdat: "October 28, 2024, 12:28 pm",
            totalvotes: "0",
            pollID: "DBT_e86de136",
        },
        {
            question: "Poll Name here",
            createdby: "Admin",
            createdat: "October 28, 2024, 12:28 pm",
            totalvotes: "0",
            pollID: "DBT_e86de136",
        },
        {
            question: "Poll Name here",
            createdby: "Admin",
            createdat: "October 28, 2024, 12:28 pm",
            totalvotes: "0",
            pollID: "DBT_e86de136",
        },
    ];

    const navigate = useNavigate();

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
                        Student area /<span> Polls</span>
                    </p>
                </div>
                <div className='handwrittennotes-list'>
                    <div className='handwrittennotes-list-header'>
                        <Link to={'/student-area/polls/add-polls'} className='link'>
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
                                    <th>Question</th>
                                    <th>Created by</th>
                                    <th>Created at</th>
                                    <th>Total Votes</th>
                                    <th>Poll ID</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyData.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.question}</td>
                                        <td>{data.createdby}</td>
                                        <td>{data.createdat}</td>
                                        <td>{data.totalvotes}</td>
                                        <td>{data.pollID}</td>
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

export default HOC(Polls)