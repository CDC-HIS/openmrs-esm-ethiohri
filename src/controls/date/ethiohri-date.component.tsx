import React, { useEffect, useMemo, useState } from "react";
import { useField } from "formik";
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
} from "@openmrs/openmrs-form-engine-lib";
import styles from "../input/_input.scss";
require("./ethiohri-date.scss");
import { DatePicker, Provider, defaultTheme } from "@adobe/react-spectrum";
import {
  parseDate,
  EthiopicCalendar,
  toCalendar,
  CalendarDate,
} from "@internationalized/date";

const dateFormatter = new Intl.DateTimeFormat(window.navigator.language);

const ETHIOHRIDate: React.FC<OHRIFormFieldProps> = ({
  question,
  onChange,
  handler,
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
  const [warnings, setWarnings] = useState([]);
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
    var newDate = new Date(date);
    newDate.setHours(12);
    const refinedDate =
      date instanceof Date
        ? new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        : newDate;
    setFieldValue(question.id, refinedDate);
    onChange(question.id, refinedDate, setErrors, setWarnings);
    question.value = handler.handleFieldSubmission(
      question,
      refinedDate,
      encounterContext
    );
  };
  const { placeHolder, carbonDateformat } = useMemo(() => {
    const formatObj = dateFormatter.formatToParts(new Date());
    const placeHolder = formatObj
      .map((obj) => {
        switch (obj.type) {
          case "day":
            return "dd";
          case "month":
            return "mm";
          case "year":
            return "yyyy";
          default:
            return obj.value;
        }
      })
      .join("");
    const carbonDateformat = formatObj
      .map((obj) => {
        switch (obj.type) {
          case "day":
            return "d";
          case "month":
            return "m";
          case "year":
            return "Y";
          default:
            return obj.value;
        }
      })
      .join("");
    return { placeHolder: placeHolder, carbonDateformat: carbonDateformat };
  }, []);

  useEffect(() => {
    if (encounterContext?.previousEncounter) {
      const prevValue = handler.getPreviousValue(
        question,
        encounterContext?.previousEncounter,
        fields
      );
      if (!isEmpty(prevValue?.value)) {
        prevValue.display = gregToEth(
          new Date(prevValue.value).toLocaleDateString("en-US").toString()
        );
        prevValue.value = [
          new Date(prevValue.value).toLocaleDateString("en-US").toString(),
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

  function gregToEth(gregdate) {
    if (!gregdate) return null;
    let dmy = gregdate.split("/");
    if (dmy.length == 3) {
      let year = parseInt(dmy[2], 10);
      let month = parseInt(dmy[0], 10);
      let day = parseInt(dmy[1], 10);
      let gregorianDate = new CalendarDate(year, month, day);
      let ethiopianDate = toCalendar(gregorianDate, new EthiopicCalendar());
      let finalDate =
        ethiopianDate.day +
        "/" +
        ethiopianDate.month +
        "/" +
        ethiopianDate.year;
      return finalDate;
    } else return null;
  }

  const isIsoDate = (str) => {
    var regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g;
    if (!regex.test(str)) {
      return false;
    }
    return true;
  };

  function formatDate(value) {
    if (!value) return null;
    let dmy = new Date(value).toLocaleDateString("en-US").split("/");
    if (dmy.length == 3) {
      let year = parseInt(dmy[2], 10);
      let month = parseInt(dmy[0], 10);
      let day = parseInt(dmy[1], 10);
      let finalDate = year + "-" + formatDigit(month) + "-" + formatDigit(day);
      return finalDate;
    } else {
      return null;
    }
  }

  function formatDigit(number) {
    return parseInt(number, 10).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  }

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
      <div className={`${styles.formField} ${styles.row}`}>
        <div>
          <Provider
            locale="am-AM-u-ca-ethiopic"
            theme={defaultTheme}
            height="100%"
            colorScheme="light"
          >
            <DatePicker
              value={
                formatDate(field.value) != null
                  ? isIsoDate(formatDate(field.value))
                    ? parseDate(formatDate(field.value))
                    : null
                  : null
              }
              onChange={(e) => {
                onDateChange([e]);
              }}
              id={question.id}
              label={question.label}
            ></DatePicker>
          </Provider>
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

export default ETHIOHRIDate;
