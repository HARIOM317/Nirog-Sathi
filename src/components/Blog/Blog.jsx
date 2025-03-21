import React, { useState } from "react";
import Footer from "../Shared/Footer/Footer";
import { useGetAllBlogsQuery } from "../../redux/api/blogApi";
import { useDebounced } from "../../redux/hooks";
import { Pagination } from "antd";
import BlogAside from "./BlogAside";
import { Link } from "react-router-dom";
import Header from "../Shared/Header/Header";
import SubHeader from "../Shared/SubHeader";
import { truncate } from "../../utils/truncate";
import moment from "moment";
import "../../stylesheets/Blog.css";
import { Helmet } from "react-helmet-async";

import Lottie from "lottie-react";
import Loading from "../../animations/loading.json";
import NoDataFound from "../../animations/no_data_found.json";
import SomethingWrong from "../../animations/something_wrong.json";

const Blog = () => {
  const query = {};
  const [size, setSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }
  const { data, isError, isLoading } = useGetAllBlogsQuery({ ...query });
  const blogData = data?.blogs;
  const meta = data?.meta;

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
      <div className=" m-0 p-0 d-flex flex-column align-items-center justify-content-center">
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

  if (!isLoading && !isError && blogData?.length === 0)
    content = (
      <div className=" m-0 p-0 d-flex flex-column align-items-center justify-content-center">
        <Lottie
          loop={true}
          animationData={NoDataFound}
          style={{ width: "300px" }}
        />
        <div
          style={{
            color: "var(--headingColor)",
            fontWeight: "bold",
            fontSize: "1.3rem",
          }}
        >
          No any blog found!
        </div>
      </div>
    );

  if (!isLoading && !isError && blogData?.length > 0)
    content = (
      <>
        {blogData &&
          blogData?.map((item, index) => (
            <div
              className="col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-5"
              key={item?.id + index}
            >
              <div className="card text-center blog-card">
                <div
                  className="flex-column p-0 border-0 d-flex justify-content-center align-items-center"
                  style={{ overflow: "hidden" }}
                >
                  <img
                    src={item?.img}
                    alt="blog Image"
                    className="blog-img"
                    style={{
                      maxHeight: "10rem",
                      minHeight: "10rem",
                      objectFit: "cover",
                    }}
                  />
                </div>
                
                <div className="card-body p-0">
                  <div className="p-2">
                    <div
                      className="d-flex justify-content-between gap-2"
                      style={{ margin: "0.5rem auto 1rem auto" }}
                    >
                      <div className="d-flex gap-1 text-muted align-items-center justify-content-center">
                        <span className="blog-author">
                          {item?.user.firstName + " " + item?.user.lastName}
                        </span>
                      </div>
                      <div className="d-flex gap-1 text-muted align-items-center justify-content-center">
                        <span className="blog-date">
                          {moment(item?.createdAt).format("LL")}
                        </span>
                      </div>
                    </div>

                    <Link to={`/blog/${item?.id}`}>
                      <h6
                        className="text-start mb-1 text-capitalize"
                        style={{
                          color: "var(--headingColor)",
                          fontWeight: "bold",
                        }}
                      >
                        {truncate(item?.title, 40)}
                      </h6>
                    </Link>
                  </div>
                  <div className="px-2">
                    <p className="blog-description">
                      {truncate(item?.description, 150)}
                    </p>
                  </div>
                  <div className="mt-1 mb-3 text-end">
                    <Link to={`/blog/${item?.id}`}>
                      <button className="read-more-btn">
                        Read More
                        <i
                          class="fa-solid fa-arrow-right-long"
                          style={{ marginLeft: "4px" }}
                        ></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </>
    );
  return (
    <>
      <Helmet>
        <title>Nirog Sathi Blog: Healthcare Tips, News & Insights</title>
        <meta
          name="description"
          content="Stay updated with the latest healthcare tips, news, and insights from Nirog Sathi. Explore our blog for expert advice and information."
        />
        <meta
          name="keywords"
          content="Nirog Sathi blog, Healthcare tips, Healthcare news, Medical insights, Expert healthcare advice, Nirog Sathi articles"
        />
        <link rel="canonical" href="https://nirogsathi.com/blog" />
      </Helmet>

      <Header />
      <SubHeader
        title="Blog"
        subtitle="Read our blogs and stay updated with the latest news."
      />

      <div
        className="container-fluid"
        style={{ marginTop: 50, marginBottom: 50 }}
      >
        <div className="row">
          <div className="col-md-9 col-sm-12">
            <div className="p-3 py-5 mx-3 rounded">
              <div className="row">{content}</div>
              <div className="text-center mt-5">
                <Pagination
                  defaultCurrent={size}
                  total={meta?.total}
                  showSizeChanger={true}
                  showPrevNextJumpers={true}
                  pageSize={size}
                />
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-12">
            <BlogAside setSearchTerm={setSearchTerm} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Blog;
