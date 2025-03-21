import "../../stylesheets/TrackAppointment.css";
import { appointStatusDsc } from "../../constant/appointmentStatus";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const AppointmentTimeLine = ({ data }) => {
  return (
    <>
      <section>
        <VerticalTimeline lineColor="var(--textLight)">
          <VerticalTimelineElement
            iconStyle={{
              background: "var(--primaryColor)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.25rem",
            }}
            icon={<i class="fa-solid fa-money-check-dollar"></i>}
          >
            <h3 className="timeline-heading">
              Payment - {data?.paymentStatus}
            </h3>
            <p className="timeline-description">{appointStatusDsc?.payment}</p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            iconStyle={{
              background: "var(--primaryColor)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.25rem",
            }}
            icon={<i class="fa-solid fa-calendar-check"></i>}
          >
            <h3 className="timeline-heading">Appointment - {data?.status}</h3>
            <p className="timeline-description">
              {appointStatusDsc.appointment[data?.status]}
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            iconStyle={{
              background: "var(--primaryColor)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.25rem",
            }}
            icon={<i class="fa-solid fa-list"></i>}
          >
            <h3 className="timeline-heading">
              Follow-up Date -{" "}
              {data?.followUp ? data?.followUp : "Not Scheduled Yet"}
            </h3>
            <p className="timeline-description">
              {data?.followUp && appointStatusDsc.followUpDate}
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            iconStyle={{
              background: "var(--primaryColor)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.25rem",
            }}
            icon={<i class="fa-solid fa-file-lines"></i>}
          >
            <h3 className="timeline-heading">
              Prescription - {data?.prescriptionStatus}
            </h3>
            <p className="timeline-description">
              {appointStatusDsc.prescriptionStatus[data?.prescriptionStatus]}
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </section>
    </>
  );
};

export default AppointmentTimeLine;
