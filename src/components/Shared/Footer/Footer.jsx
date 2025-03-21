import React from "react";
import "../../../stylesheets/Footer.css";
import { NavLink } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";
import useAuthCheck from "../../../redux/hooks/useAuthCheck";

const Footer = () => {
  const { role } = useAuthCheck();

  return (
    <>
      <footer id="footer">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="row">
                {/* First Column */}
                {role === "patient" ? (
                  <div className="col-6 col-lg-3">
                    <h2>Nirog Sathi</h2>
                    <ul>
                      <li>
                        <NavLink to="/">
                          <FaAngleDoubleRight className="icon" /> Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/about">
                          <FaAngleDoubleRight className="icon" /> About
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/service">
                          <FaAngleDoubleRight className="icon" /> Services
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/doctors">
                          <FaAngleDoubleRight className="icon" /> Doctors
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/contact">
                          <FaAngleDoubleRight className="icon" /> Contact
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/blog">
                          <FaAngleDoubleRight className="icon" /> Blog
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                ) : role === "doctor" ? (
                  <div className="col-6 col-lg-3">
                    <h2>Nirog Sathi</h2>
                    <ul>
                      <li>
                        <NavLink to="/">
                          <FaAngleDoubleRight className="icon" /> Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/about">
                          <FaAngleDoubleRight className="icon" /> About
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/service">
                          <FaAngleDoubleRight className="icon" /> Services
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/contact">
                          <FaAngleDoubleRight className="icon" /> Contact
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/blog">
                          <FaAngleDoubleRight className="icon" /> Blog
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                ) : role === "admin" ? (
                  <div className="col-6 col-lg-3">
                    <h2>Nirog Sathi</h2>
                    <ul>
                      <li>
                        <NavLink to="/">
                          <FaAngleDoubleRight className="icon" /> Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/about">
                          <FaAngleDoubleRight className="icon" /> About
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/service">
                          <FaAngleDoubleRight className="icon" /> Services
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/contact">
                          <FaAngleDoubleRight className="icon" /> Contact
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/blog">
                          <FaAngleDoubleRight className="icon" /> Blog
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="col-6 col-lg-3">
                    <h2>Nirog Sathi</h2>
                    <ul>
                      <li>
                        <NavLink to="/">
                          <FaAngleDoubleRight className="icon" /> Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/about">
                          <FaAngleDoubleRight className="icon" /> About
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/service">
                          <FaAngleDoubleRight className="icon" /> Services
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/contact">
                          <FaAngleDoubleRight className="icon" /> Contact
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/blog">
                          <FaAngleDoubleRight className="icon" /> Blog
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}

                {/* Second Column */}
                {role === "patient" ? (
                  <div className="col-6 col-lg-3">
                    <h2>Dashboard</h2>
                    <ul>
                      <li>
                        <NavLink to={"/dashboard"}>
                          <FaAngleDoubleRight className="icon" /> View all
                          Appointments
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/favourite">
                          <FaAngleDoubleRight className="icon" /> Favorite
                          Doctors
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/dashboard/profile-setting"}>
                          <FaAngleDoubleRight className="icon" /> Profile
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                ) : role === "doctor" ? (
                  <div className="col-6 col-lg-3">
                    <h2>Dashboard</h2>
                    <ul>
                      <li>
                        <NavLink to={"/dashboard"}>
                          <FaAngleDoubleRight className="icon" /> Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/dashboard/appointments"}>
                          <FaAngleDoubleRight className="icon" /> Appointments
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/my-patients">
                          <FaAngleDoubleRight className="icon" /> Patients
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/dashboard/schedule"}>
                          <FaAngleDoubleRight className="icon" /> Schedule Time
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/dashboard/blogs/create"}>
                          <FaAngleDoubleRight className="icon" /> Write a Blog
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/profile-setting">
                          <FaAngleDoubleRight className="icon" /> Profile
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                ) : role === "admin" ? (
                  <div className="col-6 col-lg-3">
                    <h2>Dashboard</h2>
                    <ul>
                      <li>
                        <NavLink to={"/admin/dashboard"}>
                          <FaAngleDoubleRight className="icon" /> Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/admin/addDoctor"}>
                          <FaAngleDoubleRight className="icon" /> Add Doctor
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/admin/emergency">
                          <FaAngleDoubleRight className="icon" /> Emergency
                          Appointments
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/admin/appointments"}>
                          <FaAngleDoubleRight className="icon" /> Appointments
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/admin/doctors"}>
                          <FaAngleDoubleRight className="icon" /> Doctors
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/admin/prescription">
                          <FaAngleDoubleRight className="icon" /> Prescriptions
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/admin/reviews"}>
                          <FaAngleDoubleRight className="icon" /> Patient
                          Reviews
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="col-6 col-lg-3">
                    <h2>User</h2>
                    <ul>
                      <li>
                        <NavLink to={"/login"}>
                          <FaAngleDoubleRight className="icon" /> Search for
                          Doctor
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/login">
                          <FaAngleDoubleRight className="icon" /> Book
                          Appointment
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/track-appointment"}>
                          <FaAngleDoubleRight className="icon" /> Track
                          Appointment
                        </NavLink>
                      </li>
                      <li>
                        <a href="#faq">
                          <FaAngleDoubleRight className="icon" /> FAQs
                        </a>
                      </li>
                    </ul>
                  </div>
                )}

                {/* Third Column */}
                <div className="col-6 col-lg-3">
                  <h2>Contact</h2>
                  <ul>
                    <li>
                      <NavLink to="/" className="contact-link">
                        <span className="contact-icon">
                          <i class="fa-solid fa-phone"></i>
                        </span>{" "}
                        +91 12345 54321
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="mailto:nirogsathi@gmail.com"
                        className="contact-link"
                      >
                        <span className="contact-icon">
                          <i class="fa-solid fa-envelope"></i>
                        </span>{" "}
                        nirogsathi@gmail.com
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/" target="_blank" className="contact-link">
                        <span className="contact-icon">
                          <i class="fa-solid fa-location-dot"></i>
                        </span>{" "}
                        Address, City, Pin
                      </NavLink>
                    </li>
                  </ul>
                </div>

                {/* Forth Column */}
                <div className="col-6 col-lg-3">
                  <h2>Social</h2>
                  <div className="social-media-buttons">
                    <NavLink
                      to="/"
                      style={{ background: "#0a63bc" }}
                      className="link"
                      target="_blank"
                    >
                      <i className="bx bxl-linkedin"></i>
                    </NavLink>
                    <NavLink
                      to="/"
                      style={{ background: "#3b5998" }}
                      className="link"
                      target="_blank"
                    >
                      <i className="bx bxl-facebook"></i>
                    </NavLink>
                    <NavLink
                      to="/"
                      style={{ background: "#db1c8a" }}
                      className="link"
                      target="_blank"
                    >
                      <i className="bx bxl-instagram"></i>
                    </NavLink>
                    <NavLink
                      to="/"
                      style={{ background: "#03a9f4" }}
                      className="link"
                      target="_blank"
                    >
                      <i className="bx bxl-twitter"></i>
                    </NavLink>
                  </div>
                </div>
              </div>

              <hr />

              <div className="mt-4 flexRowSpaceBetween mb-3">
                <p className="copyright">
                  © Copyright Nirog Sathi-2024. All rights reserved.
                </p>

                <div className="policy">
                  <NavLink to="/" className="termsLinks">
                    Privacy Policy
                  </NavLink>
                  <NavLink to="/" className="termsLinks">
                    Term of Service
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
