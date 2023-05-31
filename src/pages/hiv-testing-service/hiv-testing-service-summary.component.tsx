import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React from "react";
import styles from "../program-management/program-management.scss";
import PositiveTrackingList from "./tabs/positive-tracking.component";
import HivRetestList from "./tabs/retest.component";

const HIVTestingService: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          <Tab>HIV Positive Tracking</Tab>
          <Tab>HIV Retest</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PositiveTrackingList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <HivRetestList patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default HIVTestingService;
