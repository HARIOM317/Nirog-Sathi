import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../stylesheets/homeStylesheets/HomePageHeader.css";
import doctorImg from "../../images/img/doctor2.webp";
import { useGetDoctorsQuery } from "../../redux/api/doctorApi";
import { useNavigate } from "react-router-dom";

const DoctorHeroSection = () => {
  const { data, isError, isLoading } = useGetDoctorsQuery({});
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  // Extract doctor names from the data
  const doctors = data?.doctors || [];

  console.log("Doctor = ", doctors);

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
          <div className="row" style={{ marginTop: 50 }}>
            <div className="col-12 col-lg-6 doctor-header-left-side order-lg-first order-last">
              <h1 className="nirog-sathi">
                Become a Digital Doctor with NirogSathi
              </h1>

              <p className="main-header-para">
                Experience the benefits of digital healthcare with NirogSathi,
                from improved patient engagement to efficient practice
                management and enhanced care delivery.
              </p>

              <div>
                <a href="#doctor-form" className="btn-get-started">
                  Join for free
                </a>
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

export default DoctorHeroSection;
