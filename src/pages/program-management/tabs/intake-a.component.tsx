import React from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { INTAKE_A_ENCOUNTER_TYPE } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";

const columns = [
  {
    key: "date",
    header: "Enrolment Date",
    getValue: (encounter) => {
      return getData(encounter, "160555AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", true);
    },
  },
  {
    key: "dateConfirmed",
    header: "Date Confirmed",
    getValue: (encounter) => {
      return getData(encounter, "160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", true);
    },
  },
  {
    key: "referralPoint",
    header: "Facility Referral Point",
    getValue: (encounter) => {
      return getData(encounter, "80bcc9c1-e328-47e8-affe-6d1bffe4adf1");
    },
  },
  {
    key: "externalRefPoint",
    header: "External Ref Point",
    getValue: (encounter) => {
      return getData(encounter, "91eb14f1-c951-4d65-a4b4-6dbf9d88cd1a");
    },
  },
  {
    key: "disclosedHIVStatus",
    header: "Disclosed HIV status",
    getValue: (encounter) => {
      return getData(encounter, "159423AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
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
      launchOptions={{
        displayText: "Add",
        moduleName: moduleName,
      }}
    />
  );
};

export default IntakeAEncounterList;
