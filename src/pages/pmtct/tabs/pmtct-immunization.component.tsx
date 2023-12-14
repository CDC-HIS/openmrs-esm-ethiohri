import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  MRN_NULL_WARNING,
  PMTCT_IMMUNIZATION_ENCOUNTER_TYPE,
} from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
import { fetchIdentifiers } from "../../../api/api";
import styles from "../../../root.scss";

const columns = [
  {
    key: "bcg",
    header: "BCG",
    getValue: (encounter) => {
      return getData(encounter, "886AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", true);
    },
  },
  {
    key: "ipv",
    header: "IPV",
    getValue: (encounter) => {
      return getData(encounter, "923b4623-ac8d-4e65-a55a-aa4715752a14", false);
    },
  },
  {
    key: "opv0",
    header: "OPV 0 Taken",
    getValue: (encounter) => {
      return getData(encounter, "14369b36-910a-4996-813c-2312d234f5cf", false);
    },
  },
  {
    key: "opv1",
    header: "OPV 1 Taken",
    getValue: (encounter) => {
      return getData(encounter, "1c60218e-6285-460b-94ed-205cdf0afe20", false);
    },
  },
  {
    key: "opv2",
    header: "OPV 2 Taken",
    getValue: (encounter) => {
      return getData(encounter, "1f25b4b6-bad6-4d39-b11a-6b76ea781958", false);
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "PMTCT Immunization", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View PMTCT Immunization",
        mode: "view",
      },
      {
        form: { name: "PMTCT Immunization", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit PMTCT Immunization",
        mode: "edit",
      },
    ],
  },
];

const PMTCTImmunizationEncounterList: React.FC<{ patientUuid: string }> = ({
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
  });
  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={PMTCT_IMMUNIZATION_ENCOUNTER_TYPE}
        formList={[{ name: "PMTCT Immunization" }]}
        columns={columns}
        description="Immunization Encounter List"
        headerTitle="PMTCT Immunization"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
        }}
      />
      {!hasMRN && <p className={styles.patientName}>{MRN_NULL_WARNING}</p>}
    </>
  );
};

export default PMTCTImmunizationEncounterList;
