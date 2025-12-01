/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useState } from "react";
import {
  EncounterList,
  EncounterListColumn,
} from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  HEI_HIVTEST_ENCOUNTER_TYPE,
  HEI_ENROLLMENT_ENCOUNTER_TYPE,
  formWarning,
} from "../../../../constants";
import { doesEncounterExist, getData } from "../../../encounterUtils";
import { moduleName } from "../../../../index";
import styles from "../../../../root.scss";

const PMTCTHivTestEncounterList = ({ patientUuid, isFormSaved }) => {
  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
      key: 'testIndication',
      header: 'Test Indication',
      getValue: (encounter) => {
        return getData(encounter, 'cc8b10f3-a1ff-4d82-8143-a45af803bd56');
      },
    },
    {
      key: 'testResult',
      header: 'DNA PCR result',
      getValue: (encounter) => {
        return getData(encounter, '2e770be1-7397-4684-bea6-6632c23b00d7');
      },
    },
    {
      key: 'confirmatoryTestDone',
      header: 'Confirmatory test done',
      getValue: (encounter) => {
        return getData(encounter, '870d0e93-1afc-42ef-9721-84a1a5c33be9');
      },
    },
    {
      key: 'rapidAntibodyResult',
      header: 'Rapid antibody result',
      getValue: (encounter) => {
        return getData(encounter, 'aa69908a-989a-4fef-ad65-cbd73ba487b7');
      },
    },
      {
        key: "actions",
        header: "Actions",
        getValue: (encounter) => [
          {
            form: { name: "HEI HIV Test", package: "eth_hiv" },
            encounterUuid: encounter.uuid,
            intent: "view",
            label: "View HEI HIV Test",
            mode: "view",
          },
          {
            form: { name: "HEI HIV Test", package: "eth_hiv" },
            encounterUuid: encounter.uuid,
            intent: "edit",
            label: "Edit HEI HIV Test",
            mode: "edit",
          },
          {
            form: { name: "HEI HIV Test", package: "eth_hiv" },
            encounterUuid: encounter.uuid,
            intent: "*",
            label: "Delete HEI HIV Test",
            mode: "delete",
          },
        ],
      },
    ],
    []
  );

  const [hasEnrollmentEncounter, setHasEnrollmentEncounter] = useState(false);
  

  useEffect(() => {
    (async () => {
      await doesEncounterExist(
        patientUuid,
        HEI_ENROLLMENT_ENCOUNTER_TYPE,
        setHasEnrollmentEncounter
      );
    })();
  }, [isFormSaved]);

  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={HEI_HIVTEST_ENCOUNTER_TYPE}
        formList={[{ name: "HEI HIV Test" }]}
        columns={columns}
        description="HEI HIV Test Encounter List"
        headerTitle="HEI HIV Test"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher: !hasEnrollmentEncounter,
        }}
      />
      {!hasEnrollmentEncounter && (
        <p className={styles.patientName}>{formWarning("HEI Enrollment")}</p>
      )}
    </>
  );
};

export default PMTCTHivTestEncounterList;
