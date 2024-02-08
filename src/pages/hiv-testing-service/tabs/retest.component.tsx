import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { MRN_NULL_WARNING, RETEST_ENCOUNTER_TYPE } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
import styles from "../../../root.scss";
import { fetchIdentifiers } from "../../../api/api";

const columns = [
  {
    key: "dateOfRetesting",
    header: "Date of Re-test",
    getValue: (encounter) => {
      return getData(encounter, "3c588dc4-cd32-47e6-a919-806e254b66c7");
    },
  },
  {
    key: "dateOfInitialTest",
    header: "Date of Initial test",
    getValue: (encounter) => {
      return getData(encounter, "9182520e-24e8-4e84-aba7-6b56bdeb76d5");
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
    key: "result1",
    header: "Test 1 Result",
    getValue: (encounter) => {
      return getData(encounter, "be4e10ae-f149-439e-904b-a02a264cbfdb");
    },
  },
  {
    key: "result2",
    header: "Test 2 Result",
    getValue: (encounter) => {
      return getData(encounter, "6d5b24ab-8ea3-4aca-a9a3-2abc14db1b96");
    },
  },
  {
    key: "result3",
    header: "Test 3 Result",
    getValue: (encounter) => {
      return getData(encounter, "04e7081b-4a0d-4409-9cef-3623b29f8bd2");
    },
  },
  {
    key: "finalResult",
    header: "Final Result",
    getValue: (encounter) => {
      return getData(encounter, "2b1ea8df-3293-4964-9b44-9e31dff678a4");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "Re-test", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View HIV Retest",
        mode: "view",
      },
      {
        form: { name: "Re-test", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit HIV Retest",
        mode: "edit",
      },
    ],
  },
];

const HivRetestList: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
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
        encounterType={RETEST_ENCOUNTER_TYPE}
        formList={[{ name: "Re-test" }]}
        columns={columns}
        description="HIV Retest List"
        headerTitle="HIV Retest"
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

export default HivRetestList;
