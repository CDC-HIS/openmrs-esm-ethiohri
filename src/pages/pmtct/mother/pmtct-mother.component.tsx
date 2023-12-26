import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@carbon/react";
import React, { useEffect, useState } from "react";
import styles from "../../program-management/program-management.scss";
import style from "../../../root.scss";
import PMTCTMotherFinalOutcomeEncounterList from "./tabs/pmtct-mother-final-outcome";
import PMTCTMotherEnrollmentEncounterList from "./tabs/pmtct-mother-enrollment";
import { fetchPatientInfo } from "../../../api/api";
import { GENDER_PMTCT_WARNING } from "../../../constants";

const ChildHealth: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const [gender, setGender] = useState(null);
  useEffect(() => {
    (async () => {
      const patientInfo = await fetchPatientInfo(patientUuid);
      setGender(patientInfo.data.gender);
    })();
  }, []);

  return (
    <>
      {gender && gender === "F" ? (
        <div className={styles.tabContainer}>
          <Tabs>
            <TabList contained aria-label={""}>
              <Tab>Mother's Initial Registration</Tab>
              <Tab>Mother's Final Outcome</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <PMTCTMotherEnrollmentEncounterList patientUuid={patientUuid} />
              </TabPanel>
              <TabPanel>
                <PMTCTMotherFinalOutcomeEncounterList
                  patientUuid={patientUuid}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      ) : (
        gender && <p className={style.patientName}>{GENDER_PMTCT_WARNING}</p>
      )}
    </>
  );
};

export default ChildHealth;
