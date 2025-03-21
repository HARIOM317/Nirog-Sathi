import React from "react";
import DoctorDashCard from "./doctor/DoctorDashCard";
import useAuthCheck from "../../../redux/hooks/useAuthCheck";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import DashboardPage from "./doctor/DashboardPage";
import PatientDashboard from "./PatientDashboard";
import AdminDashboard from "../../Admin/Dashboard";

const Dashboard = () => {
  const { role } = useAuthCheck();
  return (
    <>
      {/* for admin */}
      {role === "admin" ? (
        <AdminDashboard />
      ) : (
        <DashboardLayout>
          {role === "doctor" && <DoctorDashCard />}

          <div className="row">
            {role === "patient" && (
              <div className="col-md-12 rounded">
                <h5 className="text-title my-3">My Appointments</h5>
                <PatientDashboard />
              </div>
            )}
            {role === "doctor" && (
              <div className="col-md-12 rounded">
                <h5 className="text-title">Appointments</h5>
                <DashboardPage />
              </div>
            )}
          </div>
        </DashboardLayout>
      )}
    </>
  );
};
export default Dashboard;
