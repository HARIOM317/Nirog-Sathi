import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "../../../stylesheets/doctorStylesheets/Overview.css";

import Lottie from "lottie-react";
import NoDataFound from "../../../animations/no_data_found.json";

const OverView = ({ data }) => {
  const services = data?.services?.split(",");

  const doctorDetailsApi = [
    {
      id: 1,
      icon: "fa-solid fa-graduation-cap",
      about: "Education",
      title: data?.degree ? data?.degree + " - " + data?.completionYear : "Education Not Available",
      description: data?.college,
    },
    {
      id: 2,
      icon: "fa-solid fa-user-doctor",
      about: "Experience",
      title:
        data?.designation ? data?.designation +
        " (" +
        data?.experienceStart +
        " - " +
        data?.experienceEnd +
        " )" : "Work Experience Not Available",
      description: data?.experienceHospitalName,
    },

    {
      id: 3,
      icon: "fa-solid fa-award",
      about: "Award",
      title: data?.awardYear ? data?.awardYear : "No Any Award Yet",
      description: data?.award,
    },
  ];

  return (
    <div className="col-md-12 col-lg-12">
      <div className="mb-5">
        <h5 className="overview-text">About Me</h5>
        <p className="text-secondary">{data?.biography}</p>
      </div>

      <div>
        <h5 className="overview-text">Details</h5>

        <VerticalTimeline lineColor="var(--textLight)">
          {doctorDetailsApi.map((item) => {
            return (
              <VerticalTimelineElement
                iconStyle={{
                  background: "var(--primaryColor)",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.25rem",
                }}
                icon={<i className={item.icon}></i>}
                date={item.about}
              >
                <h3 className="timeline-heading">{item.title}</h3>
                <p className="timeline-description">{item.description}</p>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </div>

      <div className="row mt-5">
        <h5 className="overview-text">Services and Specialization</h5>
        {services ? (
          services?.map((item, id) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={id + 51}>
              <div className="doctor-service-card">{item}</div>
            </div>
          ))
        ) : (
          <div className=" m-0 p-0 d-flex flex-column align-items-center justify-content-center">
            <Lottie
              loop={true}
              animationData={NoDataFound}
              style={{ width: "300px" }}
            />

            <h5 style={{color: "var(--textLight)", fontSize: '1rem', fontWeight: 'bold', textAlign: 'center', marginTop: '1rem'}}>No Services and Specialization Found!</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverView;
