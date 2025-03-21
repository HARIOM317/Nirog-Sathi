import React from "react";
import "../../../stylesheets/doctorStylesheets/Location.css";
const Location = ({ data }) => {

  return (
    <section className="mt-3">
      <div className="row">
        <div className="col-lg-6 co-md-12">
          <div className="location-card">
            <div className="icon">
              <i class="fa-solid fa-map-location-dot"></i>
            </div>

            <h4 className="clinic-name">{data?.clinicName ? data?.clinicName : "Clinic Name Not Found"}</h4>

            <div className="specialization">{data?.specialization ? data?.specialization : "Specialization Not Found"}</div>

            <div className="clinic-address text-center">
              <i className="fas fa-map-marker-alt"></i>
              {data?.clinicAddress ? data?.clinicAddress : "Clinic Address Not Available"}
            </div>
          </div>
        </div>

        <div className="col-lg-6 co-md-12">
          <div className="location-card">
            <div className="icon">
              <i class="fa-solid fa-map-location-dot"></i>
            </div>

            <h4 className="clinic-name">
              Dr. {data?.firstName + " " + data?.lastName}
            </h4>

            <div className="specialization">{data?.specialization ? data?.specialization : "Specialization Not Found"}</div>

            <div className="clinic-address text-center">
              <i className="fas fa-map-marker-alt"></i>
              {data?.address ? data?.address +
                ", " +
                data?.city +
                ", " +
                data?.postalCode +
                ", " +
                data?.state +
                ", (" +
                data?.country +
                ")" : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
