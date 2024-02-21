import React from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { PMTCT_MOTHER_FINAL_OUTCOME_ENCOUNTER_TYPE } from "../../../../constants";
import { getData } from "../../../encounterUtils";
import { moduleName } from "../../../../index";

const columns = [
  {
    key: "finalOutcome",
    header: "Mother's PMTCT Final Outcome",
    getValue: (encounter) => {
      return getData(encounter, "222f64a8-a603-4d2e-b70e-2d90b622bb04");
    },
  },
  {
    key: "dateOfFinalOutcome",
    header: "Final Outcome Date",
    getValue: (encounter) => {
      return getData(encounter, "e83fbaa5-073b-4a6d-b8ba-23f41d0c7302", true);
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "PMTCT Final Outcome", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Mother's Final Outcome",
        mode: "view",
      },
      {
        form: { name: "PMTCT Final Outcome", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit Mother's Final Outcome",
        mode: "edit",
      },
    ],
  },
];

const PMTCTMotherFinalOutcomeEncounterList: React.FC<{
  patientUuid: string;
}> = ({ patientUuid }) => {
  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={PMTCT_MOTHER_FINAL_OUTCOME_ENCOUNTER_TYPE}
        formList={[{ name: "PMTCT Final Outcome" }]}
        columns={columns}
        description="Mother's Final Outcome Encounter List"
        headerTitle="Mother's Final Outcome"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
        }}
      />
    </>
  );
};

export default PMTCTMotherFinalOutcomeEncounterList;
