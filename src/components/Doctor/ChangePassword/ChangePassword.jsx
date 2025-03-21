import React from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { Button } from "antd";
import "../../../stylesheets/doctorStylesheets/ChangePassword.css";

const ChangePassword = () => {
  return (
    <DashboardLayout>
      <div className="change-password">
        <h5 className="text-title mt-3 text-center">Change Your Password</h5>

        <form className="container row form-row px-3 mx-auto my-5 text-center">
          <div className="col-md-12">
            <div className="form-group mb-3">
              <input
                type="password"
                placeholder="Old Password"
                className="text-input-field"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group mb-3">
              <input
                type="password"
                placeholder="New Password"
                className="text-input-field"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group mb-2 ">
              <input
                type="password"
                placeholder="Confirm Password"
                className="text-input-field"
              />
            </div>
          </div>
          <div className="mt-5 text-center">
            <Button htmlType="submit" type="primary" size="large">
              Change Password
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ChangePassword;
