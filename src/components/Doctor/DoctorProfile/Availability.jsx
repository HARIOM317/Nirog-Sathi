import React from "react";
import "../../../stylesheets/doctorStylesheets/Availability.css";

const Availability = () => {
  return (
    <section>
      <div className="paddings innerWidth flexCenter availability">
        <div className="availabilityCard">
          <i class="fa-regular fa-clock"></i>
          <h3>Sunday</h3>
          <span>07:00 AM - 09:00 PM</span>
        </div>

        <div className="availabilityCard">
          <i class="fa-regular fa-clock"></i>
          <h3>Monday</h3>
          <span>07:00 AM - 09:00 PM</span>
        </div>

        <div className="availabilityCard">
          <i class="fa-regular fa-clock"></i>
          <h3>Tuesday</h3>
          <span>07:00 AM - 09:00 PM</span>
        </div>

        <div className="availabilityCard">
          <i class="fa-regular fa-clock"></i>
          <h3>Wednesday</h3>
          <span>07:00 AM - 09:00 PM</span>
        </div>

        <div className="availabilityCard">
          <i class="fa-regular fa-clock"></i>
          <h3>Thursday</h3>
          <span>07:00 AM - 09:00 PM</span>
        </div>

        <div className="availabilityCard">
          <i class="fa-regular fa-clock"></i>
          <h3>Friday</h3>
          <span>07:00 AM - 09:00 PM</span>
        </div>

        <div className="availabilityCard">
          <i class="fa-regular fa-clock"></i>
          <h3>Saturday</h3>
          <span>07:00 AM - 09:00 PM</span>
        </div>
      </div>
    </section>
  );
};

export default Availability;
