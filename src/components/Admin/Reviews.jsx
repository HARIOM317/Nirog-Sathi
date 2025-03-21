import React, { useState, useEffect } from "react";
import DashboardLayout from "../Doctor/DashboardLayout/DashboardLayout";
import userImg from "../../images/user.png";
import doctorImg from "../../images/home/doctorProfile.jpg";
import { Rate } from "antd";
import { getFromLocalStorage } from "../../utils/local-storage";
import "../../stylesheets/adminStylesheets/Appointments.css";
import { getBaseUrl } from "../../helpers/config/envConfig";


const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const authorizationToken = getFromLocalStorage("accessToken");
  const URL = `${getBaseUrl()}/review/`;
  
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setReviews(data.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="row my-3">
        <div className="col-md-12">
          <div className="card card-table">
            <div className="card-header table-top-heading">
              <h4 className="card-title">Reviews</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover table-center mb-0">
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1.5px solid var(--borderColor)",
                      }}
                    >
                      <th>Doctor</th>
                      <th>Patient</th>
                      <th>Description</th>
                      <th>Recommended</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((review) => (
                      <tr
                        key={review.id}
                        className="table-row"
                      >
                        <td>
                          {review.doctor && (
                            <div className="d-flex align-items-center">
                              <img
                                className="avatar-img rounded-circle mr-2"
                                src={
                                  review.doctor.img
                                    ? review.doctor.img
                                    : doctorImg
                                }
                                alt=""
                                style={{
                                  maxWidth: "30px",
                                  maxHeight: "30px",
                                  minWidth: "30px",
                                  minHeight: "30px",
                                  marginRight: "10px",
                                  objectFit: "cover",
                                }}
                              />
                              <span className="table-data">
                                {review.doctor.firstName}{" "}
                                {review.doctor.lastName}
                              </span>
                            </div>
                          )}
                        </td>
                        <td>
                          {review.patient && (
                            <div className="d-flex align-items-center">
                              <img
                                className="avatar-img rounded-circle mr-2"
                                src={
                                  review.patient.img
                                    ? review.patient.img
                                    : userImg
                                }
                                alt=""
                                style={{
                                  maxWidth: "30px",
                                  maxHeight: "30px",
                                  minWidth: "30px",
                                  minHeight: "30px",
                                  marginRight: "10px",
                                  objectFit: "cover",
                                }}
                              />
                              <span className="table-data">
                                {review.patient.firstName}{" "}
                                {review.patient.lastName}
                              </span>
                            </div>
                          )}
                        </td>
                        <td>
                          <span className="table-data">
                            {review.description}
                          </span>
                        </td>
                        <td>
                          <span className="table-data">
                            {review.isRecommended ? "Yes" : "No"}
                          </span>
                        </td>
                        <td>
                          <span className="table-data">
                            <Rate
                              disabled
                              defaultValue={parseInt(review.star)}
                              style={{
                                color:
                                  parseInt(review.star) <= 2
                                    ? "#ec1839"
                                    : parseInt(review.star) > 2 &&
                                      parseInt(review.star) <= 4
                                    ? "#ffbb00"
                                    : "#eb9400",
                              }}
                            />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reviews;
