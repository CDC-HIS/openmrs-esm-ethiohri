import {
  ninety,
  oneHundredEighty,
  oneHundredTwenty,
  sixty,
  thirty,
} from "./constants";
import { fetchPatientInfo, fetchPatientLastEncounter } from "./api/api";

export function DispensedDoseInNumber(arvDispensedInDays: string) {
  switch (arvDispensedInDays) {
    case thirty:
      return 30;
    case sixty:
      return 60;
    case ninety:
      return 90;
    case oneHundredTwenty:
      return 120;
    case oneHundredEighty:
      return 180;
    default:
      return 0;
  }
}

export function CalcNextVisitDate(
  followupDate: Date,
  arvDispensedInDays: string
) {
  let dispensedDoseReturned = DispensedDoseInNumber(arvDispensedInDays);
  let resultNextVisitDate = {};
  if (followupDate && arvDispensedInDays) {
    resultNextVisitDate = new Date(
      followupDate.getTime() + dispensedDoseReturned * 24 * 60 * 60 * 1000
    );
  }
  return followupDate && arvDispensedInDays ? resultNextVisitDate : null;
}

export function CalcTreatmentEndDate(
  followupDate: Date,
  arvDispensedInDays: string,
  followupStatus: string
) {
  let dispensedDoseReturned = DispensedDoseInNumber(arvDispensedInDays);
  let resultTreatmentEndDate = {};
  let extraDaysAdded = 30 + dispensedDoseReturned;
  if (
    followupDate &&
    arvDispensedInDays &&
    followupStatus == "160429AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
  ) {
    resultTreatmentEndDate = new Date(
      followupDate.getTime() + extraDaysAdded * 24 * 60 * 60 * 1000
    );
  }
  return followupDate &&
    arvDispensedInDays &&
    followupStatus == "160429AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    ? resultTreatmentEndDate
    : null;
}

export async function getAge() {
  const patientInfo: any = fetchPatientInfo("patient");
  return patientInfo.age;
}

export async function getPreviousValue() {
  const encounterInfo = fetchPatientLastEncounter(
    "patientUUID",
    "EncounterUUID"
  );
  return;
}
