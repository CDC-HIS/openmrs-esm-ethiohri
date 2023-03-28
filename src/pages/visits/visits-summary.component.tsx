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
        key: "vistiType",
        header: "Visit Type",
        getValue: (encounter) => {
          return getData(
            encounter,
            "b3f60308-cda4-41f9-af08-b98d2c1562c7",
            true
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
            "159368AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            true
          );
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
