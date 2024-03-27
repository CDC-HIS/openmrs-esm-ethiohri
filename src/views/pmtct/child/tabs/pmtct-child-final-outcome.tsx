import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { PMTCT_CHILD_FINAL_OUTCOME_ENCOUNTER_TYPE } from "../../../../constants";
import { getData } from "../../../encounterUtils";
import { moduleName } from "../../../../index";
import { getPatientEncounters } from "../../../../api/api";

const columns = [
  {
    key: "dateOfFinalOutcome",
    header: "Final Outcome Date",
    getValue: (encounter) => {
      return getData(encounter, "e83fbaa5-073b-4a6d-b8ba-23f41d0c7302", true);
    },
  },
  {
    key: "finalOutcome",
    header: "HEI PMTCT Final Outcome",
    getValue: (encounter) => {
      return getData(encounter, "2171d944-a027-417f-a0af-f9c4a88a5ffe");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "HEI Child Final Outcome", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View HEI Final Outcome",
        mode: "view",
      },
      {
        form: { name: "HEI Child Final Outcome", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit HEI Final Outcome",
        mode: "edit",
      },
    ],
  },
];

const PMTCTChildFinalOutcomeEncounterList: React.FC<{
  patientUuid: string;
}> = ({ patientUuid }) => {
  const [hasPreviousEncounter, setHasPreviousEncounter] = useState(false);
  useEffect(() => {
    (async () => {
      const previousEncounters = await getPatientEncounters(
        patientUuid,
        PMTCT_CHILD_FINAL_OUTCOME_ENCOUNTER_TYPE
      );
      if (previousEncounters.length) {
        setHasPreviousEncounter(true);
      }
    })();
  });
  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={PMTCT_CHILD_FINAL_OUTCOME_ENCOUNTER_TYPE}
        formList={[{ name: "HEI Child Final Outcome" }]}
        columns={columns}
        description="HEI Final Outcome Encounter List"
        headerTitle="HEI Final Outcome"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher: hasPreviousEncounter,
        }}
      />
    </>
  );
};

export default PMTCTChildFinalOutcomeEncounterList;
