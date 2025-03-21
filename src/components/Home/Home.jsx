import React, { useState } from "react";
import Footer from "../Shared/Footer/Footer";
import Testimonial from "./Testimonial";
import BookDoctor from "./BookDoctor";
import Header from "../Shared/Header/Header";
import HomePageHeader from "./HomePageHeader";
import FAQs from "./FAQs";
import Specialization from "./Specialazation";
import ProcessDesign from "./ProcessDesign";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <>
      <Header />
      <HomePageHeader />
      <ProcessDesign />
      <Specialization category={category} setCategory={setCategory} />
      <BookDoctor category={category} />
      <Testimonial />
      <FAQs />
      <Footer />
    </>
  );
};

export default Home;
