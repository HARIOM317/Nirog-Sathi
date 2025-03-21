import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleBlogQuery } from "../../redux/api/blogApi";
import BlogAside from "./BlogAside";
import Footer from "../Shared/Footer/Footer";
import BlogComment from "./BlogComment";
import Header from "../Shared/Header/Header";
import SubHeader from "../Shared/SubHeader";
import moment from "moment";

import Lottie from "lottie-react";
import Loading from "../../animations/loading.json";
import NoDataFound from "../../animations/no_data_found.json";
import SomethingWrong from "../../animations/something_wrong.json";
import { Helmet } from "react-helmet-async";

const BlogDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleBlogQuery(id);

  const blogTruncate = (str, max) => {
    if (!str) return "";
    return str.length > max ? str.substring(0, max) + "..." : str;
  };

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
  if (!isLoading && !isError && data?.id === undefined)
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
          Can not load blog!
        </div>
      </div>
    );

  if (!isLoading && !isError && data?.id)
    content = (
      <div className="card text-center border-0">
        <div
          className="flex-column card-header p-0 border-0 d-flex justify-content-center align-items-center"
          style={{ overflow: "hidden", maxHeight: "40rem", background: "#fff" }}
        >
          {data?.img && (
            <img
              src={data?.img}
              alt="blog Image"
              width={800}
              height={500}
              className="w-100"
              style={{
                objectFit: "cover",
                borderRadius: "12px",
                boxShadow: "var(--shadowAll)",
                marginBottom: "2rem",
              }}
            />
          )}
        </div>

        <div className="card-body p-0">
          <div className="p-2 my-2">
            <div
              className="d-flex text-start gap-3"
              style={{ margin: "0.5rem auto 2rem auto" }}
            >
              <div className="d-flex gap-1 align-items-center justify-content-center">
                <span className="blog-author-main">
                  {data?.user?.firstName + " " + data?.user?.lastName}
                </span>
              </div>
              <div className="d-flex gap-1 text-muted align-items-center justify-content-center">
                <span className="blog-date-main">
                  {moment(data?.cretedAt).format("LL")}
                </span>
              </div>
            </div>

            <h5
              className="text-start mb-3"
              style={{ color: "var(--headingColor)", fontWeight: "bold" }}
            >
              {data?.title}
            </h5>

            <hr
              className="my-1 p-0"
              style={{
                height: "2px",
                color: "var(--headingColor",
                opacity: "0.6",
              }}
            />
          </div>
          <div className="px-3 my-3">
            <p
              style={{
                fontSize: "1rem",
                textAlign: "justify",
                color: "var(--textLight)",
              }}
            >
              {data?.description}
            </p>
          </div>
        </div>
      </div>
    );
  return (
    <>
      <Helmet>
        <title>{data?.title || "Nirog Sathi Blog"}</title>
        <meta
          name="description"
          content={
            blogTruncate(data?.description, 165) ||
            `Read blog about: ${data?.title}`
          }
        />
        <meta
          name="keywords"
          content="Nirog Sathi blog, Healthcare tips, Healthcare news, Medical insights, Expert healthcare advice, Nirog Sathi articles"
        />
        <link rel="canonical" href="https://nirogsathi.com/blog" />
      </Helmet>

      <Header />
      <SubHeader title="Blog Details" subtitle={data?.title} />
      <div className="container-fluid" style={{ marginTop: 100 }}>
        <div className="row mx-2">
          <div className="col-md-9 col-sm-12">
            {content}
            <hr
              style={{
                height: "2px",
                color: "var(--headingColor",
                opacity: "0.6",
              }}
            />
            <div className="d-flex justify-content-end">
              <div className="col-md-5 col-lg-4 ml-lg-0 text-end text-md-end w-100">
                <h5
                  className="d-inline me-2"
                  style={{ color: "var(--headingColor)", fontSize: "1rem" }}
                >
                  Share On{" "}
                </h5>
                <a
                  className="btn m-1 social-button"
                  style={{ borderColor: "#3b5998", background: "#3b5998" }}
                >
                  <i class="fa-brands fa-facebook-f"></i>
                </a>

                <a
                  className="btn m-1 social-button"
                  style={{ borderColor: "#db1c8a", background: "#db1c8a" }}
                >
                  <i class="fa-brands fa-instagram"></i>
                </a>

                <a
                  className="btn m-1 social-button"
                  style={{ borderColor: "#0a63bc", background: "#0a63bc" }}
                >
                  <i class="fa-brands fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <BlogComment />
          </div>
          <div className="col-md-3 col-sm-12">
            <BlogAside setSearchTerm={undefined} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetails;
