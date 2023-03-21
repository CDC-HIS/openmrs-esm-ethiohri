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
  const [patientTag, setpatientTag] = useState("Loading");
  fetchPatientObs(patientUuid).then((list) => {
    var HIVrelatedopportunisticinfections = list.find(
      (x) => (x.uuid = "647db07d-8be5-4466-92a0-a7c46db589ba")
    );
    setpatientTag(HIVrelatedopportunisticinfections.display);
    console.log(HIVrelatedopportunisticinfections.display);
    console.log("d is a latter");
  });

  return patientTag != "Loading" ? <Tag type="gray">{patientTag}</Tag> : null;
};

export default TestAttributeTags;
