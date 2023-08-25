/* eslint-disable prettier/prettier */
import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React from "react";
import styles from "../program-management/program-management.scss";
import ICTGeneral from "./tabs/ict-general.component";
import IndexContactFollowup from "./tabs/index-contact-followup.component";

const ICT: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          <Tab>ICT General</Tab>
          <Tab>Index Contact Followup</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ICTGeneral patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <IndexContactFollowup patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ICT;
