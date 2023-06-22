import React from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { POST_EXPOSURE_ENCOUNTER_TYPE } from "../../constants";
import { getData } from "../encounterUtils";
import { moduleName } from "../../index";

const columns = [
  {
    key: "registrationDate",
    header: "Registration Date",
    getValue: (encounter) => {
      return getData(encounter, "160555AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", true);
    },
  },
  {
    key: "entryPoint",
    header: "Entry point",
    getValue: (encounter) => {
      return getData(encounter, "dd282c99-ea69-44e7-9252-aff0198cc1e8");
    },
  },
  {
    key: "startedART",
    header: "Started ART",
    getValue: (encounter) => {
      return getData(encounter, "1149AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "finalOutcome",
    header: "Final outcome",
    getValue: (encounter) => {
      return getData(encounter, "413b265c-87ef-4988-a7bc-1bfc6b5e5528");
    },
  },
  ,
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "positive_tracking", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Positive Tracking",
        mode: "view",
      },
      {
        form: { name: "positive_tracking", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit Positive Tracking",
        mode: "edit",
      },
    ],
  },
];

const PostExposureProphylaxis: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={POST_EXPOSURE_ENCOUNTER_TYPE}
      form={{ package: "eth_hiv", name: "post_exposure" }}
      columns={columns}
      description="Post Exposure Tracking List"
      headerTitle="Post Exposure"
      dropdownText="Add"
      launchOptions={{
        displayText: "Add",
        moduleName: moduleName,
      }}
    />
  );
};

export default PostExposureProphylaxis;
