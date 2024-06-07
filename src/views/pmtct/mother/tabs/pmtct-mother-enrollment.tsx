import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  FOLLOWUP_ENCOUNTER_TYPE,
  INTAKE_A_ENCOUNTER_TYPE,
  PMTCT_MOTHER_ENROLLMENT_ENCOUNTER_TYPE,
  formWarning,
} from "../../../../constants";
import { doesEncounterExist, getData } from "../../../encounterUtils";
import { moduleName } from "../../../../index";
import styles from "../../../../root.scss";

const columns = [
  {
    key: "dateOfEnrollment",
    header: "PMTCT Enrollment/Booking Date",
    getValue: (encounter) => {
      return getData(encounter, "0fe4faee-0717-4dc0-be3d-1cd52923804a", true);
    },
  },
  {
    key: "statusAtEnrollment",
    header: "Status at Enrollment",
    getValue: (encounter) => {
      return getData(encounter, "ab192dd0-bb1c-4417-b8f9-4c35dc991b55");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "PMTCT Mother Initial Registration", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Mother's Initial Registration",
        mode: "view",
      },
      {
        form: { name: "PMTCT Mother Initial Registration", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit Mother's Initial Registration",
        mode: "edit",
      },
      {
        form: { name: "PMTCT Mother Initial Registration", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Delete Mother's Initial Registration",
        mode: "delete",
      },
    ],
  },
];

const PMTCTMotherEnrollmentEncounterList: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
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
        encounterType={PMTCT_MOTHER_ENROLLMENT_ENCOUNTER_TYPE}
        formList={[{ name: "PMTCT Mother Initial Registration" }]}
        columns={columns}
        description="Maternal PMTCT Entry Information"
        headerTitle="Maternal PMTCT Entry Information"
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

export default PMTCTMotherEnrollmentEncounterList;
