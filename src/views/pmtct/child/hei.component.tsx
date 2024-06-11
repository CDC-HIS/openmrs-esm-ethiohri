import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React from "react";
import styles from "../../program-management/program-management.scss";
import PMTCTRegistrationEncounterList from "./tabs/hei-enrollment.component";
import PMTCTImmunizationEncounterList from "./tabs/hei-immunization.component";
import PMTCTFollowupEncounterList from "./tabs/hei-followup.component";
import PMTCTChildFinalOutcomeEncounterList from "./tabs/hei-final-outcome";

const ChildHealth: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <>
      <div className={styles.tabContainer}>
        <Tabs>
          <TabList contained aria-label={""}>
            <Tab>HEI Enrollment</Tab>
            <Tab>HEI Immunization</Tab>
            <Tab>HEI Followup</Tab>
            <Tab>HEI Final Outcome</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <PMTCTRegistrationEncounterList patientUuid={patientUuid} />
            </TabPanel>
            <TabPanel>
              <PMTCTImmunizationEncounterList patientUuid={patientUuid} />
            </TabPanel>
            <TabPanel>
              <PMTCTFollowupEncounterList patientUuid={patientUuid} />
            </TabPanel>
            <TabPanel>
              <PMTCTChildFinalOutcomeEncounterList patientUuid={patientUuid} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  );
};

export default ChildHealth;
