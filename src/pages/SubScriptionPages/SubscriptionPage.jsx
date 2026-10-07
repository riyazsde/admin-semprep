import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import HOC from "../../components/HOC/HOC";
import {
  deleteSubscription,
  getAllSubscriptions,
} from "../../services/exportFunctions";

const SubscriptionPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = () => {
    getAllSubscriptions({ setIsLoading, setData });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDeleteSubscription = (subscriptionId) => {
    deleteSubscription({ subscriptionId, setIsLoading, getData });
  };

  return (
    <div className="dashboardcontainer">
      <div className="dashboardcontainer-header">
        <h6>Subscriptions Page</h6>
      </div>

      <div className="handwrittennotes-list">
        <div className="handwrittennotes-list-header">
          <Link to={"/add-subscription"} className="link">
            <div className="handwrittennotes-add">
              <FaPlus />
              <h6>Add NEW Subscription</h6>
            </div>
          </Link>
        </div>

        <div className="handwrittennotes-list-table">
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            overflowX: "scroll"
          }}>
            <thead>
              <tr>
                <th>Subscription Name</th>
                <th>Original Price</th>
                <th>Discount</th>
                <th>Discounted Price</th>
                <th>Duration (Months)</th>
                <th>Status</th>
                {/* <th>Goal Category</th>
                <th>Goal</th>
                <th>Semester</th> */}
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((subscription) => (
                <tr key={subscription._id}>
                  <td>{subscription?.name}</td>

                  <td>₹{subscription?.originalPrice}</td>

                  <td>
                    {subscription?.discountActive
                      ? `${subscription?.discount}%`
                      : "No Discount"}
                  </td>

                  <td>
                    {subscription?.discountActive
                      ? `₹${subscription?.discountPrice}`
                      : "N/A"}
                  </td>

                  <td>{subscription?.duration} months</td>

                  <td>
                    <span
                      style={{
                        color: subscription?.isActive ? "green" : "red",
                      }}
                    >
                      {subscription?.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* <td>{subscription?.goalCategory}</td>

                  <td>{subscription?.goal}</td>

                  <td>{subscription?.semester}</td> */}

                  <td>
                    {subscription?.endDate
                      ? new Date(subscription.endDate).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    <div className="handwrittennotes-table-icons">
                      <div className="handwrittennotes-icon">
                        <AiOutlineDelete
                          onClick={() =>
                            handleDeleteSubscription(subscription?._id)
                          }
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {data?.length === 0 && (
                <tr>
                  <td colSpan="11" style={{ textAlign: "center" }}>
                    {isLoading ? "Loading..." : "No Subscriptions Found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HOC(SubscriptionPage);
