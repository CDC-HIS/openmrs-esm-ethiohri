/* eslint-disable no-console */
import { getCurrentUser, getLatestObs } from "./api/api";
import {
  female,
  kidneyDiseaseStage1,
  kidneyDiseaseStage2,
  kidneyDiseaseStage3A,
  kidneyDiseaseStage3B,
  kidneyDiseaseStage4,
  kidneyDiseaseStage5,
  male,
  ninety,
  oneHundredEighty,
  oneHundredTwenty,
  oneHundredFifty,
  sixty,
  thirty,
  fifteen,
} from "./constants";

export function DispensedDoseInNumber(arvDispensedInDays: string) {
  switch (arvDispensedInDays) {
    case fifteen:
      return 15;
    case thirty:
      return 30;
    case sixty:
      return 60;
    case ninety:
      return 90;
    case oneHundredTwenty:
      return 120;
    case oneHundredFifty:
      return 150;
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
    if (viralLoadCount === 0) {
      resultViralLoadStatus = "167484AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else if (viralLoadCount <= 50) {
      resultViralLoadStatus = "167484AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else if (viralLoadCount >= 51 && viralLoadCount <= 1000) {
      resultViralLoadStatus = "167378AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else if (viralLoadCount > 1000) {
      resultViralLoadStatus = "162185AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    }
  }
  return viralLoadCount ? resultViralLoadStatus : null;
}

export function CalcBMI(height: number, weight: number) {
  let resultBMI;
  let heightInMeters = height / 100;
  if (height && weight) {
    resultBMI = weight / (heightInMeters * heightInMeters);
    resultBMI = resultBMI.toFixed(2);
  }
  return height && weight ? resultBMI : null;
}

export function CalcAdultNutritionalStatus(height: number, weight: number) {
  let resultBMI = CalcBMI(height, weight);
  let resultAdultNutritionalStatus: string;
  if (resultBMI) {
    if (resultBMI >= 18.5 && resultBMI <= 24.99) {
      resultAdultNutritionalStatus = "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else if (resultBMI >= 17 && resultBMI <= 18.49) {
      resultAdultNutritionalStatus = "134723AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else if (resultBMI >= 16 && resultBMI <= 16.99) {
      resultAdultNutritionalStatus = "134722AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else if (resultBMI < 16) {
      resultAdultNutritionalStatus = "126598AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else if (resultBMI >= 25 && resultBMI <= 29.99) {
      resultAdultNutritionalStatus = "114413AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else {
      resultAdultNutritionalStatus = "132626AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    }
  }
  return resultBMI ? resultAdultNutritionalStatus : null;
}

export function CalcNutritionalScreening(height: number, weight: number) {
  let resultNutritionalScreening: string;
  let resultBMI = CalcBMI(height, weight);
  if (resultBMI) {
    if (resultBMI >= 18.5 && resultBMI <= 24.99) {
      resultNutritionalScreening = "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else if (resultBMI <= 16 && resultBMI <= 18.49) {
      resultNutritionalScreening = "123815AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else {
      resultNutritionalScreening = "114413AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    }
  }
  return resultBMI ? resultNutritionalScreening : null;
}

export function CalcOlderChildNutritionalStatus(bmiForAge: string) {
  console.log("BMI FOR AGE", bmiForAge);
  switch (bmiForAge) {
    case "c93ec1cc-a4eb-43b9-b99b-ace42ca6106f":
      return "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    case "6f384ab3-5587-478e-a685-0b43c0f64163":
      return "134723AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    case "b782c7a5-639e-4f7e-9eee-608a62439885":
      return "134722AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    case "c3354c3c-b708-4821-94ee-cebc9eadf1e3":
      return "126598AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    case "9a41b3bb-7c37-40f2-9022-d0f672e171cc":
      return "114413AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    default:
      return 0;
  }
}

export function CalcNextFollowupDateForCxCa(
  screeningStrategy: string,
  hpvScreeningResult: string,
  viaScreeningResult?: string,
  hpvDnaSampleCollectedDate?: Date,
  viaScreeningDate?: Date,
  dateTreatmentGiven?: Date
) {
  let nextFollowupDateCxCa;
  let dnaCollectedDate = new Date(hpvDnaSampleCollectedDate);
  let viaScreenedDate = new Date(viaScreeningDate);
  let treatmentGivenDate = new Date(dateTreatmentGiven);
  let dnaCollectedDatewWithThreeYears: Date;
  let viaScreeningDateWithOneYear: Date;
  let treatmentGivenDateWithSixMonth: Date;

  if (screeningStrategy == "d3989991-4f6d-4336-9f84-cb4208d39ae6") {
    if (hpvScreeningResult == "5e4fc757-0b14-49ae-b3b7-419666f41e15") {
      dnaCollectedDatewWithThreeYears = new Date(
        dnaCollectedDate.setFullYear(dnaCollectedDate.getFullYear() + 3)
      );
      nextFollowupDateCxCa = dnaCollectedDatewWithThreeYears;
      return nextFollowupDateCxCa;
    } else if (
      hpvScreeningResult == "703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" &&
      viaScreeningResult == "a08ab377-30bc-4ef6-bb9d-4cf6a0564ccc"
    ) {
      viaScreeningDateWithOneYear = new Date(
        viaScreenedDate.setFullYear(viaScreenedDate.getFullYear() + 1)
      );
      nextFollowupDateCxCa = viaScreeningDateWithOneYear;
      return nextFollowupDateCxCa;
    } else if (
      hpvScreeningResult == "703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" &&
      (viaScreeningResult == "7bc7c4f3-a636-478d-8a3f-65116093e37a" ||
        "be297cab-5ae6-4e7c-8657-b82730b7b8f1")
    ) {
      treatmentGivenDateWithSixMonth = new Date(
        treatmentGivenDate.setMonth(treatmentGivenDate.getMonth() + 6)
      );
      nextFollowupDateCxCa = treatmentGivenDateWithSixMonth;
      return nextFollowupDateCxCa;
    } else {
      return null;
    }
  } else {
    return null;
  }
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

export function calCreatinineClearance(patient, weight, creatinineLevel) {
  if (patient && weight && creatinineLevel) {
    let multiplier = patient.gender === "male" ? 1 : 0.85;
    let numerator = (140 - patient.age) * weight;
    let denominator = 72 * creatinineLevel * multiplier;
    return numerator / denominator;
  }
  return null;
}

export function calcEGFR(patient, weight, creatinineLevel) {
  let creatinineClearance = calCreatinineClearance(
    patient,
    weight,
    creatinineLevel
  );

  if (creatinineClearance) {
    if (creatinineClearance >= 90) {
      return kidneyDiseaseStage1;
    } else if (creatinineClearance >= 60 && creatinineClearance <= 89) {
      return kidneyDiseaseStage2;
    } else if (creatinineClearance >= 45 && creatinineClearance <= 59) {
      return kidneyDiseaseStage3A;
    } else if (creatinineClearance >= 30 && creatinineClearance <= 44) {
      return kidneyDiseaseStage3B;
    } else if (creatinineClearance >= 15 && creatinineClearance <= 29) {
      return kidneyDiseaseStage4;
    } else {
      return kidneyDiseaseStage5;
    }
  }
}

export async function isDateAlreadyUsed(
  patient,
  chosenDate,
  validatingDateUUID,
  FOLLOWUP_ENCOUNTER_TYPE
) {
  console.log(`
  ${patient.id}
  ${chosenDate}
  ${"validatingDateUUID"}
  ${FOLLOWUP_ENCOUNTER_TYPE}`);

  const validatingDate = await getLatestObs(
    patient.id,
    "5c118396-52dc-4cac-8860-e6d8e4a7f296",
    FOLLOWUP_ENCOUNTER_TYPE
  );

  console.log(`VALIDATION DATEEE ####: ${validatingDate}`);

  return validatingDate
    ? new Date(validatingDate?.valueDateTime).toDateString() ===
        new Date(chosenDate).toDateString()
    : false;
}

export async function checkUserRole(roleType) {
  const user = await getCurrentUser();
  const privilege = user?.roles?.find((element) => element.name === roleType);
  return !privilege ? false : true;
}
