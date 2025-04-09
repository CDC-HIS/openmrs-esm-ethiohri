import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { ICT_SCREENING_ENCOUNTER_TYPE } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
import { fetchIdentifiers } from "../../../api/api";

const columns = [
  {
    key: "maternalHivStatus",
    header: "Maternal HIV Status",
    getValue: (encounter) => {
      return getData(encounter, "3535f4d1-bf1e-47d5-822d-60c1da143cad");
    },
  },
  {
    key: "maritalStatus",
    header: "Marital Status",
    getValue: (encounter) => {
      return getData(encounter, "2feaa615-f6af-41db-91c1-301def421146");
    },
  },
  {
    key: "agreeInterviewed",
    header: "Index Case Interviewed",
    getValue: (encounter) => {
      return getData(encounter, "4dd6e628-fcc9-4629-92b8-192751c3de9c");
    },
  },
  {
    key: "icInterviewedForService",
    header: "Index Case Interviewed For Partner Service",
    getValue: (encounter) => {
      return getData(encounter, "75a0a101-a094-4c7d-a4c7-255fb0094440");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "ICT Screening", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "view",
        label: "View ICT Screening",
        mode: "view",
      },
      {
        form: { name: "ICT Screening", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "edit",
        label: "Edit ICT Screening",
        mode: "edit",
      },
      {
        form: { name: "ICT Screening", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Delete ICT Screening",
        mode: "delete",
      },
    ],
  },
];

const ICTScreening: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
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
        encounterType={ICT_SCREENING_ENCOUNTER_TYPE}
        formList={[{ name: "ICT Screening" }]}
        columns={columns}
        description="ICT Screening List"
        headerTitle="ICT Screening"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher: hideAddButton,
        }}
      />
    </>
  );
};

export default ICTScreening;
