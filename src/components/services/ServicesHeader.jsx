import React, { useState } from "react";
import ServiceHeaderAPI from "../../apis/ServiceHeaderAPI";
import "../../stylesheets/serviceStylesheets/ServicesHeader.css";

const ServicesHeader = () => {
  const [working] = useState(ServiceHeaderAPI);

  return (
    <>
      <section className="service-header">
        <div className="service-container container">
          <h1 className="main-heading text-center">Platform Services</h1>
          <div className="row">
            {working.map((currentElement) => {
              const { id, logo, title, info } = currentElement;
              return (
                <>
                  <div
                    className="col-12 col-lg-4 text-center service-container-sub-div"
                    key={id}
                  >
                    <i class={`font-awesome-style ${logo}`}></i>
                    <h2 className="sub-heading">{title}</h2>
                    <p className="paragraph">{info}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesHeader;
