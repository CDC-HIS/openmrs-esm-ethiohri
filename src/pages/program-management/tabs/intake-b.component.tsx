import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { INTAKE_B_ENCOUNTER_TYPE, MRN_NULL_WARNING } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
import { fetchIdentifiers, getPatientEncounters } from "../../../api/api";
import styles from "../../../root.scss";

const columns = [
  {
    key: "bmi",
    header: "Body Mass Index",
    getValue: (encounter) => {
      return getData(encounter, "1cc8fe7f-fb70-49d8-9065-73654d852187");
    },
  },
  {
    key: "stillOnTreatment",
    header: "Still On Treatment",
    getValue: (encounter) => {
      return getData(encounter, "160119AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "functionalStatus",
    header: "Functional Status",
    getValue: (encounter) => {
      return getData(encounter, "2b7b8471-b19e-4d55-b2a4-4fe5b80f889a");
    },
  },
  {
    key: "presentingComplaints",
    header: "Presenting Complaints",
    getValue: (encounter) => {
      return getData(encounter, "14718b2b-d38a-4f68-8e22-8bc739ae43f7");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "POC Intake-B", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Intake-B",
        mode: "view",
      },
      {
        form: { name: "POC Intake-B", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit Intake-B",
        mode: "edit",
      },
    ],
  },
];

const IntakeBEncounterList: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  const [hasPreviousEncounter, setHasPreviousEncounter] = useState(false);
  const [hasMRN, setHasMRN] = useState(false);
  useEffect(() => {
    (async () => {
      const previousEncounters = await getPatientEncounters(
        patientUuid,
        INTAKE_B_ENCOUNTER_TYPE
      );
      if (previousEncounters.length) {
        setHasPreviousEncounter(true);
      }
    })();
    (async () => {
      const identifiers = await fetchIdentifiers(patientUuid);
      if (identifiers?.find((e) => e.identifierType.display === "MRN")) {
        setHasMRN(true);
      }
    })();
  }, []);
  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={INTAKE_B_ENCOUNTER_TYPE}
        formList={[{ name: "POC Intake-B" }]}
        columns={columns}
        description="Intake B Encounter List"
        headerTitle="Intake B"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher: !hasMRN || hasPreviousEncounter,
        }}
      />
      {!hasMRN && <p className={styles.patientName}>{MRN_NULL_WARNING}</p>}
    </>
  );
};

export default IntakeBEncounterList;
