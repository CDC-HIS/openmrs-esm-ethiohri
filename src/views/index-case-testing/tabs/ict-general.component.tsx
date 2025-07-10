import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  artStartdate,
  dateOfHIVConfirmation,
  FOLLOWUP_ENCOUNTER_TYPE,
  ICT_GENERAL_ENCOUNTER_TYPE,
  INTAKE_A_ENCOUNTER_TYPE,
  MRN_NULL_WARNING,
  POSITIVE_PATIENT_WARNING,
  POSITIVE_TRACKING_ENCOUNTER_TYPE,
  POSITIVE_TRACKING_WARNING,
  RETESTING_WARNING,
} from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
import styles from "./ictservice.scss";
import { fetchIdentifiers, getLatestObs, getPatientEncounters } from "../../../api/api";
import { DataTableSkeleton } from "@carbon/react";

const columns = [
  {
    key: "linkDate",
    header: "Link Date",
    getValue: (encounter) => {
      const linkedDate = getData(encounter, "e2e44119-7633-4d39-97a4-0ceffbb98d91", true);
      return linkedDate ? linkedDate.split(',')[0].trim() : "";
    },
  },
  {
    key: "ictNumber",
    header: "ICT #",
    getValue: (encounter) => {
      return getData(encounter, "b35f9632-9ff8-410f-bfcb-f497023bbcf9");
    },
  },
  {
    key: "targetGroup",
    header: "Target Group",
    getValue: (encounter) => {
      const target = getData(encounter, "ca2c04ba-d9bd-4bad-ab03-e57ea9e49016");
      if (target === "Female sex worker") return "FSW";
      if (target === "OVC (Orphans and vulnerable children)") return "OVC";
      if (target === "Partner of PLHIV (People living with HIV)") return "Partner of PLHIV";
      if (target === "Children of PLHIV (People living with HIV)") return "Children of PLHIV";
      if (target === "Other MARPS-Wido-Divo-Sepa") return "Other MARPS";
      return target;
    },
  },
  {
    key: "rtriResult",
    header: "RTRI Result",
    getValue: (encounter) => {
      const rtri = getData(encounter, "3e0c5f07-cea4-4da5-8091-854c4d343bc0");
      if (rtri === "Recent") return "Probable Recent";
      if (rtri === "LT (Long-Term Infection)") return "Long Term";
      if (rtri === "IR (Incident/Intermittent Infection)") return "Inconclusive";
      return rtri;
    },
  },
  {
    key: "caseFindingStrategy",
    header: "Case finding strategy",
    getValue: (encounter) => {
      const caseFinding = getData(encounter, "f81ddad3-ba72-4670-91d4-1dbed708958b");
      if (caseFinding === "PICT (Provider-initiated counseling and testing)") return "PICT";
      if (caseFinding === "VCT Program") return "VCT";
      if (caseFinding === "EID Visit") return "EID";
      return caseFinding;
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "POC ICT General", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "view",
        label: "View Index Case Information",
        mode: "view",
      },
      {
        form: { name: "POC ICT General", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "edit",
        label: "Edit Index Case Information",
        mode: "edit",
      },
      {
        form: { name: "POC ICT General", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Delete Index Case Information",
        mode: "delete",
      },
    ],
  },
];

const ICTGeneral = ({ patientUuid, updateIndexFormSavedStatus }) => {
  const [hasMRN, setHasMRN] = useState(false);
  const [isConfirmedPositive, setIsConfirmedPositive] = useState(false);
  const [hasPositiveTrackingEncounter, setHasPositiveTrackingEncounter] = useState(false);
  const [isStartedART, setIsStartedART] = useState(false);
  const [hasIndexInformation, setHasIndexInformation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
        (async () => {
          const [identifiers, confirmedPositive, hasPosTracking, startedART, indexInformation] = await Promise.all([
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
            getLatestObs(
          patientUuid,
          artStartdate,
          FOLLOWUP_ENCOUNTER_TYPE
        ),
                  getPatientEncounters(
                        patientUuid,
                        ICT_GENERAL_ENCOUNTER_TYPE
                      )
          ]);
    
          setHasMRN(identifiers?.some((e) => e.identifierType.display === "MRN"));  
          setIsConfirmedPositive(confirmedPositive != null)   
          setHasPositiveTrackingEncounter(hasPosTracking.length > 0) 
          setIsStartedART(startedART != null) 
          setHasIndexInformation(indexInformation.length > 0)
          
          setIsLoading(false);
        })();
      }, [patientUuid, updateIndexFormSavedStatus]);  
      if (isLoading)
            return <DataTableSkeleton role="progressbar" zebra />;

  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={ICT_GENERAL_ENCOUNTER_TYPE}
        formList={[{ name: "POC ICT General" }]}
        columns={columns}
        description="Index Case Information List"
        headerTitle="Index Case Information"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher: !hasMRN || hasIndexInformation || (!isConfirmedPositive && !hasPositiveTrackingEncounter && !isStartedART),
        }}
        afterFormSaveAction={updateIndexFormSavedStatus}
      />
      {!hasMRN ? (
                <p className={styles.warningMessage}>{MRN_NULL_WARNING}</p>
              ) : !isConfirmedPositive && !hasPositiveTrackingEncounter && !isStartedART ? (
                <p className={styles.warningMessage}>⚠️ Patient needs to have HIV+ or ART started date.</p>
              ) : null}
    </>
  );
};

export default ICTGeneral;
