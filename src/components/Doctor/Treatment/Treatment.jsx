import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { Button, DatePicker, Space, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  DatePickerSinglePresets,
  DiagnosisOptions,
  DiseaseOptions,
  DosageOptions,
  FrequencyOptions,
  MedicalCheckupOptions,
  PatientStatus,
  appointemntStatusOption,
} from "../../../constant/global";
import SelectForm from "../../UI/form/SelectForm";
import TextArea from "antd/es/input/TextArea";
import InputAutoCompleteForm from "../../UI/form/InputAutoCompleteForm";
import { useForm } from "react-hook-form";
import SelectFormForMedicine from "../../UI/form/SelectFormForMedicine";
import MedicineRangePickerForm from "../../UI/form/MedicineRangePickerForm";
import { useCreatePrescriptionMutation } from "../../../redux/api/prescriptionApi";
import { useGetSingleAppointmentQuery } from "../../../redux/api/appointmentApi";
import TreatmentOverview from "./TreatmentOverview";
import "../../../stylesheets/doctorStylesheets/Treatment.css";

const Treatment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetSingleAppointmentQuery(id);
  const { handleSubmit } = useForm();
  const [isDisable, setIsDisable] = useState(true);
  const [selectAppointmentStatus, setSelectAppointmentStatus] = useState("");
  const [patientStatus, setPatientStatus] = useState("");
  const [daignosis, setDaignosis] = useState([]);
  const [disease, setDisease] = useState([]);
  const [medicalCheckup, setMedicalCheckup] = useState([]);
  const [instruction, setInstruction] = useState("");
  const [followUpDate, setFollowUpdate] = useState("");
  const [medicineList, setMedicineList] = useState([{ id: 1 }]);

  console.log({ data });

  useEffect(() => {
    const isInputEmpty =
      !selectAppointmentStatus ||
      !patientStatus ||
      !instruction ||
      !followUpDate ||
      !daignosis.length === 0 ||
      !disease.length === 0 ||
      !medicalCheckup.length === 0;
    setIsDisable(isInputEmpty);
  }, [
    selectAppointmentStatus,
    patientStatus,
    followUpDate,
    instruction,
    medicineList,
    daignosis,
    disease,
    medicalCheckup,
  ]);

  const [createPrescription, { isSuccess, isLoading, isError, error }] =
    useCreatePrescriptionMutation();

  const addField = (e) => {
    e.preventDefault();
    setMedicineList([...medicineList, { id: medicineList.length + 1 }]);
  };

  const removeFromAddTimeSlot = (id) => {
    setMedicineList(medicineList.filter((item) => item.id !== id));
  };

  const handleFollowUpChange = (date) => {
    if (date) {
      setFollowUpdate(dayjs(date).format());
    }
  };

  const onSubmit = (data) => {
    const obj = {};
    obj.status = selectAppointmentStatus;
    obj.patientType = patientStatus;

    daignosis.length && (obj["daignosis"] = daignosis.join(","));
    disease.length && (obj["disease"] = disease.join(","));
    medicalCheckup.length && (obj["test"] = medicalCheckup.join(","));
    obj.followUpdate = followUpDate;
    obj.instruction = instruction;
    obj.medicine = medicineList;
    obj.appointmentId = id;
    console.log("obj dsts ", obj);

    createPrescription({ data: obj });
  };

  useEffect(() => {
    if (!isLoading && isError) {
      message.error(error?.data?.message);
    }
    if (isSuccess) {
      message.success("Successfully Changed Saved !");
      setSelectAppointmentStatus("");
      setPatientStatus("");
      setDaignosis([]);
      setDisease([]);
      setMedicalCheckup([]);
      setInstruction("");
      setFollowUpdate("");
      setMedicineList([{ id: 1 }]);
      navigate("/dashboard/prescription");
    }
  }, [isLoading, isError, error, isSuccess]);

  return (
    <DashboardLayout>
      <TreatmentOverview data={data} />
      <div className="w-100 mb-3 rounded p-3 bg-gray-g treatment-options">
        <div className="text-center mb-2 d-flex justify-content-center">
          <h5
            className=" w-25 pb-2"
            style={{
              borderBottom: "2px solid var(--headingColor)",
              color: "var(--headingColor)",
              marginBottom: "2rem",
            }}
          >
            Start Treatment
          </h5>
        </div>

        <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-12">
            <div className="card p-3 mb-3">
              <h6 className="card-title text-secondary">Change Status</h6>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-4">
                    <div className="card-label">
                      <label className="label-style">
                        Change Appointment Status
                      </label>
                    </div>
                    <SelectForm
                      showSearch={true}
                      options={appointemntStatusOption}
                      setSelectData={setSelectAppointmentStatus}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-4">
                    <div className="card-label">
                      <label className="label-style">
                        Change Patient Status
                      </label>
                    </div>
                    <SelectForm
                      showSearch={true}
                      options={PatientStatus}
                      setSelectData={setPatientStatus}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card p-3 mb-3">
              <h6 className="card-title text-secondary">
                Identify Disease & Symptoms
              </h6>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <div className="card-label">
                      <label className="label-style">Diagnosis</label>
                    </div>
                    <SelectForm
                      mode={true}
                      options={DiagnosisOptions}
                      setSelectData={setDaignosis}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <div className="card-label">
                      <label className="label-style">Disease</label>
                    </div>
                    <SelectForm
                      mode={true}
                      options={DiseaseOptions}
                      setSelectData={setDisease}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12 mb-3">
            <div className="card mb-2 p-3 mt-2">
              <h6 className="card-title text-secondary">Medical Checkup</h6>
              <div className="row form-row">
                <div className="form-group mb-2">
                  <div className="card-label">
                    <label className="label-style">Medical Checkup</label>
                  </div>
                  <SelectForm
                    mode={true}
                    setSelectData={setMedicalCheckup}
                    options={MedicalCheckupOptions}
                  />
                  <small style={{ color: "var(--textLight)" }}>
                    Note : Type & Press enter to add new services
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card mb-2 p-3 mt-2">
              <h6 className="card-title text-secondary">Medicine</h6>
              {medicineList?.map((item, index) => (
                <div
                  className="row form-row mb-4 position-relative rounded m-2 mt-4 p-2"
                  key={index + 1}
                  style={{ border: "1.5px solid var(--borderLight)" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <a
                      onClick={() => removeFromAddTimeSlot(item?.id)}
                      style={{
                        cursor: "pointer",
                        color: "#c11340",
                      }}
                    >
                      <FaRegTrashAlt />
                    </a>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="card-label">
                      <label className="label-style">Medicine Name</label>
                    </div>
                    <div className="form-group mb-2">
                      <InputAutoCompleteForm
                        id={item.id}
                        medicineList={medicineList}
                        setMedicineList={setMedicineList}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="card-label">
                      <label className="label-style">Dosage</label>
                    </div>
                    <div className="form-group mb-2">
                      <SelectFormForMedicine
                        id={item.id}
                        keyName={"dosage"}
                        options={DosageOptions}
                        medicineList={medicineList}
                        setMedicineList={setMedicineList}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="card-label">
                      <label className="label-style">Frequency</label>
                    </div>
                    <div className="form-group mb-2">
                      <SelectFormForMedicine
                        id={item.id}
                        keyName={"frequency"}
                        options={FrequencyOptions}
                        medicineList={medicineList}
                        setMedicineList={setMedicineList}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="card-label">
                      <label className="label-style">
                        Start Date / End Date
                      </label>
                    </div>
                    <div className="form-group mb-2">
                      <Space direction="vertical" size={12}>
                        <MedicineRangePickerForm
                          id={item.id}
                          medicineList={medicineList}
                          setMedicineList={setMedicineList}
                        />
                      </Space>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4" style={{ width: "120px" }}>
              <Button
                type="primary"
                size="small"
                htmlType="button"
                onClick={addField}
                block
                icon={<FaPlus />}
              >
                Add
              </Button>
            </div>
          </div>

          <div className="col-md-12 mb-3">
            <div className="card-label">
              <label className="label-style">Follow Up Date</label>
            </div>
            <div className="form-group mb-2">
              <DatePicker
                presets={DatePickerSinglePresets}
                onChange={handleFollowUpChange}
                showTime
                size="large"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <div className="col-md-12 mb-3">
            <div className="form-group mb-2">
              <div className="card-label">
                <label className="label-style">Instruction</label>
              </div>
              <TextArea
                rows={4}
                placeholder="Instruction text ..."
                onChange={(e) => setInstruction(e.target.value)}
              />
            </div>
          </div>

          <div className="text-center my-3">
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              disabled={isDisable}
              loading={isLoading}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Treatment;
