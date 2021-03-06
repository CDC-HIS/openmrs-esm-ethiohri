import React from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib/src/index";
import { INTAKE_B_ENCOUNTER_TYPE } from "../../../constants";
import { getData } from "../../encounterUtils";

const columns = [
  {
    key: "pastOI",
    header: "Past OIs Recorded",
    getValue: (encounter) => {
      return getData(encounter, "c52ecf45-bd6c-43ed-861b-9a2714878729");
    },
  },
  {
    key: "lifeARTDate",
    header: "Lifelong ART Start Date",
    getValue: (encounter) => {
      return getData(encounter, "159599AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", true);
    },
  },
  {
    key: "whoStaging",
    header: "WHO Staging",
    getValue: (encounter) => {
      return getData(encounter, "5356AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "inhStartDate",
    header: "INH Start Date",
    getValue: (encounter) => {
      return getData(encounter, "164852AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", true);
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "intake_b", package: "eth-hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Intake-B",
        mode: "view",
      },
      {
        form: { name: "intake_b", package: "eth-hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit Intake-B",
        mode: "edit",
      },
    ],
  },
];

const IntakeBEncounterList: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={INTAKE_B_ENCOUNTER_TYPE}
      form={{ package: "eth-hiv", name: "intake_b" }}
      columns={columns}
      description="Intake B Encounter List"
      headerTitle="Intake B"
      dropdownText="Add"
    />
  );
};

export default IntakeBEncounterList;
