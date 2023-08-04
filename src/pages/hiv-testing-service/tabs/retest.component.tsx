import React from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { RETEST_ENCOUNTER_TYPE } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";

const columns = [
  {
    key: "initialTestDate",
    header: "Date of initial testig",
    getValue: (encounter) => {
      return getData(encounter, "9182520e-24e8-4e84-aba7-6b56bdeb76d5", true);
    },
  },
  {
    key: "dateOfRetesting",
    header: "Date of retesting",
    getValue: (encounter) => {
      return getData(encounter, "3c588dc4-cd32-47e6-a919-806e254b66c7");
    },
  },
  {
    key: "finalResult",
    header: "Final result",
    getValue: (encounter) => {
      return getData(encounter, "159427AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "artStartDate",
    header: "ART start date",
    getValue: (encounter) => {
      return getData(encounter, "159599AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  ,
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "retest", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View HIV Retest",
        mode: "view",
      },
      {
        form: { name: "retest", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit HIV Retest",
        mode: "edit",
      },
    ],
  },
];

const HivRetestList: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={RETEST_ENCOUNTER_TYPE}
      formList={[{ name: "retest" }]}
      columns={columns}
      description="HIV Retest List"
      headerTitle="HIV Retest"
      launchOptions={{
        displayText: "Add",
        moduleName: moduleName,
      }}
    />
  );
};

export default HivRetestList;
