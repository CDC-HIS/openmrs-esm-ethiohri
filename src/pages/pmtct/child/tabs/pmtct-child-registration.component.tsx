import React from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { PMTCT_REGISTRATION_ENCOUNTER_TYPE } from "../../../../constants";
import { getData } from "../../../encounterUtils";
import { moduleName } from "../../../../index";

const columns = [
  {
    key: "enrollment_date",
    header: "Enrollment Date",
    getValue: (encounter) => {
      return getData(encounter, "1ebc345c-6f09-43e1-a616-d7e52fff4c7d");
    },
  },
  {
    key: "heiCode",
    header: "HEI Code",
    getValue: (encounter) => {
      return getData(encounter, "2b30a270-be1f-4cce-9949-7d7eaba349be");
    },
  },
  {
    key: "birthWeight",
    header: "Birth Weight",
    getValue: (encounter) => {
      return getData(encounter, "5916AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "arvStarted",
    header: "ARV Prophylaxis",
    getValue: (encounter) => {
      return getData(encounter, "b7f50074-b9f2-4b0d-9f20-d18b646d822e");
    },
  },
  {
    key: "mothersPmtct",
    header: "Mother's PMTCT Intervention",
    getValue: (encounter) => {
      return getData(encounter, "6b60a8c6-da45-4f10-9135-e5e5d4b2a1b9");
    },
  },
  {
    key: "fathersStatus",
    header: "Father's HIV Status",
    getValue: (encounter) => {
      return getData(encounter, "2d5b2754-423e-47d3-9bf5-81ee0c2108f5");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "HEI Enrollment", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View HEI Enrollment",
        mode: "view",
      },
      {
        form: { name: "HEI Enrollment", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit HEI Enrollment",
        mode: "edit",
      },
    ],
  },
];

const PMTCTRegistrationEncounterList: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={PMTCT_REGISTRATION_ENCOUNTER_TYPE}
        formList={[{ name: "HEI Enrollment" }]}
        columns={columns}
        description="HEI Enrollment Encounter List"
        headerTitle="HEI Enrollment"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
        }}
      />
    </>
  );
};

export default PMTCTRegistrationEncounterList;
