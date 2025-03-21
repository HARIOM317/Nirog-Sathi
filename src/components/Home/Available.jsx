import React from "react";
import "../../stylesheets/homeStylesheets/AvailableFeatures.css";
import AvailableServiceContent from "./AvailableServiceContent";
import Lottie from "lottie-react";
import OurServices from "../../animations/services.json";


const Availabe = () => {
  return (
    <section className="container section-features">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-7 col-md-12">
            <div className="mb-4 section-title text-center">
              <h2 className="text-uppercase">Availabe Service</h2>
              <p style={{ color: "var(--textLight)" }}>
                These are the Services available in our Clinic/Hospital
              </p>
            </div>
            <AvailableServiceContent />
          </div>

          <div className="col-lg-5 col-md-12 features-img">
            <Lottie
              loop={true}
              animationData={OurServices}
              className="lottie-animation"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Availabe;
