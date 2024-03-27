import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { INTAKE_A_ENCOUNTER_TYPE, MRN_NULL_WARNING } from "../../../constants";
import { getData } from "../../../encounterUtils";
import { moduleName } from "../../../index";
import { fetchIdentifiers, getPatientEncounters } from "../../../api/api";
import styles from "../../../root.scss";

const columns = [
  {
    key: "date",
    header: "Enrollment Date",
    getValue: (encounter) => {
      return getData(encounter, "1ebc345c-6f09-43e1-a616-d7e52fff4c7d", true);
    },
  },
  {
    key: "dateConfirmed",
    header: "Date Confirmed HIV+",
    getValue: (encounter) => {
      return getData(encounter, "160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", true);
    },
  },
  {
    key: "testType",
    header: "Type of HIV Test",
    getValue: (encounter) => {
      return getData(encounter, "5583b0a6-f390-446d-ab39-d98584ee330c");
    },
  },
  {
    key: "entryPoint",
    header: "Entry Point",
    getValue: (encounter) => {
      return getData(encounter, "dd282c99-ea69-44e7-9252-aff0198cc1e8");
    },
  },
  {
    key: "occupation",
    header: "Occupation",
    getValue: (encounter) => {
      return getData(encounter, "2d2073e1-8377-4c4a-b6c7-0ab848760716");
    },
  },
  {
    key: "targetPopulation",
    header: "Target Population",
    getValue: (encounter) => {
      return getData(encounter, "ca2c04ba-d9bd-4bad-ab03-e57ea9e49016");
    },
  },
  {
    key: "childsCareGiverMaritalStatus",
    header: "Marital Status",
    getValue: (encounter) => {
      return getData(encounter, "e6eb59a1-8430-491d-b948-5b582f87d5ea");
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
