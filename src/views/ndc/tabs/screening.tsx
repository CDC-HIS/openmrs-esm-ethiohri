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
    key: "visitType",
    header: "Visit Type",
    getValue: (encounter) => {
      return getData(encounter, "b3f60308-cda4-41f9-af08-b98d2c1562c7");
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
    key: "Weight",
    header: "Weight",
    getValue: (encounter) => {
      return getData(encounter, "5089AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "BMI",
    header: "BMI",
    getValue: (encounter) => {
      return getData(encounter, "1342AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
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
