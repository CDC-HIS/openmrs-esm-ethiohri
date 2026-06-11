import React, { useCallback, useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";

import { MRN_NULL_WARNING, RETEST_ENCOUNTER_TYPE } from "../../../constants";
import {
  doesEncounterExist,
  doesPatientHaveIdentifier,
  getData,
} from "../../encounterUtils";
import { moduleName } from "../../../index";
import styles from "./hivtesting.scss";
import { getPatientEncounters } from "../../../api/api";

const columns = [
  {
    key: "dateOfInitialTest",
    header: "Date of Initial test",
    getValue: (encounter) => {
      const rawDate = getData(
        encounter,
        "9182520e-24e8-4e84-aba7-6b56bdeb76d5",
        true,
      );
      return rawDate ? rawDate.split(",")[0].trim() : "";
    },
  },
  {
    key: "dateOfRetesting",
    header: "Date of Re-test",
    getValue: (encounter) => {
      const retestDate = getData(
        encounter,
        "3c588dc4-cd32-47e6-a919-806e254b66c7",
        true,
      );
      return retestDate ? retestDate.split(",")[0].trim() : "";
    },
  },
  {
    key: "entryPoint",
    header: "Entry Point",
    getValue: (encounter) => {
      return getData(encounter, "d2b461e5-dd7f-4d16-968e-354ac68cbd38");
    },
  },
  {
    key: "finalResult",
    header: "Final Result",
    getValue: (encounter) => {
      const finalResult = getData(
        encounter,
        "2b1ea8df-3293-4964-9b44-9e31dff678a4",
      );
      if (finalResult === "Reactive") {
        return "Positive";
      } else if (finalResult === "Non-reactive") {
        return "Negative";
      }
      return finalResult;
    },
  },
  {
    key: "resultFinal",
    header: "Final result from lab",
    getValue: (encounter) => {
      const finalResultLab = getData(
        encounter,
        "2e770be1-7397-4684-bea6-6632c23b00d7",
      );
      if (finalResultLab === "Reactive") {
        return "Positive";
      } else if (finalResultLab === "Non-reactive") {
        return "Negative";
      }
      return finalResultLab;
    },
  },
  {
    key: "actionTaken",
    header: "Action taken/Final result",
    getValue: (encounter) => {
      return getData(encounter, "3e8686f9-694f-496b-8f5c-565833d035d1");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "Re-test", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "view",
        label: "View HIV Retest",
        mode: "view",
      },
      {
        form: { name: "Re-test", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "edit",
        label: "Edit HIV Retest",
        mode: "edit",
      },
      {
        form: { name: "Re-test", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Delete HIV Retest",
        mode: "delete",
      },
    ],
  },
];

const HivRetestList: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const [hasMRN, setHasMRN] = useState(false);
  const [hasPreviousEncounter, setHasPreviousEncounter] = useState(false);
  const [isFormSaved, setIsFormSaved] = useState(false);

  const updateFormSavedStatus = useCallback(() => {
    setIsFormSaved((prev) => !prev);
  }, []);

  useEffect(() => {
    (async () => {
      (async () => {
        const previousEncounters = await getPatientEncounters(
          patientUuid,
          RETEST_ENCOUNTER_TYPE,
        );
        previousEncounters.length
          ? setHasPreviousEncounter(true)
          : setHasPreviousEncounter(false);
      })();

      await doesPatientHaveIdentifier(patientUuid, setHasMRN);
    })();
  }, [isFormSaved]);
  return (
    <>
      {!hasMRN && <p className={styles.warningMessage}>{MRN_NULL_WARNING}</p>}
      <EncounterList
        patientUuid={patientUuid}
        encounterType={RETEST_ENCOUNTER_TYPE}
        formList={[{ name: "Re-test" }]}
        columns={columns}
        description="HIV Retest List"
        headerTitle="HIV Retest"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher: !hasMRN || hasPreviousEncounter,
        }}
        afterFormSaveAction={updateFormSavedStatus}
      />
    </>
  );
};

export default HivRetestList;
