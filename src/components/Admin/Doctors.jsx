import React, { useState, useEffect } from "react";
import DashboardLayout from "../Doctor/DashboardLayout/DashboardLayout";
import doctorImg from "../../images/home/doctorProfile.jpg";
import "../../stylesheets/adminStylesheets/Appointments.css";
import { getBaseUrl } from "../../helpers/config/envConfig";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/doctor/`);
      const data = await response.json();
      setDoctors(data.data.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="row my-3">
        <div className="col-md-12">
          <div className="card card-table">
            <div className="card-header table-top-heading">
              <h4 className="card-title">Doctors List</h4>
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
                      <th>Profile</th>
                      <th>Doctor Name</th>
                      <th>Specialization</th>
                      <th>Clinic Name</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Charges</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor) => (
                      <tr key={doctor.id} className="table-row">
                        <td>
                          <img
                            className="avatar-img rounded-circle"
                            src={doctor.img ? doctor.img : doctorImg}
                            alt=""
                            style={{
                              width: "30px",
                              height: "30px",
                              marginRight: "10px",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td>
                          <span className="table-data">
                            {doctor.firstName} {doctor.lastName}
                          </span>
                        </td>
                        <td>
                          <span className="table-data">
                            {doctor.specialization
                              ? doctor.specialization
                              : "N/A"}
                          </span>
                        </td>
                        <td>
                          <span className="table-data">
                            {doctor.clinicName ? doctor.clinicName : "N/A"}
                          </span>
                        </td>
                        <td>
                          <span className="table-data">
                            {doctor.city ? doctor.city : "N/A"}
                          </span>
                        </td>
                        <td>
                          <span className="table-data">
                            {doctor.state ? doctor.state : "N/A"}
                          </span>
                        </td>
                        <td>
                          <span className="table-data">
                            ₹{doctor.price ? doctor.price : "N/A"}
                          </span>
                        </td>
                      </tr>
                    ))}
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

export default Doctors;
