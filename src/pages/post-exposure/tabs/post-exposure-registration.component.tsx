import React from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { POST_EXPOSURE_REGISTRATION_ENCOUNTER_TYPE } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";

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
        form: { name: "Exposed Person Information", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Post Exposure Registration",
        mode: "view",
      },
      {
        form: { name: "Exposed Person Information", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit Post Exposure Registration",
        mode: "edit",
      },
    ],
  },
];

const PostExposureRegistration: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={POST_EXPOSURE_REGISTRATION_ENCOUNTER_TYPE}
      formList={[{ name: "Exposed Person Information" }]}
      columns={columns}
      description="Post Exposure Tracking List"
      headerTitle="Post Exposure"
      launchOptions={{
        displayText: "Add",
        moduleName: moduleName,
      }}
    />
  );
};

export default PostExposureRegistration;
