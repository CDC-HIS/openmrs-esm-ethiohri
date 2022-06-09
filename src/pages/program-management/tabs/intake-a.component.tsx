import React from "react";
import {
  EncounterList,
  getObsFromEncounter,
} from "openmrs-esm-ohri-commons-lib/src/index";
import { INTAKE_A_ENCOUNTER_TYPE } from "../../../constants";

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
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "intake_a", package: "eth-hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Intake-A",
        mode: "view",
      },
      {
        form: { name: "intake_a", package: "eth-hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit Intake-A",
        mode: "edit",
      },
    ],
  },
];

const IntakeAEncounterList: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={INTAKE_A_ENCOUNTER_TYPE}
      form={{ package: "eth-hiv", name: "intake_a" }}
      columns={columns}
      description="Intake A Encounter List"
      headerTitle="Intake A"
      dropdownText="Add"
    />
  );
};

export default IntakeAEncounterList;
