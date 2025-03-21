import React, { useEffect, useState } from "react";
import img from "../../../../images/user.png";
import { FaEye, FaCheck, FaTimes, FaBriefcaseMedical } from "react-icons/fa";
import {
  useGetDoctorAppointmentsQuery,
  useUpdateAppointmentMutation,
  useCancelAppointmentMutation, // Import the cancel mutation
} from "../../../../redux/api/appointmentApi";
import moment from "moment";
import { Button, message } from "antd";
import CustomTable from "../../../UI/component/CustomTable";
import { Tabs, Tag } from "antd";
import { Link } from "react-router-dom";
import "../../../../stylesheets/DashboardStyle.css";
import ReactGA from "react-ga4";

const DashboardPage = () => {
  const [sortBy, setSortBy] = useState("upcoming");
  const { data, refetch, isLoading } = useGetDoctorAppointmentsQuery({
    sortBy,
  });
  const [
    updateAppointment,
    { isError: isUpdateError, isSuccess: isUpdateSuccess, error: updateError },
  ] = useUpdateAppointmentMutation();
  const [
    cancelAppointment,
    { isError: isCancelError, isSuccess: isCancelSuccess, error: cancelError },
  ] = useCancelAppointmentMutation();

  const handleOnselect = (value) => {
    setSortBy(value === 1 ? "upcoming" : value === 2 ? "today" : sortBy);
    refetch();
  };

  const updatedApppointmentStatus = (data, type) => {
    const changeObj = {
      status: type,
    };
    if (type === "cancel" && data.id) {
      cancelAppointment(data.id); // Call the cancel appointment mutation
    } else if (data.id) {
      updateAppointment({ id: data.id, data: changeObj });
    }
  };

  const deleteHandler = async (id) => {
    message.loading("Cancelling ...");
    try {
      const res = await cancelAppointment(id).unwrap();
      message.success("Successfully Cancelled !!");
      refetch(); // Refetch the appointments after deletion
    } catch (error) {
      message.error(error.message || "Failed to Cancel the appointment");
    }
  };
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/",
      title: "Appointment Page Visit",
    });
  });
  useEffect(() => {
    if (isUpdateSuccess) {
      message.success("Successfully Appointment Updated");
    }
    if (isUpdateError) {
      message.error(updateError?.data?.message);
    }
    if (isCancelSuccess) {
      // message.success("Successfully Cancelled Appointment");
    }
    if (isCancelError) {
      message.error(cancelError?.data?.message);
    }
  }, [
    isUpdateSuccess,
    isUpdateError,
    updateError,
    isCancelSuccess,
    isCancelError,
    cancelError,
  ]);

  const upcomingColumns = [
    {
      title: "Profile",
      key: "1",
      render: function (data) {
        return (
          <>
            <div className="table-avatar">
              <img
                className="avatar-img rounded-circle"
                style={{ width: "30px", height: "30px", objectFit: "cover" }}
                src={data?.patient?.img ? data?.patient?.img : img}
                alt=""
              />
            </div>
          </>
        );
      },
    },
    {
      title: "Patient Name",
      key: "2",
      render: function (data) {
        return (
          <>
            <div>
              <p
                className="p-0 m-0 text-wrap"
                style={{ color: "var(--textColor)" }}
              >
                {data?.firstName + " " + data?.lastName}
              </p>
            </div>
          </>
        );
      },
    },
    {
      title: "Appointment Date",
      key: "3",
      width: 100,
      render: function (data) {
        return (
          <div>
            {moment(data?.scheduleDate).format("LL")}{" "}
            <span
              className="d-block"
              style={{ color: "var(--textLight)", fontWeight: "500" }}
            >
              {data?.scheduleTime}
            </span>
          </div>
        );
      },
    },
    {
      title: "Status",
      key: "4",
      render: function (data) {
        return (
          <Tag
            color="#ffcacb"
            style={{
              border: "1.5px solid #cc9b9c",
              fontWeight: "500",
              textTransform: "capitalize",
              padding: "4px 8px",
              color: "var(--textColor)",
              width: "100px",
              textAlign: "center",
            }}
          >
            {data?.status}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "5",
      render: function (data) {
        return (
          <div className="d-flex flex-column gap-2">
            {data.status === "pending" ? (
              <>
                <Button
                  icon={<FaCheck />}
                  size="medium"
                  className="accept-btn"
                  onClick={() => updatedApppointmentStatus(data, "accept")}
                >
                  Accept
                </Button>
                <Button
                  icon={<FaTimes />}
                  size="medium"
                  className="cancel-btn"
                  onClick={() => deleteHandler(data?.id)}
                >
                  Cancel
                </Button>
              </>
            ) : data.status === "accept" ? (
              <>
                <Link to={`/dashboard/appointment/treatment/${data?.id}`}>
                  <Button
                    icon={<FaBriefcaseMedical />}
                    size="medium"
                    className="treatment-btn"
                  >
                    Treatment
                  </Button>
                </Link>
              </>
            ) : (
              data.prescriptionStatus === "issued" && (
                <Link to={`/dashboard/prescription/${data?.prescription?.id}`}>
                  <Button icon={<FaEye />} size="medium" className="view-btn">
                    View
                  </Button>
                </Link>
              )
            )}
          </div>
        );
      },
    },
  ];

  const items = [
    {
      key: "1",
      label: "upcoming",
      children: (
        <CustomTable
          loading={isLoading}
          columns={upcomingColumns}
          dataSource={data}
          showPagination={true}
          pageSize={10}
          showSizeChanger={true}
        />
      ),
    },
    {
      key: "2",
      label: "today",
      children: (
        <CustomTable
          loading={isLoading}
          columns={upcomingColumns}
          dataSource={data}
          showPagination={true}
          pageSize={10}
          showSizeChanger={true}
        />
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} onChange={handleOnselect} />;
};

export default DashboardPage;
