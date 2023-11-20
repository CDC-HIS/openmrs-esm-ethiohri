import React from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { POSITIVE_TRACKING_ENCOUNTER_TYPE } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";

const columns = [
  {
    key: "registrationDate",
    header: "Registration Date",
    getValue: (encounter) => {
      return getData(encounter, "1ebc345c-6f09-43e1-a616-d7e52fff4c7d", true);
    },
  },
  {
    key: "hivPositiveDate",
    header: "HIV Positive Date",
    getValue: (encounter) => {
      return getData(encounter, "160554AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", true);
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
    key: "finalOutcomeKnown",
    header: "Final Outcome Known",
    getValue: (encounter) => {
      return getData(encounter, "4599ebf7-6120-4593-80f0-72458b9fadad");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "Positive Tracking", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Positive Tracking",
        mode: "view",
      },
      {
        form: { name: "Positive Tracking", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit Positive Tracking",
        mode: "edit",
      },
    ],
  },
];

const PositiveTrackingList: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={POSITIVE_TRACKING_ENCOUNTER_TYPE}
      formList={[{ name: "Positive Tracking" }]}
      columns={columns}
      description="Positive Tracking List"
      headerTitle="Positive Tracking"
      launchOptions={{
        displayText: "Add",
        moduleName: moduleName,
      }}
    />
  );
};

export default PositiveTrackingList;
