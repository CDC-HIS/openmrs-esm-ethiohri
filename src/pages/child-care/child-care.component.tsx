/* eslint-disable prettier/prettier */
import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React from "react";
import styles from "../program-management/program-management.scss";
import HEIEnrollment from "./tabs/hei-enrollment.component"
import HEIFollowup from "./tabs/hei-followup.component";

const ChildHealth: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
    return (
        <div className={styles.tabContainer}>
            <Tabs>
                <TabList contained>
                    <Tab>HEI Enrollment</Tab>
                    <Tab>HEI Followup</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <HEIEnrollment patientUuid={patientUuid} />
                    </TabPanel>
                    <TabPanel>
                        <HEIFollowup patientUuid={patientUuid} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
};

export default ChildHealth;
