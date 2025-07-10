/* eslint-disable prettier/prettier */
import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React, { useCallback, useState } from "react";
import styles from "../program-management/program-management.scss";
import ICTGeneral from "./tabs/ict-general.component";
import ICTOffer from "./tabs/ict-offer.component";
import IndexContactFollowup from "./tabs/index-contact-followup.component";

const IndexCaseTesting: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  const [isIndexFormSaved, setIndexFormSaved] = useState(false);
  const [isFormSaved, setIsFormSaved] = useState(false);
  const [isOfferFormSaved, setIsOfferFormSaved] = useState(false);
  
    const updateFormSavedStatus = useCallback(() => {
      setIsFormSaved((prev) => !prev);
    }, []);

    const updateIndexFormSavedStatus = useCallback(() => {
      setIndexFormSaved((prev) => !prev);
    }, []);
    const updateOfferFormSavedStatus = useCallback(() => {
      setIsOfferFormSaved((prev) => !prev);
    }, []);
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained aria-label={""}>
          <Tab>Index Case Information</Tab>
          <Tab>ICT Service Offering</Tab>
          <Tab>Elicited Contact Information</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ICTGeneral
    updateIndexFormSavedStatus={() => {
      setIndexFormSaved(true); // ✅ when ICTGeneral saved, unlock ICTOffer
    }}
    patientUuid={patientUuid}
  />
          </TabPanel>
          <TabPanel>
            <ICTOffer
    updateFormSavedStatus={isIndexFormSaved} // ✅ ICTOffer will re-check when index is saved
    patientUuid={patientUuid}
  />
          </TabPanel>
          <TabPanel>
            <IndexContactFollowup
    updateOfferFormSavedStatus={updateFormSavedStatus} // ✅ Re-evaluate when ICTOffer saved
    patientUuid={patientUuid}
  />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default IndexCaseTesting;
