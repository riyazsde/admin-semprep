import React, { useEffect, useState } from 'react';
import HOC from '../../components/HOC/HOC';
import Pagination from '../../components/Pagination/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import { GiPayMoney } from 'react-icons/gi';
import {
  HiMiniArrowTrendingUp,
  HiMiniArrowTrendingDown,
} from 'react-icons/hi2';
import { FaUserGraduate } from 'react-icons/fa6';
import { FiEdit3 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';
import { MdArrowOutward } from 'react-icons/md';
import { getAllPayments } from '../../services/exportFunctions';
import { courseTypeName, generateCsv } from '../../services/exportComponents';

const Payments = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (newLimit) => {
    console.log('Limit per Page:', newLimit);
    setLimit(newLimit);
  };

  const getData = () => {
    const params = {
      page: 1,
      limit: 5000,
      // search,
    };
    getAllPayments({ setIsLoading, setData, params });
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredTransactions = search
    ? data?.transactions?.filter((transaction) => {
        const searchLower = search.toLowerCase();
        return (
          transaction.user?.fullName?.toLowerCase().includes(searchLower) ||
          transaction.paymentMode?.toLowerCase().includes(searchLower) ||
          courseTypeName(transaction)?.toLowerCase().includes(searchLower) ||
          transaction.transactionId?.toLowerCase().includes(searchLower)
        );
      })
    : data?.transactions;

  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Payments</h6>
        </div>
        <div className="payments-container">
          <div className="payments-top">
            <div className="payments-div">
              <div className="payments-div-top">
                <div className="payments-div-left">
                  <h6>Total Income</h6>
                  <h3>
                    ₹{' '}
                    {(
                      data?.transactions?.reduce(
                        (sum, item) => sum + Number(item.finalAmount || 0),
                        0
                      ) || 0
                    ).toFixed(2)}
                  </h3>
                </div>
                <div className="payments-div-right">
                  <GiPayMoney />
                </div>
              </div>
              {/* <div className="payments-div-bottom">
                <HiMiniArrowTrendingUp />
                <p>
                  <span>8.5%</span> Up from last week
                </p>
              </div> */}
            </div>
            {/* Uncomment if needed 
            <div className="payments-div">
              <div className="payments-div-top">
                <div className="payments-div-left">
                  <h6>Total Expenses</h6>
                  <h3>₹ 12,000</h3>
                </div>
                <div className="payments-div-right expenses">
                  <GiPayMoney />
                </div>
              </div>
              <div className="payments-div-bottom expenses">
                <HiMiniArrowTrendingDown />
                <p>
                  <span>8.5%</span> Down from last week
                </p>
              </div>
            </div>
            */}
            <div className="payments-div">
              <div className="payments-div-top">
                <div className="payments-div-left">
                  <h6>Total Transactions</h6>
                  <h3>{data?.transactions?.length || 0}</h3>
                </div>
                <div className="payments-div-right user">
                  <FaUserGraduate />
                </div>
              </div>
              {/* <div className="payments-div-bottom expenses">
                <HiMiniArrowTrendingDown />
                <p>
                  <span>8.5%</span> Down from last year
                </p>
              </div> */}
            </div>
          </div>
          <div className="handwrittennotes-list">
            <div className="handwrittennotes-list-header">
              {/* <Link to={"/vods/add-vod"} className="link">
                <div className="handwrittennotes-add">
                  <FaPlus />
                  <h6>Add NEW payment</h6>
                </div>
              </Link> */}
              <div className="handwrittennotes-search">
                <IoSearch color="#ADB5BD" />
                <input
                  type="search"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              {data?.transactions?.length > 0 && (
                <div
                  onClick={() =>
                    generateCsv(
                      [
                        'User Name',
                        'Payment Mode',
                        'Purchased Course',
                        'Price',
                        'Payment ID',
                      ],
                      data?.transactions?.map((item) => [
                        item.user?.fullName || '',
                        item.paymentMode || '',
                        courseTypeName(item),
                        item.finalAmount || 0,
                        item.transactionId || '',
                      ]),
                      `Payment List-${currentPage}.csv`
                    )
                  }
                  className="handwrittennotes-export"
                >
                  <span>Export CSV</span>
                </div>
              )}
            </div>
            <div className="handwrittennotes-list-table">
              <table>
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Payment Mode</th>
                    <th>Purchased Course</th>
                    <th>Price</th>
                    <th>Payment ID</th>
                    {/* <th></th> */}
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions?.map((transaction, index) => {
                    return (
                      <tr key={index}>
                        <td>{transaction.user?.fullName || ''}</td>
                        <td>{transaction.paymentMode || ''}</td>
                        <td>{courseTypeName(transaction)}</td>
                        <td>{transaction.finalAmount || ''}</td>
                        <td>{transaction.transactionId || ''}</td>
                        {/* <td>
                          <div className="handwrittennotes-table-icons">
                            <div className="handwrittennotes-icon">
                              <MdArrowOutward />
                            </div>
                            <div className="handwrittennotes-icon">
                              <FiEdit3 />
                            </div>
                            <div className="handwrittennotes-icon">
                              <AiOutlineDelete />
                            </div>
                          </div>
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* <Pagination
                totalPages={data?.totalPages}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(Payments);
