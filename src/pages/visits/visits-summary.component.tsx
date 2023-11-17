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
        key: "visitType",
        header: "Visit Type",
        getValue: (encounter) => {
          return getData(encounter, "b3f60308-cda4-41f9-af08-b98d2c1562c7");
        },
      },
      {
        key: "dateConfirmedHIVPositive",
        header: "Date Confirmed HIV +",
        getValue: (encounter) => {
          return getData(
            encounter,
            "160554AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            true
          );
        },
      },
      {
        key: "monthsOnArt",
        header: "Months On ART",
        getValue: (encounter) => {
          return getData(encounter, "159368AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        },
      },
      {
        key: "nextVisitDate",
        header: "Next visit date",
        getValue: (encounter) => {
          return getData(
            encounter,
            "c596f199-4d76-4eca-b3c4-ffa631c0aee9",
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
