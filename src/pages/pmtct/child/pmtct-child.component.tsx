import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React, { useEffect, useState } from "react";
import styles from "../../program-management/program-management.scss";
import style from "../../../root.scss";
import PMTCTRegistrationEncounterList from "./tabs/pmtct-child-registration.component";
import PMTCTImmunizationEncounterList from "./tabs/pmtct-child-immunization.component";
import PMTCTFollowupEncounterList from "./tabs/pmtct-child-followup.component";
import PMTCTChildFinalOutcomeEncounterList from "./tabs/pmtct-child-final-outcome";
import { fetchPatientInfo } from "../../../api/api";
import { AGE_ABOVE_THREE_WARNING } from "../../../constants";

const ChildHealth: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const [showTabs, setShowTabs] = useState(false);
  useEffect(() => {
    (async () => {
      const patientInfo = await fetchPatientInfo(patientUuid);
      setShowTabs(patientInfo.data.age <= 3);
    })();
  }, []);

  return (
    <>
      {showTabs ? (
        <div className={styles.tabContainer}>
          <Tabs>
            <TabList contained aria-label={""}>
              <Tab>HEI Enrollment</Tab>
              <Tab>HEI Immunization</Tab>
              <Tab>HEI Followup</Tab>
              <Tab>HEI Final Outcome</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <PMTCTRegistrationEncounterList patientUuid={patientUuid} />
              </TabPanel>
              <TabPanel>
                <PMTCTImmunizationEncounterList patientUuid={patientUuid} />
              </TabPanel>
              <TabPanel>
                <PMTCTFollowupEncounterList patientUuid={patientUuid} />
              </TabPanel>
              <TabPanel>
                <PMTCTChildFinalOutcomeEncounterList
                  patientUuid={patientUuid}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      ) : (
        <p className={style.patientName}>{AGE_ABOVE_THREE_WARNING}</p>
      )}
    </>
  );
};

export default ChildHealth;
