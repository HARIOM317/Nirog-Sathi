import React, { useState } from "react";
import FAQ from "./FAQ";
import faqAPI from "../../apis/faqAPI";
import { Accordion } from "react-bootstrap";
import "../../stylesheets/homeStylesheets/FAQs.css";

const FAQs = () => {
  const [faq] = useState(faqAPI);
  return (
    <>
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="mb-5 section-title text-center">
            <h2>FAQs</h2>
            <p style={{ color: "var(--textLight)" }}>Here is some FAQs.</p>
          </div>

          <Accordion className="mt-2">
            {faq.map((element) => {
              const { id, question, answer } = element;
              return (
                <FAQ
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

export default FAQs;
