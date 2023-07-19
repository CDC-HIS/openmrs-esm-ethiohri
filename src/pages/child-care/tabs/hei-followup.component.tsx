/* eslint-disable prettier/prettier */
import React, { useMemo } from "react";
import {
  EncounterList,
  EncounterListColumn,
} from "@ohri/openmrs-esm-ohri-commons-lib";
import { PMTCT_ENCOUNTER_TYPE } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";

const HEIFollowup: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: "enrollmentDate",
        header: "Enrollment Date",
        getValue: (encounter) => {
          return getData(
            encounter,
            "160555AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            true
          );
        },
      },
      {
        key: "ageAtEnrollment",
        header: "Age at enrollment",
        getValue: (encounter) => {
          return getData(
            encounter,
            "160617AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            false
          );
        },
      },
      {
        key: "placeOfBirth",
        header: "Place of birth",
        getValue: (encounter) => {
          return getData(
            encounter,
            "163531AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            false
          );
        },
      },
      {
        key: "birthWeight",
        header: "Birth weight",
        getValue: (encounter) => {
          return getData(
            encounter,
            "8ddaed89-5474-424a-a9e1-a8ad28b091fb",
            false
          );
        },
      },
      {
        key: "infantReferred",
        header: "Infant referred",
        getValue: (encounter) => {
          return getData(
            encounter,
            "164849AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            false
          );
        },
      },
      {
        key: "actions",
        header: "Actions",
        getValue: (encounter) => [
          {
            form: { name: "pmtct", package: "eth_hiv" },
            encounterUuid: encounter.uuid,
            intent: "*",
            label: "View HEI Followup",
            mode: "view",
          },
          {
            form: { name: "pmtct", package: "eth_hiv" },
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
      encounterType={PMTCT_ENCOUNTER_TYPE}
      formList={[{ name: "eth_hiv" }]}
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

export default HEIFollowup;
