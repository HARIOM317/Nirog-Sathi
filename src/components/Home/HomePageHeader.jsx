import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import "../../stylesheets/homeStylesheets/HomePageHeader.css";
import doctorImg from "../../images/img/doctor.webp";
import { useGetDoctorsQuery } from "../../redux/api/doctorApi";
import { useNavigate } from "react-router-dom";

import SearchBar from "../SearchBar";

const HomePageHeader = () => {
  const { data, isError, isLoading } = useGetDoctorsQuery({});
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const doctors = data?.doctors || [];

  const combinedList = [
    ...new Set(doctors.map((doctor) => `${doctor.fullName}`)),
    ...new Set(doctors.map((doctor) => `${doctor.clinicName}`)),
    ...new Set(doctors.map((doctor) => `${doctor.specialization}`)),
    ...new Set(doctors.map((doctor) => `${doctor.designation}`)),
    ...new Set(doctors.map((doctor) => `${doctor.city}`)),
  ];

  const handleSearch = (value) => {
    setOptions(
      !value
        ? []
        : Array.from(
            new Set(
              combinedList.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase())
              )
            )
          ).map((item) => ({ value: item }))
    );
  };

  const handleSearchSubmit = (value) => {
    navigate(`/doctors?search=${value}`);
  };

  return (
    <>
      <section className="homepage">
        <div className="container main-header-container">
          <div className="search-bar-container">
            <SearchBar
              handleSearch={handleSearch}
              options={options}
              onSearch={handleSearchSubmit}
            />
          </div>

          <div className="row" style={{ marginTop: 50 }}>
            <div className="col-12 col-lg-6 header-left-side order-lg-first order-last">
              <h1 className="nirog-sathi">
                Your Trusted Partner in Healthcare
              </h1>

              <p className="main-header-para">
                Experience hassle-free appointments, digital records, and
                continuous care with our user-friendly platform.
              </p>

              <div>
                <NavLink
                  to={token ? "/doctors" : "/login"}
                  className="btn-get-started"
                >
                  Book an Appointment
                </NavLink>
              </div>
            </div>

            {/* Main Header Right Side */}
            <div className="col-12 col-lg-6 header-right-side main-header-section-images order-md-first order-sm-first d-flex align-items-center justify-content-center">
              <div>
                <img
                  src={doctorImg}
                  alt="Doctor"
                  style={{ width: "100%", zIndex: "1" }}
                />
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePageHeader;
