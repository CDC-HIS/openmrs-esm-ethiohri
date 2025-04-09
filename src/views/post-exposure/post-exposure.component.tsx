import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React, { useCallback, useState } from "react";
import styles from "../program-management/program-management.scss";
import PostExposureRegistrationList from "./tabs/post-exposure-registration.component";
import PostExposureFollowupList from "./tabs/post-exposure-followup.component";

const PostExposure: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const [isFormSaved, setIsFormSaved] = useState(false);

  const updateFormSavedStatus = useCallback(() => {
    setIsFormSaved((prev) => !prev);
  }, []);

  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained aria-label={""}>
          <Tab>Post Exposure Registration</Tab>
          <Tab>Post Exposure Followup</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PostExposureRegistrationList
              updateFormSavedStatus={updateFormSavedStatus}
              patientUuid={patientUuid}
            />
          </TabPanel>
          <TabPanel>
            <PostExposureFollowupList
              isFormSaved={isFormSaved}
              patientUuid={patientUuid}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default PostExposure;
