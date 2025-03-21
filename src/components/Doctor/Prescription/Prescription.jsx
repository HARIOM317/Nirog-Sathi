import DashboardLayout from '../DashboardLayout/DashboardLayout';
import CustomTable from '../../UI/component/CustomTable';
import { Button, Tag, message } from 'antd';
import { FaRegEye, FaEdit, FaRegTimesCircle } from "react-icons/fa";
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useDeletePrescriptionMutation, useGetAllPrescriptionsQuery } from '../../../redux/api/prescriptionApi';
import "../../../stylesheets/DashboardStyle.css";

const Prescription = () => {
  const { data, isLoading } = useGetAllPrescriptionsQuery();
  const [deleteBlog] = useDeletePrescriptionMutation();

  const columns = [
    {
      title: "Appointment Id",
      dataIndex: "appointment",
      key: 1,
      render: ({ trackingId }) => {
        return (
          <Tag
            color="#f50"
            style={{
              color: "#fff",
              border: "1.5px solid #cc4300",
              fontWeight: "500",
              textTransform: "capitalize",
              padding: "4px 8px",
            }}
          >
            {trackingId}
          </Tag>
        );
      },
    },
    {
      title: "Disease",
      sorter: true,
      dataIndex: "disease",
      key: 3,
    },
    {
      title: "Follow-Update",
      dataIndex: "followUpdate",
      key: 4,
      render: function (data) {
        return (
          <Tag
            color="#87d068"
            style={{
              color: "#fff",
              border: "1.5px solid #659d4e",
              fontWeight: "500",
              textTransform: "capitalize",
              padding: "4px 8px",
            }}
          >
            {dayjs(data).format("MMM D, YYYY hh:mm A")}
          </Tag>
        );
      },
    },
    {
      title: "Archived",
      dataIndex: "isArchived",
      key: 4,
      render: function ({ isArchived }) {
        return (
          <Tag
            color={isArchived ? "#f50" : "#108ee9"}
            style={{
              color: "#fff",
              border: "1.5px solid",
              borderColor: isArchived ? "#cc4300" : "#0c6eb5",
              fontWeight: "500",
              textTransform: "capitalize",
              padding: "4px 8px",
            }}
          >
            {isArchived ? "Yes" : "Under Treatment"}
          </Tag>
        );
      },
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: 5,
      sorter: true,
      render: function (data) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
    },
    {
      title: "Action",
      key: 4,
      render: function (data) {
        return (
          <div className="d-flex">
            <Link to={`/dashboard/prescription/${data.id}`}>
              <Button
                size="small"
                className="view-btn"
                style={{ margin: "5px", width: "30px", height: "30px" }}
              >
                <FaRegEye />
              </Button>
            </Link>
            <Link to={`/dashboard/appointment/treatment/edit/${data.id}`}>
              <Button
                size="small"
                className="treatment-btn"
                style={{ margin: "5px", width: "30px", height: "30px" }}
              >
                <FaEdit />
              </Button>
            </Link>
            <Button
              onClick={() => deleteHandler(data.id)}
              size="small"
              className="cancel-btn"
              style={{ margin: "5px", width: "30px", height: "30px", color: 'white' }}
              danger
            >
              <FaRegTimesCircle />
            </Button>
          </div>
        );
      },
    },
  ];

  const deleteHandler = async (id) => {
    message.loading("Deleting ...");
    try {
      const res = await deleteBlog(id);
      if (res) {
        message.success("Successfully Deleted !!");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-100 mb-3 rounded">
        <CustomTable
          loading={isLoading}
          columns={columns}
          dataSource={data}
          showPagination={true}
          pageSize={20}
          showSizeChanger={true}
        />
      </div>
    </DashboardLayout>
  );
};

export default Prescription;