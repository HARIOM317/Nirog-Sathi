import React, { useState } from "react";
import customerSupportAPI from "../../apis/customerSupportAPI";
import useTipsAPI from "../../apis/useTipsAPI";
import HowToUseImage from "../../images/home/how-to-use.jpg";
import CallCenterImage from "../../images/home/call-center.jpg";
import "../../stylesheets/About.css";
import useAuthCheck from "../../redux/hooks/useAuthCheck";
import { useNavigate } from "react-router-dom";

const HowToUse = () => {
  const [howToUseData] = useState(useTipsAPI);
  const [customerSupportData] = useState(customerSupportAPI);
  const { role } = useAuthCheck();

    const navigate = useNavigate();


  return (
    <>
      {/* First Part */}
      {role === "doctor" ? null : (
        <section className="common-section our-services">
          <div className="mb-5 section-title text-center">
            <h2>How to Book Appointment</h2>
            <p style={{ color: "var(--textLight)" }}>
              Here is the steps to book appointment
            </p>
          </div>
          <div className="container mb-5">
            <div className="row">
              <div className="col-12 col-lg-4 text-center">
                <img src={HowToUseImage} alt="How To Use Nirog Sathi" />
              </div>

              <div className="col-12 col-lg-8 our-services-list">
                {howToUseData.map((element) => {
                  const { id, title, info } = element;
                  return (
                    <>
                      <div className="row our-services-info" key={id}>
                        <div className="col-1 our-services-number">{id}</div>
                        <div className="col-10 our-services-data">
                          <h2 className="sub-heading">{title}</h2>
                          <p className="para">{info}</p>
                        </div>
                      </div>
                    </>
                  );
                })}

                <br />
                <button
                  className="btn-style btn-style-border"
                  onClick={() => navigate("/doctors")}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Second Part */}
      <section className="common-section our-services our-services-right-side">
        <div className="mb-5 section-title text-center">
          <h2>Customer Support</h2>
          <p className="m-0">World class support is available 24/7</p>
        </div>
        <div className="container mb-5">
          <div className="row">
            <div className="col-12 col-lg-8 our-services-right-side-content d-flex justify-content-center align-items-start flex-column order-lg-first order-last">
              {customerSupportData.map((element) => {
                const { id, title, info } = element;
                return (
                  <>
                    <div className="row our-services-info" key={id}>
                      <div className="col-1 our-services-number">{id}</div>
                      <div className="col-10 our-services-data">
                        <h2 className="sub-heading">{title}</h2>
                        <p className="para">{info}</p>
                      </div>
                    </div>
                  </>
                );
              })}

              <br />
              <button
                className="btn-style btn-style-border"
                onClick={() => navigate("/contact")}
              >
                Contact Now
              </button>
            </div>

            <div className="col-12 col-lg-4 text-center our-service-right-side-img order-md-first order-sm-first">
              <img src={CallCenterImage} alt="Customer Support" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowToUse;
