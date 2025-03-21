import React from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../../Shared/Footer/Footer";
import "../../../stylesheets/doctorStylesheets/DoctorProfile.css";
import { useParams } from "react-router-dom";
import Header from "../../Shared/Header/Header";
import SubHeader from "../../Shared/SubHeader";
import { useGetDoctorQuery } from "../../../redux/api/doctorApi";
import { Tabs } from "antd";
import OverView from "./OverView";
import Location from "./Location";
import Review from "./Review";
import Availability from "./Availability";
import DoctorProfileView from "../SearchDoctor/DoctorProfileView";
import useAuthCheck from "../../../redux/hooks/useAuthCheck";

import Lottie from "lottie-react";
import Loading from "../../../animations/loading.json";
import NoDataFound from "../../../animations/no_data_found.json";
import SomethingWrong from "../../../animations/something_wrong.json";

const DoctorProfile = () => {
  const { role } = useAuthCheck();

  const { id } = useParams();
  const { data, isLoading, isError } = useGetDoctorQuery(id);

  let content = null;

  if (isLoading)
    content = (
      <>
        <div className=" m-0 p-0 d-flex align-items-center justify-content-center">
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
    content = <DoctorProfileView data={data} />;

  const items = [
    {
      key: "1",
      label: "Overview",
      children: <OverView data={data} />,
    },
    {
      key: "2",
      label: "Locations",
      children: <Location data={data} />,
    },
    {
      key: "3",
      label: "Availability",
      children: <Availability />,
    },
  ];

  const authItems = [
    {
      key: "1",
      label: "Overview",
      children: <OverView data={data} />,
    },
    {
      key: "2",
      label: "Locations",
      children: <Location data={data} />,
    },
    {
      key: "3",
      label: "Reviews",
      children: <Review doctorId={id} />,
    },
    {
      key: "4",
      label: "Availability",
      children: <Availability />,
    },
  ];

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${data?.fullName} (${data?.specialization})`}</title>
        <meta
          name="description"
          content={`${data?.fullName} is the ${data?.specialization} from ${data?.city}, ${data?.country}. He done their ${data?.degree} in ${data?.completionYear} from ${data?.college}. `}
        />
        <meta
          name="keywords"
          content="Doctors, Professional Doctors, Specialist"
        />
        <link rel="canonical" href="https://nirogsathi.com/digital-doctors" />
      </Helmet>

      <Header />
      <SubHeader
        title="Doctor Details"
        subtitle="Know more about the doctor and their availability."
      />
      <div
        className="container"
        style={{ marginBottom: "4rem", marginTop: "6rem" }}
      >
        {content}
        <div className="p-4 rounded" style={{ marginBottom: "3rem" }}>
          <Tabs
            defaultActiveKey="1"
            items={role === "patient" ? authItems : items}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DoctorProfile;
