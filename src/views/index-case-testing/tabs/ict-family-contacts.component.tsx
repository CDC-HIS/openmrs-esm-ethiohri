import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";

import { FAMILY_INDEX_CASE_CONTACTS_ENCOUNTER_TYPE } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
import { fetchIdentifiers } from "../../../api/api";

const columns = [
  {
    key: "registrationDate",
    header: "Registration Date",
    getValue: (encounter) => {
      return getData(encounter, "1ebc345c-6f09-43e1-a616-d7e52fff4c7d");
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
    key: "previousDateTested",
    header: "Previous Date Tested",
    getValue: (encounter) => {
      return getData(encounter, "87a98d42-ec07-46a0-b291-36f66b68fe2c");
    },
  },
  {
    key: "previousHIVTestResult",
    header: "Previous HIV Test Result",
    getValue: (encounter) => {
      return getData(encounter, "23ef2580-e9e5-4e1b-af9b-584cdd30abc4");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "Family Index Case Contacts", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "view",
        label: "View Family Index Case Contacts",
        mode: "view",
      },
      {
        form: { name: "Family Index Case Contacts", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "edit",
        label: "Edit Family Index Case Contacts",
        mode: "edit",
      },
      {
        form: { name: "Family Index Case Contacts", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Delete Family Index Case Contacts",
        mode: "delete",
      },
    ],
  },
];

const FamilyIndexCaseContacts: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  const [hasMRN, setHasMRN] = useState(false);
  const [hideAddButton, setHideAddButton] = useState(true);
  useEffect(() => {
    (async () => {
      const identifiers = await fetchIdentifiers(patientUuid);
      if (identifiers?.find((e) => e.identifierType.display === "MRN")) {
        setHasMRN(true);
      }
    })();
  });
  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={FAMILY_INDEX_CASE_CONTACTS_ENCOUNTER_TYPE}
        formList={[{ name: "Family Index Case Contacts" }]}
        columns={columns}
        description="Family Index Case Contacts List"
        headerTitle="Family Index Case Contacts"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher: hideAddButton,
        }}
      />
    </>
  );
};

export default FamilyIndexCaseContacts;
