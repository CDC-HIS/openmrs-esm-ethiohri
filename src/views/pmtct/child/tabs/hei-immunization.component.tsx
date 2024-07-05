import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  HEI_IMMUNIZATION_ENCOUNTER_TYPE,
  HEI_ENROLLMENT_ENCOUNTER_TYPE,
  formWarning,
} from "../../../../constants";
import { doesEncounterExist, getData } from "../../../encounterUtils";
import { moduleName } from "../../../../index";
import styles from "../../../../root.scss";

const columns = [
  {
    key: "bcg",
    header: "BCG",
    getValue: (encounter) => {
      return getData(encounter, "3d621104-4f93-4f68-8d59-407cd124cabb");
    },
  },
  {
    key: "opv3",
    header: "OPV",
    getValue: (encounter) => {
      return getData(encounter, "50c23a47-40ae-469d-b7a2-0f88b8e2c915");
    },
  },
  {
    key: "penta3",
    header: "PENTA",
    getValue: (encounter) => {
      return getData(encounter, "698adfa3-2b38-4d83-83a0-0811d7d90bb5");
    },
  },

  {
    key: "rota2",
    header: "ROTA",
    getValue: (encounter) => {
      return getData(encounter, "6236db83-5d44-4bb8-8032-472b4e6c24f0");
    },
  },
  {
    key: "pcv3",
    header: "PCV",
    getValue: (encounter) => {
      return getData(encounter, "e0287c59-984a-40ae-a449-446576a7ee27");
    },
  },
  {
    key: "ipv",
    header: "IPV",
    getValue: (encounter) => {
      return getData(encounter, "923b4623-ac8d-4e65-a55a-aa4715752a14");
    },
  },
  {
    key: "mcv2",
    header: "MCV",
    getValue: (encounter) => {
      return getData(encounter, "025f8bb8-96ce-4e4a-b38c-4a27e77a2f4a");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "HEI Immunization", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View HEI Immunization",
        mode: "view",
      },
      {
        form: { name: "HEI Immunization", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit HEI Immunization",
        mode: "edit",
      },
      {
        form: { name: "HEI Immunization", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Delete HEI Immunization",
        mode: "delete",
      },
    ],
  },
];

const PMTCTImmunizationEncounterList = ({
  patientUuid,
  isFormSaved,
  updateFormSavedStatus,
}) => {
  const [hasPreviousEncounter, setHasPreviousEncounter] = useState(false);
  const [hasEnrollmentEncounter, setHasEnrollmentEncounter] = useState(false);
  useEffect(() => {
    (async () => {
      await doesEncounterExist(
        patientUuid,
        HEI_IMMUNIZATION_ENCOUNTER_TYPE,
        setHasPreviousEncounter
      );

      await doesEncounterExist(
        patientUuid,
        HEI_ENROLLMENT_ENCOUNTER_TYPE,
        setHasEnrollmentEncounter
      );
    })();
  }, [isFormSaved]);
  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={HEI_IMMUNIZATION_ENCOUNTER_TYPE}
        formList={[{ name: "HEI Immunization" }]}
        columns={columns}
        description="HEI Immunization Encounter List"
        headerTitle="HEI Immunization"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher: hasPreviousEncounter || !hasEnrollmentEncounter,
        }}
        afterFormSaveAction={updateFormSavedStatus}
      />
      {!hasEnrollmentEncounter && (
        <p className={styles.patientName}>{formWarning("HEI Enrollment")}</p>
      )}
    </>
  );
};

export default PMTCTImmunizationEncounterList;
