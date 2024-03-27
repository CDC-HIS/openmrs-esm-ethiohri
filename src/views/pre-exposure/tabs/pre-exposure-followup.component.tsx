/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  MRN_NULL_WARNING,
  PRE_EXPOSURE_FOLLOWUP_ENCOUNTER_TYPE,
  PRE_EXPOSURE_SCREENING_ENCOUNTER_TYPE,
  PRE_EXPOSURE_SCREENING_NEEDED_WARNING,
} from "../../../constants";
import { getData } from "../../../encounterUtils";
import { moduleName } from "../../../index";
import { fetchIdentifiers, getPatientEncounters } from "../../../api/api";
import styles from "../../../root.scss";

const columns = [
  {
    key: "followupDate",
    header: "Follow-up Date",
    getValue: (encounter) => {
      return getData(encounter, "5c118396-52dc-4cac-8860-e6d8e4a7f296", true);
    },
  },
  {
    key: "finalTestResult",
    header: "HIV Test Result",
    getValue: (encounter) => {
      return getData(encounter, "40d1c129-5373-4005-95b1-409e56db9743");
    },
  },
  {
    key: "symptomsOfHIVInfection",
    header: "Sign of HIV?",
    getValue: (encounter) => {
      return getData(encounter, "402e8f8c-0931-4e6a-9d53-962ab9519d4d");
    },
  },
  {
    key: "linkageToHivCare",
    header: "Linkage to HIV Care",
    getValue: (encounter) => {
      return getData(encounter, "02776be4-f96e-40d9-9615-2db00cae6df5");
    },
  },
  {
    key: "isClientPregnant",
    header: "Pregnant/BreastFeeding?",
    getValue: (encounter) => {
      return getData(encounter, "5272AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "followupStatus",
    header: "Follow-up Status",
    getValue: (encounter) => {
      return getData(encounter, "222f64a8-a603-4d2e-b70e-2d90b622bb04");
    },
  },
  {
    key: "prepRegimen",
    header: "PrEP Regimen",
    getValue: (encounter) => {
      return getData(encounter, "722ff3de-e2d1-4df4-8d05-ca881dc7073b");
    },
  },
  {
    key: "arvDispensedInDays",
    header: "Dose Days",
    getValue: (encounter) => {
      return getData(encounter, "f3911009-1a8f-42ee-bdfc-1e343c2839aa");
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
        form: { name: "Pre Exposure Followup", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Pre Exposure Followup",
        mode: "view",
      },
      {
        form: { name: "Pre Exposure Followup", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit Pre Exposure Followup",
        mode: "edit",
      },
    ],
  },
];

const PreExposureFollowupList: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  const [hasMRN, setHasMRN] = useState(false);
  const [hasScreeningEncounter, setHasPreviousEncounter] = useState(false);
  useEffect(() => {
    (async () => {
      const identifiers = await fetchIdentifiers(patientUuid);
      if (identifiers?.find((e) => e.identifierType.display === "MRN")) {
        setHasMRN(true);
      }
    })();
    (async () => {
      const previousEncounters = await getPatientEncounters(
        patientUuid,
        PRE_EXPOSURE_SCREENING_ENCOUNTER_TYPE
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
        encounterType={PRE_EXPOSURE_FOLLOWUP_ENCOUNTER_TYPE}
        formList={[{ name: "Pre Exposure Followup" }]}
        columns={columns}
        description="Pre Exposure Followup Tracking List"
        headerTitle="Pre Exposure Followup"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher: !hasMRN || !hasScreeningEncounter,
        }}
      />
      {!hasMRN && <p className={styles.patientName}>{MRN_NULL_WARNING}</p>}
      {!hasScreeningEncounter && (
        <p className={styles.patientName}>
          {PRE_EXPOSURE_SCREENING_NEEDED_WARNING}
        </p>
      )}
    </>
  );
};

export default PreExposureFollowupList;
