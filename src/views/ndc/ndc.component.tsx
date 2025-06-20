import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React from "react";
import FollowUp from "./tabs/follow-up";
import Screening from "./tabs/screening";
import styles from "./ndc.scss";

const NdcManagment: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained aria-label={""}>
          <Tab>NCD Screening </Tab>
          <Tab>Follow Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Screening patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <FollowUp patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default NdcManagment;
