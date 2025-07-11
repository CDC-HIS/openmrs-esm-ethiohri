import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  ICT_OFFER_DECLINED_WARNING,
  ICT_OFFER_ENCOUNTER_TYPE,
  INDEX_CONTACT_FOLLOWUP_ENCOUNTER_TYPE,
  MRN_NULL_WARNING,
  ictAcceptedUUID,
  yesConceptUUID,
} from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
import styles from "./ictservice.scss";
import { fetchIdentifiers, getLatestObs } from "../../../api/api";

const columns = [
  {
    key: "elicitedDate",
    header: "Elicited date",
    getValue: (encounter) => {
      const elicitedDate = getData(encounter, "58abd286-8f57-4717-aa41-efd8e93d5902", true);
      return elicitedDate ? elicitedDate.split(',')[0].trim() : "";
    },
  },
  {
    key: "contactFullName",
    header: "Contact Full Name",
    getValue: (encounter) => {
      const firstName = getData(encounter, "166102AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      const fatherName = getData(encounter, "166574AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      const lastName = getData(encounter, "166103AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      return [firstName, fatherName, lastName].filter(Boolean).join(" ");
    },
  },
  {
    key: "contactCategory",
    header: "Contact Category",
    getValue: (encounter) => getData(encounter, "a7d17e7a-a8b2-49b5-84f1-aade1277b658"),
  },
  {
    key: "hivTestDate",
    header: "HIV test date",
    getValue: (encounter) => {
      const testDate = getData(encounter, "164400AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", true);
      return testDate ? testDate.split(',')[0].trim() : "";
    },
  },
  {
    key: "hivTestResult",
    header: "HIV test result",
    getValue: (encounter) => getData(encounter, "2e770be1-7397-4684-bea6-6632c23b00d7"),
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "POC Index Contact Followup", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "view",
        label: "View ICT Followup",
        mode: "view",
      },
      {
        form: { name: "POC Index Contact Followup", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "edit",
        label: "Edit ICT Followup",
        mode: "edit",
      },
      {
        form: { name: "POC Index Contact Followup", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Delete ICT Followup",
        mode: "delete",
      },
    ],
  },
];

const IndexContactFollowup = ({ patientUuid, isICTOfferSaved }) => {
  const [hasMRN, setHasMRN] = useState(false);
  const [hasAcceptedICT, setHasAcceptedICT] = useState(false);

  useEffect(() => {
    (async () => {
      const identifiers = await fetchIdentifiers(patientUuid);
      setHasMRN(identifiers?.some(e => e.identifierType.display === "MRN"));
    })();

    (async () => {
      const acceptedValue = await getLatestObs(
        patientUuid,
        ictAcceptedUUID,
        ICT_OFFER_ENCOUNTER_TYPE
      );
      setHasAcceptedICT(
        acceptedValue?.valueCodeableConcept?.coding?.[0]?.code === yesConceptUUID
      );
    })();
  }, [patientUuid, isICTOfferSaved]);

  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={INDEX_CONTACT_FOLLOWUP_ENCOUNTER_TYPE}
        formList={[{ name: "POC Index Contact Followup" }]}
        columns={columns}
        description="Elicited Contact Information"
        headerTitle="Elicited Contact Information"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher: !hasMRN || !hasAcceptedICT,
        }}
      />
      {!hasMRN ? (
              <p className={styles.warningMessage}>{MRN_NULL_WARNING}</p>
            ) : !hasAcceptedICT ? (
              <p className={styles.warningMessage}>{ICT_OFFER_DECLINED_WARNING}</p>
            ) : null}
    </>
  );
};

export default IndexContactFollowup;
