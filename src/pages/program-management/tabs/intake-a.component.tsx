import React from "react";
import {
  EncounterList,
  getObsFromEncounter,
} from "openmrs-esm-ohri-commons-lib/src/index";

const columns = [
  {
    key: "date",
    header: "Enrolment Date",
    getValue: (encounter) => {
      return getObsFromEncounter(
        encounter,
        "160555AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        true
      );
    },
  },
  {
    key: "dateConfirmed",
    header: "Date Confirmed",
    getValue: (encounter) => {
      return getObsFromEncounter(
        encounter,
        "160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        true
      );
    },
  },
  {
    key: "referralPoint",
    header: "Facility Referral Point",
    getValue: (encounter) => {
      return getObsFromEncounter(
        encounter,
        "80bcc9c1-e328-47e8-affe-6d1bffe4adf1"
      );
    },
  },
  {
    key: "externalRefPoint",
    header: "External Ref Point",
    getValue: (encounter) => {
      return "---";
    },
  },
  {
    key: "disclosedHIVStatus",
    header: "Disclosed HIV status",
    getValue: (encounter) => {
      return getObsFromEncounter(encounter, "1048AAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
];

const IntakeA: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid=""
      form={{ package: "hiv", name: "intake_a" }}
      columns={columns}
      description="Intake A Encounter List"
      headerTitle="Intake A"
      dropdownText="Add"
    />
  );
};

export default IntakeA;
