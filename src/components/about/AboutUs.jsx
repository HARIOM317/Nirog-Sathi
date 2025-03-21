import React, { useState } from "react";
import { aboutDocApointData, whyToChooseDocApoint } from "../../apis/aboutDataAPI";
import "../../stylesheets/aboutStylesheets/AboutUs.css";

const AboutUs = () => {
  const [aboutData] = useState(aboutDocApointData);
  const [aboutData2] = useState(whyToChooseDocApoint);

  return (
    <>
      <section className="about" id="about" style={{ marginTop: "4rem" }}>
        <div className="container">
          <div className="row">
            <div className="about-content pad-15">
              <div className="row">
                <div className="about-text text-section pad-15">
                  <h3>
                    Welcome to <span>Nirog Sathi</span>, your trusted healthcare
                    companion
                  </h3>
                  <p>
                    Our mission is to make quality healthcare affordable and accessible. We believe in providing valuable healthcare information and easy-to-use solutions, ensuring everyone can access quality healthcare.
                  </p>
                </div>
              </div>

              <div className="row">
                {/* First Card */}
                <div className="about-card pad-15">
                  <h3 className="title">About Nirog Sathi</h3>
                  <div className="row">
                    <div className="timeline-box pad-15">
                      <div className="timeline">
                        {/* Timeline Items */}
                        {aboutData.map((element) => {
                          const { id, title, description } = element;
                          return (
                            <>
                              <div className="timeline-item" key={id}>
                                <div className="circle-dot"></div>
                                <h4 className="timeline-title">{title}</h4>
                                <p className="timeline-text">{description}</p>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Second Card */}
                <div className="about-card pad-15">
                  <h3 className="title">Why Choose Us?</h3>
                  <div className="row">
                    <div className="timeline-box pad-15">
                      <div className="timeline shadow-dark">
                        {/* Timeline Items */}
                        {aboutData2.map((element) => {
                          const { id, title, description } = element;
                          return (
                            <>
                              <div className="timeline-item" key={id}>
                                <div className="circle-dot"></div>
                                <h4 className="timeline-title">{title}</h4>
                                <p className="timeline-text">{description}</p>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
