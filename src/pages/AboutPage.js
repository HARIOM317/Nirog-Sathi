import React from "react";
import "../stylesheets/About.css";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import ImageHeading from "../images/doc/doctor 5.jpg";
import img from "../images/logo.png";
import SubHeader from "../components/Shared/SubHeader";
import { useGetAllBlogsQuery } from "../redux/api/blogApi";
import { Empty, message } from "antd";
import { Link } from "react-router-dom";
import { truncate } from "../utils/truncate";
import { useGetDoctorsQuery } from "../redux/api/doctorApi";

const AboutPage = () => {
  const { data, isError, isLoading } = useGetAllBlogsQuery({ limit: 4 });
  const {
    data: doctorData,
    isLoading: DoctorIsLoading,
    isError: doctorIsError,
  } = useGetDoctorsQuery({ limit: 4 });

  const blogData = data?.blogs;
  const doctors = doctorData?.doctors;

  let doctorContent = null;
  if (!DoctorIsLoading && doctorIsError)
    doctorContent = <div>Something Went Wrong !</div>;
  if (!DoctorIsLoading && !doctorIsError && doctors?.length === 0)
    doctorContent = (
      <div>
        <Empty />
      </div>
    );
  if (!DoctorIsLoading && !doctorIsError && doctors?.length > 0)
    doctorContent = (
      <>
        {doctors &&
          doctors.map((item, id) => (
            <div className="col-lg-3 col-md-6 col-sm-6" key={id + item.id}>
              <div className="card shadow border-0 mb-5 mb-lg-0">
                {item.img && (
                  <img src={item.img} class="img-fluid w-100" alt="" />
                )}
                <div className="p-2">
                  <h4 className="mt-4 mb-0" style={{ color: "#223a66" }}>
                    <a>{item?.firstName + " " + item?.lastName}</a>
                  </h4>
                  <p>{item?.designation}</p>
                </div>
              </div>
            </div>
          ))}
      </>
    );

  let content = null;
  if (!isLoading && isError)
    content = <div>{message.error("Something went Wrong!")}</div>;
  if (!isLoading && !isError && blogData?.length === 0) content = <Empty />;
  if (!isLoading && !isError && blogData?.length > 0)
    content = (
      <>
        {blogData &&
          blogData?.map((item, id) => (
            <div className="col-lg-3 col-md-6" key={id + item.id}>
              <div className="card shadow border-0 mb-5 mb-lg-0">
                <img
                  src={item?.img}
                  alt="blog Image"
                  width={300}
                  height={200}
                  className="w-100  rounded-top image-hover"
                  style={{ objectFit: "contain" }}
                />

                <div className="p-2">
                  <Link to={`/blog/${item?.id}`}>
                    <h6
                      className="text-start mb-1 text-capitalize"
                      style={{ color: "#223a66" }}
                    >
                      {truncate(item?.title, 40)}
                    </h6>
                  </Link>
                  <div className="px-2">
                    <p className="form-text text-start text-capitalize">
                      {truncate(item?.description, 80)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </>
    );
  return (
    <>
      <Header />
      <SubHeader
        title="about us"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing."
      />
      
      
      <Footer />
    </>
  );
};

export default AboutPage;
