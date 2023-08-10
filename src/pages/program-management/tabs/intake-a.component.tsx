import React from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { INTAKE_A_ENCOUNTER_TYPE } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";

const columns = [
  {
    key: "date",
    header: "Enrollment Date",
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
    key: "testType",
    header: "Test Type",
    getValue: (encounter) => {
      return getData(encounter, "a865a098-c9ee-4c51-a13b-5c5d574d036c");
    },
  },
  {
    key: "reasonForReferral",
    header: "Reason for referral",
    getValue: (encounter) => {
      return getData(encounter, "2cb28f68-0277-48d7-8b38-8e6cf38a30a9");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "POC Intake-A", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Intake-A",
        mode: "view",
      },
      {
        form: { name: "POC Intake-A", package: "eth_hiv" },
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
      encounterType={INTAKE_A_ENCOUNTER_TYPE}
      formList={[{ name: "POC Intake-A" }]}
      columns={columns}
      description="Intake A Encounter List"
      headerTitle="Intake A"
      launchOptions={{
        displayText: "Add",
        moduleName: moduleName,
      }}
    />
  );
};

export default IntakeAEncounterList;
