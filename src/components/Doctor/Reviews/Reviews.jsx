import React from "react";
import "../../../stylesheets/doctorStylesheets/Reviews.css";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import img from "../../../images/user.png";
import { useGetDoctorReviewsQuery } from "../../../redux/api/reviewsApi";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import moment from "moment";
import StarRatings from "react-star-ratings";
import useAuthCheck from "../../../redux/hooks/useAuthCheck";

import Lottie from "lottie-react";
import Loading from "../../../animations/loading.json";
import NoDataFound from "../../../animations/no_data_found.json";
import SomethingWrong from "../../../animations/something_wrong.json";

const Reviews = () => {
  const { data: loginInfo } = useAuthCheck();
  const { data, isError, isLoading } = useGetDoctorReviewsQuery(loginInfo?.id);

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

  if (!isLoading && !isError && data?.length === 0)
    content = (
      <div className="m-0 p-0 d-flex flex-column align-items-center justify-content-center">
        <Lottie
          loop={true}
          animationData={NoDataFound}
          style={{
            width: "300px",
          }}
        />
      </div>
    );

  if (!isLoading && !isError && data?.length > 0)
    content = (
      <>
        {data &&
          data.map((item, key) => (
            <div className="review" key={item?.id + key}>
              <div className="review-bar">
                <div className="d-flex gap-4">
                  <div className="review-img">
                    <img alt="" src={item?.patient?.img ? item?.patient?.img : img} />
                  </div>
                  <div>
                    <h5 className="text-nowrap">
                      {item?.patient?.firstName + " " + item?.patient?.lastName}
                    </h5>
                    <p
                      className={
                        item?.isRecommended ? "text-success" : "text-danger"
                      }
                    >
                      {item?.isRecommended ? (
                        <FaRegThumbsUp />
                      ) : (
                        <FaRegThumbsDown />
                      )}{" "}
                      {item?.isRecommended
                        ? "I recommend the doctor"
                        : "I do not recommend the doctor"}
                    </p>
                  </div>
                </div>

                <div className="star-rating">
                  <div>
                    <StarRatings
                      rating={5}
                      starRatedColor="#f4c150"
                      numberOfStars={5}
                      name="rating"
                      starDimension="15px"
                      starSpacing="2px"
                    />
                  </div>
                  <div className="">
                    Reviewed{" "}
                    {moment(item?.createdAt)
                      .startOf("day")
                      .fromNow()}
                  </div>
                </div>
              </div>
              <div>
                <p className="form-text">
                  <strong>
                    Dr. {item?.doctor?.firstName + " " + item?.doctor?.lastName}
                  </strong>{" "}
                  {item?.description}
                </p>
              </div>
            </div>
          ))}
      </>
    );
  return (
    <DashboardLayout>
      <div className="w-100 mb-3 rounded py-3 px-2">{content}</div>
    </DashboardLayout>
  );
};

export default Reviews;
