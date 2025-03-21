import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import SocialSignUp from "./SocialSignUp";
import Spinner from "react-bootstrap/Spinner";
import swal from "sweetalert";
import {
  useDoctorSignUpMutation,
  usePatientSignUpMutation,
} from "../../redux/api/authApi";
import { message } from "antd";
import ReCAPTCHA from "react-google-recaptcha";

const SignUp = ({ handleSignInMobileClick, setSignUp }) => {
  const [error, setError] = useState({});
  const [infoError, setInfoError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const formField = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(formField);
  const [userType, setUserType] = useState("patient");
  const [
    doctorSignUp,
    {
      data: dData,
      isSuccess: dIsSuccess,
      isError: dIsError,
      error: dError,
      isLoading: dIsLoading,
    },
  ] = useDoctorSignUpMutation();
  const [
    patientSignUp,
    {
      data: pData,
      isSuccess: pIsSuccess,
      isError: pIsError,
      error: pError,
      isLoading: pIsLoading,
    },
  ] = usePatientSignUpMutation();
  const [passwordValidation, setPasswordValidation] = useState({
    carLength: false,
    specailChar: false,
    upperLowerCase: false,
    numeric: false,
  });

  const handleSignUpSuccess = () => {
    setLoading(false);
    setUser(formField);
  };
  useEffect(() => {
    // doctor account
    if (dIsError && dError) {
      message.error("Email Already Exist !!");
      setLoading(false);
    }

    if (!dIsError && dIsSuccess) {
      handleSignUpSuccess();
      setLoading(false);
      setLoading(false);
      swal({
        icon: "success",
        text: `Successfully Account Created Please Verify Your email`,
        timer: 5000,
      });
    }

    // Patient account
    if (pIsError && pError) {
      message.error("Email Already Exist !!");
      setLoading(false);
    }
    if (!pIsError && pIsSuccess) {
      handleSignUpSuccess();
      setLoading(false);
      setSignUp(false);
      swal({
        icon: "success",
        text: `Successfully ${
          userType === "doctor" ? "Doctor" : "Patient"
        } Account Created Please Login`,
        timer: 2000,
      });
    }
  }, [
    dIsError,
    dError,
    pError,
    pIsError,
    ,
    pIsLoading,
    dIsLoading,
    pData,
    dData,
    setSignUp,
    setLoading,
    dIsSuccess,
  ]);

  const [emailError, setEmailError] = useState({
    emailError: false,
  });

  const handleEmailError = (name, value) => {
    if (name === "email") {
      setEmailError({
        emailError: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      });
    }
  };
  const hanldeValidation = (name, value) => {
    if (name === "password") {
      setPasswordValidation({
        carLength: value.length > 8,
        specailChar: /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value),
        upperLowerCase: /^(?=.*[a-z])(?=.*[A-Z])/.test(value),
        numeric: /^(?=.*\d)/.test(value),
      });
    }
  };

  const hanldeOnChange = (e) => {
    let { name, value } = e.target;
    hanldeValidation(name, value);
    handleEmailError(name, value);
    let isPassValid = true;

    if (value === "email") {
      isPassValid = /\S+@\S+\.\S+/.test(value);
    }
    if (value === "password") {
      isPassValid =
        value.length > 8 &&
        /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value) &&
        /^(?=.*[a-z])(?=.*[A-Z])/.test(value) &&
        /^(?=.*\d)/.test(value);
    }
    if (isPassValid) {
      const newPass = { ...user };
      newPass[name] = value;
      setUser(newPass);
    }
  };

  const hanldeOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (userType === "doctor") {
      doctorSignUp(user);
    } else {
      patientSignUp(user);
    }
  };

  const onCaptchaHandle = () => {
    setCaptchaChecked(true);
  };

  return (
    <>
      {/* Sign Up Form */}
      <form className="sign-up-form" onSubmit={hanldeOnSubmit}>
        <h2 className="title">Sign Up</h2>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
            placeholder="First Name"
            name="firstName"
            type="text"
            onChange={(e) => hanldeOnChange(e)}
            value={user.firstName}
          />
        </div>

        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
            placeholder="Last Name"
            name="lastName"
            type="text"
            onChange={(e) => hanldeOnChange(e)}
            value={user.lastName}
          />
        </div>

        <div className="input-field">
          <i className="fas fa-envelope"></i>
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={(e) => hanldeOnChange(e)}
            value={user.email}
          />
        </div>

        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => hanldeOnChange(e)}
            value={user.password}
          />
        </div>

        {/* Captcha */}
        <ReCAPTCHA
          sitekey="6LdQGfQpAAAAAKiIJaBrCcvUCGuwIPLR0N4ENyhs"
          onChange={onCaptchaHandle}
          style={{ margin: "1rem" }}
        />

        {error.length && <h6 className="text-danger text-center">{error}</h6>}
        {infoError && <h6 className="text-danger text-center">{infoError}</h6>}
        <button
          type="submit"
          className="btn btn-primary btn-block mt-2 btn"
          style={{ boxShadow: "none" }}
          disabled={
            passwordValidation.carLength &&
            passwordValidation.numeric &&
            passwordValidation.upperLowerCase &&
            passwordValidation.specailChar &&
            emailError.emailError &&
            captchaChecked
              ? ""
              : true
          }
        >
          {loading ? (
            <Spinner
              animation="border"
              variant="info"
              role="status"
              className="spinner-border text-light"
            />
          ) : (
            "Sign Up"
          )}
        </button>

        {/* Password Validation */}
        <div className="password-validatity mx-auto">
          <div
            style={
              emailError.emailError ? { color: "green" } : { color: "red" }
            }
          >
            <p>
              {passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
              <span className="ms-2">Must Have Valid Email.</span>
            </p>
          </div>

          <div
            style={
              passwordValidation.carLength
                ? { color: "green" }
                : { color: "red" }
            }
          >
            <p>
              {passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
              <span className="ms-2">
                Password Must Have atlast 8 character.
              </span>
            </p>
          </div>

          <div
            style={
              passwordValidation.specailChar
                ? { color: "green" }
                : { color: "red" }
            }
          >
            <p>
              {passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
              <span className="ms-2">
                Password Must Have a special cracter.
              </span>
            </p>
          </div>

          <div
            style={
              passwordValidation.upperLowerCase
                ? { color: "green" }
                : { color: "red" }
            }
          >
            <p>
              {passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
              <span className="ms-2">
                Password Must Have uppercase and lower case.
              </span>
            </p>
          </div>

          <div
            style={
              passwordValidation.numeric ? { color: "green" } : { color: "red" }
            }
          >
            <p>
              {passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
              <span className="ms-2">Password Must Have Number.</span>
            </p>
          </div>
        </div>

        <small className="social-text">Or Sign up with social platforms</small>

        <SocialSignUp />

        <p className="account-text">
          Already have an account?{" "}
          <a
            href=""
            id="sign-in-btn2"
            style={{ color: "var(--primaryHoverColor)" }}
            onClick={handleSignInMobileClick}
          >
            Sign In
          </a>
        </p>
      </form>
    </>
  );
};

export default SignUp;
