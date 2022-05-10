import { TextInput } from "carbon-components-react";
import React, { useEffect } from "react";
import "../../vendor/lib/jquery-calendars/css/jquery.calendars.picker.css";
const Calendar: React.FC<{
  question: any;
  onChange: () => void;
  handler: () => any;
}> = ({ question, onChange, handler }) => {
  useEffect(() => {
    // @ts-ignore
    var calendar = window.jQuery?.calendars.instance("ethiopian", "am");
    // @ts-ignore
    window.jQuery?.("#id_et_calender").calendarsPicker({
      calendar: calendar,
      onSelect: () => {
        // @ts-ignore
        var eth = window.jQuery("#id_et_calender").val();
      },
    });
    // @ts-ignore
  }, [window.jQuery]);

  return (
    <div>
      <TextInput
        id="id_et_calender"
        labelText={question.label}
        autoComplete="off"
        className="datepicker"
        placeholder="DD/MM/YYYY"
      />
    </div>
  );
};

export default Calendar;
