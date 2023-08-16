import React from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { PRE_EXPOSURE_SCREENING_ENCOUNTER_TYPE } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";

const columns = [
  {
    key: "hivTestResult",
    header: "HIV Test Result",
    getValue: (encounter) => {
      return getData(encounter, "159427AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "stiScreeningResult",
    header: "STI Screening Result",
    getValue: (encounter) => {
      return getData(encounter, "7a643a93-3f11-4ad0-acfa-b15f2d7c8ddc");
    },
  },
  {
    key: "hepititisBTestResult",
    header: "Hepititis B Test Result",
    getValue: (encounter) => {
      return getData(encounter, "1322AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "prepStarted",
    header: "PrEP Started",
    getValue: (encounter) => {
      return getData(encounter, "3b4bc0b2-acbb-4fb5-82eb-6f0479915862");
    },
  },
  ,
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "Prep", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Pre Exposure Screening",
        mode: "view",
      },
      {
        form: { name: "Prep", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit Pre Exposure Screening",
        mode: "edit",
      },
    ],
  },
];

const PreExposureScreeningList: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={PRE_EXPOSURE_SCREENING_ENCOUNTER_TYPE}
      formList={[{ name: "Prep" }]}
      columns={columns}
      description="Pre Exposure Screening Tracking List"
      headerTitle="Pre Exposure Screening"
      launchOptions={{
        displayText: "Add",
        moduleName: moduleName,
      }}
    />
  );
};

export default PreExposureScreeningList;
