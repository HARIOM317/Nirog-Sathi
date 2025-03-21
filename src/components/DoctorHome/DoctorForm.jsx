import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import "../../stylesheets/DoctorHome/DoctorForm.css";
import { useForm } from "react-hook-form";
import { useCreateMutation } from "../../redux/api/doctorQueryApi";
import { message } from "antd";

const DoctorForm = () => {
  const [createDoctorQuery, { isLoading, isError, error, isSuccess }] =
    useCreateMutation();

  const { reset } = useForm({});

  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const data = JSON.stringify(values);
    console.log(data);
    createDoctorQuery(values);
    reset();
  };

  useEffect(() => {
    // message.success("Loding......!");
    if (isSuccess) {
      message.success("Query Send Successfully !");
    }
    if (isError && error) {
      message.error(error?.data?.message);
    }
  }, [isSuccess, isError, error]);

  return (
    <section id="doctor-form" style={{ marginTop: 80 }} className="container">
      <div className="mb-4 section-title text-center">
        <h2>Join the NirogSathi Doctor Network</h2>
        <p style={{ color: "var(--textLight)" }}>
          Be a part of a revolution in digital healthcare. Join NirogSathi today
          and enhance your practice!
        </p>
      </div>

      <div className="doctor-form-container">
        <Form
          form={form}
          name="userForm"
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            name="mobileNumber"
            label="Mobile Number"
            rules={[
              { required: true, message: "Please enter your mobile number" },
            ]}
          >
            <Input placeholder="Enter your mobile number" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
                type: "email",
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input placeholder="Your clinic address" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Join Now for Free
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default DoctorForm;
