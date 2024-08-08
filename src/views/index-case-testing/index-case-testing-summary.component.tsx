/* eslint-disable prettier/prettier */
import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React from "react";
import styles from "../program-management/program-management.scss";
import ICTGeneral from "./tabs/ict-general.component";
import ICTOffer from "./tabs/ict-offer.component";
import IndexContactFollowup from "./tabs/index-contact-followup.component";

const IndexCaseTesting: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained aria-label={""}>
          <Tab>Index Case Information</Tab>
          <Tab>ICT Service Offering</Tab>
          <Tab>ICT Followup</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ICTGeneral patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <ICTOffer patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <IndexContactFollowup patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default IndexCaseTesting;
