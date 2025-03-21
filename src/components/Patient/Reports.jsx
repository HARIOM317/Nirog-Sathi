import React from "react";
import DashboardLayout from "../Doctor/DashboardLayout/DashboardLayout";
import { useGetPatientReportQuery } from "../../redux/api/reportApi";
import jwt_decode from "jwt-decode";
import { Table, Button, Image } from "antd";

const Reports = () => {
  const token = localStorage.getItem("accessToken");
  let userId = null;

  if (token) {
    const decodedToken = jwt_decode(token);
    userId = decodedToken?.userId;
  }

  console.log("User Id = ", userId);
  const { data, isLoading, isError } = useGetPatientReportQuery(userId);

  console.log("Report Data: ", data);

  const columns = [
    {
      title: "Doctor Image",
      dataIndex: ["doctor", "img"],
      key: "doctorImg",
      render: (text) => (
        <Image width={50} src={text} style={{ borderRadius: "50%" }} />
      ),
    },
    {
      title: "Doctor Name",
      dataIndex: ["doctor", "fullName"],
      key: "doctorName",
    },
    {
      title: "Clinic Name",
      dataIndex: ["doctor", "clinicName"],
      key: "clinicName",
    },
    {
      title: "Clinic Address",
      dataIndex: ["doctor", "clinicAddress"],
      key: "clinicAddress",
    },
    {
      title: "Report Title",
      dataIndex: "reportTitle",
      key: "reportTitle",
    },
    {
      title: "Download Report",
      key: "downloadReport",
      render: (_, record) => (
        <Button type="primary" href={record.uploadUrl} target="_blank">
          View
        </Button>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading reports</div>;

  return (
    <>
      <DashboardLayout>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          scroll={{
            x: 500,
          }}
        />
      </DashboardLayout>
    </>
  );
};

export default Reports;
