import React from "react";
import "./ProcessDesign.css";

const ProcessDesign = () => {
  return (
    <section className="container">
      <div className="design-process-container" style={{ marginTop: 80 }}>
        <div className="mb-5 section-title text-center">
          <h2>How to Book Appointment</h2>
        </div>

        <div className="steps">
          <div className="step step-a">
            <div className="mobile-step step-1">
              <div className="first-icon">
                <i class="fa-solid fa-user-doctor icon icon-1"></i>
              </div>
            </div>
            <h3>Choose the Doctor</h3>
            <p>Search the list of available doctors and select one suitable.</p>
          </div>

          <div className="step step-b">
            <div className="mobile-step step-2">
              <div className="second-icon">
                <i class="fa-solid fa-calendar icon icon-2"></i>
              </div>
            </div>
            <h3>Select Date and Time</h3>
            <p>Pick a convenient date and time that fits your schedule.</p>
          </div>

          <div className="step step-c">
            <div className="mobile-step step-3">
              <div className="third-icon">
                <i class="fa-solid fa-list icon icon-3"></i>
              </div>
            </div>
            <h3>Enter Your Details</h3>
            <p>Provide your contact information and additional details.</p>
          </div>

          <div className="step step-d">
            <div className="mobile-step step-4">
              <div className="forth-icon">
                <i class="fa-solid fa-check icon icon-4"></i>
              </div>
            </div>
            <h3>Confirm Appointment</h3>
            <p>Review your selection and confirm your appointment.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessDesign;
