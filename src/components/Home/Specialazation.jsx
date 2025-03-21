import React from "react";
import { specializationAssets } from "../../images/assets";
import "../../stylesheets/homeStylesheets/ClinicAndSpecialties.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

const Specialization = ({ category, setCategory }) => {
  return (
    <section
      className="container section-specialities position-relative"
      style={{ marginTop: 80 }}
    >
      <div className="container-fluid">
        <div className="mb-4 section-title text-center">
          <h2>Book Doctor</h2>
          <p style={{ color: "var(--textLight)" }}>
            Find your perfect doctor here. <br /> We have a wide range of
            doctors in various specialties and expertise levels.
          </p>
        </div>

        <div
          className="d-flex justify-content-center align-items-center gap-4 explore-menu-list"
          style={{ marginBottom: "0" }}
        >
          <Swiper
            spaceBetween={2}
            slidesPerView={3}
            modules={[Navigation, Autoplay]}
            loop={true}
            breakpoints={{
              280: {
                slidesPerView: 2,
              },
              440: {
                slidesPerView: 3,
              },
              560: {
                slidesPerView: 4,
              },
              992: {
                slidesPerView: 5,
              },
              1100: {
                slidesPerView: 6,
              },
              1300: {
                slidesPerView: 7,
              },
              1500: {
                slidesPerView: 8,
              },
            }}
          >
            {specializationAssets.map((item, index) => (
              <SwiperSlide key={item.title}>
                <div
                  onClick={() =>
                    setCategory((prev) =>
                      prev === item.specialization_name
                        ? "All"
                        : item.specialization_name
                    )
                  }
                  key={index}
                  className="speicality-item text-center"
                >
                  <div
                    className={
                      category === item.specialization_name
                        ? "active speicality-img"
                        : "speicality-img"
                    }
                  >
                    <img
                      src={item.specialization_image}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <p
                    className={
                      category === item.specialization_name ? "active-text" : ""
                    }
                  >
                    {item.specialization_name}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Specialization;
