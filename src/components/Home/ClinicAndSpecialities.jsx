import React from "react";
import "../../stylesheets/homeStylesheets/ClinicAndSpecialties.css";

import general_physician from "../../images/specialization/general_physician.png";
import dentist from "../../images/specialization/dentist.png";
import cardiologist from "../../images/specialization/cardiologist.png";
import ent from "../../images/specialization/ent.png";
import orthopedic_surgeon from "../../images/specialization/orthopedic_surgeon.png";
import pediatrician from "../../images/specialization/pediatrician.png";
import ophthalmologist from "../../images/specialization/ophthalmologist.png";
import gastroenterologist from "../../images/specialization/gastroenterologist.png";
import dermatologist from "../../images/specialization/dermatologist.png";
import general_surgeon from "../../images/specialization/general_surgeon.png";
import gynecologist from "../../images/specialization/gynecologist.png";
import neurologist from "../../images/specialization/neurologist.png";

const ClinicAndSpecialities = () => {
  return (
    <section
      className="container section-specialities position-relative"
      style={{ marginTop: 80 }}
    >
      <div className="container-fluid">
        <div className="mb-5 section-title text-center">
          <h2>Clinic and Specialties</h2>
          <p style={{ color: "var(--textLight)" }}>
            Here is Specialties of our clinics, you can choose the one
          </p>
        </div>

        <div className="row">
          <div className="speicality-item text-center col-lg-2 col-md-4 col-sm-6 col-6">
            <div className="speicality-img">
              <img src={general_physician} className="img-fluid" alt="" />
            </div>
            <p>General Physician</p>
          </div>
          <div className="speicality-item text-center col-lg-2 col-md-4 col-sm-6 col-6">
            <div className="speicality-img">
              <img src={dentist} className="img-fluid" alt="" />
            </div>
            <p>Dentist</p>
          </div>
          <div className="speicality-item text-center col-lg-2 col-md-4 col-sm-6 col-6">
            <div className="speicality-img">
              <img src={cardiologist} className="img-fluid" alt="" />
            </div>
            <p>Cardiologist</p>
          </div>
          <div className="speicality-item text-center col-lg-2 col-md-4 col-sm-6 col-6">
            <div className="speicality-img">
              <img src={ent} className="img-fluid" alt="" />
            </div>
            <p>ENT</p>
          </div>
          <div className="speicality-item text-center col-lg-2 col-md-4 col-sm-6 col-6">
            <div className="speicality-img">
              <img src={orthopedic_surgeon} className="img-fluid" alt="" />
            </div>
            <p>Orthopedic Surgeon</p>
          </div>
          <div className="speicality-item text-center col-lg-2 col-md-4 col-sm-6 col-6">
            <div className="speicality-img">
              <img src={pediatrician} className="img-fluid" alt="" />
            </div>
            <p>Pediatrician</p>
          </div>
          <div className="speicality-item text-center col-lg-2 col-md-4 col-sm-6 col-6">
            <div className="speicality-img">
              <img src={ophthalmologist} className="img-fluid" alt="" />
            </div>
            <p>Ophthalmologist</p>
          </div>
          <div className="speicality-item text-center col-lg-2 col-md-4 col-sm-6 col-6">
            <div className="speicality-img">
              <img src={gastroenterologist} className="img-fluid" alt="" />
            </div>
            <p>Gastroenterologist</p>
          </div>
          <div className="speicality-item text-center col-lg-2 col-md-4 col-sm-6 col-6">
            <div className="speicality-img">
              <img src={dermatologist} className="img-fluid" alt="" />
            </div>
            <p>Dermatologist</p>
          </div>
          <div className="speicality-item text-center col-lg-2 col-md-4 col-sm-6 col-6">
            <div className="speicality-img">
              <img src={general_surgeon} className="img-fluid" alt="" />
            </div>
            <p>General Surgeon</p>
          </div>
          <div className="speicality-item text-center col-lg-2 col-md-4 col-sm-6 col-6">
            <div className="speicality-img">
              <img src={gynecologist} className="img-fluid" alt="" />
            </div>
            <p>Gynecologist</p>
          </div>
          <div className="speicality-item text-center col-lg-2 col-md-4 col-sm-6 col-6">
            <div className="speicality-img">
              <img src={neurologist} className="img-fluid" alt="" />
            </div>
            <p>Neurologist</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicAndSpecialities;
