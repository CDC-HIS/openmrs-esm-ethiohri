/* eslint-disable prettier/prettier */
import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React from "react";
import styles from "../program-management/program-management.scss";
import HEIRegistrationEncounterList from "./tabs/hei-registration.component";
import HEIFollowup from "./tabs/hei-followup.component";
import ImmunizationEncounterList from "./tabs/immunization.component";

const ChildHealth: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained aria-label={""}>
          <Tab>HEI Registration</Tab>
          <Tab>HEI Followup</Tab>
          <Tab>Immunization</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HEIRegistrationEncounterList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <HEIFollowup patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <ImmunizationEncounterList patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ChildHealth;
