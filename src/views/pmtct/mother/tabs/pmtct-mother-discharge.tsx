import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  FOLLOWUP_ENCOUNTER_TYPE,
  INTAKE_A_ENCOUNTER_TYPE,
  PMTCT_MOTHER_DISCHARGE_ENCOUNTER_TYPE,
  formWarning,
} from "../../../../constants";
import { doesEncounterExist, getData } from "../../../encounterUtils";
import { moduleName } from "../../../../index";
import styles from "../../../../root.scss";

const columns = [
  {
    key: "dischargeDate",
    header: "Discharge Date",
    getValue: (encounter) => {
      return getData(encounter, "18f78400-d91c-40ea-bd9f-4388c10d50c1", true);
    },
  },
  {
    key: "reasonForDischarge",
    header: "Reason for Discharge",
    getValue: (encounter) => {
      return getData(encounter, "ba47a98e-b6b0-42f1-b612-496d501b1272");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "PMTCT Discharge", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Mother's Discharge",
        mode: "view",
      },
      {
        form: { name: "PMTCT Discharge", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit Mother's Discharge",
        mode: "edit",
      },
      {
        form: { name: "PMTCT Discharge", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Delete Mother's Discharge",
        mode: "delete",
      },
    ],
  },
];

const PMTCTMotherDischargeEncounterList: React.FC<{
  patientUuid: string;
}> = ({ patientUuid }) => {
  const [hasIntakeAEncounter, setHasIntakeAEncounter] = useState(false);
  const [hasFollowupEncounter, setHasFollowupEncounter] = useState(false);

  useEffect(() => {
    (async () => {
      await doesEncounterExist(
        patientUuid,
        INTAKE_A_ENCOUNTER_TYPE,
        setHasIntakeAEncounter
      );
      await doesEncounterExist(
        patientUuid,
        FOLLOWUP_ENCOUNTER_TYPE,
        setHasFollowupEncounter
      );
    })();
  });

  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={PMTCT_MOTHER_DISCHARGE_ENCOUNTER_TYPE}
        formList={[{ name: "PMTCT Discharge" }]}
        columns={columns}
        description="Maternal PMTCT Discharge Information"
        headerTitle="Maternal PMTCT Discharge Information"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher: !hasIntakeAEncounter || !hasFollowupEncounter,
        }}
      />
      {!hasIntakeAEncounter && (
        <p className={styles.patientName}>{formWarning("Intake A")}</p>
      )}
      {!hasFollowupEncounter && (
        <p className={styles.patientName}>{formWarning("Followup")}</p>
      )}
    </>
  );
};

export default PMTCTMotherDischargeEncounterList;
