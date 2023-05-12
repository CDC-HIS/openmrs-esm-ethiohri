import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React from "react";
import IntakeAEncounterList from "./tabs/intake-a.component";
import IntakeBEncounterList from "./tabs/intake-b.component";
import FamilyInformationList from "./tabs/family-information.component";
import PHDPList from "./tabs/phdp.component";
import PositiveTrackingList from "./tabs/positive-tracking.component";
import HivRetestList from "./tabs/retest.component";
import styles from "./program-management.scss";
import PostExposureProphylaxis from "./tabs/post-exposure.component";
import PreExposureScreeningList from "./tabs/pre-exposure-screening.component";

const ProgramManagment: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          <Tab>Intake A</Tab>
          <Tab>Intake B</Tab>
          <Tab>Family Members</Tab>
          <Tab>PHDP</Tab>
          <Tab>HIV Positive Tracking</Tab>
          <Tab>HIV Retest</Tab>
          <Tab>Post Exposure Prophylaxis</Tab>
          <Tab>Pre Exposure Screening</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <IntakeAEncounterList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <IntakeBEncounterList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <FamilyInformationList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <PHDPList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <PositiveTrackingList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <HivRetestList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <PostExposureProphylaxis patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <PreExposureScreeningList patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ProgramManagment;
