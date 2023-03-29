import React, { useState } from "react";
import { Tag } from "@carbon/react";
import { openmrsFetch } from "@openmrs/esm-framework";

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

const TestAttributeTags: React.FC<TestAttributeTagsProps> = ({
  patientUuid,
}) => {
  const [patientTagFollowupStatus, setpatientTagFollowupStatus] =
    useState("Loading");
  const [patientTagNextVisitDate, setpatientTagNextVisitDate] =
    useState("Loading");
  const [patientTagARTEndDate, setpatientTagARTEndDate] = useState("Loading");
  fetchPatientObs(patientUuid).then((list) => {
    var FollowupStatus = list.find((x) =>
      x.display.includes("Follow up status")
    );
    FollowupStatus ? setpatientTagFollowupStatus(FollowupStatus.display) : null;

    var NextVisitDate = list.find((x) => x.display.includes("Next visit date"));
    NextVisitDate ? setpatientTagNextVisitDate(NextVisitDate.display) : null;

    var ARTEndDate = list.find((x) => x.display.includes("ART dispensed dose"));
    ARTEndDate ? setpatientTagARTEndDate(ARTEndDate.display) : null;
  });

  return (
    <>
      {patientTagFollowupStatus != "Loading" ? (
        <Tag type="gray">{patientTagFollowupStatus}</Tag>
      ) : null}
      {patientTagNextVisitDate != "Loading" ? (
        <Tag type="gray">{patientTagNextVisitDate}</Tag>
      ) : null}
      {patientTagARTEndDate != "Loading" ? (
        <Tag type="gray">{patientTagARTEndDate}</Tag>
      ) : null}
    </>
  );
};

export default TestAttributeTags;
