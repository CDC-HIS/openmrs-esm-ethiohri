/* eslint-disable prettier/prettier */
import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React from "react";
import styles from "../program-management/program-management.scss";
import InitialEvaluation from "./tabs/initial-evaluation.component";
import ANC from "./tabs/anc.component";
import LabourAndDelivery from "./tabs/l&d.component";
import PostNatalCare from "./tabs/postnatal-care.component";

const MaternalHealth: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained aria-label={""}>
          <Tab>Initial Evaluation</Tab>
          <Tab>ANC</Tab>
          <Tab>Labour & Delivery</Tab>
          <Tab>Postnatal Care</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <InitialEvaluation patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <ANC patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <LabourAndDelivery patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <PostNatalCare patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default MaternalHealth;
