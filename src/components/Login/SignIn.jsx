import React, { useState, useEffect } from "react";
import SocialSignUp from "./SocialSignUp";
import { useForm } from "react-hook-form";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import {
  useResetPasswordMutation,
  useUserLoginMutation,
} from "../../redux/api/authApi";
import { message } from "antd";
import { useMessageEffect } from "../../utils/messageSideEffect";
import ReCAPTCHA from "react-google-recaptcha";


const SignIn = ({ handleSignUpMobileClick }) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [infoError, setInfoError] = useState("");
  const [show, setShow] = useState(true);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [userLogin, { isError, isLoading, isSuccess, error }] =
    useUserLoginMutation();
  const [forgotEmail, setForgotEmail] = useState("");
  const [
    resetPassword,
    {
      isError: resetIsError,
      isSuccess: resetIsSuccess,
      error: resetError,
      isLoading: resetIsLoading,
    },
  ] = useResetPasswordMutation();

  setTimeout(() => {
    setShow(false);
  }, 10000);

  const onSubmit = async (event) => {
    userLogin({ ...event });
  };

  const onHandleForgotPassword = async (e) => {
    e.preventDefault();
    resetPassword({ email: forgotEmail });
    setForgotEmail("");
    setShowForgotPassword(false);
  };
  useMessageEffect(
    resetIsLoading,
    resetIsSuccess,
    resetIsError,
    resetError,
    "Successfully Reset Password, Please check your Email!!"
  );
  useEffect(() => {
    if (isError) {
      message.error(error?.data?.message);
      setInfoError(error?.data?.message);
    }
    if (isSuccess) {
      message.success("Successfully Logged in");
      navigate("/");
    }
  }, [isError, error, isSuccess, navigate]);

  const handleShowForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  const onCaptchaHandle = () => {
    setCaptchaChecked(true);
  };

  return showForgotPassword ? (
    <>
      <form className="sign-in-form" onSubmit={onHandleForgotPassword}>
        <h2 className="title" style={{ marginBottom: "3rem" }}>
          Forgot Password
        </h2>
        <div
          style={{
            color: "var(--textLight)",
            textAlign: "center",
            marginBottom: "0.5rem",
          }}
        >
          To Forgot Your Password Please Enter your email
        </div>

        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
            value={forgotEmail !== undefined && forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            placeholder="Enter Your Email"
            type="email"
            required
          />
        </div>

        <div
          onClick={handleShowForgotPassword}
          className="text-bold"
          style={{
            cursor: "pointer",
            color: "var(--primaryHoverColor)",
            width: "100%",
            textAlign: "end",
            marginRight: "2.5rem",
            padding: "0.25rem 0 0.5rem 0.5rem",
          }}
        >
          Still Remember Password ?
        </div>

        <button
          className="btn"
          type="submit"
          value="sign In"
          style={{ marginTop: "2rem", boxShadow: "none" }}
        >
          {resetIsLoading ? (
            <Spinner
              animation="border"
              variant="info"
              role="status"
              className="spinner-border text-light"
            />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </>
  ) : (
    <>
      <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="title">Sign In</h2>
        <div className="input-field">
          <i class="fa-solid fa-envelope"></i>
          <input
            {...register("email", { required: true })}
            placeholder="Enter Your Email"
            type="email"
          />
        </div>
        {errors.email && (
          <span
            className="text-danger"
            style={{
              width: "100%",
              textAlign: "start",
              marginLeft: "3rem",
              padding: "0.5rem",
            }}
          >
            Email is required
          </span>
        )}

        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Enter Your Password"
          />
        </div>
        {errors.password && (
          <span
            className="text-danger"
            style={{
              width: "100%",
              textAlign: "start",
              marginLeft: "3rem",
              padding: "0.5rem",
            }}
          >
            Password is required
          </span>
        )}

        {infoError && <p className="text-danger">{infoError}</p>}
        <div
          onClick={handleShowForgotPassword}
          className="text-bold"
          style={{
            cursor: "pointer",
            color: "var(--primaryHoverColor)",
            width: "100%",
            textAlign: "end",
            marginRight: "2.5rem",
            padding: "0.25rem 0 0.5rem 0.5rem",
          }}
        >
          Forgot Password ?
        </div>

        {/* Captcha */}
        <ReCAPTCHA
          sitekey="6LdQGfQpAAAAAKiIJaBrCcvUCGuwIPLR0N4ENyhs"
          onChange={onCaptchaHandle}
          style={{ margin: "1rem" }}
        />

        <button
          className="btn"
          type="submit"
          value="sign In"
          style={{ marginBottom: "3rem", boxShadow: "none" }}
          disabled={captchaChecked ? "" : true}
        >
          {isLoading ? (
            <Spinner
              animation="border"
              variant="info"
              role="status"
              className="spinner-border text-light"
            />
          ) : (
            "Sign In"
          )}
        </button>

        <p className="social-text">Or Sign in with social platforms</p>

        <SocialSignUp />

        <p className="account-text">
          Don't have an account?{" "}
          <a
            href=""
            id="sign-up-btn2"
            style={{ color: "var(--primaryHoverColor)" }}
            onClick={handleSignUpMobileClick}
          >
            Sign Up
          </a>
        </p>
      </form>
    </>
  );
};

export default SignIn;
