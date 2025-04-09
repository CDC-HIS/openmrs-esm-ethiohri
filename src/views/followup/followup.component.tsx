import React, { useEffect, useMemo, useState } from "react";
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
import styles from "../../root.scss";
import { fetchIdentifiers, getPatientEncounters } from "../../api/api";

function shouldShadeRow(encounter: any): boolean {
  const viralLoadPerformed = getData(
    encounter,
    "163310AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
  );
  const viralLoadResult = getData(
    encounter,
    "856AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
  );
  return viralLoadPerformed === "Completed" && viralLoadResult === "--";
}

const Followup: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: "followUpDate",
        header: "Follow-Up Date",
        getValue: (encounter) => {
          return getData(
            encounter,
            "5c118396-52dc-4cac-8860-e6d8e4a7f296",
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
        // getValue: (encounter) => {
        //   return getData(encounter, "222f64a8-a603-4d2e-b70e-2d90b622bb04");
        // },
        getValue: (encounter) => {
          const status = getData(
            encounter,
            "222f64a8-a603-4d2e-b70e-2d90b622bb04"
          );
          if (status === "Restart medication") {
            return "Restart";
          } else if (status === "Ran away") {
            return "Drop";
          }
          return status; // Return the original value if no modification is needed
        },
      },
      {
        key: "weight",
        header: "Weight",
        getValue: (encounter) => {
          return getData(encounter, "4ab93a3c-4373-4b9b-9268-5ff0641cc242");
        },
      },
      {
        key: "dateViralLoadRequested",
        header: "Date VL Requested",
        getValue: (encounter) => {
          //return getData(encounter, "163281AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", true);
          const value = getData(
            encounter,
            "163281AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            true
          );
          return (
            <div
              style={{
                backgroundColor: shouldShadeRow(encounter)
                  ? "#ffe6e6"
                  : "transparent",
                padding: "8px",
                display: "inline-block",
              }}
            >
              {value || "N/A"}
            </div>
          );
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
        key: "cxcaScreeningDate",
        header: "CXCA Screening Date",
        getValue: (encounter) => {
          return getData(
            encounter,
            "72a28ebe-77ba-4592-9291-ac91e46ea770",
            true
          );
        },
      },
      {
        key: "nextVisitDate",
        header: "Next Visit Date",
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
  useEffect(() => {
    (async () => {
      const identifiers = await fetchIdentifiers(patientUuid);
      if (identifiers?.find((e) => e.identifierType.display === "MRN")) {
        setHasMRN(true);
      }
    })();

    (async () => {
      const identifiers = await fetchIdentifiers(patientUuid);
      if (identifiers?.find((e) => e.identifierType.display === "UAN")) {
        setHasUAN(true);
      }
    })();

    (async () => {
      const previousEncounters = await getPatientEncounters(
        patientUuid,
        INTAKE_A_ENCOUNTER_TYPE
      );
      if (previousEncounters.length) {
        setHasIntakeAEncounter(true);
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
          hideFormLauncher: !hasMRN || !hasIntakeAEncounter,
        }}
      />
      {!hasMRN && <p className={styles.patientName}>{MRN_NULL_WARNING}</p>}
      {!hasUAN && <p className={styles.patientName}>{UAN_NULL_WARNING}</p>}
      {!hasIntakeAEncounter && (
        <p className={styles.patientName}>{formWarning("Intake A")}</p>
      )}
    </>
  );
};

export default Followup;
