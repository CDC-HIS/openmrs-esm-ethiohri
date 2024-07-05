/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  EncounterList,
  EncounterListColumn,
} from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  HEI_FOLLOWUP_ENCOUNTER_TYPE,
  HEI_ENROLLMENT_ENCOUNTER_TYPE,
  formWarning,
  FOLLOWUP_ENCOUNTER_TYPE,
  PATIENT_ENROLLED_IN_ART,
} from "../../../../constants";
import { doesEncounterExist, getData } from "../../../encounterUtils";
import { moduleName } from "../../../../index";
import styles from "../../../../root.scss";

const PMTCTFollowupEncounterList = ({ patientUuid, isFormSaved }) => {
  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: "followupDate",
        header: "Follow-up Date",
        getValue: (encounter) => {
          return getData(
            encounter,
            "5c118396-52dc-4cac-8860-e6d8e4a7f296",
            true
          );
        },
      },
      {
        key: "weight",
        header: "Weight",
        getValue: (encounter) => {
          return getData(encounter, "5089AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        },
      },
      {
        key: "testResult",
        header: "DNA PCR Result",
        getValue: (encounter) => {
          return getData(encounter, "2e770be1-7397-4684-bea6-6632c23b00d7");
        },
      },
      {
        key: "rapidAntibodyResult",
        header: "Rapid Test Result",
        getValue: (encounter) => {
          return getData(encounter, "aa69908a-989a-4fef-ad65-cbd73ba487b7");
        },
      },
      {
        key: "dose",
        header: "Cotrimoxazole Dose",
        getValue: (encounter) => {
          return getData(encounter, "ec9670c2-ee1f-42db-aea1-d238fb4fc33f");
        },
      },
      {
        key: "decision",
        header: "Decision",
        getValue: (encounter) => {
          return getData(encounter, "f0652b88-d1dd-4ec5-add7-8bdda63b5a8a");
        },
      },
      {
        key: "nextVisitDate",
        header: "Next Visit Date",
        getValue: (encounter) => {
          return getData(encounter, "c596f199-4d76-4eca-b3c4-ffa631c0aee9");
        },
      },
      {
        key: "actions",
        header: "Actions",
        getValue: (encounter) => [
          {
            form: { name: "HEI Followup", package: "eth_hiv" },
            encounterUuid: encounter.uuid,
            intent: "*",
            label: "View HEI Followup",
            mode: "view",
          },
          {
            form: { name: "HEI Followup", package: "eth_hiv" },
            encounterUuid: encounter.uuid,
            intent: "*",
            label: "Edit HEI Followup",
            mode: "edit",
          },
          {
            form: { name: "HEI Followup", package: "eth_hiv" },
            encounterUuid: encounter.uuid,
            intent: "*",
            label: "Delete HEI Followup",
            mode: "delete",
          },
        ],
      },
    ],
    []
  );

  const [hasEnrollmentEncounter, setHasEnrollmentEncounter] = useState(false);
  const [hasFollowupEncounter, setHasFollowupEncounter] = useState(false);

  useEffect(() => {
    (async () => {
      await doesEncounterExist(
        patientUuid,
        HEI_ENROLLMENT_ENCOUNTER_TYPE,
        setHasEnrollmentEncounter
      );
    })();
  }, [isFormSaved]);

  useEffect(() => {
    (async () => {
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
        encounterType={HEI_FOLLOWUP_ENCOUNTER_TYPE}
        formList={[{ name: "HEI Followup" }]}
        columns={columns}
        description="HEI Followup Encounter List"
        headerTitle="HEI Followup"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher: !hasEnrollmentEncounter || hasFollowupEncounter,
        }}
      />
      {!hasEnrollmentEncounter && (
        <p className={styles.patientName}>{formWarning("HEI Enrollment")}</p>
      )}
      {hasFollowupEncounter && (
        <p className={styles.patientName}>{PATIENT_ENROLLED_IN_ART}</p>
      )}
    </>
  );
};

export default PMTCTFollowupEncounterList;
