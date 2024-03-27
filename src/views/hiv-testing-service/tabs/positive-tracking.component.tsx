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
    key: "linkedToCareAndTreatment",
    header: "Linked to Care and Treatment?",
    getValue: (encounter) => {
      return getData(encounter, "c1bb9738-10aa-4905-bb5d-af4e55b4bb69");
    },
  },
  {
    key: "startedART",
    header: "Started ART?",
    getValue: (encounter) => {
      return getData(encounter, "1149AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "reasonForNotStartingArtTheSameDay",
    header: "Reason for not starting?",
    getValue: (encounter) => {
      return getData(encounter, "d8ffb301-9a47-45ee-a465-f053cc060aab");
    },
  },
  {
    key: "planForNextStep",
    header: "Plan for Next Step",
    getValue: (encounter) => {
      return getData(encounter, "e96ea7a2-5285-41d3-bb0d-4f199cf5b8ee");
    },
  },
  {
    key: "finalOutcome",
    header: "Final Outcome",
    getValue: (encounter) => {
      return getData(encounter, "413b265c-87ef-4988-a7bc-1bfc6b5e5528");
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
