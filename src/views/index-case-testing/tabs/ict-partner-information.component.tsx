import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  PARTNER_INDEX_CASE_INFORMATION_ENCOUNTER_TYPE
} from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
import { fetchIdentifiers } from "../../../api/api";

const columns = [
  {
    key: "ictNumber",
    header: "ICT Serial Number",
    getValue: (encounter) => {
      return getData(encounter, "b35f9632-9ff8-410f-bfcb-f497023bbcf9");
    },
  },
  {
    key: "indexFirstName",
    header: "First Name",
    getValue: (encounter) => {
      return getData(encounter, "166102AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "indexLastName",
    header: "Last Name",
    getValue: (encounter) => {
      return getData(encounter, "166103AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "entryPoint",
    header: "Entry Point",
    getValue: (encounter) => {
      return getData(encounter, "1201b688-45f8-4e56-b089-0b31138a19dd");
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
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "Partner Index Case Information", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "view",
        label: "View Partner Index Case Information",
        mode: "view",
      },
      {
        form: { name: "Partner Index Case Information", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "edit",
        label: "Edit Partner Index Case Information",
        mode: "edit",
      },
      {
        form: { name: "Partner Index Case Information", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Delete Partner Index Case Information",
        mode: "delete",
      },
    ],
  },
];

const PartnerIndexCaseInformation: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
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
        encounterType={PARTNER_INDEX_CASE_INFORMATION_ENCOUNTER_TYPE}
        formList={[{ name: "Partner Index Case Information" }]}
        columns={columns}
        description="Partner Index Case Information List"
        headerTitle="Partner Index Case Information"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher: hideAddButton,
        }}
      />
    </>
  );
};

export default PartnerIndexCaseInformation;
