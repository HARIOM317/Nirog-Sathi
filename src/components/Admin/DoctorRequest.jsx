import React from "react";
import DashboardLayout from "../Doctor/DashboardLayout/DashboardLayout";
import {
  useGetAllDoctorQuery,
  useDeleteDoctorQueryMutation,
} from "../../redux/api/doctorQueryApi";
import { Table, Button, Popconfirm, message } from "antd";

const DoctorRequest = () => {
  const { data, isLoading, isError } = useGetAllDoctorQuery();
  const [deleteDoctor] = useDeleteDoctorQueryMutation();

  const handleDelete = async (id) => {
    try {
      await deleteDoctor(id).unwrap();
      message.success("Doctor deleted successfully");
    } catch (error) {
      message.error("Failed to delete doctor");
    }
  };

  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to delete this doctor?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading doctor requests</div>;

  return (
    <>
      <DashboardLayout>
        <Table columns={columns} dataSource={data} rowKey="id" />
      </DashboardLayout>
    </>
  );
};

export default DoctorRequest;
