import { useEffect, useState } from "react";
import { showNotification } from "../components/common/APIComponents";
import { useLocation, useNavigate } from "react-router-dom";
import { endpoints } from "./endPoints";
import { postRequest } from "./apiService";
import { Button, Modal } from "react-bootstrap";
import images from "../utils/images";

const RazorpayPayment = () => {
  const [isPaymentTriggered, setIsPaymentTriggered] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    if (!location?.state?.price) {
      window.history.back();
    }
  }, [location]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert(
        "Razorpay SDK failed to load. Please check your internet connection."
      );
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: location?.state?.price * 100,
      currency: "INR",
      name: "Complete Prep",
      description: "Test Transaction",
      image: "https://your-logo-url.com/logo.png",
      handler: function (response) {
        setModalShow(true); // Show the modal on successful payment
        showNotification({
          type: "success",
          message: `Payment Successful! Payment ID: ${response.razorpay_payment_id}`,
        });
        handleCheckout(response.razorpay_payment_id);
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: function () {
          window.history.back();
        },
      },
      method: {
        upi: true,
        qr: true,
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", (response) => {
      alert("Payment Failed. Please try again.");
      showNotification({
        type: "error",
        message: "Payment Failed. Please try again.",
      });
      console.error("Payment Failed Details:", response);
    });

    paymentObject.open();
  };

  useEffect(() => {
    if (!isPaymentTriggered && location?.state?.price) {
      setIsPaymentTriggered(true);
      handlePayment();
    }
  }, [isPaymentTriggered, location]);

  const handleCheckout = (id) => {
    postRequest({
      endpoint: endpoints.checkOutItems,
    }).then((res) => {
      postRequest({
        endpoint: endpoints.placeOrderById(res?.data?.orderId),
        data: {
          paymentStatus: "completed",
          paymentMode: "UPI",
          transactionId: id || "",
        },
      }).then(() => {
        handleStartCourse();
        setModalShow(true);
      });
    });
  };

  const handleStartCourse = () => {
    const payload = {};
    const data = location?.state?.data;
    const itemId = location?.state?.itemId;

    if (data?.skill) {
      payload.skillId = itemId;
    } else if (data?.course) {
      payload.courseId = itemId;
    } else if (data?.test) {
      payload.testSeriesId = itemId;
    } else if (data?.capsuleCourse) {
      payload.capsuleCourseId = itemId;
    } else if (data?.studyPlanner) {
      payload.studyPlannerId = itemId;
    } else if (data?.testSeries) {
      payload.testSeriesId = itemId;
    } else if (data?.previousYearQuestion) {
      payload.previousYearQuestionId = itemId;
    } else if (data?.handwrittenNotes) {
      payload.handwrittenNotesId = itemId;
    }

    postRequest({
      endpoint: endpoints.startTestTWV,
      data: payload,
    }).then(() => {
      // navigate("/user/home");
    });
  };

  // Modal Component
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div style={{ padding: "3rem" ,display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div style={{ textAlign: "center" }}>
              <img
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
                src={images.userTickImage}
                alt="Success"
              />
            </div>
            <h2 style={{ textAlign: "center" }}>₹ {location?.state?.price}</h2>
            <h4 style={{ textAlign: "center" }}>
              Your Payment has been successfully completed for{" "}
              {location?.state?.data?.skill
                ? "Skill"
                : location?.state?.data?.course
                ? "Course"
                : location?.state?.data?.test
                ? "Test"
                : location?.state?.data?.capsuleCourse
                ? "Capsule Courses"
                : location?.state?.data?.studyPlanner
                ? "Study Planner"
                : location?.state?.data?.testSeries
                ? "Test Series"
                : ""}
            </h4>
            <div style={{ textAlign: "center" }}>
              <Button
                onClick={() => {
                  const pathName = location?.state?.data;

                  if (pathName) {
                    if (pathName.skill) return navigate("/user/skills");
                    if (pathName.course) return navigate("/user/course");
                    if (pathName.test)
                      return navigate("/user/test-video-solution");
                    if (pathName.capsuleCourse)
                      return navigate("/user/capsule-course");
                    if (pathName.studyPlanner)
                      return navigate("/user/study-planner-ai");
                    if (pathName.testSeries)
                      return navigate("/user/test-video-solution");
                    if (pathName.previousYearQuestion)
                      return navigate("/user/pyq-with-videos");
                    if (pathName.handwrittenNotes)
                      return navigate("/user/handwritten-notes");
                  }
                }}
              >
                Start Learning
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <button
        style={{
          display: "none",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onClick={handlePayment}
      >
        Pay Now
      </button>
    </div>
  );
};

export default RazorpayPayment;
