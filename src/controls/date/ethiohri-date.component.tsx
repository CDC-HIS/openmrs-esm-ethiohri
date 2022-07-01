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
} from "@ohri/openmrs-ohri-form-engine-lib";
import styles from "../input/_input.scss";
require("./ethiohri-date.scss");
import { DatePicker, Provider, defaultTheme } from "@adobe/react-spectrum";
import moment from "moment";

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
    const refinedDate =
      date instanceof Date
        ? new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        : date;
    setFieldValue(question.id, refinedDate);
    onChange(question.id, refinedDate, setErrors);
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
        prevValue.display = dateFormatter.format(prevValue.value);
        prevValue.value = [prevValue.value];
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

  return encounterContext.sessionMode == "view" || isTrue(question.readonly) ? (
    <OHRIFieldValueView
      label={question.label}
      value={
        field.value instanceof Date
          ? field.value.toLocaleDateString(window.navigator.language)
          : field.value
      }
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
          >
            <DatePicker label="Date"></DatePicker>
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
