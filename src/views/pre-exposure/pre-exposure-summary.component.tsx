import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React, { useCallback, useState } from "react";
import styles from "../program-management/program-management.scss";
import PreExposureScreeningList from "./tabs/pre-exposure-screening.component";
import PreExposureFollowupList from "./tabs/pre-exposure-followup.component";

const PreExposure: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const [isFormSaved, setIsFormSaved] = useState(false);

  const updateFormSavedStatus = useCallback(() => {
    setIsFormSaved((prev) => !prev);
  }, []);

  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained aria-label={""}>
          <Tab>Pre Exposure Screening</Tab>
          <Tab>Pre Exposure Followup</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PreExposureScreeningList
              isFormSaved={isFormSaved}
              patientUuid={patientUuid}
            />
          </TabPanel>
          <TabPanel>
            <PreExposureFollowupList
              isFormSaved={isFormSaved}
              patientUuid={patientUuid}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default PreExposure;
