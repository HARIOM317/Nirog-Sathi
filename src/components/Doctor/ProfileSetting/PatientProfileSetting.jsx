import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { bloodGrupOptions } from "../../../constant/global";
import { useUpdatePatientMutation } from "../../../redux/api/patientApi";
import useAuthCheck from "../../../redux/hooks/useAuthCheck";
import { message } from "antd";
import ImageUpload from "../../UI/form/ImageUpload";
import pImage from "../../../images/user.png";
import { DatePicker, Select } from "antd";
import "../../../stylesheets/doctorStylesheets/ProfileSetting.css";

const { Option } = Select;

const PatientProfileSetting = () => {
  const { data } = useAuthCheck();
  const { register, handleSubmit } = useForm({});
  const [userId, setUserId] = useState("");
  // const [selectBloodGroup, setSelectBloodGroup] = useState('');
  const [selectValue, setSelectValue] = useState({});
  const [
    updatePatient,
    { isSuccess, isError, error, isLoading },
  ] = useUpdatePatientMutation();
  const [date, setDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);

  const onChange = (date, dateString) => {
    setDate(moment(dateString).format());
  };

  useEffect(() => {
    if (data) {
      setUserId(data.id);
      // setSelectBloodGroup(data?.bloodGroup)
    }
  }, [data]);

  const handleChange = (value, name) => {
    setSelectValue({ ...selectValue, [name]: value });
  };

  // const handleChange = (e) => {
  //   // if (e.target.name === 'bloodGroup') {
  //   //     setSelectBloodGroup(e.target.value);
  //   // }
  //   setSelectValue({ ...selectValue, [e.target.name]: e.target.value });
  // };

  const onSubmit = (data) => {
    const obj = data;
    const newObj = { ...obj, ...selectValue };
    date && (newObj["dateOfBirth"] = date);
    const changedValue = Object.fromEntries(
      Object.entries(newObj).filter(([key, value]) => value !== "")
    );
    const formData = new FormData();
    selectedImage && formData.append("file", file);
    const changeData = JSON.stringify(changedValue);
    formData.append("data", changeData);
    updatePatient({ data: formData, id: userId });
  };

  useEffect(() => {
    if (!isLoading && isError) {
      message.error(error?.data?.message);
    }
    if (isSuccess) {
      message.success("Successfully Profile Updated");
    }
  }, [isLoading, isError, error, isSuccess]);

  return (
    <div className="profile-setting" style={{ marginBottom: "10rem" }}>
      <div className="w-100 mb-3 rounded mb-5 p-2">
        <h5 className="text-title mb-2 mt-3">Update Your Information</h5>
        <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-12">
            <div className="form-group">
              <div className="change-avatar d-flex gap-2 align-items-center">
                <Link to={"/dashboard"} className="my-3 patient-img">
                  <img
                    src={selectedImage ? selectedImage : data?.img || pImage}
                    alt=""
                    style={{ border: "none" }}
                  />
                </Link>
                <div className="mt-3">
                  <ImageUpload
                    setSelectedImage={setSelectedImage}
                    setFile={setFile}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
              <label className="label-style">
                First Name <span className="text-danger">*</span>
              </label>
              <input
                defaultValue={data?.firstName}
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
              <input
                defaultValue={data?.lastName}
                {...register("lastName")}
                className="text-input-field"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
              <label className="label-style">
                Email <span className="text-danger">*</span>
              </label>
              <input
                defaultValue={data?.email}
                disabled
                className="text-input-field"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
              <label className="label-style">Phone Number</label>
              <input
                defaultValue={data?.mobile}
                {...register("mobile")}
                className="text-input-field"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
              <label className="label-style">Gender</label>
              <Select
                defaultValue={data?.gender ? data?.gender : "Select"}
                className="dropdown"
                onChange={(value) => handleChange(value, "gender")}
                placeholder="Select Gender"
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
              <label className="label-style">Blood Group</label>
              <Select
                defaultValue={data?.bloodGroup ? data?.bloodGroup : "Select"}
                className="dropdown"
                onChange={(value) => handleChange(value, "bloodGroup")}
                placeholder="Select Blood Group"
              >
                <Option value="A+">A+</Option>
                <Option value="A-">A-</Option>
                <Option value="B+">B+</Option>
                <Option value="B-">B-</Option>
                <Option value="O+">O+</Option>
                <Option value="O-">O-</Option>
                <Option value="AB+">AB+</Option>
                <Option value="AB-">AB-</Option>
              </Select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
              <DatePicker
                defaultValue={moment(data?.dob)}
                placeholder="Select DOB"
                onChange={onChange}
                format={"YYYY-MM-DD"}
                className="text-input-field date-picker"
                style={{ marginTop: "14.5px", padding: "12px 16px" }}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
              <label className="label-style">City</label>
              <input
                defaultValue={data?.city}
                {...register("city")}
                className="text-input-field"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
              <label className="label-style">State</label>
              <input
                defaultValue={data?.state}
                {...register("state")}
                className="text-input-field"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
              <label className="label-style">Zip Code</label>
              <input
                defaultValue={data?.zipCode}
                {...register("zipCode")}
                className="text-input-field"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
              <label className="label-style">Country</label>
              <input
                defaultValue={data?.country}
                {...register("country")}
                className="text-input-field"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
              <label className="label-style">Address</label>
              <input
                defaultValue={data?.address}
                {...register("address")}
                className="text-input-field"
              />
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-danger my-3"
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Updating.." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientProfileSetting;
