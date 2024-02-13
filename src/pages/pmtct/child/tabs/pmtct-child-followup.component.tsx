/* eslint-disable prettier/prettier */
import React, { useMemo } from "react";
import {
  EncounterList,
  EncounterListColumn,
} from "@ohri/openmrs-esm-ohri-commons-lib";
import { PMTCT_FOLLOWUP_ENCOUNTER_TYPE } from "../../../../constants";
import { getData } from "../../../encounterUtils";
import { moduleName } from "../../../../index";

const PMTCTFollowupEncounterList: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: "followupDate",
        header: "Follow-up Date",
        getValue: (encounter) => {
          return getData(encounter, "5c118396-52dc-4cac-8860-e6d8e4a7f296");
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
        key: "growthPattern",
        header: "Growth Pattern",
        getValue: (encounter) => {
          return getData(encounter, "eea6b3e8-efc6-448e-9d01-c2462e2cf727");
        },
      },

      {
        key: "developmentMilestone",
        header: "Developmental Milestone",
        getValue: (encounter) => {
          return getData(encounter, "d646c980-b04d-46a0-8a49-4800506ad64c");
        },
      },
      {
        key: "feedingPracticeForInfantOlderThan6Months",
        header: "Feeding Practice",
        getValue: (encounter) => {
          return getData(encounter, "db416d1c-d29b-4257-8cd7-76ff835845c5");
        },
      },
      {
        key: "testIndication",
        header: "DNA PCR Indication",
        getValue: (encounter) => {
          return getData(encounter, "cc8b10f3-a1ff-4d82-8143-a45af803bd56");
        },
      },
      {
        key: "testResult",
        header: "DNA PCR Result",
        getValue: (encounter) => {
          return getData(encounter, "2e770be1-7397-4684-bea6-6632c23b00d7");
        },
      },
      {
        key: "rapidAntibodyResult",
        header: "Rapid Test Result",
        getValue: (encounter) => {
          return getData(encounter, "aa69908a-989a-4fef-ad65-cbd73ba487b7");
        },
      },
      {
        key: "dose",
        header: "Cotrimoxazole Dose",
        getValue: (encounter) => {
          return getData(encounter, "ec9670c2-ee1f-42db-aea1-d238fb4fc33f");
        },
      },
      {
        key: "decision",
        header: "Decision",
        getValue: (encounter) => {
          return getData(encounter, "f0652b88-d1dd-4ec5-add7-8bdda63b5a8a");
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
            form: { name: "HEI Followup", package: "eth_hiv" },
            encounterUuid: encounter.uuid,
            intent: "*",
            label: "View HEI Followup",
            mode: "view",
          },
          {
            form: { name: "HEI Followup", package: "eth_hiv" },
            encounterUuid: encounter.uuid,
            intent: "*",
            label: "Edit HEI Followup",
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
      encounterType={PMTCT_FOLLOWUP_ENCOUNTER_TYPE}
      formList={[{ name: "HEI Followup" }]}
      columns={columns}
      description="HEI Followup Encounter List"
      headerTitle="HEI Followup"
      launchOptions={{
        displayText: "Add",
        moduleName: moduleName,
      }}
    />
  );
};

export default PMTCTFollowupEncounterList;
