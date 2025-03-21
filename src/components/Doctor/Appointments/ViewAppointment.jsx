import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleAppointmentQuery } from "../../../redux/api/appointmentApi";
import Header from "../../Shared/Header/Header";
import Footer from "../../Shared/Footer/Footer";
import moment from "moment";
import "../../../stylesheets/doctorStylesheets/ViewAppointments.css";
import { Button, Tag, Tooltip } from "antd";
import { clickToCopyClipBoard } from "../../../utils/copyClipBoard";
import { FaPrint } from "react-icons/fa";
import ReactToPrint from "react-to-print";

import Lottie from "lottie-react";
import Loading from "../../../animations/loading.json";
import SomethingWrong from "../../../animations/something_wrong.json";
import userImg from "../../../images/user.png";
import doctorImg from "../../../images/home/doctorProfile.jpg";

const ViewAppointment = () => {
  const ref = useRef();
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleAppointmentQuery(id);

  let content = null;

  if (!isLoading && isError)
    content = (
      <div className=" m-0 p-0 d-flex flex-column align-items-center justify-content-center">
        <Lottie
          loop={true}
          animationData={SomethingWrong}
          style={{ width: "300px" }}
        />
        <div
          style={{
            color: "var(--headingColor)",
            fontWeight: "bold",
            fontSize: "1.3rem",
          }}
        >
          Something went wrong!
        </div>
      </div>
    );

  if (isLoading && !isError)
    content = (
      <div className=" m-0 p-0 d-flex flex-column align-items-center justify-content-center">
        <Lottie
          loop={true}
          animationData={Loading}
          style={{ width: "300px" }}
        />
      </div>
    );

  if (!isLoading && !isError && data?.id)
    content = (
      <>
        <page size="A4" className="mx-auto p-3 pb-3 my-5">
          <div className="appointment-view p-2">
            <div>
              <p
                className="form-text text-black mb-0"
                style={{
                  color: "var(--textColor)",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Date :{" "}
                <Tag
                  bordered={false}
                  style={{ color: "var(--primaryColor)", fontSize: "14px" }}
                >
                  {moment(data?.createdAt).format("LL")}
                </Tag>
              </p>
              <Tooltip title="Copy Tracking ID" className="tracking-id-btn">
                <Button>
                  <h6>
                    Tracking
                    <Tag
                      color="#37c56d"
                      className="ms-2 text-uppercase"
                      onClick={() => clickToCopyClipBoard(data?.trackingId)}
                    >
                      {data?.trackingId}
                    </Tag>
                  </h6>
                </Button>
              </Tooltip>
            </div>

            <div className="appointment-status">
              {data?.patientType && (
                <p className="mb-1">
                  Patient Type{" "}
                  <Tag
                    style={{ padding: "4px 8px", marginLeft: "10px" }}
                    bordered={true}
                    color="processing"
                  >
                    {data?.patientType}
                  </Tag>
                </p>
              )}
              <p className="mb-1">
                Current Status{" "}
                <Tag
                  style={{ padding: "4px 8px", marginLeft: "10px" }}
                  bordered={true}
                  color="orange"
                >
                  {data?.status}
                </Tag>
              </p>
              <p className="mb-1">
                Payment{" "}
                <Tag
                  style={{ padding: "4px 8px", marginLeft: "10px" }}
                  bordered={true}
                  color="success"
                >
                  {data?.paymentStatus}
                </Tag>
              </p>
              <p className="mb-1">
                Prescription Status{" "}
                <Tag
                  style={{ padding: "4px 8px", marginLeft: "10px" }}
                  bordered={true}
                  color="green"
                >
                  {data?.prescriptionStatus}
                </Tag>
              </p>
            </div>
          </div>

          <div className="appointment-info">
            <h4 className="appointment-heading">APPOINTMENT INFORMATION</h4>
            <div className="border border-light-subtle rounded p-3">
              <p className="mb-2 appointment-text">
                Place of Meeting:{" "}
                <Tag
                  bordered={true}
                  color="#f50"
                  style={{
                    padding: "4px 8px",
                    marginLeft: "10px",
                    textWrap: "wrap",
                  }}
                >
                  Sagar MultiSpeciality Hospital, Bhopal, In
                </Tag>
              </p>
              <p className="mb-2 appointment-text">
                Meeting Date:{" "}
                <Tag
                  bordered={true}
                  color="orange"
                  style={{ padding: "4px 8px", marginLeft: "10px" }}
                >
                  {moment(data?.scheduleDate).format("LL")}
                </Tag>
              </p>
              <p className="mb-2 appointment-text">
                Meeting Time:{" "}
                <Tag
                  bordered={true}
                  color="orange"
                  style={{ padding: "4px 8px", marginLeft: "10px" }}
                >
                  {data?.scheduleTime}
                </Tag>
              </p>
            </div>
          </div>

          <div className="doctor-info">
            <h4 className="appointment-heading">DOCTOR INFORMATION</h4>
            {data?.doctor && (
              <div className="border border-light-subtle rounded p-3 doctor-data">
                <div>
                  <img
                    src={data?.doctor?.img ? data?.doctor?.img : doctorImg}
                    alt=""
                    style={{
                      border: "none",
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                </div>
                <div>
                  <h4 className="mb-1 doc-detail">
                    {data?.doctor?.firstName && data?.doctor?.lastName
                      ? `${data.doctor.firstName} ${data.doctor.lastName}`
                      : data?.doctor?.firstName || data?.doctor?.lastName}
                  </h4>
                  <p className="mb-1 appointment-para doc-detail">
                    {data?.doctor?.specialization
                      ? data?.doctor?.specialization
                      : data?.doctor?.designation}
                  </p>
                  <p className="mb-1 appointment-para doc-detail">
                    {data?.doctor?.college}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="patient-info">
            <h4 className="appointment-heading">PATIENT INFORMATION</h4>
            <div className="border border-light-subtle rounded p-3 patient-data">
              <div>
                <img
                  src={data?.patient?.img ? data?.patient?.img : userImg}
                  alt=""
                  style={{
                    border: "none",
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
              </div>
              <div>
                <h4>
                  {data?.firstName + " " + data?.lastName}
                </h4>

                <p className="mb-1 appointment-para">
                  Age:{" "}
                  <span
                    style={{ fontWeight: "normal", color: "var(--textLight)" }}
                  >
                    {moment().diff(moment(data?.patient?.dateOfBirth), "years")}
                  </span>
                </p>

                <p className="mb-1 appointment-para">
                  Blood Group:{""}{" "}
                  <span
                    style={{ fontWeight: "normal", color: "var(--textLight)" }}
                  >
                    {" "}
                    {data?.patient?.bloodGroup}
                  </span>
                </p>

                <p className="mb-1 appointment-para">
                  Address:{" "}
                  <span
                    style={{ fontWeight: "normal", color: "var(--textLight)" }}
                  >
                    {data?.address}
                  </span>
                </p>

                <div className="mt-2">
                  <p className="mb-1 appointment-para">
                    Reason for Visit:{" "}
                    <span
                      style={{
                        fontWeight: "normal",
                        color: "var(--textLight)",
                      }}
                    >
                      {data?.reasonForVisit}
                    </span>
                  </p>
                  <p className="mb-1 appointment-para">
                    Description:{" "}
                    <span
                      style={{
                        fontWeight: "normal",
                        color: "var(--textLight)",
                      }}
                    >
                      {data?.description}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </page>
      </>
    );
  return (
    <>
      <Header />
      <div style={{ margin: "5rem 0" }}>
        <div
          className="d-flex justify-content-end mb-4"
          style={{ marginRight: "1rem" }}
        >
          <ReactToPrint
            bodyClass="print-agreement"
            content={() => ref.current}
            trigger={() => (
              <Button type="primary" icon={<FaPrint />}>
                {" "}
                Print
              </Button>
            )}
          />
        </div>
        <div ref={ref}>{content}</div>
      </div>
      <Footer />
    </>
  );
};

export default ViewAppointment;
