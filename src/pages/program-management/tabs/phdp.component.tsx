import React from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { PHDP_ENCOUNTER_TYPE } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";

const columns = [
  {
    key: "phdpdate",
    header: "Date",
    getValue: (encounter) => {
      return getData(encounter, "2c4db7e7-1ece-49a6-a075-d466e6d9b27d", true);
    },
  },
  {
    key: "issuesAddressed",
    header: "Issues Addressed",
    getValue: (encounter) => {
      return getData(encounter, "bbcdc4d4-8e9e-41ab-b197-2b5d97c1a7e0");
    },
  },
  {
    key: "conclusion",
    header: "Conclusion",
    getValue: (encounter) => {
      return getData(encounter, "160632AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  ,
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "POC PHDP Form", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View PHDP",
        mode: "view",
      },
      {
        form: { name: "POC PHDP Form", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit PHDP",
        mode: "edit",
      },
    ],
  },
];

const PHDPList: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={PHDP_ENCOUNTER_TYPE}
      formList={[{ name: "POC PHDP Form" }]}
      columns={columns}
      description="PHDP List"
      headerTitle="PHDP"
      launchOptions={{
        displayText: "Add",
        moduleName: moduleName,
      }}
    />
  );
};

export default PHDPList;
