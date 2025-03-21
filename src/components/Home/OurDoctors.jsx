import "../../stylesheets/homeStylesheets/OurDoctor.css";
import { useGetDoctorsQuery } from "../../redux/api/doctorApi";
import { NavLink } from "react-router-dom";
import profileImage from "../../images/home/doctorProfile.jpg";
import Lottie from "lottie-react";
import Loading from "../../animations/loading.json";
import NoDataFound from "../../animations/no_data_found.json";
import SomethingWrong from "../../animations/something_wrong.json";

const OurDoctors = () => {
  const { data, isLoading, isError } = useGetDoctorsQuery({ limit: 4 });
  const doctors = data?.doctors;

  let content = null;

  if (isLoading)
    content = (
      <div className="m-0 p-0 d-flex flex-column align-items-center justify-content-center">
        <Lottie
          loop={true}
          animationData={Loading}
          style={{ width: "300px" }}
        />
      </div>
    );

  if (!isLoading && isError)
    content = (
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

  if (!isLoading && !isError && doctors?.length === 0)
    content = (
      <div className="m-0 p-0 d-flex flex-column align-items-center justify-content-center">
        <Lottie
          loop={true}
          animationData={NoDataFound}
          style={{ width: "300px" }}
        />
      </div>
    );

  if (!isLoading && !isError && doctors?.length > 0)
    content = (
      <>
        {doctors &&
          doctors?.map((item, key) => (
            <div className="col-lg-6 mt-3" key={key + 2}>
              <div className="member">
                <div className="pic">
                  <img
                    src={item.img == null ? profileImage : item.img}
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="member-info">
                  <h4>Dr. {item?.firstName + " " + item?.lastName}</h4>
                  <span>
                    {item?.designation === null
                      ? item?.specialization
                      : item?.designation}
                  </span>

                  {/* <div className="social">
                    <NavLink
                      to={item?.linkedin}
                      style={{ background: "#0a63bc" }}
                      target="_blank"
                      className="icon"
                    >
                      <i className="bx bxl-linkedin"></i>
                    </NavLink>
                    <NavLink
                      to={item?.facebook}
                      style={{ background: "#3b5998" }}
                      target="_blank"
                      className="icon"
                    >
                      <i className="bx bxl-facebook"></i>
                    </NavLink>
                    <NavLink
                      to={item?.instagram}
                      style={{ background: "#db1c8a" }}
                      target="_blank"
                      className="icon"
                    >
                      <i className="bx bxl-instagram"></i>
                    </NavLink>
                    <NavLink
                      to={item?.twitter}
                      style={{ background: "#03a9f4" }}
                      target="_blank"
                      className="icon"
                    >
                      <i className="bx bxl-twitter"></i>
                    </NavLink>
                  </div> */}

                  <div className="details">
                    <NavLink
                      to={`/doctors/profile/${item?.id}`}
                      className="card-btn"
                    >
                      {"View Details »"}
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </>
    );
  return (
    <section id="doctors" className="doctors" style={{ marginTop: 100 }}>
      <div className="container">
        <div className="section-title text-center mb-3">
          <h2>Meet Our Specialist</h2>
          <p style={{ color: "var(--textLight)" }}>
            Our professional doctors who are dedicated to providing the best
            possible care for our clients.
          </p>
        </div>

        <div className="row">{content}</div>
      </div>
    </section>
  );
};

export default OurDoctors;
