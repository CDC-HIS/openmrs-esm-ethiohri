import { TextInput } from "carbon-components-react";
import {
  OHRIFormFieldProps,
  OHRIFormContext,
  isTrue,
  getConceptNameAndUUID,
  isInlineView,
  fieldRequiredErrCode,
  isEmpty,
  PreviousValueReview,
  OHRIFieldValueView,
} from "openmrs-ohri-form-engine-lib";
import React, { useEffect, useMemo, useState } from "react";
import "../../vendor/lib/jquery-calendars/css/jquery.calendars.picker.css";

const dateFormatter = new Intl.DateTimeFormat(window.navigator.language);

const Calendar: React.FC<OHRIFormFieldProps> = ({
  question,
  onChange,
  handler,
  useField,
}) => {
  const [field, meta] = useField(question.id);
  const {
    setFieldValue,
    encounterContext,
    layoutType,
    workspaceLayout,
    fields,
  } = React.useContext(OHRIFormContext);
  const [errors, setErrors] = useState([]);
  const [conceptName, setConceptName] = useState("Loading...");
  const isFieldRequiredError = useMemo(
    () => errors[0]?.errCode == fieldRequiredErrCode,
    [errors]
  );
  const [previousValueForReview, setPreviousValueForReview] = useState(null);

  useEffect(() => {
    if (question["submission"]?.errors) {
      setErrors(question["submission"]?.errors);
    }
  }, [question["submission"]]);

  const isInline = useMemo(() => {
    if (encounterContext.sessionMode == "view" || isTrue(question.readonly)) {
      return isInlineView(
        question.inlineRendering,
        layoutType,
        workspaceLayout
      );
    }
    return false;
  }, [
    encounterContext.sessionMode,
    question.readonly,
    question.inlineRendering,
    layoutType,
    workspaceLayout,
  ]);

  const onDateChange = ([date]) => {
    var gregDate = ethToGreg(date);
    var testDate = new Date(gregDate);
    var savedDate = new Date(testDate);
    savedDate.setHours(12);
    const refinedDate =
      date instanceof Date
        ? new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        : savedDate;
    setFieldValue(question.id, gregDate);
    onChange(question.id, refinedDate, setErrors);
    question.value = handler.handleFieldSubmission(
      question,
      refinedDate,
      encounterContext
    );
  };

  function ethToGreg(ethdate) {
    if (!ethdate) return null;
    var dmy = ethdate.split("/");
    if (dmy.length == 3) {
      // @ts-ignore
      var appdate = window.jQuery?.calendars
        .instance("ethiopian")
        .newDate(
          parseInt(dmy[2], 10),
          parseInt(dmy[1], 10),
          parseInt(dmy[0], 10)
        );
      // @ts-ignore
      var jd = window.jQuery?.calendars.instance("ethiopian").toJD(appdate);
      // @ts-ignore
      var appdategc = window.jQuery?.calendars.instance("gregorian").fromJD(jd);
      // @ts-ignore
      var appdategcstr = window.jQuery?.calendars
        .instance("gregorian")
        // .formatDate("mm/dd/yyyy", appdategc);
        .formatDate("yyyy,mm,dd", appdategc);

      return appdategcstr;
    } else return null;
  }

  function gregToEth(gregdate) {
    if (!gregdate) return null;
    var dmy;
    dmy = gregdate.split("-"); // first try the - separator
    if (dmy.length != 3) dmy = gregdate.split("/"); // then try the / separator
    if (dmy.length != 3)
      dmy = new Date(gregdate)
        .toLocaleDateString("en-US")
        .toString()
        .split("/");
    if (dmy.length == 3) {
      // @ts-ignore
      var appdate = ($ as any).calendars
        .instance("gregorian")
        .newDate(
          parseInt(dmy[2], 10),
          parseInt(dmy[0], 10),
          parseInt(dmy[1], 10)
        );
      // @ts-ignore
      var jd = ($ as any).calendars.instance("gregorian").toJD(appdate);
      // @ts-ignore
      var appdateet = ($ as any).calendars.instance("ethiopian").fromJD(jd);
      // @ts-ignore
      var appdateetstr = ($ as any).calendars
        .instance("ethiopian")
        .formatDate("dd/mm/yyyy", appdateet);

      return appdateetstr;
    } else return null;
  }

  useEffect(() => {
    if (encounterContext?.previousEncounter) {
      const prevValue = handler.getPreviousValue(
        question,
        encounterContext?.previousEncounter,
        fields
      );
      if (!isEmpty(prevValue?.value)) {
        //TODO: check whether value is a string or an array | Not needed
        try {
          prevValue.display = gregToEth(
            new Date(prevValue.value).toLocaleDateString("en-US").toString()
          );
        } catch (error) {
          // console.log("########???????  ERROR LOG: ", { error, prevValue });
        }
        prevValue.value = [
          gregToEth(
            new Date(prevValue.value).toLocaleDateString("en-US").toString()
          ),
        ];
        setPreviousValueForReview(prevValue);
      }
    }
  }, [encounterContext?.previousEncounter]);

  useEffect(() => {
    getConceptNameAndUUID(question.questionOptions.concept).then(
      (conceptTooltip) => {
        setConceptName(conceptTooltip);
      }
    );
  }, [conceptName]);

  useEffect(() => {
    // @ts-ignore
    var calendar = window.jQuery?.calendars.instance("ethiopian", "am");
    // @ts-ignore
    // window.jQuery?.("#id_et_calender").calendarsPicker({
    window.jQuery?.("#" + question.id).calendarsPicker({
      calendar: calendar,
      onSelect: () => {
        // @ts-ignore
        // var eth = window.jQuery("#id_et_calender").val();
        var eth = window.jQuery("#" + question.id).val();
        onDateChange([eth]);
      },
    });
    // @ts-ignore
  }, [window.jQuery]);

  return encounterContext.sessionMode == "view" || isTrue(question.readonly) ? (
    <OHRIFieldValueView
      label={question.label}
      value={gregToEth(
        new Date(field.value).toLocaleDateString("en-US").toString()
      )}
      conceptName={conceptName}
      isInline={isInline}
    />
  ) : (
    !question.isHidden && (
      // <div className={`${styles.formField} ${styles.row}`}>
      <div>
        <div>
          <TextInput
            // id="id_et_calender"
            id={question.id}
            labelText={question.label}
            value={gregToEth(
              new Date(field.value).toLocaleDateString("en-US").toString()
            )}
            autoComplete="off"
            className="datepicker"
            placeholder="DD/MM/YYYY"
          />
        </div>
        {previousValueForReview && (
          <div>
            <PreviousValueReview
              value={previousValueForReview.value}
              displayText={previousValueForReview.display}
              setValue={onDateChange}
            />
          </div>
        )}
      </div>
    )
  );
};

export default Calendar;
