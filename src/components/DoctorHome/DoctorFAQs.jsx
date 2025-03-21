import React, { useState } from "react";
import DoctorFAQ from "./DoctorFAQ";
import doctorFAQsAPI from "../../apis/doctorFAQsAPI";
import { Accordion } from "react-bootstrap";
import "../../stylesheets/homeStylesheets/FAQs.css";

const DoctorFAQs = () => {
  const [faq] = useState(doctorFAQsAPI);
  return (
    <>
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="mb-5 section-title text-center">
            <h2>FAQs</h2>
            <p style={{ color: "var(--textLight)" }}>
              Here is some FAQs for Doctors.
            </p>
          </div>

          <Accordion className="mt-2">
            {faq.map((element) => {
              const { id, question, answer } = element;
              return (
                <DoctorFAQ
                  id={id}
                  question={"Q. " + question}
                  answer={"Ans: " + answer}
                />
              );
            })}
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default DoctorFAQs;
