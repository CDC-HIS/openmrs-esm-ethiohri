import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React, { useState } from "react";
import styles from "../program-management/program-management.scss";
import ICTGeneral from "./tabs/ict-general.component";
import ICTOffer from "./tabs/ict-offer.component";
import IndexContactFollowup from "./tabs/index-contact-followup.component";

const IndexCaseTesting: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const [isIndexFormSaved, setIsIndexFormSaved] = useState(false);
  const [isICTOfferSaved, setIsICTOfferSaved] = useState(false);

  const handleIndexFormSaved = () => setIsIndexFormSaved(prev => !prev);
  const handleICTOfferSaved = () => setIsICTOfferSaved(prev => !prev);

  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained aria-label="ICT Module Tabs">
          <Tab>Index Case Information</Tab>
          <Tab>ICT Service Offering</Tab>
          <Tab>Elicited Contact Information</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ICTGeneral
              patientUuid={patientUuid}
              isIndexFormSaved={isIndexFormSaved}
              onFormSaved={handleIndexFormSaved}
            />
          </TabPanel>
          <TabPanel>
            <ICTOffer
              patientUuid={patientUuid}
              isIndexFormSaved={isIndexFormSaved}
              onFormSaved={handleICTOfferSaved}
            />
          </TabPanel>
          <TabPanel>
            <IndexContactFollowup
              patientUuid={patientUuid}
              isICTOfferSaved={isICTOfferSaved}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default IndexCaseTesting;
