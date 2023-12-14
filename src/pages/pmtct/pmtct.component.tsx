/* eslint-disable prettier/prettier */
import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React from "react";
import styles from "../program-management/program-management.scss";
import PMTCTRegistrationEncounterList from "./tabs/pmtct-registration.component";
import PMTCTImmunizationEncounterList from "./tabs/pmtct-immunization.component";
import PMTCTFollowupEncounterList from "./tabs/pmtct-followup.component";

const ChildHealth: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained aria-label={""}>
          <Tab>PMTCT Registration</Tab>
          <Tab>PMTCT Immunization</Tab>
          <Tab>PMTCT Followup</Tab>
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
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ChildHealth;
