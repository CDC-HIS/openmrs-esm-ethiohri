import React, { useMemo } from "react";
import {
  EncounterList,
  EncounterListColumn,
} from "@ohri/openmrs-esm-ohri-commons-lib";
import { FOLLOWUP_ENCOUNTER_TYPE } from "../../constants";
import { getData } from "../encounterUtils";
import { moduleName } from "../../index";

const VisitsSummary: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: "followUpDate",
        header: "Follow-Up Date",
        getValue: (encounter) => {
          return getData(
            encounter,
            "160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            true
          );
        },
      },
      {
        key: "artStatus",
        header: "ART Status",
        getValue: (encounter) => {
          return "---";
        },
      },
      {
        key: "artStartDate",
        header: "ART Start Date",
        getValue: (encounter) => {
          return getData(
            encounter,
            "159599AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            true
          );
        },
      },
      {
        key: "followupStatus",
        header: "Followup Status",
        getValue: (encounter) => {
          return "---";
        },
      },
      {
        key: "nextVisitDate",
        header: "Next visit date",
        getValue: (encounter) => {
          return getData(
            encounter,
            "5096AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            true
          );
        },
      },
      {
        key: "actions",
        header: "Actions",
        getValue: (encounter) => [
          {
            form: { name: "followup", package: "eth_hiv" },
            encounterUuid: encounter.uuid,
            intent: "*",
            label: "View Followup",
            mode: "view",
          },
          {
            form: { name: "followup", package: "eth_hiv" },
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
      encounterUuid={FOLLOWUP_ENCOUNTER_TYPE}
      form={{ package: "eth_hiv", name: "followup" }}
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

export default VisitsSummary;
