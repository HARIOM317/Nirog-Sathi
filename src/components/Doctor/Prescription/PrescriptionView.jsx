import { useParams } from "react-router-dom";
import logo from "../../../images/logo.png";
import Footer from "../../Shared/Footer/Footer";
import Header from "../../Shared/Header/Header";
import { useGetPrescriptionQuery } from "../../../redux/api/prescriptionApi";
import moment from "moment";
import { Table, Button } from "antd";
import "../../../stylesheets/doctorStylesheets/Prescription.css";
import { useRef } from "react";
import { FaPrint } from "react-icons/fa";
import ReactToPrint from "react-to-print";

import Lottie from "lottie-react";
import Loading from "../../../animations/loading.json";
import NoDataFound from "../../../animations/no_data_found.json";
import SomethingWrong from "../../../animations/something_wrong.json";

const PrescriptionView = () => {
  const ref = useRef();
  const { id } = useParams();
  const { data, isLoading, isError } = useGetPrescriptionQuery(id);

  console.log(data?.patient?.state);
  const columns = [
    {
      title: "Medicine",
      dataIndex: "medicine",
      key: "medicine",
    },
    {
      title: "Dosage",
      dataIndex: "dosage",
      key: "dosage",
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
    },
    {
      title: "Period",
      key: "duration",
      render: function(data) {
        const duratinDate = data.duration.split(",");
        const endDate = moment(duratinDate[0]);
        const startDate = moment(duratinDate[1]);
        const getDiffrent = endDate.diff(startDate, "days");
        return <>{getDiffrent} days</>;
      },
    },
  ];

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
                    <strong>Appointment ID:</strong>{" "}
                    {data?.appointment?.trackingId} <br />
                    <strong>Issued:</strong>{" "}
                    {moment(data.createdAt).format("LL")}
                  </p>
                </div>
              </div>
            </div>

            <div className="invoice-item">
              <div className="row">
                <div className="col-md-12">
                  <div className="invoice-info rounded">
                    <div className="invoice-details invoice-details-two ">
                      <h3>
                        Dr.
                        {data?.doctor?.firstName + " " + data?.doctor?.lastName}
                      </h3>
                      <p>
                        {data?.doctor?.specialization}
                        {data?.doctor?.specialization ? ", " : ""}
                      </p>
                      <p>{data?.doctor?.college}</p>
                      <span className="form-text">
                        {data?.doctor?.address}
                        {data?.doctor?.address ? ", " : ""}
                        {data?.doctor?.state}
                        {data?.doctor?.state ? ", " : ""}
                        {data?.doctor?.country}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="invoice-info">
                    <strong className="customer-text">
                      Patient Information
                    </strong>
                    <div className="invoice-details invoice-details-two">
                      <div className="d-flex justify-content-between patient-name">
                        <div>
                          <p style={{ color: "var(--textLight)" }}>
                            <strong style={{ color: "var(--textLight)" }}>
                              Patient Name:
                            </strong>{" "}
                            {data?.appointment?.firstName +
                              " " +
                              data?.appointment?.lastName}
                          </p>
                          <p className="my-1">
                            <strong style={{ color: "var(--textLight)" }}>
                              Address:
                            </strong>{" "}
                            {data?.patient?.address +
                              ", " +
                              data?.patient?.city +
                              ", " +
                              data?.patient?.state +
                              ", " +
                              data?.patient?.country}
                          </p>
                        </div>
                        <div>
                          <p style={{ textTransform: "capitalize" }}>
                            <b>Gender:</b> {data?.patient?.gender}
                          </p>
                          <p>
                            <b>Age:</b>{" "}
                            {moment().diff(data?.patient?.dateOfBirth, "years")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="invoice-item invoice-table-wrap">
              <div
                className="row"
                style={{ borderTop: "1.5px solid var(--borderColor)" }}
              >
                <div className="col-md-4 col-sm-4 col-xl-4 symptoms-section">
                  <div className="mt-3">
                    <div>
                      <h5>SYMPTOMS</h5>
                      <p>{data?.disease}</p>
                    </div>
                    <div>
                      <h5>DIAGNOSIS</h5>
                      <p>{data?.daignosis}</p>
                    </div>
                    <div>
                      <h5>TESTS</h5>
                      <p>{data?.test}</p>
                    </div>
                    <div>
                      <h5>FOLLOW UP</h5>
                      <p>
                        <span>
                          Date: {moment(data?.followUpdate).format("LL")}
                        </span>{" "}
                        <br />
                        <span>
                          Time: {moment(data?.followUpdate).format("LT")}
                        </span>
                      </p>
                    </div>
                    <div>
                      <h5>ADVICE</h5>
                      <p>{data?.instruction}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-8 col-sm-8 col-xl-8 px-0">
                  <Table
                    columns={columns}
                    dataSource={data?.medicines}
                    pagination={false}
                    scroll={{
                      x: 500,
                    }}
                  />
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
        style={{ marginTop: "10rem", marginBottom: "7rem" }}
      >
        <div className="d-flex justify-content-end print-btn">
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

export default PrescriptionView;
