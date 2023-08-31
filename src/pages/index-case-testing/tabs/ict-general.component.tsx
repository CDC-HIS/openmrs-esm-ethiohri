import React from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { ICT_GENERAL_ENCOUNTER_TYPE } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";

const columns = [
  {
    key: "ictNumber",
    header: "ICT Serial Number",
    getValue: (encounter) => {
      return getData(encounter, "b35f9632-9ff8-410f-bfcb-f497023bbcf9", true);
    },
  },
  {
    key: "indexFirstName",
    header: "First Name",
    getValue: (encounter) => {
      return getData(encounter, "166102AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "indexLastName",
    header: "Last Name",
    getValue: (encounter) => {
      return getData(encounter, "166103AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "entryPoint",
    header: "Entry Point",
    getValue: (encounter) => {
      return getData(encounter, "1201b688-45f8-4e56-b089-0b31138a19dd");
    },
  },
  {
    key: "targetPopulation",
    header: "Target Population",
    getValue: (encounter) => {
      return getData(encounter, "ca2c04ba-d9bd-4bad-ab03-e57ea9e49016");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "ICT General", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View ICT General",
        mode: "view",
      },
      {
        form: { name: "ICT General", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit ICT General",
        mode: "edit",
      },
    ],
  },
];

const ICTGeneral: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={ICT_GENERAL_ENCOUNTER_TYPE}
      formList={[{ name: "ICT General" }]}
      columns={columns}
      description="ICT General List"
      headerTitle="ICT General"
      launchOptions={{
        displayText: "Add",
        moduleName: moduleName,
      }}
    />
  );
};

export default ICTGeneral;