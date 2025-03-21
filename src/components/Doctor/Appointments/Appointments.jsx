import React, { useEffect } from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import img from "../../../images/user.png";
import "../../../stylesheets/doctorStylesheets/Appointments.css";
import {
  useGetDoctorAppointmentsQuery,
  useUpdateAppointmentMutation,
} from "../../../redux/api/appointmentApi";
import moment from "moment";
import { Button, Empty, message, Tag, Tooltip } from "antd";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  FaClock,
  FaEnvelope,
  FaLocationArrow,
  FaPhoneAlt,
  FaBriefcaseMedical,
} from "react-icons/fa";
import { clickToCopyClipBoard } from "../../../utils/copyClipBoard";
import ReactGA from "react-ga4";

const Appointments = () => {
  const { data, isError, isLoading } = useGetDoctorAppointmentsQuery({});
  const [
    updateAppointment,
    { isError: updateIsError, isSuccess, error },
  ] = useUpdateAppointmentMutation();

  const updatedApppointmentStatus = (id, type) => {
    const changeObj = {
      status: type,
    };
    if (id) {
      updateAppointment({ id, data: changeObj });
    }
  };
  useEffect(() => {
   ReactGA.send({
     hitType: "pageview",
     page: "/",
     title: "Appointment Page Visit",
   });
  });
  useEffect(() => {
    if (isSuccess) {
      message.success("Successfully Appointment Updated");
    }
    if (isError) {
      message.error(error?.data?.message);
    }
  }, [isSuccess, updateIsError, error]);

  let content = null;
  if (!isLoading && isError) content = <div>Something Went Wrong !</div>;
  if (!isLoading && !isError && data?.length === 0) content = <Empty />;
  if (!isLoading && !isError && data?.length > 0)
    content = (
      <>
        {data &&
          data.map((item) => (
            <div className="appointment-details">
              <div className="profile-card">
                <div className="image">
                  <img
                    className="profile-img"
                    alt=""
                    src={item?.patient?.img ? item?.patient?.img : img}
                  />
                </div>

                <h5>{item?.firstName + " " + item?.lastName}</h5>

                <Tooltip title="Copy Tracking ID" className="tracking-id">
                  <Button className="copyBtn">
                    Tracking ID
                    <Tag
                      color="#12c762"
                      className="ms-2 text-uppercase"
                      onClick={() => clickToCopyClipBoard(item?.trackingId)}
                    >
                      {item?.trackingId}
                    </Tag>
                  </Button>
                </Tooltip>

                <div className="w-100">
                  <p className="text-data">
                    <span className="icon">
                      <FaClock />
                    </span>{" "}
                    {moment(item?.appointmentTime).format("MMM Do, YY")}{" "}
                  </p>

                  <p className="text-data">
                    <span className="icon">
                      <FaLocationArrow />
                    </span>{" "}
                    {item?.address}
                  </p>

                  <p className="text-data">
                    <span className="icon">
                      <FaEnvelope />
                    </span>{" "}
                    {item?.email}
                  </p>
                  <p className="text-data">
                    <span className="icon">
                      <FaPhoneAlt />
                    </span>{" "}
                    {item?.phone}
                  </p>
                </div>
              </div>

              <div className="profile-card d-flex flex-column align-items-center justify-content-between">
                <div className="w-100">
                  <p className="text-data">
                    Current Status{" "}
                    <Tag
                      color="#ffdac8"
                      className="text-uppercase tag"
                      style={{ border: "1.5px solid #ccaea0" }}
                    >
                      {item?.status}
                    </Tag>
                  </p>
                  <p className="text-data">
                    Patient Status{" "}
                    <Tag
                      color="#bceaff"
                      className="text-uppercase tag"
                      style={{ border: "1.5px solid #96bbcc" }}
                    >
                      {item?.patientType ? item?.patientType : "Normal"}
                    </Tag>
                  </p>
                  <p className="text-data">
                    Is Follow Up{" "}
                    <Tag
                      color="#e4efab"
                      className="text-uppercase tag"
                      style={{ border: "1.5px solid #b3bc86" }}
                    >
                      {item?.isFollowUp ? "Yes" : "No"}
                    </Tag>
                  </p>
                  <p className="text-data">
                    {" "}
                    Is Paid{" "}
                    <Tag
                      color="#ceecc2"
                      className="text-uppercase tag"
                      style={{ border: "1.5px solid #a1b998" }}
                    >
                      {item?.paymentStatus}
                    </Tag>
                  </p>
                  <p className="text-data">
                    {" "}
                    Prescribed{" "}
                    <Tag
                      color="#d3c5ff"
                      className="text-uppercase tag"
                      style={{ border: "1.5px solid #a89dcc" }}
                    >
                      {item?.prescriptionStatus}
                    </Tag>
                  </p>
                </div>

                <div className="d-flex gap-2 flex-column w-100">
                  <div className="d-flex flex-row align-items-center justify-content-between gap-3">
                    <Link to={`/dashboard/appointments/${item?.id}`}>
                      <Button type="primary" icon={<FaEye />} size="medium">
                        View
                      </Button>
                    </Link>
                    {item.prescriptionStatus === "notIssued" ? (
                      <Link to={`/dashboard/appointment/treatment/${item?.id}`}>
                        <Button
                          type="primary"
                          icon={<FaBriefcaseMedical />}
                          size="medium"
                        >
                          Treatment
                        </Button>
                      </Link>
                    ) : (
                      <Link
                        to={`/dashboard/prescription/${item?.prescription?.id}`}
                      >
                        <Button type="primary" icon={<FaEye />} size="medium">
                          Prescription
                        </Button>
                      </Link>
                    )}
                    {item?.isFollowUp && (
                      <Link
                        to={`/dashboard/appointment/treatment/edit/${item?.prescription[0]?.id}`}
                      >
                        <Button
                          type="primary"
                          icon={<FaBriefcaseMedical />}
                          size="medium"
                        >
                          Follow Up
                        </Button>
                      </Link>
                    )}
                  </div>

                  <div className="d-flex flex-row align-items-center justify-content-between gap-3">
                    {item?.status === "pending" && (
                      <>
                        <Button
                          className="accept-button"
                          icon={<FaCheck />}
                          size="medium"
                          onClick={() =>
                            updatedApppointmentStatus(item.id, "scheduled")
                          }
                        >
                          Accept
                        </Button>
                        <Button
                          className="cancel-button"
                          icon={<FaTimes />}
                          size="medium"
                          onClick={() =>
                            updatedApppointmentStatus(item.id, "cancel")
                          }
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </>
    );
  return (
    <DashboardLayout>
      <div className="appointments">{content}</div>
    </DashboardLayout>
  );
};

export default Appointments;
