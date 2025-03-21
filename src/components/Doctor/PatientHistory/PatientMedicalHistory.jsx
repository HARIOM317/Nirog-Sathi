import React from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { useGetDoctorPatientsHistoryQuery } from "../../../redux/api/appointmentApi";
import CustomTable from "../../UI/component/CustomTable";
import { Button, Tag, message } from "antd";
import { FaRegEye, FaEdit, FaRegTimesCircle } from "react-icons/fa";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import "../../../stylesheets/DashboardStyle.css";

const PatientMedicalHistory = () => {
  const { data, isLoading, isError } = useGetDoctorPatientsHistoryQuery();
  console.log({ data });
  // console.log({data});

  return (
    <DashboardLayout>
      <div className="row my-3">
        <div className="col-md-12">
          <div className="card card-table">
            <div className="card-header table-top-heading">
              <h4 className="card-title">Patient History</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover table-center mb-0">
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1.5px solid var(--borderColor)",
                      }}
                    >
                      <th>Patient Name</th>
                      <th>Doctor Name</th>
                      <th>Blood Group</th>
                      <th>Disease</th>
                      <th>Test</th>
                      <th>Appointment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item) => {
                      return (
                        <tr className="table-row">
                          <td>
                            <span className="table-data">
                              {item.patient.firstName && item.patient.firstName}{" "}
                              {item.patient.lastName && item.patient.lastName}
                            </span>
                          </td>
                          <td>
                            <span className="table-data">
                              {item.doctor.firstName && item.doctor.firstName}{" "}
                              {item.doctor.lastName && item.doctor.lastName}
                            </span>
                          </td>
                          <td>
                            <span className="table-data">
                              {item.patient.bloodGroup &&
                                item.patient.bloodGroup}
                            </span>
                          </td>
                          <td>
                            <span className="table-data">
                              {item.disease && item.disease}
                            </span>
                          </td>
                          <td>
                            <span className="table-data">
                              {item.test && item.test}
                            </span>
                          </td>
                          <td>
                            <Link to={`/dashboard/prescription/${item.id}`}>
                              <Button
                                size="small"
                                className="view-btn"
                                style={{
                                  margin: "5px",
                                  width: "30px",
                                  height: "30px",
                                }}
                              >
                                <FaRegEye />
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientMedicalHistory;
