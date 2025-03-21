import React from "react";
import { useGetDoctorInvoicesQuery } from "../../../redux/api/appointmentApi";
import CustomTable from "../../UI/component/CustomTable";
import { Button } from "antd";
import moment from "moment";
import img from "../../../images/user.png";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const DoctorInvoice = () => {
  const { data, isLoading } = useGetDoctorInvoicesQuery();
  const columns = [
    {
      title: "Patient",
      key: "1",
      width: 150,
      render: function(data) {
        return (
          <div className="table-avatar">
            <a className="avatar avatar-sm mr-2 d-flex gap-2">
              <img
                className="avatar-img rounded-circle"
                style={{
                  width: "30px",
                  height: "30px",
                  minWidth: "30px",
                  minHeight: "30px",
                  objectFit: "cover",
                }}
                src={
                  data?.appointment?.patient?.img
                    ? data?.appointment?.patient?.img
                    : img
                }
                alt=""
              />
              <p
                className="p-0 m-0 text-wrap"
                style={{ color: "var(--textColor)" }}
              >
                {data?.appointment?.firstName +
                  " " +
                  data?.appointment?.lastName}
              </p>
            </a>
          </div>
        );
      },
    },
    {
      title: <div className="text-nowrap">Payment Type</div>,
      key: "2",
      width: 120,
      dataIndex: "paymentType",
    },
    {
      title: "Paid On",
      key: "3",
      width: 150,
      render: function(data) {
        return (
          <div className="text-nowrap">
            {moment(data?.createdAt).format("LL")}
          </div>
        );
      },
    },
    {
      title: "OrderId",
      key: "4",
      width: 150,
      render: function(data) {
        return <div>{data?.OrderId ? data?.OrderId : "Cash"}</div>;
      },
    },
    {
      title: "Paid",
      key: "5",
      width: 100,
      render: function(data) {
        return <div>&#8377;{data?.totalAmount}</div>;
      },
    },
    {
      title: "Action",
      key: "6",
      width: 100,
      render: function(data) {
        return (
          <Link to={`/booking/invoice/${data?.appointmentId}`}>
            <Button type="primary" icon={<FaEye />} size="medium" />
          </Link>
        );
      },
    },
  ];
  return (
    <DashboardLayout>
      <div className="w-100 mb-3 rounded">
        <CustomTable
          loading={isLoading}
          columns={columns}
          dataSource={data}
          showPagination={true}
          pageSize={10}
          showSizeChanger={true}
        />
      </div>
    </DashboardLayout>
  );
};
export default DoctorInvoice;
