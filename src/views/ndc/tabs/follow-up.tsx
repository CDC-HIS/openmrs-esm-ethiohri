import React from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { ndcFollowUpEncounterType } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
const columns = [
  // {
  //   key: "encounterdate",
  //   header: "Visit Date",
  // },
  {
    key: "Diagnosis",
    header: "Diagnosis",
    getValue: (encounter) => {
      return getData(encounter, "1284AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "DM Complication",
    header: "DM Complication",
    getValue: (encounter) => {
      return getData(encounter, "50f28c1f-4afc-4ba3-a07a-502794249ad7");
    },
  },
  {
    key: "HPT Complication",
    header: "HPT Complication",
    getValue: (encounter) => {
      return getData(encounter, "50f28c1f-4afc-4ba3-a07a-502794249ad7");
    },
  },
  {
    key: "Medication",
    header: "Medication",
    getValue: (encounter) => {
      return getData(encounter, "1282AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "Adherence",
    header: "Adherence",
    getValue: (encounter) => {
      return getData(encounter, "164075AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "Outcome",
    header: "Outcome",
    getValue: (encounter) => {
      return getData(encounter, "160433AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "Next Visit Date",
    header: "Next Visit Date",
    getValue: (encounter) => {
      return getData(encounter, "5096AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: {
          name: "NCD Screening Form",
          package: "eth_hiv",
        },
        encounterUuid: encounter.uuid,
        intent: "view",
        label: "View",
        mode: "view",
      },
      {
        form: {
          name: "NCD Screening Form",
          package: "eth_hiv",
        },
        encounterUuid: encounter.uuid,
        intent: "edit",
        label: "Edit",
        mode: "edit",
      },
    ],
  },
];

const FollowUp: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={ndcFollowUpEncounterType}
      formList={[{ name: "NCD Screening Form" }]}
      columns={columns}
      description="NCD Screening Form"
      headerTitle="NCD Screening Form"
      launchOptions={{
        displayText: "Add",
        moduleName: moduleName,
      }}
    />
  );
};

export default FollowUp;
