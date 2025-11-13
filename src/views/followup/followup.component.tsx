import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  EncounterList,
  EncounterListColumn,
} from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  FOLLOWUP_ENCOUNTER_TYPE,
  INTAKE_A_ENCOUNTER_TYPE,
  MRN_NULL_WARNING,
  UAN_NULL_WARNING,
  formWarning,
} from "../../constants";
import { getData } from "../encounterUtils";
import { moduleName } from "../../index";
import styles from "./followup.scss";
import {
  fetchIdentifiers,
  getLatestObs,
  getPatientEncounters,
} from "../../api/api";
import { InlineLoading, SkeletonText, DataTableSkeleton, } from "@carbon/react";

const Followup: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: "followUpDate",
        header: "FollowUp Date",
        getValue: (encounter) => {
          const rawDate = getData(encounter, "5c118396-52dc-4cac-8860-e6d8e4a7f296", true);
          return rawDate ? rawDate.split(',')[0].trim() : "";
        },
      },
      {
        key: "artRegimen",
        header: "ART Regimen",
        getValue: (encounter) => getData(encounter, "6d7d0327-e1f8-4246-bfe5-be1e82d94b14"),
      },
      {
        key: "followUpStatus",
        header: "Follow Up Status",
        getValue: (encounter) => {
          const status = getData(encounter, "222f64a8-a603-4d2e-b70e-2d90b622bb04");
          if (status === "Restart medication") return "Restart";
          if (status === "Ran away") return "Drop";
          if (status === "Stop all") return "Stop";
          if (status === "Loss to follow-up (LTFU)") return "Lost";
          return status;
        },
      },
      {
        key: "weight",
        header: "Weight",
        getValue: (encounter) => getData(encounter, "4ab93a3c-4373-4b9b-9268-5ff0641cc242"),
      },
      {
        key: "dateViralLoadRequested",
        header: "VL Sent Date",
        getValue: (encounter) => {
          const rawDate = getData(encounter, "163281AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", true);
          return rawDate ? rawDate.split(',')[0].trim() : "";
        },
      },
      {
        key: "vlStatus",
        header: "VL Status",
        getValue: (encounter) => {
          const vlStatus = getData(encounter, "2dc9ee04-4d12-4606-ae0f-86895bf14a44");
          if (vlStatus === "LLV") return "Low Level Viremia";
          if (vlStatus === "HIV infection with high viral load") return "High Viral Load";
          return vlStatus;
        },
      },
      {
        key: "dsdCategory",
        header: "DSD Category",
        getValue: (encounter) => {
          const category = getData(encounter, "defeb4ff-d07b-4e4a-bbd6-d4281c1384a2");
          if (category === "Community based group model by peer") return "PCAD";
          if (category === "AHID") return "AHD";
          return category;
        },
      },
      {
        key: "screeningDone",
        header: "CXCA Screening Done",
        getValue: (encounter) => {
          const screened = getData(encounter, "01c546b4-e08a-4c0c-82ef-d387cab6bbbf");
          if (screened === "Cervical cancer screening not performed") return "No";
          if (screened === "Cervical cancer screening performed") return "Yes";
          return screened;
        },
      },
      {
        key: "nextVisitDate",
        header: "Next Visit Date",
        getValue: (encounter) => {
          const status = getData(encounter, "222f64a8-a603-4d2e-b70e-2d90b622bb04");
          if (
            status !== "Restart medication" &&
            status !== "Alive"
          ) {
            return "";
          }

          const rawDate = getData(encounter, "c596f199-4d76-4eca-b3c4-ffa631c0aee9", true);
          return rawDate ? rawDate.split(",")[0].trim() : "";
        },
      },
      {
        key: "actions",
        header: "Actions",
        getValue: (encounter) => [
          {
            form: { name: "POC Followup Form", package: "eth_hiv" },
            encounterUuid: encounter.uuid,
            intent: "view",
            label: "View Followup",
            mode: "view",
          },
          {
            form: { name: "POC Followup Form", package: "eth_hiv" },
            encounterUuid: encounter.uuid,
            intent: "edit",
            label: "Edit Followup",
            mode: "edit",
          },
          {
            form: { name: "POC Followup Form", package: "eth_hiv" },
            encounterUuid: encounter.uuid,
            intent: "*",
            label: "Delete Followup",
            mode: "delete",
          },
        ],
      },
    ],
    []
  );

  const [hasMRN, setHasMRN] = useState(false);
  const [hasUAN, setHasUAN] = useState(false);
  const [hasIntakeAEncounter, setHasIntakeAEncounter] = useState(false);
  const [isDead, setIsDead] = useState(false);
  const [isFormSaved, setIsFormSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const updateFormSavedStatus = useCallback(() => {
    setIsFormSaved((prev) => !prev);
  }, []);

  useEffect(() => {
    (async () => {
      const [identifiers, encounters, latestObs] = await Promise.all([
        fetchIdentifiers(patientUuid),
        getPatientEncounters(patientUuid, INTAKE_A_ENCOUNTER_TYPE),
        getLatestObs(
          patientUuid,
          "222f64a8-a603-4d2e-b70e-2d90b622bb04", // Follow-up status
          FOLLOWUP_ENCOUNTER_TYPE
        ),
      ]);

      setHasMRN(identifiers?.some((e) => e.identifierType.display === "MRN"));
      setHasUAN(identifiers?.some((e) => e.identifierType.display === "UAN"));
      setHasIntakeAEncounter(encounters.length > 0);
      setIsDead(
        latestObs?.valueCodeableConcept?.text?.toLowerCase() === "dead"
      );
      setIsLoading(false);
    })();
  }, [patientUuid, isFormSaved]);

  if (isLoading)
    return <DataTableSkeleton role="progressbar" zebra />;

  return (
    <>
      {!hasMRN ? (
        <p className={styles.warningMessage}>{MRN_NULL_WARNING}</p>
      ) : !hasIntakeAEncounter ? (
        <p className={styles.warningMessage}>{formWarning("Intake A")}</p>
      ) : isDead ? (
        <p className={styles.warningMessage}>
          ⚠️ Patient last follow-up status is set to be Dead, please edit the
          previous follow-up before proceeding.
        </p>
      ) : !hasUAN ? (
        <p className={styles.warningMessage}>{UAN_NULL_WARNING}</p>
      ) : null}
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
          hideFormLauncher: !hasMRN || !hasIntakeAEncounter || isDead,
        }}
        afterFormSaveAction={updateFormSavedStatus}
      />
    </>
  );
};

export default Followup;
