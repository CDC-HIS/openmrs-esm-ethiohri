/* eslint-disable prettier/prettier */
import React from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { PRE_EXPOSURE_FOLLOWUP_ENCOUNTER_TYPE } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";

const columns = [
  {
    key: "finalResult",
    header: "Final Test Result",
    getValue: (encounter) => {
      return getData(encounter, "e16b0068-b6a2-46b7-aba9-e3be00a7b4ab");
    },
  },
  {
    key: "followupStatus",
    header: "Followup status",
    getValue: (encounter) => {
      return getData(encounter, "1f3a74f3-cafd-4bd0-9e3c-5251bd0c05e5");
    },
  },
  {
    key: "dispensedDose",
    header: "Dispensed dose",
    getValue: (encounter) => {
      return getData(encounter, "54e133c8-eaa7-4413-8442-5d1ed54a2db5");
    },
  },
  {
    key: "nextVisitDate",
    header: "Next visit date",
    getValue: (encounter) => {
      return getData(encounter, "5096AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  ,
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "pre_exposure_followup", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Pre Exposure Followup",
        mode: "view",
      },
      {
        form: { name: "pre_exposure_followup", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit Pre Exposure Followup",
        mode: "edit",
      },
    ],
  },
];

const PreExposureFollowupList: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={PRE_EXPOSURE_FOLLOWUP_ENCOUNTER_TYPE}
      form={{ package: "eth_hiv", name: "pre_exposure_followup" }}
      columns={columns}
      description="Pre Exposure Followup Tracking List"
      headerTitle="Pre Exposure Followup"
      dropdownText="Add"
      launchOptions={{
        displayText: "Add",
        moduleName: moduleName,
      }}
    />
  );
};

export default PreExposureFollowupList;
