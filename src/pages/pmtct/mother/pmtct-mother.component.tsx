import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React from "react";
import styles from "../../program-management/program-management.scss";
import PMTCTMotherEnrollmentEncounterList from "./tabs/pmtct-mother-enrollment";
import PMTCTMotherDischargeEncounterList from "./tabs/pmtct-mother-discharge";

const ChildHealth: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <>
      <div className={styles.tabContainer}>
        <Tabs>
          <TabList contained aria-label={""}>
            <Tab>PMTCT Enrollment</Tab>
            <Tab>PMTCT Discharge</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <PMTCTMotherEnrollmentEncounterList patientUuid={patientUuid} />
            </TabPanel>
            <TabPanel>
              <PMTCTMotherDischargeEncounterList patientUuid={patientUuid} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  );
};

export default ChildHealth;
