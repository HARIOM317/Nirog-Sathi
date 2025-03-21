import React, { useEffect, useState } from "react";
import img from "../../../images/user.png";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import moment from "moment";
import StarRatings from "react-star-ratings";
import {
  useCreateReviewMutation,
  useGetDoctorReviewsQuery,
} from "../../../redux/api/reviewsApi";
import { Button, Radio, message, Space, Rate } from "antd";
import { useForm } from "react-hook-form";
import "../../../stylesheets/doctorStylesheets/Reviews.css";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const Review = ({ doctorId }) => {
  const { register, handleSubmit } = useForm({});
  const [value, setValue] = useState(null);
  const [recommend, setRecommend] = useState(null);
  const [showError, setShowError] = useState(false);

  const { data, isError, isLoading } = useGetDoctorReviewsQuery(doctorId);
  // console.log({data});
  const [
    createReview,
    {
      isSuccess: createIsSuccess,
      isError: createTsError,
      error: createError,
      isLoading: createIsLoading,
    },
  ] = useCreateReviewMutation();

  const onChange = (e) => setRecommend(e.target.value);

  useEffect(() => {
    if (recommend !== null && value !== null) {
      setShowError(true);
    }
  }, [recommend, value]);

  const onSubmit = (data) => {
    const obj = {};
    obj.isRecommended = recommend === 1 ? true : recommend === 2 ? false : null;
    obj.description = data.description;
    obj.star = value && value?.toString();
    obj.doctorId = doctorId;
    if (obj.description !== "") {
      createReview({ data: obj });
    } else {
      message.error("Please Add Review Text !!");
    }
  };

  useEffect(() => {
    if (!createIsLoading && createTsError) {
      message.error(createError?.data?.message);
    }
    if (createIsSuccess) {
      message.success("Successfully Review Submited !");
      setRecommend(null);
      setValue(null);
    }
  }, [createIsLoading, createTsError, createError, createIsSuccess]);

  let content = null;
  if (!isLoading && isError) content = <div>Something Went Wrong !</div>;
  if (!isLoading && !isError && data?.length === 0)
    content = <div>No Review Yet</div>;
  if (!isLoading && !isError && data?.length > 0)
    content = (
      <>
        {data &&
          data.map((item, key) => (
            <div className="mb-4" key={item?.id + key}>
              <div className="d-flex gap-3 justify-content-between">
                <div className="d-flex gap-4">
                  <div className="review-img">
                    <img className="" alt="" src={img} />
                  </div>
                  <div>
                    <h5 className="text-nowrap">
                      {item?.patient?.firstName + " " + item?.patient?.lastName}
                    </h5>
                    <p
                      className={
                        item?.isRecommended ? "text-success" : "text-danger"
                      }
                    >
                      {item?.isRecommended ? (
                        <FaRegThumbsUp />
                      ) : (
                        <FaRegThumbsDown />
                      )}{" "}
                      {item?.isRecommended
                        ? "I recommend the doctor"
                        : "I do not recommend the doctor"}
                    </p>
                  </div>
                </div>

                <div className="text-end">
                  <div>
                    <StarRatings
                      rating={5}
                      starRatedColor="#f4c150"
                      numberOfStars={5}
                      name="rating"
                      starDimension="15px"
                      starSpacing="2px"
                      starEmptyColor="#e6e8eb"
                    />
                  </div>
                  <div className="">
                    Reviewed{" "}
                    {moment(item?.createdAt)
                      .startOf("day")
                      .fromNow()}
                  </div>
                </div>
              </div>
              <div>
                <p className="mx-2 form-text">{item?.description}</p>
              </div>
            </div>
          ))}
      </>
    );

  return (
    <>
      <div>
        <div className="w-100 mb-3 rounded py-3 px-2">{content}</div>

        <div className="doctor-review">
          <div className="text-center mb-5">
            <div className="section-title mb-3">
              <h2>Write a review</h2>
              <p>Write your experience with this doctor.</p>
            </div>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-3">
                <div
                  className="d-flex flex-column"
                  style={{
                    padding: "1.5rem",
                    border: "1.5px solid var(--borderColor)",
                    borderRadius: "8px",
                    background: "#ffebeb",
                  }}
                >
                  <label className="form-label">
                    Your ratting is{" "}
                    {value ? <strong>{desc[value - 1]}</strong> : ""}
                  </label>
                  <Space>
                    <Rate tooltips={desc} onChange={setValue} value={value} />
                  </Space>
                </div>
              </div>
              <div className="form-group mb-3">
                <Radio.Group onChange={onChange} value={recommend}>
                  <Space className="recommend-btn">
                    <Radio value={1}>I Recommend the Doctor</Radio>
                    <Radio value={2}>I Don't Recommend the Doctor</Radio>
                  </Space>
                </Radio.Group>
              </div>

              <div className="form-group">
                <textarea
                  className="text-form-input-field"
                  style={{ borderRadius: "8px", background: "var(--bgColor)" }}
                  {...register("description")}
                  placeholder="Write Description"
                  rows={6}
                />
              </div>
              <div className="submit-section mt-3">
                <Button
                  htmlType="submit"
                  size="medium"
                  type="primary"
                  disabled={!showError}
                >
                  Add Review
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
