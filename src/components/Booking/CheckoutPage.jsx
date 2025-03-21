import React, { useState } from "react";
import moment from "moment";
import img from "../../images/home/doctorProfile.jpg";
import { Link } from "react-router-dom";
import { Checkbox } from "antd";
import "../../stylesheets/bookingStylesheets/BookingCheckout.css";

const CheckoutPage = ({
  handleChange,
  selectValue,
  isCheck,
  setIsChecked,
  data,
  selectedDate,
  selectTime,
  paymentId,
  setpaymentId, 
  setOrderId,
}) => {
  const {
    paymentType
  } = selectValue;
  
  const handleCheck = () => {
    setIsChecked(!isCheck);
  };

  let price = data?.price ? data.price : 60;
  const gst = ((5 / 100) * Number(price)).toFixed(2);
  const totalAmount = Number(price) + 10 + Number(gst);

  const [amount, setAmount] = useState(0);
  const currency = "INR";
  const receiptId = "qwsaq1";

  const paymentHandler = async (e) => {
    setAmount(totalAmount);

    const response = await fetch("http://localhost:5000/api/v1/payment/order", {
      method: "POST",
      body: JSON.stringify({
        amount: totalAmount * 100,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const order = await response.json();
    console.log(order);

    const options = {
      key: "rzp_test_tsOXTyrWmubxpM",
      amount: totalAmount * 100,
      currency,
      name: "DocAppoint",
      description: "Test Transaction",
      image: "",
      order_id: order.id,
      handler: async function (response) {
        const body = {
          ...response,
        };
        const validateRes = await fetch("http://localhost:5000/api/v1/payment/order/validate", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const jsonRes = await validateRes.json();

        setpaymentId(jsonRes.paymentId);
        setOrderId(jsonRes.orderId)
        alert(jsonRes.msg);
      },
      prefill: {
        name: "Kapil Kumar",
        email: "kapilkumar@example.com",
        contact: "900000000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();

    e.preventDefault();
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-7">
          <div className="rounded p-10 payment-section">
            <div className="row">
              <div className="rounded p-10 invoice-section">
                {data && (
                  <Link
                    to={`/doctors/profile/${data?.id}`}
                    className="booking-doc-img d-flex justify-content-center mb-2"
                  >
                    <img src={data?.img === null ? img : data?.img} alt="" />
                  </Link>
                )}
                {data && (
                  <div className="doc-title-info mt-3 mb-3">
                    <h5 className="mt-3 text-center">
                      Dr. {data?.firstName + " " + data?.lastName}
                    </h5>
                    <div className="text-center">
                      <p className="form-text mb-0">{data?.designation}</p>
                      <p className="form-text mb-0">{data?.clinicAddress}</p>
                    </div>
                  </div>
                )}

                <div className="booking-item-wrap">
                  <ul className="booking-date">
                    <li>
                      Date <span>{moment(selectedDate).format("LL")}</span>
                    </li>
                    <li>
                      Time <span>{selectTime}</span>
                    </li>
                  </ul>
                  <ul className="booking-fee">
                    <li>
                      Consulting Fee <span>Rs. {price}</span>
                    </li>
                    <li>
                      Platform Fee <span>Rs. 10</span>
                    </li>
                    <li>
                      GST (Including 5%) <span>Rs. {gst}</span>
                    </li>
                  </ul>

                  <hr />

                  <ul className="booking-total">
                    <li className="d-flex justify-content-between">
                      <span className="fw-bold">Total</span>
                      <span className="total-cost">Rs. {totalAmount}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-5 col-sm-6">
          <div className="col-md-10 mb-4">
            <div className="payment-options">
              <div className="payment-radio credit-card-option">
                <input
                  type="radio"
                  name="paymentType"
                  value="razorpay"
                  onChange={(e) => handleChange(e)}
                  onClick={paymentHandler}
                  checked={paymentType === "razorpay"}
                  style={{ accentColor: "var(--primaryColor)" }}
                />
                <span className="ms-2"></span>
                <label>Payment Now</label>
              </div>
              <div className="payment-radio credit-card-option mt-4">
                <input
                  type="radio"
                  name="paymentType"
                  value="cash"
                  onChange={(e) => handleChange(e)}
                  checked={paymentType === "cash"}
                  style={{ accentColor: "var(--primaryColor)" }}
                />
                <span className="ms-2"></span>
                <label>Cash</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="terms-accept mt-5">
        <Checkbox
          checked={isCheck}
          onChange={handleCheck}
          htmlFor="terms_accept"
          style={{ fontSize: "1rem", color: "var(--textColor)" }}
        >
          {" "}
          I have read and accept{" "}
          <a
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "var(--primaryHoverColor)",
            }}
          >
            Terms & Conditions
          </a>
        </Checkbox>
      </div>
    </div>
  );
};

export default CheckoutPage;