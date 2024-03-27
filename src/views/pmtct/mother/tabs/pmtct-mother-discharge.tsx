import React from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { PMTCT_MOTHER_DISCHARGE_ENCOUNTER_TYPE } from "../../../../constants";
import { getData } from "../../../../encounterUtils";
import { moduleName } from "../../../../index";

const columns = [
  {
    key: "dischargeDate",
    header: "Discharge Date",
    getValue: (encounter) => {
      return getData(encounter, "18f78400-d91c-40ea-bd9f-4388c10d50c1", true);
    },
  },
  {
    key: "reasonForDischarge",
    header: "Reason for Discharge",
    getValue: (encounter) => {
      return getData(encounter, "ba47a98e-b6b0-42f1-b612-496d501b1272");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "PMTCT Discharge", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Mother's Discharge",
        mode: "view",
      },
      {
        form: { name: "PMTCT Discharge", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit Mother's Discharge",
        mode: "edit",
      },
    ],
  },
];

const PMTCTMotherDischargeEncounterList: React.FC<{
  patientUuid: string;
}> = ({ patientUuid }) => {
  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={PMTCT_MOTHER_DISCHARGE_ENCOUNTER_TYPE}
        formList={[{ name: "PMTCT Discharge" }]}
        columns={columns}
        description="Maternal PMTCT Discharge Information"
        headerTitle="Maternal PMTCT Discharge Information"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
        }}
      />
    </>
  );
};

export default PMTCTMotherDischargeEncounterList;
