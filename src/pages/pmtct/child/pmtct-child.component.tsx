/* eslint-disable prettier/prettier */
import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React from "react";
import styles from "../../program-management/program-management.scss";
import PMTCTRegistrationEncounterList from "./tabs/pmtct-child-registration.component";
import PMTCTImmunizationEncounterList from "./tabs/pmtct-child-immunization.component";
import PMTCTFollowupEncounterList from "./tabs/pmtct-child-followup.component";
import PMTCTChildFinalOutcomeEncounterList from "./tabs/pmtct-child-final-outcome";

const ChildHealth: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained aria-label={""}>
          <Tab>Child Registration</Tab>
          <Tab>Child Immunization</Tab>
          <Tab>Child Followup</Tab>
          <Tab>Child Final Outcome</Tab>
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
  );
};

export default ChildHealth;
