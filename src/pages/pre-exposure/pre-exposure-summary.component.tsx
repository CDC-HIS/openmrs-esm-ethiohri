import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React from "react";
import styles from "../program-management/program-management.scss";
import PreExposureScreeningList from "./tabs/pre-exposure-screening.component";
import PreExposureFollowupList from "./tabs/pre-exposure-followup.component";

const PreExposure: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          <Tab>Pre Exposure Screening</Tab>
          <Tab>Pre Exposure Followup</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PreExposureScreeningList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <PreExposureFollowupList patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default PreExposure;
