import React from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { ndcScreeningEncounterType } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
const columns = [
  // {
  //   key: "encounterdate",
  //   header: "Visit Date",
  // },
  {
    key: "riskFactor",
    header: "Risk Factor",
    getValue: (encounter) => {
      return getData(encounter, "50f28c1f-4afc-4ba3-a07a-502794249ad7");
    },
  },
  {
    key: "Blood Pressure",
    header: "Blood Pressure",
    getValue: (encounter) => {
      return getData(encounter, "5085AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "Blood Sugar",
    header: "Blood Sugar",
    getValue: (encounter) => {
      return getData(encounter, "887AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "Diagnosis",
    header: "Diagnosis",
    getValue: (encounter) => {
      return getData(encounter, "1284AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
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

const Screening: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={ndcScreeningEncounterType}
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

export default Screening;
