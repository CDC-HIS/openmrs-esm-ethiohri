import React from "react";
import { EncounterList } from "openmrs-esm-ohri-commons-lib/src/index";
import { PHDP_ENCOUNTER_TYPE } from "../../../constants";
import { getData } from "../../encounterUtils";

const columns = [
  {
    key: "phdpdate",
    header: "Date",
    getValue: (encounter) => {
      return getData(encounter, "160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", true);
    },
  },
  {
    key: "issuesAddressed",
    header: "Issues Addressed",
    getValue: (encounter) => {
      return "---";
    },
  },
  {
    key: "conclusion",
    header: "Conclusion",
    getValue: (encounter) => {
      return "---";
    },
  },
];

const PHDPList: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={PHDP_ENCOUNTER_TYPE}
      form={{ package: "eth-hiv", name: "phdp" }}
      columns={columns}
      description="PHDP List"
      headerTitle="PHDP"
      dropdownText="Add"
    />
  );
};

export default PHDPList;
