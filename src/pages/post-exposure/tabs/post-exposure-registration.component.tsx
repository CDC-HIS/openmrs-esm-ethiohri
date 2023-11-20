import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  MRN_NULL_WARNING,
  POST_EXPOSURE_REGISTRATION_ENCOUNTER_TYPE,
} from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
import styles from "../../../root.scss";
import { fetchIdentifiers } from "../../../api/api";

const columns = [
  {
    key: "reportingDate",
    header: "Reporting Date",
    getValue: (encounter) => {
      return getData(encounter, "4285d9e8-3ab4-4a94-bd4e-4dd92855795c", true);
    },
  },
  {
    key: "exposureType",
    header: "Exposure Type",
    getValue: (encounter) => {
      return getData(encounter, "916eebc3-1141-40e6-beaa-ad2b5685956b");
    },
  },
  {
    key: "sourceOfExposure",
    header: "Source of Exposure",
    getValue: (encounter) => {
      return getData(encounter, "1c92b574-953a-458e-9fa7-82f5538d8aee");
    },
  },
  {
    key: "eligible",
    header: "Eligible",
    getValue: (encounter) => {
      return getData(encounter, "78dc1be4-4668-4170-b994-fc5e9a697e56");
    },
  }
  ,
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "Exposed Person Information", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Post Exposure Registration",
        mode: "view",
      },
      {
        form: { name: "Exposed Person Information", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit Post Exposure Registration",
        mode: "edit",
      },
    ],
  },
];

const PostExposureRegistration: React.FC<{ patientUuid: string }> = ({
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
        encounterType={POST_EXPOSURE_REGISTRATION_ENCOUNTER_TYPE}
        formList={[{ name: "Exposed Person Information" }]}
        columns={columns}
        description="Post Exposure Tracking List"
        headerTitle="Post Exposure"
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

export default PostExposureRegistration;
