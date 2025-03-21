import React, { useState, useEffect } from "react";
import { Popover } from "antd";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { Drawer, Button, Modal } from "antd";
import { useForm } from "react-hook-form";
import { Select } from "antd";
import { message } from "antd";
import adminAvatar from "../../../images/admin.png";
import useAuthCheck from "../../../redux/hooks/useAuthCheck";
import { useCreateEmergencyMutation } from "../../../redux/api/emergencyApi";
import {
  FaHome,
  FaPhoneAlt,
  FaAddressBook,
  FaBloggerB,
  FaSignInAlt,
} from "react-icons/fa";
import "../../../stylesheets/doctorStylesheets/ProfileSetting.css";

const HeaderNav = ({ open, setOpen, isLoggedIn, data, avatar, content }) => {
  const { register, handleSubmit, reset } = useForm({});
  const { role } = useAuthCheck();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectValue, setSelectValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [
    emergency,
    { isLoading: emergencyLoading, isError, error, isSuccess },
  ] = useCreateEmergencyMutation();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const obj = data;
    const newObj = { ...obj, ...selectValue };
    const formData = new FormData();
    const changedValue = Object.fromEntries(
      Object.entries(newObj).filter(([key, value]) => value !== "")
    );
    const changeData = JSON.stringify(changedValue);
    formData.append("data", changeData);
    const dataObject = JSON.parse(changeData);
    emergency(dataObject);
    reset();
  };

  useEffect(() => {
    if (!emergencyLoading && isError) {
      message.error(error?.data?.message);
      setIsLoading(false);
    }
    if (isSuccess) {
      message.success("Successfully Emergency Booked");
      setIsLoading(false);
    }
  }, [emergencyLoading, isError, error, isSuccess]);

  const { Option } = Select;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleChange = (value, name) => {
    setSelectValue({ ...selectValue, [name]: value });
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav id="navbar" className="navbar order-last order-lg-0">
        <ul>
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "nav-link scrollto active" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/digital-doctors"}
              className={({ isActive }) =>
                isActive ? "nav-link scrollto active" : ""
              }
            >
              For Doctors
            </NavLink>
          </li>
          {role !== "doctor" && role !== "admin" && (
            <li>
              <NavLink
                to={"/doctors"}
                className={({ isActive }) =>
                  isActive ? "nav-link scrollto active" : ""
                }
              >
                Book Appointment
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                isActive ? "nav-link scrollto active" : ""
              }
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                isActive ? "nav-link scrollto active" : ""
              }
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/blog"}
              className={({ isActive }) =>
                isActive ? "nav-link scrollto active" : ""
              }
            >
              Blog
            </NavLink>
          </li>

          {!isLoggedIn && (
            <li>
              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  isActive ? "nav-link scrollto active" : ""
                }
              >
                Login/Register
              </NavLink>
            </li>
          )}
        </ul>
        {isLoggedIn && (
          <div>
            <Popover content={content}>
              <div className="profileImage">
                <img
                  src={
                    data?.img
                      ? data?.img
                      : role === "admin"
                      ? adminAvatar
                      : avatar
                  }
                  alt=""
                  className="profileImage shadow img-fluid"
                />
              </div>
            </Popover>
          </div>
        )}
        <FaBars className="mobile-nav-toggle" onClick={showDrawer} />
      </nav>

      {/* Mobile drawer */}
      <Drawer
        placement={"right"}
        onClose={onClose}
        open={open}
        size={"default"}
        extra={
          <Button
            type="primary"
            onClick={onClose}
            style={{
              background: "var(--primaryColor)",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Close
          </Button>
        }
      >
        <ul className="mobile-menu-nav">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "nav-link scrollto active" : "nav-link"
              }
            >
              <FaHome className="icon" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/digital-doctors"}
              className={({ isActive }) =>
                isActive ? "nav-link scrollto active" : "nav-link"
              }
            >
              <i class="fa-solid fa-stethoscope icon"></i>
              For Doctors
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/doctors"}
              className={({ isActive }) =>
                isActive ? "nav-link scrollto active" : "nav-link"
              }
            >
              <i class="fa-solid fa-calendar-check icon"></i>
              Book Appointment
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                isActive ? "nav-link scrollto active" : "nav-link"
              }
            >
              <FaAddressBook className="icon" />
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                isActive ? "nav-link scrollto active" : "nav-link"
              }
            >
              <FaPhoneAlt className="icon" />
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/blog"}
              className={({ isActive }) =>
                isActive ? "nav-link scrollto active" : "nav-link"
              }
            >
              <FaBloggerB className="icon" />
              Blog
            </NavLink>
          </li>

          {!isLoggedIn && (
            <li>
              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  isActive ? "nav-link scrollto active" : "nav-link"
                }
              >
                <FaSignInAlt className="icon" />
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </Drawer>

      {/* Emergency Appointment Modal */}
      <Modal
        title="Book Emergency Appointment"
        open={isModalOpen}
        disabled={isLoading ? true : false}
        okText={isLoading ? "Loading..." : "Book Appointment"}
        onOk={handleSubmit(onSubmit)}
        onCancel={handleCancel}
      >
        <div className="profile-setting">
          <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-md-12">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Patient Name <span className="text-danger">*</span>
                </label>
                <input
                  className="text-input-field"
                  {...register("patientName")}
                  placeholder="Patient Name"
                />
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Phone Number <span className="text-danger">*</span>
                </label>
                <input
                  className="text-input-field"
                  placeholder="Phone Number"
                  {...register("mobile")}
                />
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  City <span className="text-danger">*</span>
                </label>
                <input
                  className="text-input-field"
                  placeholder="City"
                  {...register("city")}
                />
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Address <span className="text-danger">*</span>
                </label>
                <input
                  className="text-input-field"
                  placeholder="Address"
                  {...register("address")}
                />
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Emergency Type <span className="text-danger">*</span>
                </label>

                <Select
                  defaultValue={"Emergency"}
                  className="dropdown"
                  onChange={(value) => handleChange(value, "subject")}
                  placeholder="Select Emergency"
                  style={{ marginTop: "15px" }}
                >
                  <Option value="Cardiologist">
                    Crushing chest pain, difficulty breathing
                  </Option>
                  <Option value="Nueuologist">
                    Sudden face drooping, difficulty speaking, weakness or
                    numbness
                  </Option>
                  <Option value="General Surgeon">
                    Heavy bleeding after an injury or accident
                  </Option>
                  <Option value="Toxicologist">
                    Poisoning, swallowing something you shouldn't have
                  </Option>
                  <Option value=" Emergency Medicine Physician.">
                    Seizure, inability to stay alert and awake
                  </Option>
                  <Option value="Allergist">
                    Sudden facial, mouth, or throat swelling
                  </Option>
                </Select>
              </div>
            </div>
            {/* <div className="text-center my-3">
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                loading={isLoading}
                disabled={isLoading ? true : false}
              >
                {isLoading
                  ? "finding available ambulances ..."
                  : "Emergency Booking"}
              </Button>
            </div> */}
          </form>
        </div>
      </Modal>
    </>
  );
};

export default HeaderNav;
