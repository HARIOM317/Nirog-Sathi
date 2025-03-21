import React, { useEffect, useState } from "react";
import img from "../../../images/user.png";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { useGetDoctorPatientsQuery } from "../../../redux/api/appointmentApi";
import { useCreateReportMutation } from "../../../redux/api/reportApi";
import moment from "moment";
import {
  FaClock,
  FaEnvelope,
  FaLocationArrow,
  FaPhoneAlt,
} from "react-icons/fa";
import { Empty, Button, Modal, Form, Input, Upload, message } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import "../../../stylesheets/doctorStylesheets/MyPatient.css";
import jwt_decode from "jwt-decode";

const MyPatients = () => {
  const { data, isLoading, isError } = useGetDoctorPatientsQuery();
  const [
    createReport,
    { isLoading: reportIsLoading, isError: reportIsError, error, isSuccess },
  ] = useCreateReportMutation();

  const token = localStorage.getItem("accessToken");
  let userId = null;

  if (token) {
    const decodedToken = jwt_decode(token);
    userId = decodedToken?.userId;
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [form] = Form.useForm();

  const showModal = (patientId) => {
    setSelectedPatientId(patientId);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (file) {
        const { reportTitle } = values;

        const reportData = {
          reportTitle: reportTitle,
          patientId: selectedPatientId,
          doctorId: userId,
        };

        const formData = new FormData();
        formData.append("file", file.originFileObj); // Append the actual file object
        formData.append("data", JSON.stringify(reportData));

        // console.log("FormData:", formData.get("file"), formData.get("data"));
        await createReport(formData); // Make sure to await the mutation call

        form.resetFields();
        setFile(null);
        setIsModalVisible(false);
      } else {
        console.log("Please upload a document");
      }
    } catch (info) {
      console.log("Validate Failed:", info);
    }
  };

  useEffect(() => {
    if (!isLoading && isError) {
      message.error(error?.data?.message);
    }
    if (isSuccess) {
      message.success("Successfully Report Added !");
    }
  }, [isLoading, isError, error, isSuccess]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFileChange = (info) => {
    setFile(info.fileList[0]); // Set the file object from fileList
  };

  let content = null;
  if (!isLoading && isError) content = <div>Something Went Wrong!</div>;
  if (!isLoading && !isError && data?.length === 0) content = <Empty />;
  if (!isLoading && !isError && data?.length > 0)
    content = (
      <>
        {data &&
          data.map((item) => (
            <div
              key={item.id}
              className="my-patient col-xl-4 col-lg-6 col-md-12 col-sm-6 col-xs-12"
            >
              <div className="profile-card">
                <div className="image">
                  <img
                    className="profile-img"
                    alt=""
                    src={item?.img ? item?.img : img}
                  />
                </div>

                <h5>{item?.firstName + " " + item?.lastName}</h5>

                <div>
                  <p className="text-data">
                    <FaClock className="icon" />{" "}
                    {moment(item?.appointmentTime).format("MMM Do, YY")}{" "}
                  </p>

                  <p className="text-data">
                    <FaLocationArrow className="icon" />{" "}
                    {item?.address ? item?.address : "N/A"}
                  </p>

                  <p className="text-data">
                    <FaEnvelope className="icon" /> {item?.email}
                  </p>
                  <p className="text-data">
                    <FaPhoneAlt className="icon" />{" "}
                    {item?.mobile ? item?.mobile : "N/A"}
                  </p>
                </div>

                <div className="mt-3">
                  <Button
                    type="primary"
                    shape="round"
                    icon={<DownloadOutlined />}
                    size={"large"}
                    onClick={() => showModal(item.id)}
                  >
                    Upload Document
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </>
    );

  return (
    <DashboardLayout>
      <div className="row">{content}</div>
      <Modal
        title="Upload Document"
        visible={isModalVisible}
        okText={reportIsLoading ? "uploading report ..." : "upload"}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="upload_form">
          <Form.Item
            name="reportTitle"
            label="Title"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="uploadUrl"
            label="Document"
            rules={[{ required: true, message: "Please upload a document!" }]}
          >
            <Upload
              beforeUpload={() => false}
              onChange={handleFileChange}
              fileList={file ? [file] : []}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </DashboardLayout>
  );
};

export default MyPatients;
