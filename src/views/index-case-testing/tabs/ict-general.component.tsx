import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  ICT_GENERAL_ENCOUNTER_TYPE,
  MRN_NULL_WARNING,
} from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
import styles from "../../../root.scss";
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
        form: { name: "POC ICT General", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "view",
        label: "View Index Case Information",
        mode: "view",
      },
      {
        form: { name: "POC ICT General", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "edit",
        label: "Edit Index Case Information",
        mode: "edit",
      },
      {
        form: { name: "POC ICT General", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Delete Index Case Information",
        mode: "delete",
      },
    ],
  },
];

const ICTGeneral: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const [hasMRN, setHasMRN] = useState(false);
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
        encounterType={ICT_GENERAL_ENCOUNTER_TYPE}
        formList={[{ name: "POC ICT General" }]}
        columns={columns}
        description="Index Case Information List"
        headerTitle="Index Case Information"
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

export default ICTGeneral;
