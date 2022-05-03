import { Tab, Tabs } from "carbon-components-react";
import React from "react";
import Intake_A_EncounterList from "../intake-a-encounter-list/intake-a-encounter-list.component";
import styles from "./program-management.component.scss";

const ProgramManagementSummary: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <div className={styles.tabContainer}>
      <Tabs type="container">
        <Tab label="Intake A">
          <Intake_A_EncounterList patientUuid={patientUuid} />
        </Tab>
        <Tab label="Intake B" style={{ padding: 0 }}></Tab>
      </Tabs>
    </div>
  );
};

export default ProgramManagementSummary;
