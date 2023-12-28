import React from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { PMTCT_REGISTRATION_ENCOUNTER_TYPE } from "../../../../constants";
import { getData } from "../../../encounterUtils";
import { moduleName } from "../../../../index";

const columns = [
  {
    key: "heiDate",
    header: "HEI Code",
    getValue: (encounter) => {
      return getData(encounter, "2b30a270-be1f-4cce-9949-7d7eaba349be", true);
    },
  },
  {
    key: "arvStarted",
    header: "ARV started",
    getValue: (encounter) => {
      return getData(encounter, "b7f50074-b9f2-4b0d-9f20-d18b646d822e", false);
    },
  },
  {
    key: "infantReferred",
    header: "Infant Referred",
    getValue: (encounter) => {
      return getData(encounter, "a0b16ce2-80a8-4b26-9168-74a6f64adb09", false);
    },
  },
  {
    key: "placeOfDelivery",
    header: "Place of Delivery",
    getValue: (encounter) => {
      return getData(encounter, "1572AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", false);
    },
  },
  {
    key: "modeOfDelivery",
    header: "Mode of Delivery",
    getValue: (encounter) => {
      return getData(encounter, "5630AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", false);
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
