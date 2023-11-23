import React, { useEffect, useMemo, useState } from "react";
import {
  EncounterList,
  EncounterListColumn,
} from "@ohri/openmrs-esm-ohri-commons-lib";
import { FOLLOWUP_ENCOUNTER_TYPE, MRN_NULL_WARNING } from "../../constants";
import { getData } from "../encounterUtils";
import { moduleName } from "../../index";
import styles from "../../root.scss";
import { fetchIdentifiers } from "../../api/api";

const VisitsSummary: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: "followUpDate",
        header: "Follow-Up Date",
        getValue: (encounter) => {
          return getData(
            encounter,
            "b8cd8630-56dd-495e-8c84-e36a636febe7",
            true
          );
        },
      },
      {
        key: "artRegimen",
        header: "ART Regimen",
        getValue: (encounter) => {
          return getData(encounter, "6d7d0327-e1f8-4246-bfe5-be1e82d94b14");
        },
      },
      {
        key: "followUpStatus",
        header: "Follow Up Status",
        getValue: (encounter) => {
          return getData(encounter, "222f64a8-a603-4d2e-b70e-2d90b622bb04");
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
        key: "viralLoadCount",
        header: "Viral Load Count",
        getValue: (encounter) => {
          return getData(encounter, "856AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        },
      },
      {
        key: "vlStatus",
        header: "VL Status",
        getValue: (encounter) => {
          return getData(encounter, "2dc9ee04-4d12-4606-ae0f-86895bf14a44");
        },
      },
      {
        key: "dsdCategory",
        header: "DSD Category",
        getValue: (encounter) => {
          return getData(encounter, "defeb4ff-d07b-4e4a-bbd6-d4281c1384a2");
        },
      },
      {
        key: "cxcaCounsellingDate",
        header: "CXCA Counselling Date",
        getValue: (encounter) => {
          return getData(
            encounter,
            "72a28ebe-77ba-4592-9291-ac91e46ea770",
            true
          );
        },
      },
      {
        key: "actions",
        header: "Actions",
        getValue: (encounter) => [
          {
            form: { name: "POC Followup Form", package: "eth_hiv" },
            encounterUuid: encounter.uuid,
            intent: "*",
            label: "View Followup",
            mode: "view",
          },
          {
            form: { name: "POC Followup Form", package: "eth_hiv" },
            encounterUuid: encounter.uuid,
            intent: "*",
            label: "Edit Followup",
            mode: "edit",
          },
        ],
      },
    ],
    []
  );

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
        encounterType={FOLLOWUP_ENCOUNTER_TYPE}
        formList={[{ name: "POC Followup Form" }]}
        columns={columns}
        description="Followup Encounter List"
        headerTitle="Followup"
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

export default VisitsSummary;
