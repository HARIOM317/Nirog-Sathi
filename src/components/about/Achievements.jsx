import React, { useState } from "react";
import achievementsAPI from "../../apis/achievementsAPI";
import "../../stylesheets/aboutStylesheets/Achievement.css";

const Achievements = () => {
  const [data] = useState(achievementsAPI);
  return (
    <>
      <section
        className="achievements"
        style={{ marginBottom: 100, marginTop: 100 }}
      >
        <div className="section-title text-center">
          <h2 className="text-uppercase">Our Achievements</h2>
          <p style={{color: 'var(--textLight)'}}>Here is the achievements of Nirog Sathi</p>
        </div>

        <div className="container" style={{ marginBottom: 50, marginTop: 50 }}>
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                {data.map((item) => {
                  return (
                    <>
                      <div
                        className="col-xl-4 col-lg-6 col-md-6 col-sm-12"
                        key={item.id}
                      >
                        <div className="achievement-card">
                          <div
                            className="achievement-img"
                            style={{ background: item.bgColor }}
                          >
                            <img src={item.img} alt="Achievement" />
                          </div>

                          <div className="about-achievement">
                            <h3 style={{ color: item.color }}>{item.title}</h3>
                            <small>{item.date}</small>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Achievements;
