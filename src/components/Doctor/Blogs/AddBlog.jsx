import React, { useEffect, useState } from "react";
import { useCreateBlogMutation } from "../../../redux/api/blogApi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import useAuthCheck from "../../../redux/hooks/useAuthCheck";
import ImageUpload from "../../UI/form/ImageUpload";
import BlogIcon from "../../../images/blogIcon.png";
import "../../../stylesheets/doctorStylesheets/ProfileSetting.css";

const AddBlog = () => {
  const { data: userData } = useAuthCheck();
  const [
    createBlog,
    { isLoading, isError, error, isSuccess },
  ] = useCreateBlogMutation();
  const { register, handleSubmit } = useForm({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (userData && selectedImage) {
      const formData = new FormData();
      data["userId"] = userData.id;
      const blogData = JSON.stringify(data);
      formData.append("file", file);
      formData.append("data", blogData);
      await createBlog(formData);
    } 
  };

  useEffect(() => {
    if (!isLoading && isError) {
      message.error(error?.data?.message);
    }
    if (isSuccess) {
      message.success("Successfully Blog Added !");
      navigate("/dashboard/blogs");
    }
  }, [isLoading, isError, error, isSuccess]);
  return (
    <DashboardLayout>
      <div
        className="card mb-5 p-2 shadow-sm profile-setting"
        style={{ background: "var(--bgLight)" }}
      >
        <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-12">
            <div className="form-group mb-2 card-label">
              <label
                className="label-style"
                style={{ background: "linear-gradient(var(--bgLight), #fff)" }}
              >
                Title
              </label>
              <input
                placeholder="Title"
                {...register("title")}
                className="text-input-field"
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-group mb-2 card-label">
              <label
                className="label-style"
                style={{ background: "linear-gradient(var(--bgLight), #fff)" }}
              >
                Description
              </label>
              <textarea
                placeholder="Description"
                {...register("description")}
                className="text-input-field"
                rows={5}
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="upload-blog-img">
              <div className="my-3">
                <img
                  className="blog-img"
                  src={selectedImage ? selectedImage : BlogIcon}
                  alt=""
                />
              </div>
              <div className="mt-3">
                <ImageUpload
                  setFile={setFile}
                  setSelectedImage={setSelectedImage}
                />
              </div>
            </div>
          </div>
          <div className="upload-btn">
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              loading={isLoading}
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Saving ..." : "Add Blog"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddBlog;
