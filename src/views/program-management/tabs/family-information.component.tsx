import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  FAMILY_INFO_ENCOUNTER_TYPE,
  INTAKE_A_ENCOUNTER_TYPE,
  MRN_NULL_WARNING,
  doesClientHaveFamilyMembers,
  yesConceptUUID,
} from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
import styles from "../../../root.scss";
import { fetchIdentifiers, getLatestObs } from "../../../api/api";

const columns = [
  {
    key: "familyMember",
    header: "Relationship",
    getValue: (encounter) => {
      return getData(encounter, "04cec045-0b0b-42aa-89cf-da87f3cd2464");
    },
  },
  {
    key: "familyMemberAge",
    header: "Age",
    getValue: (encounter) => {
      return getData(encounter, "1532AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "Sex",
    header: "Sex",
    getValue: (encounter) => {
      return getData(encounter, "1533AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "healthStatus",
    header: "Health Status",
    getValue: (encounter) => {
      return getData(encounter, "4ab0e5e3-fff7-4819-bd2e-4f070eedcd3d");
    },
  },
  {
    key: "counselledforhiv",
    header: "Counselled for HIV",
    getValue: (encounter) => {
      return getData(encounter, "ff9eccda-485e-4044-ad92-414e97b279c0");
    },
  },
  {
    key: "testedforHIV",
    header: "Tested for HIV",
    getValue: (encounter) => {
      return getData(encounter, "164401AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "testeResult",
    header: "HIV test Result",
    getValue: (encounter) => {
      return getData(encounter, "2e770be1-7397-4684-bea6-6632c23b00d7");
    },
  },
  {
    key: "enrolledInCare",
    header: "Enrolled in Care",
    getValue: (encounter) => {
      return getData(encounter, "3ca41707-40ef-424c-9e1a-923a407e68fc");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "Family Information", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Family Information",
        mode: "view",
      },
      {
        form: { name: "Family Information", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit Family Information",
        mode: "edit",
      },
      {
        form: { name: "Family Information", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Delete Family Information",
        mode: "delete",
      },
    ],
  },
];

const FamilyInformationList: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  const [hasMRN, setHasMRN] = useState(false);
  useEffect(() => {
    (async () => {
      const identifiers = await fetchIdentifiers(patientUuid);
      if (identifiers?.find((e) => e.identifierType.display === "MRN")) {
        setHasMRN(true);
      }
    })();

    (async () => {
      const answer = await getLatestObs(
        patientUuid,
        doesClientHaveFamilyMembers,
        INTAKE_A_ENCOUNTER_TYPE
      );
    })();
  });
  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={FAMILY_INFO_ENCOUNTER_TYPE}
        formList={[{ name: "Family Information" }]}
        columns={columns}
        description="Family Information List"
        headerTitle="Family Members"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher: !hasMRN,
        }}
      />
      {!hasMRN && <p className={styles.patientName}>{MRN_NULL_WARNING}</p>}
    </>
  );
};

export default FamilyInformationList;
