import React, { useEffect, useState } from "react";
import "../../stylesheets/homeStylesheets/BookDoctor.css";
import { NavLink } from "react-router-dom";
import { useGetDoctorsQuery } from "../../redux/api/doctorApi";
import { FaRegBookmark } from "react-icons/fa";
import { useAddFavouriteMutation } from "../../redux/api/favouriteApi";
import { message, Tooltip } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { sliderSettings } from "../../utils/common";
import profileImage from "../../images/home/doctorProfile.jpg";
import StarRatings from "react-star-ratings";
import { Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { useGetDoctorReviewsQuery } from "../../redux/api/reviewsApi";

import Lottie from "lottie-react";
import Loading from "../../animations/loading.json";
import NoDataFound from "../../animations/no_data_found.json";
import SomethingWrong from "../../animations/something_wrong.json";
import ReactGA from "react-ga4";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BookDoctor = ({ category }) => {
  const { data, isError, isLoading } = useGetDoctorsQuery({});
  const doctors = data?.doctors || [];
  const token = localStorage.getItem("accessToken");

  // Filter the doctor list based on the selected category
  const filteredList = doctors.filter((item) =>
    category === "All" ? true : item.specialization === category
  );

  const [
    addFavourite,
    { isSuccess, isLoading: FIsLoading, isError: fIsError, error },
  ] = useAddFavouriteMutation();

  const handleAddFavourite = (id) => {
    addFavourite({ doctorId: id });
  };
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/",
      title: "Appointment Page Visit",
    });
  });
  useEffect(() => {
    if (!FIsLoading && fIsError) {
      message.error(error?.data?.message);
    }
    if (isSuccess) {
      message.success("Successfully Favourite Added!");
    }
  }, [isSuccess, fIsError, FIsLoading, error?.data?.message]);

  let content = null;

  if (isLoading)
    content = (
      <div className=" m-0 p-0 d-flex flex-column align-items-center justify-content-center">
        <Lottie
          loop={true}
          animationData={Loading}
          style={{ width: "300px" }}
        />
      </div>
    );

  if (!isLoading && isError)
    content = (
      <div className=" m-0 p-0 d-flex flex-column align-items-center justify-content-center">
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
  if (!isLoading && !isError && doctors.length === 0)
    content = (
      <div className=" m-0 p-0 d-flex flex-column align-items-center justify-content-center">
        <Lottie
          loop={true}
          animationData={NoDataFound}
          style={{ width: "300px" }}
        />
      </div>
    );
  if (!isLoading && !isError && doctors.length > 0)
    content = (
      <>
        {filteredList.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flexColCenter profile-card">
              <a
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                }}
                onClick={() => handleAddFavourite(item?.id)}
              >
                <Tooltip title="Add to Favorite">
                  <FaRegBookmark />
                </Tooltip>
              </a>

              <div className="image">
                <img
                  className="profile-img"
                  alt=""
                  src={item.img == null ? profileImage : item.img}
                />
              </div>

              <div className="text-data">
                <span className="name">
                  Dr. {item?.firstName + " " + item?.lastName}
                </span>
                <span className="job">
                  {item?.designation === null
                    ? item?.specialization
                    : item?.designation}
                </span>
              </div>

              <div className="actionBtn">
                <NavLink to={`/doctors/profile/${item?.id}`}>
                  View Profile
                </NavLink>
                <NavLink to={token ? `/booking/${item?.id}` : "/login"}>
                  Book Now
                </NavLink>
              </div>

              <div className="w-100 d-flex align-items-center justify-content-center">
                <StarRatings
                  rating={5}
                  starRatedColor="#ffba22"
                  numberOfStars={5}
                  name="rating"
                  className="star"
                  starDimension="20px"
                  starSpacing="5px"
                />
                <span className="d-inline-block text-secondary mt-2">(3)</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </>
    );

  return (
    <section className="our-doctors container">
      <div className="innerWidth">
        <Swiper
          {...sliderSettings}
          modules={[Pagination, Autoplay]}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
        >
          {content}
        </Swiper>
      </div>
    </section>
  );
};

export default BookDoctor;
