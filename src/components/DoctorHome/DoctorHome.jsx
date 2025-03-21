import React, { useState } from "react";
import Footer from "../Shared/Footer/Footer";
import Testimonial from "../Home/Testimonial";
import Header from "../Shared/Header/Header";
import WhyUseNirogSathi from "./WhyUseNirogSathi";
import DoctorHeroSection from "./DoctorHeroSection";
import DoctorForm from "./DoctorForm";
import DoctorFAQs from "./DoctorFAQs";
import { Helmet } from "react-helmet-async";

const DoctorHome = () => {
  const [category, setCategory] = useState("All");

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          NirogSathi for Doctors: Streamline Your Practice & Reach Millions
        </title>
        <meta
          name="description"
          content="Transform your practice with Nirog Sathi. Manage efficiently, connect with peers, and reach millions of patients online and offline. Discover healthcare's future today."
        />
        <meta
          name="keywords"
          content="Practice management for doctors, Healthcare professional network, Patient-doctor connection, Register as a doctor, Reach patients online, Healthcare solutions for doctors, Nirog Sathi registration, Reach patients online"
        />
        <link rel="canonical" href="https://nirogsathi.com/digital-doctors" />
      </Helmet>

      <Header />
      <DoctorHeroSection />
      <WhyUseNirogSathi />
      <Testimonial />
      <DoctorForm />
      <DoctorFAQs />
      <Footer />
    </>
  );
};

export default DoctorHome;
