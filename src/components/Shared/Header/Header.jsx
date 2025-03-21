import { useEffect, useState } from "react";
import "../../../stylesheets/Navbar.css";
import useAuthCheck from "../../../redux/hooks/useAuthCheck";
import { Link, useNavigate } from "react-router-dom";
import img from "../../../images/logo.png";
import avatar from "../../../images/user.png";
import { Button, message } from "antd";
import { loggedOut } from "../../../service/auth.service";
import HeaderNav from "./HeaderNav";

const Header = () => {
  const navigate = useNavigate();
  const { role } = useAuthCheck();
  const { authChecked, data } = useAuthCheck();
  const [isLoggedIn, setIsLogged] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    authChecked && setIsLogged(true);
  }, [authChecked]);

  const handleSignOut = () => {
    loggedOut();
    message.success("Successfully Logged Out");
    setIsLogged(false);
    navigate("/");
  };

  const content = (
    <div className="nav-popover">
      <div className="my-2">
        <h5 className="text-capitalize">
          {data?.firstName || "Administrator"}{" "}
          {data?.lastName || ""}
        </h5>
        <p className="my-0">{data?.email}</p>
        <Link to={role === "admin" ? "/admin/dashboard" : "/dashboard"}>
          Dashboard
        </Link>
      </div>
      <Button
        variant="outline-danger"
        className="w-100 logout-btn"
        size="sm"
        onClick={handleSignOut}
      >
        Logged Out
      </Button>
    </div>
  );
  return (
    <>
      <header id="header" className="fixed-top stickyHeader">
        <div className="container d-flex align-items-center">
          <Link to={"/"} className="logo me-auto">
            <img src={img} alt="" className="img-fluid" />
          </Link>
          <HeaderNav
            isLoggedIn={isLoggedIn}
            data={data}
            avatar={avatar}
            content={content}
            open={open}
            setOpen={setOpen}
          />
          {/* {role === "patient" && (
            <Link to={"/doctors"} className="appointment-btn scrollto">
              <span className="d-none d-md-inline">Make an</span> Appointment
            </Link>
          )} */}
        </div>
      </header>
    </>
  );
};

export default Header;
