import express from 'express';
const router = express.Router();
const Razorpay = require("razorpay");
import { Payment } from "@prisma/client";
import prisma from "../../../shared/prisma";
const crypto = require("crypto");
require("dotenv").config();

// order send server on razorpay  

router.post("/order", async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_API_KEY,
            key_secret: process.env.RAZORPAY_APT_SECRET,
        });

        const options = req.body;
        const order = await razorpay.orders.create(options);

        if (!order) {
            return;
        }
        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});

// Verify Payment Signature 

router.post("/order/validate", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_APT_SECRET);
    // order_id + "|" + razorpay_payment_id, secret
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
        return res.status(400).json({ msg: "Transection is not valid !!!" });
    }
    res.json({
        msg: "Payment successfull",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
    });

});

router.get("/revenue",async (req, res)=>{
    const result = await prisma.payment.findMany();
    return result;
});

export const PaymentRouter = router;