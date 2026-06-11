import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";

import {
  ICT_GENERAL_ENCOUNTER_TYPE,
  ICT_OFFER_ENCOUNTER_TYPE,
  MRN_NULL_WARNING,
} from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
import styles from "./ictservice.scss";
import { fetchIdentifiers, getPatientEncounters } from "../../../api/api";
import { DataTableSkeleton } from "@carbon/react";

const columns = [
  {
    key: "visitDate",
    header: "Visit date",
    getValue: (encounter) => {
      const visitDate = getData(
        encounter,
        "53097498-c1b3-49d0-a159-ee09b4b5a914",
        true,
      );
      return visitDate ? visitDate.split(",")[0].trim() : "";
    },
  },
  {
    key: "offered",
    header: "Offered",
    getValue: (encounter) =>
      getData(encounter, "eef33554-8844-48ed-abec-a06e4918b7fe"),
  },
  {
    key: "offeredDate",
    header: "Offered Date",
    getValue: (encounter) => {
      const offerDate = getData(
        encounter,
        "a7c606b1-9f3e-4095-815a-3a623dc738e1",
        true,
      );
      return offerDate ? offerDate.split(",")[0].trim() : "";
    },
  },
  {
    key: "accepted",
    header: "Accepted",
    getValue: (encounter) =>
      getData(encounter, "fdcbadef-40c5-486a-a30b-a88477ab90ae"),
  },
  {
    key: "acceptedDate",
    header: "Accepted Date",
    getValue: (encounter) => {
      const acceptDate = getData(
        encounter,
        "da8e65a1-04ee-44a0-be4b-d2bc4f002aa4",
        true,
      );
      return acceptDate ? acceptDate.split(",")[0].trim() : "";
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "POC ICT Offer", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "view",
        label: "View ICT Service Offering",
        mode: "view",
      },
      {
        form: { name: "POC ICT Offer", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "edit",
        label: "Edit ICT Service Offering",
        mode: "edit",
      },
      {
        form: { name: "POC ICT Offer", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Delete ICT Service Offering",
        mode: "delete",
      },
    ],
  },
];

const ICTOffer = ({ patientUuid, isIndexFormSaved, onFormSaved }) => {
  const [hasMRN, setHasMRN] = useState(false);
  const [hasIndexInformation, setHasIndexInformation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [identifiers, indexInformation] = await Promise.all([
        fetchIdentifiers(patientUuid),
        getPatientEncounters(patientUuid, ICT_GENERAL_ENCOUNTER_TYPE),
      ]);

      setHasMRN(identifiers?.some((e) => e.identifierType.display === "MRN"));
      setHasIndexInformation(indexInformation.length > 0);
      setIsLoading(false);
    })();
  }, [patientUuid, isIndexFormSaved]);

  if (isLoading) return <DataTableSkeleton role="progressbar" zebra />;

  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={ICT_OFFER_ENCOUNTER_TYPE}
        formList={[{ name: "POC ICT Offer" }]}
        columns={columns}
        description="ICT Service Offering List"
        headerTitle="ICT Service Offering"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher: !hasMRN || !hasIndexInformation,
        }}
        afterFormSaveAction={onFormSaved}
      />
      {!hasMRN ? (
        <p className={styles.warningMessage}>{MRN_NULL_WARNING}</p>
      ) : !hasIndexInformation ? (
        <p className={styles.warningMessage}>
          ⚠️ Index case information should be filled.
        </p>
      ) : null}
    </>
  );
};

export default ICTOffer;
