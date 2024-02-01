import React, { useMemo } from "react";
import {
  EncounterList,
  EncounterListColumn,
} from "@ohri/openmrs-esm-ohri-commons-lib";
import { FOLLOWUP_ENCOUNTER_TYPE } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";

const Followup: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: "followupDate",
        header: "Follow-Up Date",
        getValue: (encounter) => {
          return getData(encounter, "5c118396-52dc-4cac-8860-e6d8e4a7f296");
        },
      },
      {
        key: "followupStatus",
        header: "Follow-Up Status",
        getValue: (encounter) => {
          return getData(encounter, "222f64a8-a603-4d2e-b70e-2d90b622bb04");
        },
      },
      {
        key: "dispenseCode",
        header: "ARV Regimen",
        getValue: (encounter) => {
          return getData(encounter, "6d7d0327-e1f8-4246-bfe5-be1e82d94b14");
        },
      },
      {
        key: "arvDispensedInDays",
        header: "Dose Days",
        getValue: (encounter) => {
          return getData(encounter, "f3911009-1a8f-42ee-bdfc-1e343c2839aa");
        },
      },
      {
        key: "dateViralLoadRequested",
        header: "VL Sent Date",
        getValue: (encounter) => {
          return getData(encounter, "163281AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        },
      },
      {
        key: "viralLoadStatus",
        header: "VL Status",
        getValue: (encounter) => {
          return getData(encounter, "2dc9ee04-4d12-4606-ae0f-86895bf14a44");
        },
      },
      {
        key: "assessmentCategory",
        header: "DSD Category",
        getValue: (encounter) => {
          return getData(encounter, "defeb4ff-d07b-4e4a-bbd6-d4281c1384a2");
        },
      },
      {
        key: "typeOfScreening",
        header: "CxCa Screening Type",
        getValue: (encounter) => {
          return getData(encounter, "2c6f75a8-f35c-4671-939e-ebcc680c48a0");
        },
      },
      {
        key: "weight",
        header: "Weight",
        getValue: (encounter) => {
          return getData(encounter, "5089AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        },
      },
      {
        key: "cd4Count",
        header: "CD4 Count",
        getValue: (encounter) => {
          return getData(encounter, "5497AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        },
      },
      {
        key: "nextVisitDate",
        header: "Next Visit Date",
        getValue: (encounter) => {
          return getData(encounter, "c596f199-4d76-4eca-b3c4-ffa631c0aee9");
        },
      },
      {
        key: "actions",
        header: "Actions",
        getValue: (encounter) => [
          {
            form: { name: "POC Followup Form", package: "eth_hiv" },
            encounterUuid: encounter.uuid,
            intent: "*",
            label: "View Followup",
            mode: "view",
          },
          {
            form: { name: "POC Followup Form", package: "eth_hiv" },
            encounterUuid: encounter.uuid,
            intent: "*",
            label: "Edit Followup",
            mode: "edit",
          },
        ],
      },
    ],
    []
  );

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={FOLLOWUP_ENCOUNTER_TYPE}
      formList={[{ name: "POC Followup Form" }]}
      columns={columns}
      description="Followup Encounter List"
      headerTitle="Followup"
      launchOptions={{
        displayText: "Add",
        moduleName: moduleName,
      }}
    />
  );
};

export default Followup;
