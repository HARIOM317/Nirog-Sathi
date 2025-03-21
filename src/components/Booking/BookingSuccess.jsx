import React, { useEffect } from "react";
import Footer from "../Shared/Footer/Footer";
import {
  FaBriefcase,
  FaRegClock,
  FaLocationArrow,
  FaCalendarAlt,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import moment from "moment";
import { Button, Empty, message, Tag, Tooltip } from "antd";
import Header from "../Shared/Header/Header";
import { useGetSingleAppointmentQuery } from "../../redux/api/appointmentApi";
import { clickToCopyClipBoard } from "../../utils/copyClipBoard";
import Lottie from "lottie-react";
import SuccessFullyBooked from "../../animations/booked-appointment.json";

const BookingSuccess = () => {
  const { id } = useParams();
  const { data } = useGetSingleAppointmentQuery(id);

  const navigate = useNavigate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (!data?.id) {
        navigate("/");
      }
    }, 5000);
    return () => clearTimeout(timeOut);
  }, [navigate, data]);

  return (
    <>
      <Header />
      <div
        className="container mx-auto d-flex justify-content-center align-items-center text-center"
        style={{ marginTop: "50px", marginBottom: '50px' }}
      >
        {data?.id ? (
          <div
            className=" p-3"
            style={{
              maxWidth: "500px",
            }}
          >
            <div
              className="my-2"
              style={{ borderBottom: "1.5px solid var(--borderColor)" }}
            >
              <div className="m-0 p-0 d-flex flex-column align-items-center justify-content-center">
                <Lottie
                  loop={true}
                  animationData={SuccessFullyBooked}
                  style={{ width: "150px" }}
                />
              </div>
              <h6
                className="py-2"
                style={{
                  color: "var(--headingColor)",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                }}
              >
                Appointment is scheduled
              </h6>

              <p
                style={{
                  color: "green",
                  border: "1.5px solid green",
                  padding: "4px 8px",
                  borderRadius: "8px",
                  background: "#e1ffdc",
                  fontWeight: "500",
                  fontSize: "1rem",
                }}
              >
                Check your Inbox an email with all details!
              </p>
            </div>

            <Tooltip title="Copy Appointment Id" className="mt-3 mb-3">
              <Button
                onClick={() => clickToCopyClipBoard(data?.trackingId)}
                className="copyBtn"
              >
                <h6>
                  Appointment ID
                  <Tag color="#87d068" className="ms-2 text-uppercase">
                    {data?.trackingId}
                  </Tag>
                </h6>
              </Button>
            </Tooltip>
            <div className="card border-0 p-3 rounded mb-5">
              <div
                className="d-flex flex-row gap-3 mb-1"
                style={{
                  fontSize: "1rem",
                  color: "var(--textColor)",
                  fontWeight: "500",
                }}
              >
                <div>
                  <FaBriefcase />
                </div>
                <p>
                  With Dr.{" "}
                  {data?.doctor?.firstName + " " + data?.doctor?.lastName}
                </p>
              </div>
              <div
                className="d-flex gap-3 mb-1"
                style={{
                  fontSize: "1rem",
                  color: "var(--textColor)",
                  fontWeight: "500",
                }}
              >
                <div>
                  <FaLocationArrow />
                </div>
                <p className="text-start">
                  Sagar Care Multi-Specialties Hospital
                  <br />
                  <span className="form-text">
                    102030, MP Nagar, Bhopal, India
                  </span>
                </p>
              </div>
              <div
                className="d-flex gap-3 mb-1"
                style={{
                  fontSize: "1rem",
                  color: "var(--textColor)",
                  fontWeight: "500",
                }}
              >
                <div>
                  <FaCalendarAlt />{" "}
                </div>
                <p>
                  {data.scheduleDate &&
                    data.scheduleTime &&
                    moment(data.scheduleDate).format("LL") +
                      " " +
                      data.scheduleTime}
                </p>
              </div>
              <div
                className="d-flex gap-3 mb-1"
                style={{
                  fontSize: "1rem",
                  color: "var(--textColor)",
                  fontWeight: "500",
                }}
              >
                <div>
                  <FaRegClock />
                </div>
                <p>30 Min</p>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="rounded p-3 d-flex flex-column justify-content-center align-items-center"
          >
            <Empty />
            <h6 className="p-2 my-3">You will be redirect to homepage !</h6>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BookingSuccess;
