import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  INTAKE_A_ENCOUNTER_TYPE,
  MRN_NULL_WARNING,
  POSITIVE_PATIENT_WARNING,
  POSITIVE_TRACKING_ENCOUNTER_TYPE,
  POSITIVE_TRACKING_WARNING,
  PRE_EXPOSURE_SCREENING_ENCOUNTER_TYPE,
  RETESTING_WARNING,
  RETEST_ENCOUNTER_TYPE,
  dateOfHIVConfirmation,
  formWarning,
} from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
import styles from "./prep.scss";
import { fetchIdentifiers, getLatestObs, getPatientEncounters } from "../../../api/api";
import { SkeletonText } from "@carbon/react";

const columns = [
  {
    key: "screeningDate",
    header: "Screening Date",
    getValue: (encounter) => {
      const rawDate = getData(encounter, "bd09b775-0294-4775-9615-964d98e06a4f", true);
      return rawDate ? rawDate.split(',')[0].trim() : "";
    },
  },
  {
    key: "referredFrom",
    header: "Referred From",
    getValue: (encounter) => {
      const referredFrom = getData(
        encounter,
        "e2fc6b60-70e8-4a87-a164-fb175c788330"
      );
      if (referredFrom === "Voluntary testing and counselling") {
        return "VCT";
      } else if (referredFrom === "Outpatient department") {
        return "OPD";
      } else if (referredFrom === "Key population clinic") {
        return "People high risk for HIV infection";
      } else if (referredFrom === "Other non-coded") {
        return "Other";
      }
      return referredFrom; 
    },
  },
  {
    key: "hivTestResult",
    header: "HIV Test Result",
    getValue: (encounter) => {
      return getData(encounter, "2e770be1-7397-4684-bea6-6632c23b00d7");
    },
  },
  {
    key: "pregnancyStatus",
    header: "Pregnant?",
    getValue: (encounter) => {
      return getData(encounter, "5272AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "selfIdentifyingSexWorker",
    header: "Self-Identified FSW",
    getValue: (encounter) => {
      return getData(encounter, "160579AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "doYouHaveHIVPositivePartner",
    header: "HIV+ Partner",
    getValue: (encounter) => {
      return getData(encounter, "1436AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "typeOfClient",
    header: "Type of Client",
    getValue: (encounter) => {
      return getData(encounter, "da8c5265-2ab4-43f8-af66-ec1c9c8e9d4f");
    },
  },
  {
    key: "prepStartDate",
    header: "PrEP Start Date",
    getValue: (encounter) => {
      const rawDate = getData(encounter, "163526AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", true);
      return rawDate ? rawDate.split(',')[0].trim() : "";
    },
  },
  {
    key: "prepPrescribed",
    header: "PrEP Regimen",   
    getValue: (encounter) => {
      const prepRegimen = getData(
        encounter,
        "51c2429d-21d7-4319-a27d-7a9b10b8759c"
      );
      if (prepRegimen === "Tenofovir disoproxil fumarate (TDF)/lamivudine (3TC)") {
        return "TDF/3TC";
      } 
      return prepRegimen; 
    }, 
  },
  {
    key: "doseDays",
    header: "Dose Days",
    getValue: (encounter) => {
      return getData(encounter, "f3911009-1a8f-42ee-bdfc-1e343c2839aa");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "Prep", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "view",
        label: "View Pre Exposure Screening",
        mode: "view",
      },
      {
        form: { name: "Prep", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "edit",
        label: "Edit Pre Exposure Screening",
        mode: "edit",
      },
      {
        form: { name: "Prep", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Delete Pre Exposure Screening",
        mode: "delete",
      },
    ],
  },
];

const PreExposureScreeningList = ({ patientUuid, updateFormSavedStatus }) => {
  const [hasMRN, setHasMRN] = useState(false);
  const [isConfirmedPositive, setIsConfirmedPositive] = useState(false);
  const [hasPositiveTrackingEncounter, setHasPositiveTrackingEncounter] = useState(false);
  const [hasRetestingEncounter, setHasRetestingEncounter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      (async () => {
        const [identifiers, confirmedPositive, hasPosTracking, hasHIVRetesting] = await Promise.all([
          fetchIdentifiers(patientUuid),
          getLatestObs(
        patientUuid,
        dateOfHIVConfirmation,
        INTAKE_A_ENCOUNTER_TYPE
      ),
      getPatientEncounters(
            patientUuid,
            POSITIVE_TRACKING_ENCOUNTER_TYPE
          ),
          getPatientEncounters(
        patientUuid,
        RETEST_ENCOUNTER_TYPE
      )
        ]);
  
        setHasMRN(identifiers?.some((e) => e.identifierType.display === "MRN"));  
        setIsConfirmedPositive(confirmedPositive != null)   
        setHasPositiveTrackingEncounter(hasPosTracking.length > 0)  
        setHasRetestingEncounter(hasHIVRetesting.length > 0); 
        
        setIsLoading(false);
      })();
    }, [patientUuid, updateFormSavedStatus]);  

  if (isLoading)
      return (
        <div className={styles.loadingContainer}>
          <SkeletonText heading width="40%" />
          <SkeletonText paragraph lineCount={2} />
        </div>
      );

  return (
    <>
      {!hasMRN ? (
          <p className={styles.warningMessage}>{MRN_NULL_WARNING}</p>
        ) : isConfirmedPositive ? (
          <p className={styles.warningMessage}>{POSITIVE_PATIENT_WARNING}</p>
        ) : hasPositiveTrackingEncounter ? (
          <p className={styles.warningMessage}>{POSITIVE_TRACKING_WARNING}</p>
        ) : hasRetestingEncounter ? (
          <p className={styles.warningMessage}>{RETESTING_WARNING}</p>
        ) : null}
      <EncounterList
        patientUuid={patientUuid}
        encounterType={PRE_EXPOSURE_SCREENING_ENCOUNTER_TYPE}
        formList={[{ name: "Prep" }]}
        columns={columns}
        description="Pre Exposure Screening"
        headerTitle="Pre Exposure Screening"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher: !hasMRN || isConfirmedPositive || hasPositiveTrackingEncounter || hasRetestingEncounter,
        }}
        afterFormSaveAction={updateFormSavedStatus}
      />
    </>
  );
};

export default PreExposureScreeningList;
