import { Tab, Tabs } from "carbon-components-react";
import React from "react";
import IntakeAEncounterList from "./tabs/intake-a.component";
import IntakeBEncounterList from "./tabs/intake-b.component";
import FamilyInformationList from "./tabs/family-information.component";
import PHDPList from "./tabs/phdp.component";
import styles from "./program-management.scss";

const ProgramManagment: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <div className={styles.tabContainer}>
      <Tabs type="container">
        <Tab label="Intake A">
          <IntakeAEncounterList patientUuid={patientUuid} />
        </Tab>
        <Tab label="Intake B">
          <IntakeBEncounterList patientUuid={patientUuid} />
        </Tab>
        <Tab label="Family Information">
          <FamilyInformationList patientUuid={patientUuid} />
        </Tab>
        <Tab label="PHDP">
          <PHDPList patientUuid={patientUuid} />
        </Tab>
        <Tab label="DSD">
          <div>DSD</div>
        </Tab>
        <Tab label="Outcomes">
          <div>Outcomes</div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ProgramManagment;
