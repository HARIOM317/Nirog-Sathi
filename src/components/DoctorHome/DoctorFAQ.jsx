import React from "react";
import { Accordion } from "react-bootstrap";

const DoctorFAQ = (props) => {
  return (
    <>
      <Accordion.Item eventKey={props.id} className="my-3 item">
        <Accordion.Header>{props.question}</Accordion.Header>

        <Accordion.Body>{props.answer}</Accordion.Body>
      </Accordion.Item>
    </>
  );
};

export default DoctorFAQ;
