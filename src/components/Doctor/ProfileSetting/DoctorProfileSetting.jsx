import React, { useEffect, useState } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { Button, Select, message } from "antd";
import { Link } from "react-router-dom";
import { useUpdateDoctorMutation } from "../../../redux/api/doctorApi";
import useAuthCheck from "../../../redux/hooks/useAuthCheck";
import { doctorSpecialistOptions } from "../../../constant/global";
import ImageUpload from "../../UI/form/ImageUpload";
import dImage from "../../../images/user.png";
import { DatePicker } from "antd";
import "../../../stylesheets/doctorStylesheets/ProfileSetting.css";

const { Option } = Select;

const DoctorProfileSetting = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [updateDoctor, { isLoading, isSuccess, isError, error }] =
    useUpdateDoctorMutation();
  const { data } = useAuthCheck();
  const { register, handleSubmit } = useForm({});
  const [userId, setUserId] = useState("");
  const [selectValue, setSelectValue] = useState({});
  const [date, setDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (data) {
      const { id, services } = data;
      setUserId(id);
      setSelectedItems(services?.split(","));
    }
  }, [data]);

  const handleChange = (value, name) => {
    setSelectValue({ ...selectValue, [name]: value });
  };

  const onChange = (date, dateString) => {
    setDate(moment(dateString).format());
  };

  const onSubmit = (data) => {
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
    updateDoctor({ data: formData, id: userId });
  };

  useEffect(() => {
    if (!isLoading && isError) {
      message.error(error?.data?.message);
    }
    if (isSuccess) {
      message.success("Successfully Changed Saved !");
    }
  }, [isLoading, isError, error, isSuccess]);

  return (
    <div className="profile-setting" style={{ marginBottom: "10rem" }}>
      <div className="w-100 mb-3 rounded mb-5 p-2">
        <h5 className="text-title mb-2 mt-3">Update Your Information</h5>
        <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-12 mb-5">
            <div className="form-group">
              <div className="change-avatar">
                <Link to={"/dashboard"} className="my-3 patient-img">
                  <img
                    src={selectedImage ? selectedImage : data?.img || dImage}
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
                placeholder="First Name"
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
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
              <label className="label-style">Email</label>
              <input
                defaultValue={data?.email}
                {...register("email")}
                className="text-input-field"
                placeholder="Email Address"
                disabled
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mb-2 card-label">
              <label className="label-style">Phone Number</label>
              <input
                defaultValue={data?.phone}
                {...register("phone")}
                className="text-input-field"
                placeholder="10 Digit Phone Number"
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
              <label className="label-style">
                Date of Birth {moment(data?.dob).format("LL")}
              </label>
              <DatePicker
                defaultValue={moment(data?.dob)}
                placeholder="Select DOB"
                onChange={onChange}
                format={"YYYY-MM-DD"}
                className="text-input-field date-picker"
                style={{ padding: "12px 16px" }}
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="card mb-2 mt-2">
              <div className="card-body">
                <h6 className="card-title text-secondary">About Me</h6>
                <div className="form-group mb-2 card-label">
                  <label className="label-style">Biography</label>
                  <textarea
                    defaultValue={data?.biography}
                    {...register("biography")}
                    className="text-input-field"
                    rows={5}
                    placeholder="Write a short biography about yourself..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card mb-2 p-3 mt-2">
              <h6 className="card-title text-secondary">Clinic Info</h6>
              <div className="row form-row">
                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label className="label-style">Clinic Name</label>
                    <input
                      defaultValue={data?.clinicName}
                      {...register("clinicName")}
                      className="text-input-field"
                      rows={5}
                      placeholder="Clinic Name"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label className="label-style">Clinic Address</label>
                    <input
                      type="text"
                      defaultValue={data?.clinicAddress}
                      {...register("clinicAddress")}
                      className="text-input-field"
                      placeholder="Clinic Address"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card mb-2 p-3 mt-2">
              <h6 className="card-title text-secondary">Contact Details</h6>
              <div className="row form-row">
                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label className="label-style">Address Line</label>
                    <input
                      defaultValue={data?.address}
                      {...register("address")}
                      className="text-input-field"
                      placeholder="Address Line"
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
                      placeholder="City"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label className="label-style">State / Province</label>
                    <input
                      defaultValue={data?.state}
                      {...register("state")}
                      className="text-input-field"
                      placeholder="State/Province"
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
                      placeholder="Country"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label className="label-style">Postal Code</label>
                    <input
                      defaultValue={data?.postalCode}
                      {...register("postalCode")}
                      className="text-input-field"
                      placeholder="Postal Code"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card mb-2 p-3 mt-2">
              <h6 className="card-title text-secondary">Social Media Links</h6>
              <div className="row form-row">
                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label className="label-style">LinkedIn</label>
                    <input
                      defaultValue={data?.linkedin}
                      {...register("linkedin")}
                      type="url"
                      className="text-input-field"
                      placeholder="Your LinkedIn Profile"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label className="label-style">Facebook</label>
                    <input
                      defaultValue={data?.facebook}
                      {...register("facebook")}
                      type="url"
                      className="text-input-field"
                      placeholder="Your Facebook Profile"
                    />
                  </div>
                </div>
              </div>
              <div className="row form-row">
                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label className="label-style">Instagram</label>
                    <input
                      defaultValue={data?.instagram}
                      {...register("instagram")}
                      type="url"
                      className="text-input-field"
                      placeholder="Your Instagram Profile"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label className="label-style">Twitter</label>
                    <input
                      defaultValue={data?.twitter}
                      {...register("twitter")}
                      type="url"
                      className="text-input-field"
                      placeholder="Your Twitter Profile"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card mb-2 p-3 mt-2">
              <h6 className="card-title text-secondary">Pricing</h6>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label className="label-style">Appointment Fee</label>
                    <input
                      defaultValue={data?.price}
                      {...register("price")}
                      type="number"
                      className="text-input-field"
                      placeholder="Appointment Fee"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card mb-2 p-3 mt-2">
              <h6 className="card-title text-secondary">
                Services and Specialization
              </h6>
              <div className="row form-row">
                <div className="form-group mb-2 card-label">
                  <label className="label-style">Services</label>
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%", height: "100px" }}
                    placeholder="Please select"
                    className="dropdown"
                    value={selectedItems}
                    onChange={setSelectedItems}
                    options={doctorSpecialistOptions}
                  />
                  <small className="form-text text-muted">
                    Note : Type & Press enter to add new services
                  </small>
                </div>
                <div className="form-group mb-2 card-label">
                  <label className="label-style">Specialization </label>
                  <input
                    defaultValue={data?.specialization}
                    {...register("specialization")}
                    className="input-tags text-input-field"
                    placeholder="Enter Specialization"
                  />
                  <small className="form-text text-muted">
                    Note : Type & Press enter to add new specialization
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card mb-2 p-3 mt-2">
              <h6 className="card-title text-secondary">Education</h6>
              <div className="row form-row">
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="form-group mb-2 card-label">
                    <label className="label-style">Degree</label>
                    <input
                      defaultValue={data?.degree}
                      {...register("degree")}
                      className="text-input-field"
                      placeholder="Degree"
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                  <div className="form-group mb-2 card-label">
                    <label className="label-style">College/Institute</label>
                    <input
                      defaultValue={data?.college}
                      {...register("college")}
                      className="text-input-field"
                      placeholder="College/Institute Name"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="form-group mb-2 card-label">
                    <label className="label-style">Year of Completion</label>
                    <input
                      defaultValue={data?.completionYear}
                      {...register("completionYear")}
                      className="text-input-field"
                      placeholder="Year of Completion"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card mb-2 p-3 mt-2">
              <h6 className="card-title text-secondary">Experience</h6>
              <div className="row form-row">
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="form-group mb-2 card-label">
                    <label className="label-style">Hospital Name</label>
                    <input
                      defaultValue={data?.experienceHospitalName}
                      {...register("experienceHospitalName")}
                      className="text-input-field"
                      placeholder="Hospital Name"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="form-group mb-2 card-label">
                    <label className="label-style">From</label>
                    <input
                      defaultValue={data?.experienceStart}
                      {...register("experienceStart")}
                      className="text-input-field"
                      placeholder="MM/DD/YYYY"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="form-group mb-2 card-label">
                    <label className="label-style">To</label>
                    <input
                      defaultValue={data?.experienceEnd}
                      {...register("experienceEnd")}
                      className="text-input-field"
                      placeholder="Present or MM/DD/YYYY"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="form-group mb-2 card-label">
                    <label className="label-style">Designation</label>
                    <input
                      defaultValue={data?.designation}
                      {...register("designation")}
                      className="text-input-field"
                      placeholder="Designation"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card mb-2 p-3 mt-2">
              <h6 className="card-title text-secondary">Awards</h6>
              <div className="row form-row">
                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label className="label-style">Awards</label>
                    <input
                      defaultValue={data?.award}
                      {...register("award")}
                      className="text-input-field"
                      placeholder="Award Name (if any)"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label className="label-style">Year</label>
                    <input
                      defaultValue={data?.awardYear}
                      {...register("awardYear")}
                      className="text-input-field"
                      placeholder="Year"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card mb-2 p-3 mt-2">
              <h6 className="card-title text-secondary">Registrations</h6>
              <div className="row form-row">
                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label className="label-style">Registrations</label>
                    <input
                      defaultValue={data?.registration}
                      {...register("registration")}
                      className="text-input-field"
                      placeholder="Registrations"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-2 card-label">
                    <label className="label-style">Year</label>
                    <input
                      defaultValue={data?.year}
                      {...register("year")}
                      className="text-input-field"
                      placeholder="Year of Registration"
                    />
                  </div>
                </div>
              </div>
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
              {isLoading ? "Saving ..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorProfileSetting;
