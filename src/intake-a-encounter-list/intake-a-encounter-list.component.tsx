import React from "react";
import {
  EncounterListColumn,
  findObs,
  getObsFromEncounter,
  EncounterList,
} from "openmrs-esm-ohri-commons-lib/src/index";
import { INTAKE_A_ENCOUNTER_TYPE } from "../constants";

const columns = [];
const Intake_A_EncounterList: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={INTAKE_A_ENCOUNTER_TYPE}
      form={{ package: "", name: "" }}
      columns={columns}
      description="Intake A Encounter list"
      headerTitle="Intake A"
      dropdownText="Add"
    />
  );
};

export default Intake_A_EncounterList;
