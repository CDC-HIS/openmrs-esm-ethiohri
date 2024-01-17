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
        key: "followUpDate",
        header: "Follow-Up Date",
        getValue: (encounter) => {
          return getData(
            encounter,
            "5c118396-52dc-4cac-8860-e6d8e4a7f296",
            true
          );
        },
      },
      {
        key: "visitType",
        header: "Visit Type",
        getValue: (encounter) => {
          return getData(
            encounter,
            "b3f60308-cda4-41f9-af08-b98d2c1562c7",
            false
          );
        },
      },
      {
        key: "dateConfirmedHIVPositive",
        header: "Date Confirmed HIV +",
        getValue: (encounter) => {
          return getData(
            encounter,
            "160554AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            true
          );
        },
      },
      {
        key: "monthsOnArt",
        header: "Months On ART",
        getValue: (encounter) => {
          return getData(
            encounter,
            "0503b8d4-e6db-4a87-ba42-8ef892791dba",
            false
          );
        },
      },
      {
        key: "nextVisitDate",
        header: "Next visit date",
        getValue: (encounter) => {
          return getData(
            encounter,
            "c596f199-4d76-4eca-b3c4-ffa631c0aee9",
            true
          );
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
