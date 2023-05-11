import React, { useState } from "react";
import { Tag } from "@carbon/react";
import { openmrsFetch } from "@openmrs/esm-framework";
import {
  EthiopicCalendar,
  toCalendar,
  CalendarDate,
} from "@internationalized/date";

interface TestAttributeTagsProps {
  patientUuid: string;
}
const BASE_WS_API_URL = "/ws/rest/v1/";
export function fetchPatientObs(patientUuid: string) {
  return openmrsFetch(`${BASE_WS_API_URL}obs?patient=${patientUuid}`).then(
    ({ data }) => {
      if (data.results.length) {
        return data.results;
      }
      return null;
    }
  );
}
const gregToEth = (gregdate: any) => {
  // gregdate = moment(gregdate).format("DD/MM/YYYY");
  if (!gregdate) return null;
  let dmy = gregdate.split("-");
  if (dmy.length == 3) {
    let year = parseInt(dmy[0], 10);
    let month = parseInt(dmy[1], 10);
    let day = parseInt(dmy[2], 10);
    let gregorianDate = new CalendarDate(year, month, day);
    let ethiopianDate = toCalendar(gregorianDate, new EthiopicCalendar());
    let finalDate =
      ethiopianDate.year + "-" + ethiopianDate.month + "-" + ethiopianDate.day;
    return finalDate;
  } else return null;
};
const splitAndJoin = (str: any) => {
  var listText = str.split(":");
  listText[1] = gregToEth(listText[1]);
  return (listText = listText.join(":"));
};

const TestAttributeTags: React.FC<TestAttributeTagsProps> = ({
  patientUuid,
}) => {
  const [patientTagFollowupStatus, setpatientTagFollowupStatus] =
    useState("Loading");
  const [patientTagNextVisitDate, setpatientTagNextVisitDate] =
    useState("Loading");
  const [patientTagARTEndDate, setpatientTagARTEndDate] = useState("Loading");
  const [patientTagPregnancyStatus, setpatientTagPregnancyStatus] =
    useState("Loading");

  fetchPatientObs(patientUuid).then((list) => {
    var FollowupStatus = list.find((x) =>
      x.display.includes("Follow up status")
    );
    FollowupStatus ? setpatientTagFollowupStatus(FollowupStatus.display) : null;

    var NextVisitDate = list.find((x) =>
      x.display.includes("Return visit date")
    );
    NextVisitDate ? setpatientTagNextVisitDate(NextVisitDate.display) : null;

    var ARTEndDate = list.find((x) => x.display.includes("Treatment end date"));
    ARTEndDate ? setpatientTagARTEndDate(ARTEndDate.display) : null;

    var PregnancyStatus = list.find((x) =>
      x.display.includes("Pregnancy status")
    );
    PregnancyStatus
      ? setpatientTagPregnancyStatus(PregnancyStatus.display)
      : null;
  });

  return (
    <>
      {patientTagFollowupStatus != "Loading" ? (
        <Tag type="gray">{patientTagFollowupStatus}</Tag>
      ) : null}
      {patientTagNextVisitDate != "Loading" ? (
        <Tag type="gray">{splitAndJoin(patientTagNextVisitDate)}</Tag>
      ) : null}
      {patientTagARTEndDate != "Loading" ? (
        <Tag type="gray">{splitAndJoin(patientTagARTEndDate)}</Tag>
      ) : null}
      {patientTagPregnancyStatus != "Loading" ? (
        <Tag type="gray">{patientTagPregnancyStatus}</Tag>
      ) : null}
    </>
  );
};

export default TestAttributeTags;
