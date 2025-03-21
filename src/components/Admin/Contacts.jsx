import React, { useState, useEffect } from "react";
import DashboardLayout from "../Doctor/DashboardLayout/DashboardLayout";
// import { useGetAllContactUsQuery } from "../../redux/api/contactApi";
import { getFromLocalStorage } from "../../utils/local-storage";
import { FaTrash } from "react-icons/fa";
import { message } from "antd";
import "../../stylesheets/adminStylesheets/Appointments.css";
import { getBaseUrl } from "../../helpers/config/envConfig";


const AdminContacts = () => {
  // const { data, isLoading, isError } = useGetAllContactUsQuery();

  // console.log(data)


  const [reviews, setReviews] = useState([]);
  const authorizationToken = getFromLocalStorage("accessToken");
  const URL = `${getBaseUrl()}/contact/`;


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
      console.error("Error fetching contacts:", error);
    }
  };

  const deleteReview = async (id) => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        // Remove the deleted review from the state
        setReviews(reviews.filter((review) => review.id !== id));
        message.success("Contact deleted successfully");
      } else {
        message.error("Error deleting contact: " + response.status);
      }
    } catch (error) {
      message.error("Error deleting contact: " + error.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="row my-3">
        <div className="col-md-12">
          <div className="card card-table table-top-heading">
            <div className="card-header table-top-heading">
              <h4 className="card-title">Contacts</h4>
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
                      <th>Email</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Subject</th>
                      <th>Text</th>
                      <th>Action</th>{" "}
                    </tr>
                  </thead>
                  <tbody>
                    {reviews && reviews.map((review) => (
                      <tr key={review?.id ? review?.id : ""} className="table-row">
                        <td>
                          <span className="table-data">{review.email}</span>
                        </td>
                        <td>
                          <span className="table-data">{review.firstName}</span>
                        </td>
                        <td>
                          <span className="table-data">{review.lastName}</span>
                        </td>
                        <td>
                          <span className="table-data">{review.subject}</span>
                        </td>
                        <td>
                          <span className="table-data">{review.text}</span>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-circle"
                            onClick={() => deleteReview(review.id)}
                          >
                            <FaTrash />
                          </button>
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

export default AdminContacts;
