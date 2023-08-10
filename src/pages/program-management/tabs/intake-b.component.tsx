import React from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { INTAKE_B_ENCOUNTER_TYPE } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";

const columns = [
  {
    key: "bmi",
    header: "Body Mass Index",
    getValue: (encounter) => {
      return getData(encounter, "1cc8fe7f-fb70-49d8-9065-73654d852187");
    },
  },
  {
    key: "stillOnTreatment",
    header: "Still On Treatment",
    getValue: (encounter) => {
      return getData(encounter, "160119AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "functionalStatus",
    header: "Functional Status",
    getValue: (encounter) => {
      return getData(encounter, "162753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "presentingComplaints",
    header: "Presenting Complaints",
    getValue: (encounter) => {
      return getData(encounter, "14718b2b-d38a-4f68-8e22-8bc739ae43f7");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "POC Intake-B", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Intake-B",
        mode: "view",
      },
      {
        form: { name: "POC Intake-B", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit Intake-B",
        mode: "edit",
      },
    ],
  },
];

const IntakeBEncounterList: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={INTAKE_B_ENCOUNTER_TYPE}
      formList={[{ name: "POC Intake-B" }]}
      columns={columns}
      description="Intake B Encounter List"
      headerTitle="Intake B"
      launchOptions={{
        displayText: "Add",
        moduleName: moduleName,
      }}
    />
  );
};

export default IntakeBEncounterList;
