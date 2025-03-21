import moment from "moment";
import { DatePicker } from "antd";

const SelectDateAndTime = ({
  content,
  handleDateChange,
  disabledDateTime,
  selectedDate,
  dContent,
  selectTime,
}) => {
  return (
    <div style={{ marginTop: "5rem" }}>
      <dir className="row">
        <div className="col-md-5 col-sm-12 mb-5">
          <div>
            <h5 className="heading">Selected Doctor</h5>
            {content}
          </div>
          <h5 className="heading mt-5 mb-3">Please Select Date</h5>
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            disabledDate={disabledDateTime}
            onChange={handleDateChange}
          />
        </div>

        <div className="col-md-7 col-sm-12">
          {selectedDate && (
            <h5
            className="selected-datetime"
            >
              Selected Date: {selectedDate && moment(selectedDate).format("LL")}
              {selectTime && " and Time: " + selectTime}
            </h5>
          )}
          <div className="date-card rounded">
            <div className="row text-center">
              {!selectedDate ? (
                <h5 className="date-heading d-flex justify-content-center align-items-center mt-5">
                  Please Select A Date First
                </h5>
              ) : (
                dContent
              )}
            </div>
          </div>
        </div>
      </dir>
    </div>
  );
};

export default SelectDateAndTime;
