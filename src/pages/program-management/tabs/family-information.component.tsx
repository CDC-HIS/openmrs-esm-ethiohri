import React from "react";
import { EncounterList } from "openmrs-esm-ohri-commons-lib/src/index";
import { FAMILY_INFO_ENCOUNTER_TYPE } from "../../../constants";
import { getData } from "../../encounterUtils";

const columns = [
  {
    key: "familyMember",
    header: "Family Member",
    getValue: (encounter) => {
      return getData(encounter, "1560AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
  {
    key: "familyMemberAge",
    header: "Age",
    getValue: (encounter) => {
      return "---";
    },
  },
  {
    key: "Sex",
    header: "Sex",
    getValue: (encounter) => {
      return getData(encounter, "ec4ceae1-36cf-40eb-8b68-67f8145ef324");
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
      return getData(encounter, "de32152d-93b0-412a-908a-20af0c46f215");
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
      return getData(encounter, "159427AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
  },
];

const FamilyInformationList: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={FAMILY_INFO_ENCOUNTER_TYPE}
      form={{ package: "eth-hiv", name: "family_information" }}
      columns={columns}
      description="Family Information List"
      headerTitle="Family Information"
      dropdownText="Add"
    />
  );
};

export default FamilyInformationList;
