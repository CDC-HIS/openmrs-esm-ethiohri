import React from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { PMTCT_IMMUNIZATION_ENCOUNTER_TYPE } from "../../../../constants";
import { getData } from "../../../encounterUtils";
import { moduleName } from "../../../../index";

const columns = [
  {
    key: "bcg",
    header: "BCG",
    getValue: (encounter) => {
      return getData(encounter, "886AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", true);
    },
  },
  {
    key: "ipv",
    header: "IPV",
    getValue: (encounter) => {
      return getData(encounter, "923b4623-ac8d-4e65-a55a-aa4715752a14", false);
    },
  },
  {
    key: "opv0",
    header: "OPV 0 Taken",
    getValue: (encounter) => {
      return getData(encounter, "14369b36-910a-4996-813c-2312d234f5cf", false);
    },
  },
  {
    key: "opv1",
    header: "OPV 1 Taken",
    getValue: (encounter) => {
      return getData(encounter, "1c60218e-6285-460b-94ed-205cdf0afe20", false);
    },
  },
  {
    key: "opv2",
    header: "OPV 2 Taken",
    getValue: (encounter) => {
      return getData(encounter, "1f25b4b6-bad6-4d39-b11a-6b76ea781958", false);
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "HEI Immunization", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View HEI Immunization",
        mode: "view",
      },
      {
        form: { name: "HEI Immunization", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit HEI Immunization",
        mode: "edit",
      },
    ],
  },
];

const PMTCTImmunizationEncounterList: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={PMTCT_IMMUNIZATION_ENCOUNTER_TYPE}
        formList={[{ name: "HEI Immunization" }]}
        columns={columns}
        description="HEI Immunization Encounter List"
        headerTitle="HEI Immunization"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
        }}
      />
    </>
  );
};

export default PMTCTImmunizationEncounterList;
