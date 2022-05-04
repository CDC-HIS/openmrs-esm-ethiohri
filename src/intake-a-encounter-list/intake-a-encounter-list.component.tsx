import React from "react";
import {
  EncounterListColumn,
  findObs,
  getObsFromEncounter,
  EncounterList,
} from "openmrs-esm-ohri-commons-lib/src/index";
import { INTAKE_A_ENCOUNTER_TYPE } from "../constants";

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
const Intake_A_EncounterList: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={INTAKE_A_ENCOUNTER_TYPE}
      form={{ package: "eth-hiv", name: "intake_a" }}
      columns={columns}
      description="Intake A Encounter list"
      headerTitle="Intake A"
      dropdownText="Add"
    />
  );
};

export default Intake_A_EncounterList;
