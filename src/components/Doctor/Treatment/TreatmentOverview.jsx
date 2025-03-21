import { Link } from "react-router-dom";
import profileImg from "../../../images/user.png";
import {
  FaClock,
  FaEnvelope,
  FaLocationArrow,
  FaPhoneAlt,
} from "react-icons/fa";
import moment from "moment";
import { Tag } from "antd";
import "../../../stylesheets/doctorStylesheets/Treatment.css";

const TreatmentOverview = ({ data, isAppointment = false }) => {
  return (
    <>
      <div className="w-100 mb-3 p-3 text-center patient-treatment">
        <div className="row ">
          <div className="col-lg-12 col-xl-5 p-2 ">
            <div className="treatment">
              <div>
                <img
                  src={data?.patient?.img ? data?.patient?.img : profileImg}
                  alt=""
                  className="patient-img"
                />

                <h5 className="patient-name">
                  {data?.patient?.firstName + " " + data?.patient?.lastName}
                </h5>
              </div>

              <div className="patients-info">
                <div className="patient-data">
                  <span className="icon">
                    <FaClock />
                  </span>{" "}
                  {moment(data?.patient?.createdAt).format("LL")}{" "}
                </div>
                <div className="patient-data">
                  <span className="icon">
                    <FaLocationArrow />
                  </span>{" "}
                  {data?.patient?.address}
                </div>
                <div className="patient-data">
                  <span className="icon">
                    <FaEnvelope />
                  </span>{" "}
                  {data?.patient?.email}
                </div>
                <div className="patient-data">
                  <span className="icon">
                    <FaPhoneAlt />{" "}
                  </span>
                  {data?.patient?.phone}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-xl-7 overview">
            <div>
              <h5 style={{ color: "var(--textColor)" }}>Patient Overview</h5>
              <hr />
              <div className="p-2 rounded">
                <p className="form-text m-0" style={{ textAlign: "justify" }}>
                  {data?.appointment?.description
                    ? data?.appointment?.description
                    : data?.description}
                </p>
              </div>
            </div>

            <div className="text-start mt-3">
              <div className="patient-status">
                Patient Status
                <span className="btn-status btn-st-success">
                  <Tag
                    color="#c6f4b4"
                    className="ms-2 text-uppercase tag"
                    style={{ border: "1.5px solid #9cc18e" }}
                  >
                    {isAppointment ? data?.appointment?.patientType : "Normal"}
                  </Tag>
                </span>
              </div>
              <div className="patient-status">
                Current Status
                <span className="btn-status btn-st-danger">
                  <Tag
                    color="#ffc4a7"
                    className="ms-2 text-uppercase tag"
                    style={{ border: "1.5px solid #cc9c85" }}
                  >
                    {isAppointment ? data?.appointment?.status : data?.status}
                  </Tag>
                </span>
              </div>
              <div className="patient-status">
                Payment Status
                <span className="btn-status btn-st-success">
                  <Tag
                    color="#f9bfff"
                    className="ms-2 text-uppercase tag"
                    style={{ border: "1.5px solid #c798cc" }}
                  >
                    {isAppointment
                      ? data?.appointment?.paymentStatus
                      : data?.paymentStatus}
                  </Tag>
                </span>
              </div>
              <div className="patient-status">
                Prescription Status
                <span className="btn-status btn-st-danger">
                  <Tag
                    color="#a7f6ee"
                    className="ms-2 text-uppercase tag"
                    style={{ border: "1.5px solid #84c3bc" }}
                  >
                    {isAppointment
                      ? data?.appointment?.prescriptionStatus
                      : data?.prescriptionStatus}
                  </Tag>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TreatmentOverview;
