import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  artStartdate,
  dateOfHIVConfirmation,
  FOLLOWUP_ENCOUNTER_TYPE,
  ICT_GENERAL_ENCOUNTER_TYPE,
  INTAKE_A_ENCOUNTER_TYPE,
  MRN_NULL_WARNING,
  POSITIVE_TRACKING_ENCOUNTER_TYPE,
} from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
import styles from "./ictservice.scss";
import { fetchIdentifiers, getLatestObs, getPatientEncounters } from "../../../api/api";
import { DataTableSkeleton } from "@carbon/react";

const columns = [
  {
    key: "linkDate",
    header: "Linked Date",
    getValue: (encounter) => {
      const linkedDate = getData(encounter, "e2e44119-7633-4d39-97a4-0ceffbb98d91", true);
      return linkedDate ? linkedDate.split(',')[0].trim() : "";
    },
  },
  {
    key: "ictNumber",
    header: "ICT #",
    getValue: (encounter) => getData(encounter, "b35f9632-9ff8-410f-bfcb-f497023bbcf9"),
  },
  {
    key: "targetGroup",
    header: "Target Group",
    getValue: (encounter) => {
      const target = getData(encounter, "ca2c04ba-d9bd-4bad-ab03-e57ea9e49016");
      if (target === "Female sex worker") return "FSW";
      if (target === "OVC (Orphans and vulnerable children)") return "OVC";
      if (target === "Partner of PLHIV (People living with HIV)") return "Partner of PLHIV";
      if (target === "Children of PLHIV (People living with HIV)") return "Children of PLHIV";
      if (target === "Other MARPS-Wido-Divo-Sepa") return "Other MARPS";
      return target;
    },
  },
  {
    key: "rtriResult",
    header: "RTRI Result",
    getValue: (encounter) => {
      const rtri = getData(encounter, "3e0c5f07-cea4-4da5-8091-854c4d343bc0");
      if (rtri === "Recent") return "Probable Recent";
      if (rtri === "LT (Long-Term Infection)") return "Long Term";
      if (rtri === "IR (Incident/Intermittent Infection)") return "Inconclusive";
      return rtri;
    },
  },
  {
    key: "caseClassification",
    header: "Case Classification Status",
    getValue: (encounter) => {
      const caseFinding = getData(encounter, "eee5289d-b5fc-49f3-94a7-4755e369d470");
      if (caseFinding?.startsWith("C1")) return "C1";
      if (caseFinding?.startsWith("C2")) return "C2";
      if (caseFinding?.startsWith("C3")) return "C3";
      return caseFinding;
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "POC ICT General", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "view",
        label: "View Index Case Information",
        mode: "view",
      },
      {
        form: { name: "POC ICT General", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "edit",
        label: "Edit Index Case Information",
        mode: "edit",
      },
      {
        form: { name: "POC ICT General", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Delete Index Case Information",
        mode: "delete",
      },
    ],
  },
];

const ICTGeneral = ({ patientUuid, isIndexFormSaved, onFormSaved }) => {
  const [hasMRN, setHasMRN] = useState(false);
  const [isStartedART, setIsStartedART] = useState(false);
  const [hasIndexInformation, setHasIndexInformation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [identifiers, startedART, indexInformation] = await Promise.all([
        fetchIdentifiers(patientUuid),
        getLatestObs(patientUuid, artStartdate, FOLLOWUP_ENCOUNTER_TYPE),
        getPatientEncounters(patientUuid, ICT_GENERAL_ENCOUNTER_TYPE),
      ]);

      setHasMRN(identifiers?.some(e => e.identifierType.display === "MRN"));
      setIsStartedART(!!startedART);
      setHasIndexInformation(indexInformation.length > 0);
      setIsLoading(false);
    })();
  }, [patientUuid, isIndexFormSaved]);

  if (isLoading) return <DataTableSkeleton role="progressbar" zebra />;

  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={ICT_GENERAL_ENCOUNTER_TYPE}
        formList={[{ name: "POC ICT General" }]}
        columns={columns}
        description="Index Case Information List"
        headerTitle="Index Case Information"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher: !hasMRN || hasIndexInformation || !isStartedART,
        }}
        afterFormSaveAction={onFormSaved}
      />
      {!hasMRN ? (
        <p className={styles.warningMessage}>{MRN_NULL_WARNING}</p>
      ) : !isStartedART ? (
        <p className={styles.warningMessage}>⚠️ Patient must initiate ART before accessing ICT services.</p>
      ) : null}
    </>
  );
};

export default ICTGeneral;
