import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React, { useCallback, useState } from "react";
import styles from "../../program-management/program-management.scss";
import PMTCTRegistrationEncounterList from "./tabs/hei-enrollment.component";
import PMTCTImmunizationEncounterList from "./tabs/hei-immunization.component";
import PMTCTFollowupEncounterList from "./tabs/hei-followup.component";
import PMTCTChildFinalOutcomeEncounterList from "./tabs/hei-final-outcome";

const ChildHealth: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const [isFormSaved, setIsFormSaved] = useState(false);

  const updateFormSavedStatus = useCallback(() => {
    setIsFormSaved((prev) => !prev);
  }, []);

  return (
    <>
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
              <PMTCTRegistrationEncounterList
                isFormSaved={isFormSaved}
                updateFormSavedStatus={updateFormSavedStatus}
                patientUuid={patientUuid}
              />
            </TabPanel>
            <TabPanel>
              <PMTCTImmunizationEncounterList
                isFormSaved={isFormSaved}
                updateFormSavedStatus={updateFormSavedStatus}
                patientUuid={patientUuid}
              />
            </TabPanel>
            <TabPanel>
              <PMTCTFollowupEncounterList
                isFormSaved={isFormSaved}
                patientUuid={patientUuid}
              />
            </TabPanel>
            <TabPanel>
              <PMTCTChildFinalOutcomeEncounterList
                isFormSaved={isFormSaved}
                updateFormSavedStatus={updateFormSavedStatus}
                patientUuid={patientUuid}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  );
};

export default ChildHealth;
