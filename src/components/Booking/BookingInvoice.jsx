import Footer from "../Shared/Footer/Footer";
import logo from "../../images/logo.png";
import "../../stylesheets/bookingStylesheets/BookingInvoice.css";
import { useParams } from "react-router-dom";
import { useGetAppointmentedPaymentInfoQuery } from "../../redux/api/appointmentApi";
import moment from "moment";
import { Empty, Button } from "antd";
import Header from "../Shared/Header/Header";
import { useRef } from "react";
import { FaPrint } from "react-icons/fa";
import ReactToPrint from "react-to-print";

import Lottie from "lottie-react";
import Loading from "../../animations/loading.json";
import NoDataFound from "../../animations/no_data_found.json";
import SomethingWrong from "../../animations/something_wrong.json";

const BookingInvoice = () => {
  const ref = useRef();
  const { id } = useParams();
  const { data, isLoading, isError } = useGetAppointmentedPaymentInfoQuery(id);

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

  if (!isLoading && !isError && !data)
    content = (
      <div className="m-0 p-0 d-flex flex-column align-items-center justify-content-center">
        <Lottie
          loop={true}
          animationData={NoDataFound}
          style={{ width: "300px" }}
        />
      </div>
    );

  if (!isLoading && !isError && data)
    content = (
      <>
        <div className="col-lg-8 offset-lg-2">
          <div className="invoice-content">
            <div className="invoice-item">
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="invoice-logo">
                    <img src={logo} alt="" />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <p className="invoice-details">
                    <strong>Issued:</strong>{" "}
                    {moment(data.createdAt).format("LL")}
                  </p>
                </div>
              </div>
            </div>

            <div className="invoice-item">
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="invoice-info">
                    <strong className="customer-text">Invoice From</strong>
                    <p className="invoice-details invoice-details-two">
                      Dr.{" "}
                      {data?.appointment?.doctor?.firstName
                        ? `${data?.appointment?.doctor?.firstName} ${data?.appointment?.doctor?.lastName}`
                        : ""}{" "}
                      <br />
                      {data?.appointment?.doctor?.address
                        ? data?.appointment?.doctor?.address
                        : ""}
                      ,{" "}
                      {data?.appointment?.doctor?.city &&
                        data?.appointment?.doctor?.city}
                      ,<br />
                      {data?.appointment?.doctor?.country &&
                        data?.appointment?.doctor?.country}{" "}
                      <br />
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="invoice-info invoice-info2">
                    <strong className="customer-text">Invoice To</strong>
                    <p className="invoice-details">
                      {data?.appointment?.firstName +
                        " " +
                        data?.appointment?.lastName}{" "}
                      <br />
                      {data?.appointment?.address},{" "}
                      {data?.appointment?.patient?.city},<br />
                      {data?.appointment?.patient?.country} <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="invoice-item">
              <div className="row">
                <div className="col-md-12">
                  <div className="invoice-info">
                    <strong className="customer-text">Payment Method</strong>
                    <p className="invoice-details invoice-details-two">
                      Payment Type: {data?.paymentType} <br />
                      {data?.paymentType === "razorpay"
                        ? `Order Id: ${data?.OrderId}`
                        : ""}
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="invoice-item invoice-table-wrap">
              <div className="row">
                <div className="col-md-12">
                  <div className="table-responsive">
                    <table className="invoice-table table table-bordered">
                      <thead>
                        <tr>
                          <th>Description</th>
                          <th className="text-center">Doctor Fee</th>
                          <th className="text-center">Gst</th>
                          <th className="text-center">Booking Fee</th>
                          <th
                            className="text-right"
                            style={{ textAlign: "right" }}
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>General Consultation</td>
                          <td className="text-center">Rs. {data?.DoctorFee}</td>
                          <td className="text-center">Rs. {data?.Gst}</td>
                          <td className="text-center">
                            Rs. {data?.bookingFee}
                          </td>
                          <td
                            className="text-right"
                            style={{ textAlign: "right" }}
                          >
                            Rs. {data?.totalAmount}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-md-12 col-xl-12 me-auto">
                  <div className="table-responsive">
                    <table className="invoice-table-two table">
                      <tbody>
                        <tr>
                          <th>Subtotal:</th>
                          <td>
                            <span>Rs. {data?.totalAmount}</span>
                          </td>
                        </tr>
                        <tr>
                          <th>Discount:</th>
                          <td>
                            <span>0%</span>
                          </td>
                        </tr>
                        <tr>
                          <th>Total Amount:</th>
                          <td>
                            <span>Rs. {data?.totalAmount}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  return (
    <>
      <Header />
      <div
        className="content"
        style={{ marginBottom: "7rem", marginTop: "10rem" }}
      >
        <div
          className="d-flex justify-content-end mb-4 print-btn"
        >
          <ReactToPrint
            bodyClass="print-agreement"
            content={() => ref.current}
            trigger={() => (
              <Button type="primary" icon={<FaPrint />}>
                {" "}
                Print
              </Button>
            )}
          />
        </div>
        <div className="container-fluid" ref={ref}>
          <div className="row">{content}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default BookingInvoice;
