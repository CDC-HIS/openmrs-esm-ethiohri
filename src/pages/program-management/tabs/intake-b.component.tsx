import React from "react";
import {
  EncounterList,
  getObsFromEncounter,
} from "openmrs-esm-ohri-commons-lib/src/index";

const columns = [
  {
    key: "pastOI",
    header: "Past OIs Recorded",
    getValue: (encounter) => {
      return getObsFromEncounter(
        encounter,
        "c52ecf45-bd6c-43ed-861b-9a2714878729"
      );
    },
  },
  {
    key: "lifeARTDate",
    header: "Lifelong ART Start Date",
    getValue: (encounter) => {
      return getObsFromEncounter(
        encounter,
        "159599AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        true
      );
    },
  },
  {
    key: "whoStaging",
    header: "WHO Staging",
    getValue: (encounter) => {
      return getObsFromEncounter(
        encounter,
        "5356AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
      );
    },
  },
  {
    key: "inhStartDate",
    header: "INH Start Date",
    getValue: (encounter) => {
      return getObsFromEncounter(
        encounter,
        "164852AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        true
      );
    },
  },
];

const IntakeB: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid=""
      form={{ package: "eth-hiv", name: "intake_b" }}
      columns={columns}
      description="Intake B Encounter List"
      headerTitle="Intake B"
      dropdownText="Add"
    />
  );
};
export default IntakeB;
