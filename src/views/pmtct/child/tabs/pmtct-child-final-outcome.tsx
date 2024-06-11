import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  HEI_FINAL_OUTCOME_ENCOUNTER_TYPE,
  HEI_ENROLLMENT_ENCOUNTER_TYPE,
  formWarning,
} from "../../../../constants";
import { doesEncounterExist, getData } from "../../../encounterUtils";
import { moduleName } from "../../../../index";
import styles from "../../../../root.scss";

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
      {
        form: { name: "HEI Child Final Outcome", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Delete HEI Final Outcome",
        mode: "delete",
      },
    ],
  },
];

const PMTCTChildFinalOutcomeEncounterList: React.FC<{
  patientUuid: string;
}> = ({ patientUuid }) => {
  const [hasPreviousEncounter, setHasPreviousEncounter] = useState(false);
  const [hasEnrollmentEncounter, setHasEnrollmentEncounter] = useState(false);

  useEffect(() => {
    (async () => {
      await doesEncounterExist(
        patientUuid,
        HEI_FINAL_OUTCOME_ENCOUNTER_TYPE,
        setHasPreviousEncounter
      );

      await doesEncounterExist(
        patientUuid,
        HEI_ENROLLMENT_ENCOUNTER_TYPE,
        setHasEnrollmentEncounter
      );
    })();
  });
  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={HEI_FINAL_OUTCOME_ENCOUNTER_TYPE}
        formList={[{ name: "HEI Child Final Outcome" }]}
        columns={columns}
        description="HEI Final Outcome Encounter List"
        headerTitle="HEI Final Outcome"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher: hasPreviousEncounter || !hasEnrollmentEncounter,
        }}
      />
      {!hasEnrollmentEncounter && (
        <p className={styles.patientName}>{formWarning("HEI Enrollment")}</p>
      )}
    </>
  );
};

export default PMTCTChildFinalOutcomeEncounterList;
