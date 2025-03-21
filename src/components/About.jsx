import React from "react";
import "../stylesheets/About.css";
import Header from "./Shared/Header/Header";
import Footer from "./Shared/Footer/Footer";
import SubHeader from "./Shared/SubHeader";
import { useGetDoctorsQuery } from "../redux/api/doctorApi";
import AboutUs from "./about/AboutUs";
import Achievements from "./about/Achievements";
import OurDoctors from "./Home/OurDoctors";
import doctorProfile from "../images/home/doctorProfile.jpg";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// import { Helmet } from "react-helmet";

import Lottie from "lottie-react";
import Loading from "../animations/loading.json";
import NoDataFound from "../animations/no_data_found.json";
import SomethingWrong from "../animations/something_wrong.json";

const About = () => {
  const {
    data: doctorData,
    isLoading: DoctorIsLoading,
    isError: doctorIsError,
  } = useGetDoctorsQuery({});

  const doctors = doctorData?.doctors;

  let doctorContent = null;
  if (DoctorIsLoading)
    doctorContent = (
      <>
        <div className=" m-0 p-0 d-flex align-items-center justify-content-center">
          <Lottie
            loop={true}
            animationData={Loading}
            style={{ width: "300px" }}
          />
        </div>
      </>
    );

  if (!DoctorIsLoading && doctorIsError)
    doctorContent = (
      <div className="m-0 p-0 d-flex flex-column align-items-center justify-content-center">
        <Lottie
          loop={true}
          animationData={SomethingWrong}
          style={{ width: "300px" }}
        />
        <div
          style={{
            color: "var(--headingColor)",
            fontWeight: "bold",
            fontSize: "1.3rem",
          }}
        >
          Something went wrong!
        </div>
      </div>
    );
  if (!DoctorIsLoading && !doctorIsError && doctors?.length === 0)
    doctorContent = (
      <div className=" m-0 p-0 d-flex align-items-center justify-content-center">
        <Lottie
          loop={true}
          animationData={NoDataFound}
          style={{ width: "300px" }}
        />
      </div>
    );
  if (!DoctorIsLoading && !doctorIsError && doctors?.length > 0)
    doctorContent = (
      <>
        <div className="top-specialist">
          <div className="container">
            <div className="row">
              {doctors &&
                doctors.map((item, id) => (
                  <div
                    className="col-12 col-lg-3 col-md-4 col-sm-6 text-center top-specialist-card"
                    key={id}
                  >
                    <img
                      src={item.img == null ? doctorProfile : item.img}
                      alt="Doctor"
                      className="img-fluid"
                      style={{ objectFit: "cover" }}
                    />
                    <h2>{item?.firstName + " " + item?.lastName}</h2>
                    <p>
                      {item?.designation === null
                        ? item?.specialization
                        : item?.designation}
                    </p>

                    <NavLink
                      to={`/doctors/profile/${item?.id}`}
                      className="card-btn"
                    >
                      {"View Details »"}
                    </NavLink>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Helmet>
        <title>About NirogSathi: Your Trusted Healthcare Partner</title>
        <meta
          name="description"
          content="Discover the journey, future goals, and key features of NirogSathi - your trusted platform for doctor appointments and healthcare solutions."
        />
        <meta
          name="keywords"
          content="About Nirog Sathi, Nirog Sathi journey, Nirog Sathi future goals, Nirog Sathi features, Doctor appointment platform, Healthcare solutions"
        />
        <link rel="canonical" href="https://nirogsathi.com/about" />
      </Helmet>

      <Header />
      <SubHeader
        title="about us"
        subtitle="Explore the Nirog Sathi team and our mission."
      />

      <AboutUs />
      {/* <Achievements /> */}
      <OurDoctors />

      {/* <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
        <div className="row">{doctorContent}</div>
      </div> */}

      <Footer />
    </>
  );
};

export default About;
