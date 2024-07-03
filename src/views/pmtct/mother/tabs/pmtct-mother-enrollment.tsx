import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  ENROLLED_IN_PMTCT_CONCEPT_ID,
  FOLLOWUP_ENCOUNTER_TYPE,
  INTAKE_A_ENCOUNTER_TYPE,
  PMTCT_MOTHER_ENROLLMENT_ENCOUNTER_TYPE,
  PMTCT_REFERRAL_WARNING,
  formWarning,
  yesConceptUUID,
} from "../../../../constants";
import { doesEncounterExist, getData } from "../../../encounterUtils";
import { moduleName } from "../../../../index";
import styles from "../../../../root.scss";
import { getLatestObs } from "@openmrs/openmrs-form-engine-lib/src/api/api";

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
        form: { name: "PMTCT Mother Enrollment", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Mother's Enrollment",
        mode: "view",
      },
      {
        form: { name: "PMTCT Mother Enrollment", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit Mother's Enrollment",
        mode: "edit",
      },
      {
        form: { name: "PMTCT Mother Enrollment", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Delete Mother's Enrollment",
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
  const [hasBeenReferredToPMTCT, setHasBeenReferredToPmtct] = useState(false);

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

      const enrolledInPMTCT = await getLatestObs(
        patientUuid,
        ENROLLED_IN_PMTCT_CONCEPT_ID,
        FOLLOWUP_ENCOUNTER_TYPE
      );
      setHasBeenReferredToPmtct(
        enrolledInPMTCT?.valueCodeableConcept?.coding[0]?.code ===
          yesConceptUUID
      );
    })();
  });

  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={PMTCT_MOTHER_ENROLLMENT_ENCOUNTER_TYPE}
        formList={[{ name: "PMTCT Enrollment" }]}
        columns={columns}
        description="Maternal PMTCT Entry Information"
        headerTitle="PMTCT Mother Enrollment"
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
      {!hasBeenReferredToPMTCT && (
        <p className={styles.patientName}>{PMTCT_REFERRAL_WARNING}</p>
      )}
    </>
  );
};

export default PMTCTMotherEnrollmentEncounterList;
