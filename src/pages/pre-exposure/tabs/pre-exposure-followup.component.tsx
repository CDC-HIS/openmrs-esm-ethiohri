/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  MRN_NULL_WARNING,
  PRE_EXPOSURE_FOLLOWUP_ENCOUNTER_TYPE,
} from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
import { fetchIdentifiers } from "../../../api/api";
import styles from "../../../root.scss";

const columns = [
  {
    key: "finalResult",
    header: "Final Test Result",
    getValue: (encounter) => {
      return getData(encounter, "e16b0068-b6a2-46b7-aba9-e3be00a7b4ab");
    },
  },
  {
    key: "followupStatus",
    header: "Followup status",
    getValue: (encounter) => {
      return getData(encounter, "222f64a8-a603-4d2e-b70e-2d90b622bb04");
    },
  },
  {
    key: "dispensedDose",
    header: "Dispensed dose",
    getValue: (encounter) => {
      return getData(encounter, "f3911009-1a8f-42ee-bdfc-1e343c2839aa");
    },
  },
  {
    key: "nextVisitDate",
    header: "Next visit date",
    getValue: (encounter) => {
      return getData(encounter, "c596f199-4d76-4eca-b3c4-ffa631c0aee9", true);
    },
  },
  ,
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
  useEffect(() => {
    (async () => {
      const identifiers = await fetchIdentifiers(patientUuid);
      if (identifiers?.find((e) => e.identifierType.display === "MRN")) {
        setHasMRN(true);
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
          hideFormLauncher: !hasMRN,
        }}
      />
      {!hasMRN && <p className={styles.patientName}>{MRN_NULL_WARNING}</p>}
    </>
  );
};

export default PreExposureFollowupList;
