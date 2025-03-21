import React from "react";
import "../../stylesheets/DoctorHome/WhyUseNirogSathi.css";

const WhyUseNirogSathi = () => {
  return (
    <>
      <section className="announcements">
        <div className="section-title text-center">
          <h2>Top reasons to use Nirog Sathi</h2>
          <p style={{ color: "var(--textLight)" }}>
            There are so many reasons to prefer Nirog Sathi
          </p>
        </div>

        <div className="paddings innerWidth flexCenter announce-container">
          <div className="announceCard card1">
            <i class="bx bxs-network-chart icon1"></i>
            <h3>Get Professional Network</h3>
            <p>
              Expand your professional network and collaborate with other
              healthcare professionals seamlessly.
            </p>
          </div>
          <div className="announceCard card2">
            <i class="fa-solid fa-user-doctor icon2"></i>
            <h3>Build Online Reputation</h3>
            <p>
              Join us to enhance your online reputation, attract more patients,
              and grow your practice effectively.
            </p>
          </div>
          <div className="announceCard card3">
            <i class="fa-solid fa-handshake icon3"></i>
            <h3>Achieve More Together</h3>
            <p>
              Register to collaborate with peers, share knowledge, and achieve
              more together in the healthcare industry.
            </p>
          </div>
          <div className="announceCard card4">
            <i class="fa-solid fa-arrow-up-right-dots icon4"></i>
            <h3>Grow your own practice</h3>
            <p>
              Utilize our tools to grow your practice and reach a wider audience
              of patients.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyUseNirogSathi;
