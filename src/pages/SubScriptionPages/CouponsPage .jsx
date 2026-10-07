import React from "react";
import HOC from "../../components/HOC/HOC";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { getAllCoupons, deleteCoupon } from "../../services/exportFunctions";
import { useState, useEffect } from "react";

const CouponsPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = () => {
    getAllCoupons({ setIsLoading, setData });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDeleteCoupon = (couponId) => {
    deleteCoupon({ couponId, setIsLoading, getData });
  };

  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Coupons Page </h6>

        </div>
        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link to={"/coupons/add-coupons"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Add NEW Coupon</h6>
              </div>
            </Link>
          </div>
          <div className="handwrittennotes-list-table">
            <table>
              <thead>
                <tr>
                  <th>Coupon Code</th>
                  <th>Discount</th>
                  <th>Valid From</th>
                  <th>Valid To</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((coupon, index) => (
                  <tr key={index}>
                    <td>{coupon?.code}</td>
                    <td>
                      {coupon?.discount}
                      {coupon?.isPercent ? "%" : ""}
                    </td>
                    <td>{new Date(coupon?.startDate).toLocaleDateString()}</td>
                    <td>{new Date(coupon?.expirationDate).toLocaleDateString()}</td>
                    <td>
                      <span style={{ color: coupon?.isActive ? "green" : "red" }}>
                        {coupon?.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="handwrittennotes-table-icons">
                        <div className="handwrittennotes-icon">
                          <AiOutlineDelete onClick={() => handleDeleteCoupon(coupon?._id)} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(CouponsPage);
