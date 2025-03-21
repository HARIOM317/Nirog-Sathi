import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import "../../stylesheets/TrackAppointment.css";
import { Input, message } from "antd";
import { useTrackAppointmentMutation } from "../../redux/api/appointmentApi";
import TrackDetailPage from "./TrackDetailPage";
import { useEffect, useState } from "react";
const { Search } = Input;

const TrackAppointment = () => {
  const [trackAppointment, { data, isSuccess, isLoading, isError, error }] =
    useTrackAppointmentMutation();
  const [showInfo, setShowInfo] = useState(false);

  const onSearch = (value) => {
    if (value.length > 5) {
      trackAppointment({ id: value });
    }
  };

  useEffect(() => {
    if (isSuccess && !isError && data?.id) {
      message.success("Succcessfully Get Information !");
      setShowInfo(!showInfo);
    }
    if (isError) {
      message.error(error?.data?.message);
    }
    if (isSuccess && data?.id === undefined) {
      message.error("No Data is Available !");
    }
  }, [isSuccess, isError, error, data]);

  // What to render
  let content = null;
  if (!isLoading && isError) content = <div>Something Went Wrong!</div>;
  if (!isLoading && !isError && data?.id)
    content = <TrackDetailPage data={data} setShowInfo={setShowInfo} />;
  return (
    <>
      <Header />
      <div style={{ minHeight: "100vh" }}>
        {showInfo ? (
          content
        ) : (
          <div style={{ marginTop: "10rem" }} className="track-appointment">
            <div className="mb-5 section-title text-center apt-heading">
              <h2>Track Your Appointment</h2>
              <p style={{ color: "var(--textLight)" }}>
                Enter your appointment id to track your appointment status
              </p>
            </div>
            <div className="mx-auto search-bar">
              <Search
                placeholder="Track Your Appointment..."
                allowClear
                enterButton="Track"
                onSearch={onSearch}
                size="large"
                className="search-input"
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TrackAppointment;
