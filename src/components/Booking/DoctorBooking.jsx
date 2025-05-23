import React, { useEffect, useState } from "react";
import Footer from "../Shared/Footer/Footer";
import img from "../../images/home/doctorProfile.jpg";
import "../../stylesheets/bookingStylesheets/DoctorBooking.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Empty, Button, message, Steps } from "antd";
import { useGetDoctorQuery } from "../../redux/api/doctorApi";
import { useGetAppointmentTimeQuery } from "../../redux/api/timeSlotApi";
import moment from "moment";
import SelectDateAndTime from "./SelectDateAndTime";
import PersonalInformation from "./PersonalInformation";
import CheckoutPage from "./CheckoutPage";
import { useCreateAppointmentMutation } from "../../redux/api/appointmentApi";
import { useDispatch } from "react-redux";
import { addInvoice } from "../../redux/feature/invoiceSlice";
import Header from "../Shared/Header/Header";
import useAuthCheck from "../../redux/hooks/useAuthCheck";

import Lottie from "lottie-react";
import Loading from "../../animations/loading.json";
import NoDataFound from "../../animations/no_data_found.json";
import SomethingWrong from "../../animations/something_wrong.json";
import ReactGA from "react-ga4";

const DoctorBooking = () => {
  const dispatch = useDispatch();
  let initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    reasonForVisit: "",
    description: "",
    address: "",
    paymentType: "",
  };

  const { data: loggedInUser, role } = useAuthCheck();
  const [current, setCurrent] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectDay, setSelecDay] = useState("");
  const [paymentId, setpaymentId] = useState("");
  const [selectTime, setSelectTime] = useState("");
  const [isCheck, setIsChecked] = useState(true);
  const [patientId, setPatientId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [piCheck, setPiCheck] = useState(false);

  const [
    createAppointment,
    {
      data: appointmentData,
      isSuccess: createIsSuccess,
      isError: createIsError,
      error: createError,
      isLoading: createIsLoading,
    },
  ] = useCreateAppointmentMutation();
  const { doctorId } = useParams();
  const navigation = useNavigate();
  const { data, isLoading, isError, error } = useGetDoctorQuery(doctorId);
  const {
    data: time,
    refetch,
    isLoading: dIsLoading,
    isError: dIsError,
    error: dError,
  } = useGetAppointmentTimeQuery({
    day: selectDay,
    date: selectedDate,
    id: doctorId,
  });

  const [selectValue, setSelectValue] = useState(initialValue);
  const [IsdDisable, setIsDisable] = useState(true);
  const [IsConfirmDisable, setIsConfirmDisable] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/",
      title: "Appointment Page Visit",
    });
    const { firstName, lastName, email, phone, reasonForVisit, paymentType } =
      selectValue;
    const isInputEmpty =
      !firstName || !lastName || !email || !phone;
    const isConfirmInputEmpty = !isCheck || !paymentType;
    setIsDisable(isInputEmpty);
    setIsConfirmDisable(isConfirmInputEmpty);
  }, [selectValue, isCheck, piCheck]);

  const handleDateChange = (_date, dateString) => {
    setSelectedDate(dateString);
    setSelecDay(moment(dateString).format("dddd").toLowerCase());
    refetch();
  };
  const disabledDateTime = (current) =>
    current &&
    (current < moment().add(1, "day").startOf("day") ||
      current > moment().add(8, "days").startOf("day"));
  const handleSelectTime = (date) => {
    setSelectTime(date);
  };

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  let dContent = null;
  if (dIsLoading)
    dContent = (
      <div>
        <div className=" m-0 p-0 d-flex align-items-center justify-content-center">
          <Lottie
            loop={true}
            animationData={Loading}
            style={{ width: "200px" }}
          />
        </div>
      </div>
    );

  if (!dIsLoading && dIsError)
    dContent = (
      <div className="m-0 p-0 d-flex flex-column align-items-center justify-content-center">
        <Lottie
          loop={true}
          animationData={SomethingWrong}
          style={{ width: "150px" }}
        />
        <div
          style={{
            color: "var(--headingColor)",
            fontWeight: "bold",
            fontSize: "1rem",
            textAlign: "center",
          }}
        >
          Something went wrong!
        </div>
      </div>
    );

  if (!dIsLoading && !dIsError && time.length === 0)
    dContent = <Empty children="Doctor Is not Available" />;

  if (!dIsLoading && !dIsError && time.length > 0)
    dContent = (
      <>
        {time &&
          time.map((item, id) => (
            <div className="col-md-4" key={id + 155}>
              <Button
                type={item?.slot?.time === selectTime ? "primary" : "default"}
                shape="round"
                size="large"
                className="mb-3"
                onClick={() => handleSelectTime(item?.slot?.time)}
              >
                {" "}
                {item?.slot?.time}{" "}
              </Button>
            </div>
          ))}
      </>
    );

  let content = null;

  if (isLoading)
    content = (
      <>
        <div className="m-0 p-0 d-flex align-items-center justify-content-center">
          <Lottie
            loop={true}
            animationData={Loading}
            style={{ width: "300px" }}
          />
        </div>
      </>
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
            textAlign: "center",
          }}
        >
          Something went wrong!
        </div>
      </div>
    );

  if (!isLoading && !isError && data?.id === undefined)
    content = (
      <div className=" m-0 p-0 d-flex align-items-center justify-content-center">
        <Lottie
          loop={true}
          animationData={NoDataFound}
          style={{
            width: "300px",
          }}
        />
      </div>
    );

  if (!isLoading && !isError && data?.id)
    content = (
      <>
        <div className="booking-doc-img my-3 mb-3 rounded">
          <Link to={`/doctors/${data?.id}`}>
            <img src={data?.img ? data?.img : img} alt="" />
          </Link>
          <div className="text-start">
            <Link
              to={`/doctors/${data?.id}`}
              style={{ textDecoration: "none" }}
            >
              Dr. {data?.firstName + " " + data?.lastName}
            </Link>
            <p className="form-text mb-0" style={{ fontWeight: "500" }}>
              {data?.specialization + "," + data?.experienceHospitalName}
            </p>
          </div>
        </div>
      </>
    );

  const steps = [
    {
      title: "Select Date",
      content: (
        <SelectDateAndTime
          content={content}
          handleDateChange={handleDateChange}
          disabledDateTime={disabledDateTime}
          selectedDate={selectedDate}
          dContent={dContent}
          selectTime={selectTime}
        />
      ),
    },
    {
      title: "Patient Details",
      content: (
        <PersonalInformation
          handleChange={handleChange}
          selectValue={selectValue}
          setPatientId={setPatientId}
          piCheck={piCheck}
          setPiCheck={setPiCheck}
        />
      ),
    },
    {
      title: "Payment",
      content: (
        <CheckoutPage
          handleChange={handleChange}
          selectValue={selectValue}
          isCheck={isCheck}
          setIsChecked={setIsChecked}
          data={data}
          selectedDate={selectedDate}
          selectTime={selectTime}
          paymentId={paymentId}
          setpaymentId={setpaymentId}
          orderId={orderId}
          setOrderId={setOrderId}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const handleConfirmSchedule = () => {
    const obj = {};
    obj.patientInfo = {
      firstName: selectValue.firstName,
      lastName: selectValue.lastName,
      email: selectValue.email,
      phone: selectValue.phone,
      reasonForVisit: selectValue.reasonForVisit,
      address: selectValue.address,
      description: selectValue.description,
      scheduleDate: selectedDate,
      scheduleTime: selectTime,
      doctorId: doctorId,

      patientId: role !== "" && role === "patient" ? patientId : undefined,
    };
    obj.payment = {
      paymentType: selectValue.paymentType,
      paymentId: paymentId,
      orderId: orderId,
    };
    createAppointment(obj);
  };

  useEffect(() => {
    if (createIsSuccess) {
      message.success("Succcessfully Appointment Scheduled");
      setSelectValue(initialValue);
      dispatch(addInvoice({ ...appointmentData }));
      navigation(`/booking/success/${appointmentData.id}`);
    }
    if (createIsError) {
      message.error(error?.data?.message);
    }
  }, [createIsSuccess, createError]);
  return (
    <>
      <Header />
      <div
        className="container"
        style={{ marginBottom: "12rem", marginTop: "8rem" }}
      >
        <Steps current={current} items={items} className="stepper" />
        <div className="mb-5 mt-3 mx-3">{steps[current].content}</div>
        <div className="text-end mx-3">
          {current < steps.length - 1 && (
            <Button
              type="primary"
              disabled={
                current === 0
                  ? selectTime
                    ? false
                    : true
                  : IsdDisable || !selectTime
              }
              onClick={() => next()}
            >
              Next
            </Button>
          )}

          {current === steps.length - 1 && (
            <Button
              type="primary"
              disabled={IsConfirmDisable}
              loading={createIsLoading}
              onClick={handleConfirmSchedule}
            >
              Confirm
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DoctorBooking;
