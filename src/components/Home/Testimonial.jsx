import React from "react";
import "../../stylesheets/homeStylesheets/Testimonial.css";
import { useGetAllReviewsQuery } from "../../redux/api/reviewsApi";
import StarRatings from "react-star-ratings";
import { truncate } from "../../utils/truncate";
import { FaCheckDouble } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import Lottie from "lottie-react";
import Loading from "../../animations/loading.json";
import NoDataFound from "../../animations/no_data_found.json";
import SomethingWrong from "../../animations/something_wrong.json";
import userImg from "../../images/user.png";

const Testimonial = () => {
  const { data, isLoading, isError } = useGetAllReviewsQuery({});
  let content = null;
  if (!isLoading && !isError && data?.length > 0)
    content = (
      <>
        {data.slice(0, 10)?.map((item, key) => {
          return (
            <>
              <SwiperSlide key={item.id + key}>
                <div className="testimonial-content">
                  <div className="slide">
                    <img
                      src={item.patient.img ? item.patient.img : userImg}
                      alt=""
                      className="image"
                    />

                    <p>{truncate(item?.description, 100)}</p>

                    <i class="bx bxs-quote-alt-left quote-icon"></i>

                    <div className="details">
                      <span className="name">
                        {item?.patient?.firstName +
                          " " +
                          item?.patient?.lastName}
                      </span>

                      <span className="recommendation">
                        <FaCheckDouble /> Recommended
                      </span>

                      <StarRatings
                        rating={parseInt(item?.star)}
                        starRatedColor="#f4c150"
                        numberOfStars={5}
                        name="rating"
                        starDimension="16px"
                        starSpacing="4px"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </>
          );
        })}
      </>
    );
  return (
    <>
      <section className="container" style={{ marginTop: 80 }}>
        <div className="mb-4 section-title text-center">
          <h2>Testimonials</h2>
          <p style={{ color: "var(--textLight)" }}>
            What our users want to say
          </p>
        </div>

        <div className="testimonial-container ">
          {isLoading ? (
            <div className=" m-0 p-0 d-flex flex-column align-items-center justify-content-center">
              <Lottie
                loop={true}
                animationData={Loading}
                style={{ width: "300px" }}
              />
            </div>
          ) : !isLoading && isError ? (
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
          ) : !isLoading && !isError && data?.length === 0 ? (
            <div className=" m-0 p-0 d-flex align-items-center justify-content-center">
              <Lottie
                loop={true}
                animationData={NoDataFound}
                style={{ width: "300px" }}
              />
            </div>
          ) : (
            <div className="testimonial">
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                modules={[Autoplay, Navigation]}
                loop={true}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                navigation
                breakpoints={{
                  280: {
                    slidesPerView: 1,
                  },
                  992: {
                    slidesPerView: 1,
                  },
                }}
              >
                {content}
              </Swiper>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Testimonial;
