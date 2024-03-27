import React from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { PMTCT_MOTHER_ENROLLMENT_ENCOUNTER_TYPE } from "../../../../constants";
import { getData } from "../../../encounterUtils";
import { moduleName } from "../../../../index";

const columns = [
  {
    key: "dateOfEnrollment",
    header: "PMTCT Enrollment/Booking Date",
    getValue: (encounter) => {
      return getData(encounter, "0fe4faee-0717-4dc0-be3d-1cd52923804a", true);
    },
  },
  {
    key: "statusAtEnrollment",
    header: "Status at Enrollment",
    getValue: (encounter) => {
      return getData(encounter, "ab192dd0-bb1c-4417-b8f9-4c35dc991b55");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "PMTCT Mother Initial Registration", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Mother's Initial Registration",
        mode: "view",
      },
      {
        form: { name: "PMTCT Mother Initial Registration", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit Mother's Initial Registration",
        mode: "edit",
      },
    ],
  },
];

const PMTCTMotherEnrollmentEncounterList: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={PMTCT_MOTHER_ENROLLMENT_ENCOUNTER_TYPE}
        formList={[{ name: "PMTCT Mother Initial Registration" }]}
        columns={columns}
        description="Maternal PMTCT Entry Information"
        headerTitle="Maternal PMTCT Entry Information"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
        }}
      />
    </>
  );
};

export default PMTCTMotherEnrollmentEncounterList;
