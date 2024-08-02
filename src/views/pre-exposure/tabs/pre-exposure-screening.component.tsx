import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  INTAKE_A_ENCOUNTER_TYPE,
  MRN_NULL_WARNING,
  POSITIVE_PATIENT_WARNING,
  PRE_EXPOSURE_SCREENING_ENCOUNTER_TYPE,
  dateOfHIVConfirmation,
} from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
import styles from "../../../root.scss";
import { fetchIdentifiers, getLatestObs } from "../../../api/api";

const columns = [
  {
    key: "screeningDate",
    header: "Screening Date",
    getValue: (encounter) => {
      return getData(encounter, "bd09b775-0294-4775-9615-964d98e06a4f", true);
    },
  },
  {
    key: "referredFrom",
    header: "Referred From",
    getValue: (encounter) => {
      return getData(encounter, "e2fc6b60-70e8-4a87-a164-fb175c788330");
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
      return getData(encounter, "163526AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "prepPrescribed",
    header: "PrEP Regimen",
    getValue: (encounter) => {
      return getData(encounter, "51c2429d-21d7-4319-a27d-7a9b10b8759c");
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

  useEffect(() => {
    (async () => {
      const identifiers = await fetchIdentifiers(patientUuid);
      if (identifiers?.find((e) => e.identifierType.display === "MRN")) {
        setHasMRN(true);
      }
    })();
    (async () => {
      const positiveConfirmationDate = await getLatestObs(
        patientUuid,
        dateOfHIVConfirmation,
        INTAKE_A_ENCOUNTER_TYPE
      );
      if (positiveConfirmationDate != null) setIsConfirmedPositive(true);
    })();
  });
  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={PRE_EXPOSURE_SCREENING_ENCOUNTER_TYPE}
        formList={[{ name: "Prep" }]}
        columns={columns}
        description="Pre Exposure Screening Tracking List"
        headerTitle="Pre Exposure Screening"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher: !hasMRN || isConfirmedPositive,
        }}
        afterFormSaveAction={updateFormSavedStatus}
      />
      {!hasMRN && <p className={styles.patientName}>{MRN_NULL_WARNING}</p>}
      {isConfirmedPositive && (
        <p className={styles.patientName}>{POSITIVE_PATIENT_WARNING}</p>
      )}
    </>
  );
};

export default PreExposureScreeningList;
