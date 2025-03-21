import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Select, message } from "antd";
import { getFromLocalStorage } from "../../utils/local-storage";
import DashboardLayout from "../Doctor/DashboardLayout/DashboardLayout";
import "../../stylesheets/doctorStylesheets/ProfileSetting.css";
import { getBaseUrl } from "../../helpers/config/envConfig";

const { Option } = Select;

const AddNewDoctor = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { register, handleSubmit } = useForm({});
  const [selectValue, setSelectValue] = useState({});
  const [date, setDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState([]);

  const authorizationToken = getFromLocalStorage("accessToken");
  const URL = `${getBaseUrl()}/doctor/admin/addDoctor`;

  const handleChange = (value, name) => {
    setSelectValue({ ...selectValue, [name]: value });
  };

  const onSubmit = async (data) => {
    const obj = data;
    obj.price && obj.price.toString();
    const newObj = { ...obj, ...selectValue };
    date && (newObj["dob"] = date);
    newObj["services"] = Array.isArray(selectedItems)
      ? selectedItems.join(",")
      : null;
    const changedValue = Object.fromEntries(
      Object.entries(newObj).filter(([key, value]) => value !== "")
    );
    const formData = new FormData();
    selectedImage && formData.append("file", file);
    const changeData = JSON.stringify(changedValue);
    formData.append("data", changeData);

    console.log("Changed Data: " + formData.get("data"));

    console.log(formData.get("file"));
    try {
      setIsLoading(true);
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: formData.get("data"),
      });
      const data = await response.json();
      //if response is ok then set success to true
      if (response.ok) {
        setIsSuccess(true);
        setIsLoading(false);
        // clear the fields after success
        window.location.reload();
      } else {
        setIsError(true);
        setIsLoading(false);
        setError(data);
      }
    } catch (error) {
      isLoading(false);
      console.error("Error while adding Doctor:", error);
    }
  };

  useEffect(() => {
    if (!isLoading && !isSuccess && isError) {
      message.error("Something went wrong!");
    }
    if (isSuccess) {
      message.success("Successfully Added Doctor !");
    }
  }, [isLoading, isError, error, isSuccess]);

  return (
    <DashboardLayout>
      <div className="profile-setting">
        <div className="w-100 mb-3 rounded mb-5 p-2">
          <h5 className="text-title ms-2 mb-2 mt-3">Add Doctor </h5>
          <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  {...register("firstName")}
                  className="text-input-field"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input {...register("lastName")} className="text-input-field" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Email<span className="text-danger">*</span>
                </label>
                <input {...register("email")} className="text-input-field" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Phone Number <span className="text-danger">*</span>
                </label>
                <input {...register("phone")} className="text-input-field" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <Select
                  defaultValue={"Gender"}
                  className="dropdown"
                  onChange={(value) => handleChange(value, "gender")}
                  placeholder="Select Gender"
                  style={{ marginTop: "15px" }}
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>

                {/* <label className="label-style">
                  Gender <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control select"
                  onChange={handleChange}
                  name="gender"
                >
                  <option value={""}>Select</option>
                  <option className="text-capitalize">male</option>
                  <option className="text-capitalize">female</option>
                  <option className="text-capitalize">other</option>
                </select> */}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  {...register("password")}
                  className="text-input-field"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="text-center my-3">
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                loading={isLoading}
                disabled={isLoading ? true : false}
              >
                {isLoading ? "Adding ..." : "Add Doctor"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddNewDoctor;
