import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { HEI_REGISTRATION_ENCOUNTER_TYPE, MRN_NULL_WARNING } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
import { fetchIdentifiers, getPatientEncounters } from "../../../api/api";
import styles from "../../../root.scss";

const columns = [
  {
    key: "heiDate",
    header: "HEI Code",
    getValue: (encounter) => {
      return getData(
        encounter,
        "2b30a270-be1f-4cce-9949-7d7eaba349be",
        true
      );
    },
  },
  {
    key: "arvStarted",
    header: "ARV started",
    getValue: (encounter) => {
      return getData(
        encounter,
        "b7f50074-b9f2-4b0d-9f20-d18b646d822e",
        false
      );
    },
  },
  {
    key: "infantReferred",
    header: "Infant Referred",
    getValue: (encounter) => {
      return getData(
        encounter,
        "a0b16ce2-80a8-4b26-9168-74a6f64adb09",
        false
      );
    },
  },
  {
    key: "placeOfDelivery",
    header: "Place of Delivery",
    getValue: (encounter) => {
      return getData(
        encounter,
        "1572AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        false
      );
    },
  },
  {
    key: "modeOfDelivery",
    header: "Mode of Delivery",
    getValue: (encounter) => {
      return getData(
        encounter,
        "5630AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        false
      );
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "POC HEI Registration", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View HEI Registration",
        mode: "view",
      },
      {
        form: { name: "POC HEI Registration", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit HEI Registration",
        mode: "edit",
      },
    ],
  },
];

const HEIRegistrationEncounterList: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  const [hasPreviousEncounter, setHasPreviousEncounter] = useState(false);
  const [hasMRN, setHasMRN] = useState(false);
  useEffect(() => {
    (async () => {
      const previousEncounters = await getPatientEncounters(
        patientUuid,
        HEI_REGISTRATION_ENCOUNTER_TYPE
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
        encounterType={HEI_REGISTRATION_ENCOUNTER_TYPE}
        formList={[{ name: "POC HEI Registration" }]}
        columns={columns}
        description="HEI Registration Encounter List"
        headerTitle="HEI Registration"
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

export default HEIRegistrationEncounterList;
