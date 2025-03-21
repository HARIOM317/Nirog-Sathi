import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SocialSignUp = () => {
  const [error] = useState({});
  const handleFacebookSignIn = () => {};
  const handleTwitterSignIn = () => {};
  const handleGoogleSignIn = () => {};
  const handleGitHubSignIn = () => {};

  return (
    <>
      <div className="social-media">
        <NavLink
          to={""}
          style={{ background: "#3b5998" }}
          className="social-icon"
        >
          <i className="bx bxl-facebook"></i>
        </NavLink>

        <NavLink
          to={""}
          style={{ background: "#4da6e9" }}
          className="social-icon"
        >
          <i className="bx bxl-twitter"></i>
        </NavLink>

        <NavLink
          to={""}
          style={{ background: "#bf211e" }}
          className="social-icon"
        >
          <i className="bx bxl-google"></i>
        </NavLink>

        <NavLink
          to={""}
          style={{ background: "#272727" }}
          className="social-icon"
        >
          <i className="bx bxl-github"></i>
        </NavLink>
      </div>
    </>
  );
};

export default SocialSignUp;
