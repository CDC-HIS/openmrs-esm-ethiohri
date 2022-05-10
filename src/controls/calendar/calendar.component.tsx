import React, { useEffect } from "react";

const Calendar: React.FC<{
  question: any;
  onChange: () => void;
  handler: () => any;
}> = ({ question, onChange, handler }) => {
  useEffect(() => {
    // @ts-ignore
    var calendar = window.jQuery?.calendars.instance("ethiopian", "am");
    // @ts-ignore
    // window.jQuery?('#id_et_calender').calendarsPicker({
    //   calendar: calendar,
    //   onSelect: () => {
    //     // @ts-ignore
    //       var eth = window.jQuery('#id_et_calender').val();
    //       console.log({ valueDate: eth})
    //   },
    // })
    // console.log({ calendar });
    // @ts-ignore
  }, [window.jQuery]);

  return (
    <div>
      <input
        type="text"
        id="id_et_calender"
        className="datepicker"
        placeholder="DD-MM-YYYY"
        autoComplete="off"
      />
    </div>
  );
};

export default Calendar;
