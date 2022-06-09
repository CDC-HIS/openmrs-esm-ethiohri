import React from "react";
import {
  EncounterList,
  getObsFromEncounter,
} from "openmrs-esm-ohri-commons-lib/src/index";
import { FOLLOWUP_ENCOUNTER_TYPE } from "../../../constants";

const columns = [
  {
    key: "followUpDate",
    header: "Follow-Up Date",
    getValue: (encounter) => {
      return getObsFromEncounter(
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
      return getObsFromEncounter(
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
      return getObsFromEncounter(
        encounter,
        "5096AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        true
      );
    },
  },
];

const FollowupEncounterList: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={FOLLOWUP_ENCOUNTER_TYPE}
      form={{ package: "eth-hiv", name: "followup" }}
      columns={columns}
      description="Followup Encounter List"
      headerTitle="Followup"
      dropdownText="Add"
    />
  );
};

export default FollowupEncounterList;
