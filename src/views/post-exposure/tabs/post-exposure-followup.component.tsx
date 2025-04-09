import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  INTAKE_A_ENCOUNTER_TYPE,
  MRN_NULL_WARNING,
  POSITIVE_PATIENT_WARNING,
  REACTIVE_EXPOSED_PERSON_WARNING,
  REACTIVE_HIV_STATUS_WARNING,
  POST_EXPOSURE_FOLLOWUP_ENCOUNTER_TYPE,
  POST_EXPOSURE_REGISTRATION_ENCOUNTER_TYPE,
  dateOfHIVConfirmation,
  exposedPersonStatus,
  hivStatus,
  formWarning,
} from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
import styles from "../../../root.scss";
import {
  fetchIdentifiers,
  getLatestObs,
  getPatientEncounters,
} from "../../../api/api";

const columns = [
  {
    key: "reportingDate",
    header: "Reporting Date",
    getValue: (encounter) => {
      return getData(encounter, "4285d9e8-3ab4-4a94-bd4e-4dd92855795c", true);
    },
  },
  {
    key: "visitDate",
    header: "Visit Date",
    getValue: (encounter) => {
      return getData(encounter, "163260AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", true);
    },
  },
  {
    key: "visitPeriod",
    header: "Visit Period",
    getValue: (encounter) => {
      return getData(encounter, "957a79b4-e771-4ab8-bcc6-e77f7dbcfd9d");
    },
  },
  {
    key: "adherence",
    header: "Adherence",
    getValue: (encounter) => {
      return getData(encounter, "b1a646d3-78ff-4dd5-823a-5bef7d69ff3d");
    },
  },
  {
    key: "hivStatus",
    header: "HIV Status",
    getValue: (encounter) => {
      return getData(encounter, "21ea1d83-acd7-4c99-b4cc-33a90e6dd7d7");
    },
  },
  {
    key: "sideEffect",
    header: "Side Effect",
    getValue: (encounter) => {
      return getData(encounter, "164377AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "remark",
    header: "Remark",
    getValue: (encounter) => {
      return getData(encounter, "161011AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "Post Exposure Followup", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "view",
        label: "View Post Exposure Followup",
        mode: "view",
      },
      {
        form: { name: "Post Exposure Followup", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "edit",
        label: "Edit Post Exposure Followup",
        mode: "edit",
      },
      {
        form: { name: "Post Exposure Followup", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Delete Post Exposure Followup",
        mode: "delete",
      },
    ],
  },
];

const PostExposureFollowup = ({ patientUuid, isFormSaved }) => {
  const [hasMRN, setHasMRN] = useState(false);
  const [hasScreeningEncounter, setHasScreeningEncounter] = useState(false);
  const [isConfirmedPositive, setIsConfirmedPositive] = useState(false);
  const [isExposedPersonReactive, setIsExposedPersonReactive] = useState(false);
  const [isHivStatusReactive, setIsHivStatusReactive] = useState(false);

  useEffect(() => {
    (async () => {
      const previousEncounters = await getPatientEncounters(
        patientUuid,
        POST_EXPOSURE_REGISTRATION_ENCOUNTER_TYPE
      );
      if (previousEncounters.length) {
        setHasScreeningEncounter(true);
      }
    })();
  }, [isFormSaved]);

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
    (async () => {
      const exposedPerson = await getLatestObs(
        patientUuid,
        exposedPersonStatus,
        POST_EXPOSURE_REGISTRATION_ENCOUNTER_TYPE
      );
      if (exposedPerson == "1228AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        setIsExposedPersonReactive(true);
    })();
    (async () => {
      const hivStatusReactive = await getLatestObs(
        patientUuid,
        hivStatus,
        POST_EXPOSURE_FOLLOWUP_ENCOUNTER_TYPE
      );
      if (hivStatusReactive == "1228AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        setIsHivStatusReactive(true);
    })();
  });
  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={POST_EXPOSURE_FOLLOWUP_ENCOUNTER_TYPE}
        formList={[{ name: "Post Exposure Followup" }]}
        columns={columns}
        description="Post Exposure Followup List"
        headerTitle="Post Exposure Followup"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher:
            !hasMRN ||
            !hasScreeningEncounter ||
            isConfirmedPositive ||
            isExposedPersonReactive ||
            isHivStatusReactive,
        }}
      />
      {!hasMRN && <p className={styles.patientName}>{MRN_NULL_WARNING}</p>}
      {!hasScreeningEncounter && (
        <p className={styles.patientName}>{formWarning("PEP Registration")}</p>
      )}
      {isConfirmedPositive && (
        <p className={styles.patientName}>{POSITIVE_PATIENT_WARNING}</p>
      )}
      {isExposedPersonReactive && (
        <p className={styles.patientName}>{REACTIVE_EXPOSED_PERSON_WARNING}</p>
      )}
      {isHivStatusReactive && (
        <p className={styles.patientName}>{REACTIVE_HIV_STATUS_WARNING}</p>
      )}
    </>
  );
};

export default PostExposureFollowup;
