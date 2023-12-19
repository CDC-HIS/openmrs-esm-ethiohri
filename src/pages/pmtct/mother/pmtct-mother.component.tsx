/* eslint-disable prettier/prettier */
import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React from "react";
import styles from "../../program-management/program-management.scss";
import PMTCTRegistrationEncounterList from "../child/tabs/pmtct-child-registration.component";
import PMTCTImmunizationEncounterList from "../child/tabs/pmtct-child-immunization.component";
import PMTCTFollowupEncounterList from "../child/tabs/pmtct-child-followup.component";

const ChildHealth: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained aria-label={""}>
          <Tab>Mother's Initial Registration</Tab>
          <Tab>Mother's Followup</Tab>
          <Tab>Mother's Discharge Information</Tab>
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
