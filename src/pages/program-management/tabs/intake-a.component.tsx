import React, { useEffect, useState } from "react";
import { EncounterList } from "@ohri/openmrs-esm-ohri-commons-lib";
import { INTAKE_A_ENCOUNTER_TYPE } from "../../../constants";
import { getData } from "../../encounterUtils";
import { moduleName } from "../../../index";
import { fetchIdentifiers } from "../../../api/api";

const columns = [
  {
    key: "date",
    header: "Enrollment Date",
    getValue: (encounter) => {
      return getData(encounter, "1ebc345c-6f09-43e1-a616-d7e52fff4c7d", true);
    },
  },
  {
    key: "dateConfirmed",
    header: "Date Confirmed",
    getValue: (encounter) => {
      return getData(encounter, "160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", true);
    },
  },
  {
    key: "testType",
    header: "Test Type",
    getValue: (encounter) => {
      return getData(encounter, "a865a098-c9ee-4c51-a13b-5c5d574d036c");
    },
  },
  {
    key: "reasonForReferral",
    header: "Reason for referral",
    getValue: (encounter) => {
      return getData(encounter, "5f34e705-3574-4b44-b455-d815962026a1");
    },
  },
  {
    key: "actions",
    header: "Actions",
    getValue: (encounter) => [
      {
        form: { name: "POC Intake-A", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "View Intake-A",
        mode: "view",
      },
      {
        form: { name: "POC Intake-A", package: "eth_hiv" },
        encounterUuid: encounter.uuid,
        intent: "*",
        label: "Edit Intake-A",
        mode: "edit",
      },
    ],
  },
];

const IntakeAEncounterList: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  const [hasMRN, setHasMRN] = useState(false);
  useEffect(() => {
    (async () => {
      const identifiers = await fetchIdentifiers(patientUuid);
      if (identifiers.find((e) => e.identifierType.display === "MRN")) {
        setHasMRN(true);
      }
    })();
  });

  return (
    <>
      <EncounterList
        patientUuid={patientUuid}
        encounterType={INTAKE_A_ENCOUNTER_TYPE}
        formList={[{ name: "POC Intake-A" }]}
        columns={columns}
        description="Intake A Encounter List"
        headerTitle="Intake A"
        launchOptions={{
          displayText: "Add",
          moduleName: moduleName,
          hideFormLauncher: !hasMRN,
          //TODO:insert function to run when requirements aren't met
          // runIfFailed:  isUANNotEmpty ? myFunction() : undefined
        }}
      />
      {/* //TODO: Insert proper warning component */}
      {!hasMRN && (
        <h1>
          Patient needs to have a registered MRN before Intake-A form can be
          filled
        </h1>
      )}
    </>
  );
};

export default IntakeAEncounterList;
