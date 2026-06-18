export const encounterRepresentation =
  "custom:(uuid,encounterDatetime,encounterType,location:(uuid,name)," +
  "patient:(uuid,display),encounterProviders:(uuid,provider:(uuid,name))," +
  "obs:(uuid,obsDatetime,voided,groupMembers,formFieldNamespace,formFieldPath,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name)," +
  "names:(uuid,conceptNameType,name))))";
export const INTAKE_A_ENCOUNTER_TYPE = "05add044-67f8-48c9-928d-79002ab19efe";

export const transferOutColumns = [
  {
    key: "patientName",
    header: "Patient Name",
  },
  {
    key: "mrn",
    header: "MRN",
  },
  {
    key: "uan",
    header: "UAN",
  },

  {
    key: "toDate",
    header: "Transfer out Date",
  },
  {
    key: "remainingDay",
    header: "Remaing Days",
  },
];
