import React from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { INDEX_CONTACT_FOLLOWUP_ENCOUNTER_TYPE } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";

const columns = [
  {
    key: "contactFirstName",
    header: "Contact First Name",
    getValue: (encounter) => {
      return getData(encounter, "166102AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", true);
    },
  },
  {
    key: "contactLastName",
    header: "Contact Last Name",
    getValue: (encounter) => {
      return getData(encounter, "166103AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "contactCategory",
    header: "Contact Category",
    getValue: (encounter) => {
      return getData(encounter, "a7d17e7a-a8b2-49b5-84f1-aade1277b658");
    },
  },
  {
    key: "contactTrialsOutcome",
    header: "Contact Trial Outcome",
    getValue: (encounter) => {
      return getData(encounter, "da8e65a1-04ee-44a0-be4b-d2bc4f002aa4");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "Index Contact Followup", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Index Contact Followup",
        mode: "view",
      },
      {
        form: { name: "Index Contact Followup", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit Index Contact Followup",
        mode: "edit",
      },
    ],
  },
];

const IndexContactFollowup: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={INDEX_CONTACT_FOLLOWUP_ENCOUNTER_TYPE}
      formList={[{ name: "Index Contact Followup" }]}
      columns={columns}
      description="Index Contact Followup List"
      headerTitle="Index Contact Followup"
      launchOptions={{
        displayText: "Add",
        moduleName: moduleName,
      }}
    />
  );
};

export default IndexContactFollowup;