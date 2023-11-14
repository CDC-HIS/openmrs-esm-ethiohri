import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { INTAKE_A_ENCOUNTER_TYPE, MRN_NULL_WARNING } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
import { fetchIdentifiers, getPatientEncounters } from "../../../api/api";
import styles from "../../../root.scss";

const columns = [
  {
    key: "date",
    header: "Enrollment Date",
    getValue: (encounter) => {
      return getData(encounter, "1ebc345c-6f09-43e1-a616-d7e52fff4c7d");
    },
  },
  {
    key: "dateConfirmed",
    header: "Date Confirmed",
    getValue: (encounter) => {
      return getData(encounter, "160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "testType",
    header: "Test Type",
    getValue: (encounter) => {
      return getData(encounter, "a865a098-c9ee-4c51-a13b-5c5d574d036c");
    },
  },
  {
    key: "reasonForReferral",
    header: "Reason for referral",
    getValue: (encounter) => {
      return getData(encounter, "5f34e705-3574-4b44-b455-d815962026a1");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "POC Intake-A", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Intake-A",
        mode: "view",
      },
      {
        form: { name: "POC Intake-A", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit Intake-A",
        mode: "edit",
      },
    ],
  },
];

const IntakeAEncounterList: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  const [hasPreviousEncounter, setHasPreviousEncounter] = useState(false);
  const [hasMRN, setHasMRN] = useState(false);
  useEffect(() => {
    (async () => {
      const previousEncounters = await getPatientEncounters(
        patientUuid,
        INTAKE_A_ENCOUNTER_TYPE
      );
      if (previousEncounters.length) {
        setHasPreviousEncounter(true);
      }
    })();
    (async () => {
      const identifiers = await fetchIdentifiers(patientUuid);
      if (identifiers?.some((e) => e.identifierType.display === "MRN")) {
        setHasMRN(true);
      }
    })();
  });

  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={INTAKE_A_ENCOUNTER_TYPE}
        formList={[{ name: "POC Intake-A" }]}
        columns={columns}
        description="Intake A Encounter List"
        headerTitle="Intake A"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher: !hasMRN || hasPreviousEncounter,
          //TODO:insert function to run when requirements aren't met
          // runIfFailed:  isUANNotEmpty ? myFunction() : undefined
        }}
      />
      {!hasMRN && <p className={styles.patientName}>{MRN_NULL_WARNING}</p>}
    </>
  );
};

export default IntakeAEncounterList;
