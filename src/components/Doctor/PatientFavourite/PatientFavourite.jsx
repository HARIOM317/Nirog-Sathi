import { NavLink } from "react-router-dom";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import {
  useGetFavouriteQuery,
  useRemoveFavouriteMutation,
} from "../../../redux/api/favouriteApi";
import { useEffect } from "react";
import { message, Tooltip } from "antd";
import { FaBookmark } from "react-icons/fa";
import "../../../stylesheets/doctorStylesheets/PatientFavorite.css";
import profileImage from "../../../images/home/doctorProfile.jpg";

import Lottie from "lottie-react";
import Loading from "../../../animations/loading.json";
import NoDataFound from "../../../animations/no_data_found.json";
import SomethingWrong from "../../../animations/something_wrong.json";

const PatientFavouriteDoctor = () => {
  const { data, isLoading, isError } = useGetFavouriteQuery();
  const [
    removeFavourite,
    { isLoading: FIsLoading, isError: fIsError, error: fError, isSuccess },
  ] = useRemoveFavouriteMutation();

  const handleRemoveFavourite = (id) => {
    removeFavourite({ doctorId: id });
  };

  useEffect(() => {
    if (!FIsLoading && fIsError) {
      message.error(fError?.data?.message);
    }
    if (isSuccess) {
      message.success("Successfully Favourite Removed");
    }
  }, [isSuccess, fIsError]);

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
          data?.map((item) => (
            <div className="favorite-doctor col-xl-4 col-lg-6 col-md-12 col-sm-12">
              <div className="flexColCenter profile-card">
                <a
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                  }}
                  onClick={() => handleRemoveFavourite(item?.doctor?.id)}
                >
                  <Tooltip title="Remove from Favorite">
                    <FaBookmark />
                  </Tooltip>
                </a>

                <div className="image">
                  <img
                    className="profile-img"
                    alt=""
                    src={
                      item?.doctor?.img == null
                        ? profileImage
                        : item?.doctor?.img
                    }
                  />
                </div>

                <div className="text-data">
                  <span className="name">
                    {item?.doctor?.firstName + " " + item?.doctor?.lastName}
                  </span>
                  <span className="job">
                    {item?.doctor?.designation === null
                      ? item?.doctor?.specialization
                      : item?.doctor?.designation}
                  </span>
                  <p className="form-text">
                    {item?.doctor?.degree} {item?.doctor?.degree ? "," : ""}{" "}
                    {item?.doctor?.college}
                  </p>
                </div>

                <div className="actionBtn">
                  <NavLink to={`/doctors/profile/${item?.doctor?.id}`}>
                    View Profile
                  </NavLink>
                  <NavLink to={`/booking/${item?.doctor?.id}`}>
                    Book Now
                  </NavLink>
                </div>

                {/* <div className="w-100 d-flex align-items-center justify-content-center">
                  <StarRatings
                    rating={5}
                    starRatedColor="#ffba22"
                    numberOfStars={5}
                    name="rating"
                    className="star"
                    starDimension="20px"
                    starSpacing="5px"
                  />
                  <span className="d-inline-block text-secondary mt-2">
                    ()
                  </span>
                </div> */}
              </div>
            </div>
          ))}
      </>
    );
  return (
    <DashboardLayout>
      <h5 className="text-title mb-2 mt-3">My Favorite Doctors</h5>
      <div className="row">{content}</div>
    </DashboardLayout>
  );
};

export default PatientFavouriteDoctor;
