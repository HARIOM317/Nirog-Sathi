import { useEffect, useState } from "react";
import useAuthCheck from "../../redux/hooks/useAuthCheck";

const PersonalInformation = ({
  handleChange,
  selectValue,
  setPiCheck,
  PiCheck,

  setPatientId = () => {},
}) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    reasonForVisit,
    description,
    address,
  } = selectValue;
  const [checked] = useState(true);
  const { data } = useAuthCheck();

  useEffect(() => {
    if (data) {
      setPiCheck(!PiCheck);
      if (data.id) {
        setPatientId(data.id);
      }

      const newValues = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.mobile,
        address: data.address,
      };
      for (const [key, value] of Object.entries(newValues)) {
        handleChange({ target: { name: key, value: value } });
      }
    }
  }, [checked, data, setPatientId]);

  return (
    <form className="rounded p-3 mt-5">
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="form-group mb-4">
            <input
              onChange={(e) => handleChange(e)}
              name="firstName"
              value={firstName && firstName}
              className="text-form-input-field"
              placeholder="First Name"
              type="text"
            />
          </div>
        </div>

        <div className="col-md-6 col-sm-12">
          <div className="form-group mb-4">
            <input
              onChange={(e) => handleChange(e)}
              name="lastName"
              value={lastName && lastName}
              className="text-form-input-field"
              placeholder="Last Name"
              type="text"
            />
          </div>
        </div>

        <div className="col-md-6 col-sm-12">
          <div className="form-group mb-4">
            <input
              onChange={(e) => handleChange(e)}
              name="email"
              value={email && email}
              className="text-form-input-field"
              placeholder="Email"
              type="email"
            />
          </div>
        </div>

        <div className="col-md-6 col-sm-12">
          <div className="form-group mb-4">
            <input
              onChange={(e) => handleChange(e)}
              name="phone"
              value={phone && phone}
              className="text-form-input-field"
              placeholder="Phone"
              type="text"
            />
          </div>
        </div>

        <div className="col-md-12 col-sm-12">
          <div className="form-group mb-4">
            <input
              onChange={(e) => handleChange(e)}
              name="address"
              value={address && address}
              className="text-form-input-field"
              placeholder="Address"
              type="text"
            />
          </div>
        </div>

        <div className="col-md-6 col-sm-12">
          <div className="form-group mb-4">
            <textarea
              rows={8}
              onChange={(e) => handleChange(e)}
              name="reasonForVisit"
              value={reasonForVisit}
              className="text-form-input-field"
              placeholder="Reason for Visit (Optional)"
              type="text"
            />
          </div>
        </div>

        <div className="col-md-6 col-sm-12">
          <div className="form-group mb-4">
            <textarea
              rows={8}
              onChange={(e) => handleChange(e)}
              name="description"
              value={description}
              s
              className="text-form-input-field"
              placeholder="Description (Optional)"
              type="text"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default PersonalInformation;
