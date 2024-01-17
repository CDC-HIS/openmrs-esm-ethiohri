import {
  female,
  male,
  ninety,
  oneHundredEighty,
  oneHundredTwenty,
  sixty,
  thirty,
} from "./constants";

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
    // eslint-disable-next-line no-constant-condition
    (followupDate &&
      arvDispensedInDays &&
      followupStatus == "160429AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA") ||
    "162904AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
  ) {
    resultTreatmentEndDate = new Date(
      followupDate.getTime() + extraDaysAdded * 24 * 60 * 60 * 1000
    );
  }
  // eslint-disable-next-line no-constant-condition
  return (followupDate &&
    arvDispensedInDays &&
    followupStatus == "160429AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA") ||
    "162904AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    ? resultTreatmentEndDate
    : null;
}

export function CalcMonthsOnART(artStartDate: Date) {
  let today = new Date();
  let resultMonthsOnART: string;
  let artInDays = Math.round(
    (today.getTime() - artStartDate.getTime?.()) / 86400000
  );
  if (artStartDate && artInDays < 30) {
    resultMonthsOnART = "0 months";
  } else if (artStartDate && artInDays >= 30) {
    resultMonthsOnART = `${Math.floor(artInDays / 30)} months`;
  }
  return artStartDate ? resultMonthsOnART : "0 months";
}

export function CalcViralLoadStatus(viralLoadCount: number) {
  let resultViralLoadStatus: string;
  if (viralLoadCount) {
    if (viralLoadCount > 50) {
      resultViralLoadStatus = "167485AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else {
      resultViralLoadStatus = "167484AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    }
  }
  return resultViralLoadStatus ?? null;
}

export async function getGender(patient) {
  if (patient.gender === "male") {
    return male;
  }

  if (patient.gender === "female") {
    return female;
  }

  return null;
}

export async function getIdentifier(patient, identifierName) {
  const identifierValue = patient?.identifier?.find(
    (e) => e?.type?.text === identifierName
  );
  return identifierValue?.value;
}
