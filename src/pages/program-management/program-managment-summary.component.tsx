import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React from "react";
import IntakeAEncounterList from "./tabs/intake-a.component";
import IntakeBEncounterList from "./tabs/intake-b.component";
import FamilyInformationList from "./tabs/family-information.component";
import PHDPList from "./tabs/phdp.component";
import styles from "./program-management.scss";
import { EmptyStateComingSoon } from "@ohri/openmrs-esm-ohri-commons-lib";

const ProgramManagment: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          <Tab>Intake A</Tab>
          <Tab>Intake B</Tab>
          <Tab>Family Members</Tab>
          <Tab>PHDP</Tab>
          <Tab>DSD</Tab>
          <Tab>Outcomes</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <IntakeAEncounterList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <IntakeBEncounterList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <FamilyInformationList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <PHDPList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <EmptyStateComingSoon displayText="DSD" headerTitle="DSD" />
          </TabPanel>
          <TabPanel>
            <EmptyStateComingSoon
              displayText="Outcomes"
              headerTitle="Outcomes"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ProgramManagment;
