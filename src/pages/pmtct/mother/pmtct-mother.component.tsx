import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React from "react";
import styles from "../../program-management/program-management.scss";
import PMTCTMotherFinalOutcomeEncounterList from "./tabs/pmtct-mother-final-outcome";
import PMTCTMotherEnrollmentEncounterList from "./tabs/pmtct-mother-enrollment";
import PMTCTMotherDischargeEncounterList from "./tabs/pmtct-mother-discharge";

const MotherHealth: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <>
      <div className={styles.tabContainer}>
        <Tabs>
          <TabList contained aria-label={""}>
            <Tab>Mother's Initial Registration</Tab>
            <Tab>Mother's Discharge</Tab>
            <Tab>Mother's Final Outcome</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <PMTCTMotherEnrollmentEncounterList patientUuid={patientUuid} />
            </TabPanel>
            <TabPanel>
              <PMTCTMotherDischargeEncounterList patientUuid={patientUuid} />
            </TabPanel>
            <TabPanel>
              <PMTCTMotherFinalOutcomeEncounterList patientUuid={patientUuid} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  );
};

export default MotherHealth;
