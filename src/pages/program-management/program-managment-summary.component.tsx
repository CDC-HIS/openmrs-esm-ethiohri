import { Tab, Tabs } from "carbon-components-react";
import React from "react";
import IntakeAEncounterList from "./tabs/intake-a.component";
import IntakeBEncounterList from "./tabs/intake-b.component";
import styles from "./program-management.scss";

const ProgramManagment: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <Tab label="Intake A">
          <IntakeAEncounterList patientUuid={patientUuid} />
        </Tab>
        <Tab label="Intake B">
          <IntakeBEncounterList patientUuid={patientUuid} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ProgramManagment;
