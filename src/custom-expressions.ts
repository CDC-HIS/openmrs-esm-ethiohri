import {
  getCurrentUser,
  getLatestObs,
  getLatestEligibilityFromLatestFollowup,
  getLatestObservation,
} from "./api/api";
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
  FOLLOWUP_ENCOUNTER_TYPE,
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

  if (followupDate && dispensedDoseReturned !== 0) {
    if (
      followupStatus === "160429AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" ||
      followupStatus === "162904AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    ) {
      resultTreatmentEndDate = new Date(
        followupDate.getTime() + extraDaysAdded * 24 * 60 * 60 * 1000
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
  return resultTreatmentEndDate;
}

export function CalcPrepDoseEndDate(
  followupDate: Date,
  arvDispensedInDays: string,
  followupStatus: string
) {
  let dispensedDoseReturned = DispensedDoseInNumber(arvDispensedInDays);
  let resultPrepDoseDate = {};
  if (
    followupDate &&
    dispensedDoseReturned !== 0 &&
    (followupStatus == "160429AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" ||
      followupStatus == "162904AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
  ) {
    resultPrepDoseDate = new Date(
      followupDate.getTime() + dispensedDoseReturned * 24 * 60 * 60 * 1000
    );
  }
  return followupDate &&
    dispensedDoseReturned !== 0 &&
    (followupStatus == "160429AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" ||
      followupStatus == "162904AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    ? resultPrepDoseDate
    : null;
}

// export function CalcMonthsOnART(artStartDate: Date, followupDate: Date) {
//   let resultMonthsOnART: string;
//   let artInDays = Math.round(
//     (followupDate.getTime() - artStartDate.getTime?.()) / 86400000
//   );
//   if (artStartDate && followupDate && artInDays < 30) {
//     resultMonthsOnART = "0 months";
//   } else if (artStartDate && followupDate && artInDays >= 30) {
//     resultMonthsOnART = `${Math.floor(artInDays / 30)} months`;
//   }
//   return artStartDate && followupDate ? resultMonthsOnART : null;
// }

export async function FetchArtStartDate(patientUuid: string) {
  const latestArtStartDate = await getLatestObs(
    patientUuid,
    "ae329187-6232-4142-aa91-22c85bc8e5b5",
    FOLLOWUP_ENCOUNTER_TYPE
  );
  const value = latestArtStartDate?.valueDateTime;
  const artStartDate = value ? new Date(value) : null;
  return artStartDate;
}

export function CalcMonthsOnART(patient, artStartD: any, followupD: any) {
  let resultMonthsOnART: string;
  let followupDate = followupD ? new Date(followupD) : null;
  let artStartDate = artStartD ? new Date(artStartD) : null;
  
  if (!followupDate || isNaN(followupDate.getTime())) {
    return null;
  }

  if (!artStartDate || isNaN(artStartDate.getTime())) {
    const latestObs = FetchArtStartDate(patient.id);

    const value = latestObs?.[0]?.resource?.valueDateTime;
    artStartDate = value ? new Date(value) : null;
  }

  if (!artStartDate || isNaN(artStartDate.getTime())) {
    return null;
  }

  const artInDays = Math.round(
    (followupDate.getTime() - artStartDate.getTime()) / 86400000
  );

  if (artInDays < 30) {
    resultMonthsOnART = "0 months";
  } else {
    resultMonthsOnART = `${Math.floor(artInDays / 30)} months`;
  }

  return resultMonthsOnART;
}

export async function customAssessmentDate(
  patient,
  prevAssessmentDate: Date,
  assessmentDate: Date,
  prevAssessmentCategory: string,
  assessmentCategory: string
) {
  const datesAreSame =
    prevAssessmentDate &&
    assessmentDate &&
    new Date(prevAssessmentDate).toDateString() === new Date(assessmentDate).toDateString();

  // If category changed but date didn't, reset (null) the assessment date
  if (prevAssessmentCategory !== assessmentCategory && datesAreSame) {
    return "";
  }

  // If no assessment date entered (first form open), load the latest from DB
  if (!assessmentDate && prevAssessmentCategory === assessmentCategory) {
    const latestAssessmentObs = await getLatestObs(
      patient.id,
      "78c8abfb-1989-444a-8750-947227f4bde8", // ✅ This is the concept for Assessment Date
      FOLLOWUP_ENCOUNTER_TYPE
    );

    const value = latestAssessmentObs?.valueDateTime;
    return value ? new Date(value) : null;
  }

  // Otherwise return the user-entered date
  return assessmentDate;
}

export function CalcViralLoadStatus(viralLoadCount: number) {
  let resultViralLoadStatus: string;
  if (viralLoadCount) {
    if (viralLoadCount == 0) {
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

export function CalcAdultNutritionalStatus(height, weight, muac, functionalStatus, pregnant, breastfeeding) {
  let nutritionalStatus: string | null = null;
  const BEDRIDDEN = "162752AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
  const YES = "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
  
  const resultBMI = CalcBMI(height, weight);

  // Priority 1: Functional Status 'bedridden' with MUAC
  if (functionalStatus === BEDRIDDEN && muac !== "") {
    
    if (muac > 23) {
      nutritionalStatus = "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Normal
    } else if (muac >= 18 && muac <= 23) {
      nutritionalStatus = "134722AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Moderate Malnutrition
    } else if (muac < 18) {
      nutritionalStatus = "126598AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Severe Malnutrition
    }
  }

  // Priority 2: Pregnant or Breastfeeding with MUAC
  else if ((pregnant === YES || breastfeeding === YES) && muac !== "") {
    if (muac > 23) {
      nutritionalStatus = "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Normal
    } else if (muac >= 19 && muac <= 23) {
      nutritionalStatus = "134722AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Moderate Malnutrition
    } else if (muac < 19) {
      nutritionalStatus = "126598AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Severe Malnutrition
    }
  }

  // Priority 3: Use BMI
  else if (resultBMI != null) {
    if (resultBMI >= 18.5 && resultBMI <= 24.99) {
      nutritionalStatus = "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Normal
    } else if (resultBMI >= 17 && resultBMI <= 18.49) {
      nutritionalStatus = "134723AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Mild Malnutrition
    } else if (resultBMI >= 16 && resultBMI <= 16.99) {
      nutritionalStatus = "134722AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Moderate Malnutrition
    } else if (resultBMI < 16) {
      nutritionalStatus = "126598AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Severe Malnutrition
    } else if (resultBMI >= 25 && resultBMI <= 29.99) {
      nutritionalStatus = "114413AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Overweight
    } else if (resultBMI >= 30) {
      nutritionalStatus = "132626AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Obese
    }
  }

  return nutritionalStatus;
}


export function CalcOlderChildNutritionalStatus(bmiForAge) {
  switch (bmiForAge) {
    case "c93ec1cc-a4eb-43b9-b99b-ace42ca6106f":
      return "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    case "6f384ab3-5587-478e-a685-0b43c0f64163":
      return "134723AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    case "b782c7a5-639e-4f7e-9eee-608a62439885":
      return "134722AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    case "c3354c3c-b708-4821-94ee-cebc9eadf1e3":
      return "126598AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    case "9324e838-c96d-4312-91b0-deae5cc0334c":
      return "114413AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    case "9a41b3bb-7c37-40f2-9022-d0f672e171cc":
      return "114413AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    default:
      return 0;
  }
}

export function CalcNutritionalScreening(height, weight, muac, functionalStatus, pregnant, breastfeeding) {
  let calculatedStatus: string | null = null;
  let nutritionalScreening: string | null = null;

  const BEDRIDDEN = "162752AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
  const YES = "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

  const resultBMI = CalcBMI(height, weight);

  // Priority 1: Functional Status 'bedridden' with MUAC
  if (functionalStatus === BEDRIDDEN && muac !== "") {
    
    if (muac > 23) {
      calculatedStatus = "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Normal
    } else if (muac >= 18 && muac <= 23) {
      calculatedStatus = "134722AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Moderate Malnutrition
    } else if (muac < 18) {
      calculatedStatus = "126598AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Severe Malnutrition
    }
  }

  // Priority 2: Pregnant or Breastfeeding with MUAC
  else if ((pregnant === YES || breastfeeding === YES) && muac !== "") {
    if (muac > 23) {
      calculatedStatus = "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Normal
    } else if (muac >= 19 && muac <= 23) {
      calculatedStatus = "134722AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Moderate Malnutrition
    } else if (muac < 19) {
      calculatedStatus = "126598AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Severe Malnutrition
    }
  }

  // Priority 3: Use BMI
  else if (resultBMI != null) {
    if (resultBMI >= 18.5 && resultBMI <= 24.99) {
      calculatedStatus = "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Normal
    } else if (resultBMI >= 17 && resultBMI <= 18.49) {
      calculatedStatus = "134723AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Mild Malnutrition
    } else if (resultBMI >= 16 && resultBMI <= 16.99) {
      calculatedStatus = "134722AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Moderate Malnutrition
    } else if (resultBMI < 16) {
      calculatedStatus = "126598AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Severe Malnutrition
    } else if (resultBMI >= 25 && resultBMI <= 29.99) {
      calculatedStatus = "114413AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Overweight
    } else if (resultBMI >= 30) {
      calculatedStatus = "132626AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Obese
    }
  }
  // Step 2: Use manual override if exists, else fallback to calculated
  const effectiveStatus =  calculatedStatus;

  // Step 3: Determine screening based on final effective status
  if (effectiveStatus === "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA") {
    nutritionalScreening = "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Normal
  } else if (
    effectiveStatus === "134723AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" || // Mild
    effectiveStatus === "134722AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" || // Moderate
    effectiveStatus === "126598AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"    // Severe
  ) {
    nutritionalScreening = "123815AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // At Risk
  } else if (
    effectiveStatus === "114413AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" || // Overweight
    effectiveStatus === "132626AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"    // Obese
  ) {
    nutritionalScreening = "114413AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Overweight Screening
  } else {
    nutritionalScreening = null;
  }

  return {
    status: calculatedStatus,
    screening: nutritionalScreening
  };
}

export function CalcNextFollowupDateForCxCa(
  screeningStrategy: string,
  hpvScreeningResult: string,
  viaScreeningResult: string,
  cytologyResult: string,
  hpvDnaSampleCollectedDate: Date,
  viaScreeningDate: Date,
  cytologySampleCollectionDate: Date,
  dateTreatmentGiven: Date
) {
  let nextFollowupDateCxCa;
  if (dateTreatmentGiven) {
    
    const treatmentDateClone = new Date(dateTreatmentGiven.getTime());
    treatmentDateClone.setMonth(treatmentDateClone.getMonth() + 12);
    nextFollowupDateCxCa = treatmentDateClone;
  } else {
    if (screeningStrategy == "d3989991-4f6d-4336-9f84-cb4208d39ae6") {
      if (hpvScreeningResult == "5e4fc757-0b14-49ae-b3b7-419666f41e15") {
        const hpvDateClone = new Date(hpvDnaSampleCollectedDate.getTime());
        hpvDateClone.setFullYear(hpvDateClone.getFullYear() + 3);
        nextFollowupDateCxCa = hpvDateClone;
      } else if (
        (hpvScreeningResult == "703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" || hpvScreeningResult == "1067AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA") &&
        viaScreeningResult == "a08ab377-30bc-4ef6-bb9d-4cf6a0564ccc"
      ) {
        const viaDateClone = new Date(viaScreeningDate.getTime());
        viaDateClone.setFullYear(viaDateClone.getFullYear() + 1);
        nextFollowupDateCxCa = viaDateClone;
      }
    } else if (
      screeningStrategy == "19cdb2fa-e25f-48bd-9e86-b00a72f9b4e1" &&
      viaScreeningResult == "a08ab377-30bc-4ef6-bb9d-4cf6a0564ccc"
    ) {
      const viaDateClone = new Date(viaScreeningDate.getTime());
      viaDateClone.setFullYear(viaDateClone.getFullYear() + 2);
      nextFollowupDateCxCa = viaDateClone;
    } else if (
      screeningStrategy == "f32b7edd-f70a-4b32-a684-4fa35eb2abcd" &&
      cytologyResult == "5e4fc757-0b14-49ae-b3b7-419666f41e15"
    ) {
      const cytologyDateClone = new Date(cytologySampleCollectionDate.getTime());
      cytologyDateClone.setFullYear(cytologyDateClone.getFullYear() + 3);
      nextFollowupDateCxCa = cytologyDateClone;
    }
  }
  return nextFollowupDateCxCa;
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
  const validatingDate = await getLatestObs(
    patient.id,
    "5c118396-52dc-4cac-8860-e6d8e4a7f296",
    FOLLOWUP_ENCOUNTER_TYPE
  );

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

export function isTreatmentVisible(
  hpvScreeningResult,
  viaScreeningResult,
  cytologyResult,
  biopsyResult,
  colposcopyExamFinding
) {
  const condition1 =
    hpvScreeningResult !== "703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
  const condition2 =
    viaScreeningResult !== "7bc7c4f3-a636-478d-8a3f-65116093e37a" &&
    viaScreeningResult !== "be297cab-5ae6-4e7c-8657-b82730b7b8f1" &&
    viaScreeningResult !== "159008AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
  const condition3 =
    cytologyResult !== "912a5c48-8b07-4fd7-b2c3-ccb94fde7c68";
  const condition4 =
    biopsyResult !== "ba4420d5-acc2-4d1c-8ead-43476e17960d" &&
    biopsyResult !== "fde5cd74-e503-4ce1-9afe-f74195f95f6e" &&
    biopsyResult !== "baab7d76-69e0-426d-afca-99cd1c9849a5";
  const condition5 =
    colposcopyExamFinding !== "f0f52e6c-56fa-44c6-a81e-a3a7ac8548c4" &&
    colposcopyExamFinding !== "7276fa8a-3bab-4bd7-b647-8e9c8536ef30";

  return condition1 && condition2 && condition3 && condition4 && condition5;
}

export function isSupplementaryFoodVisible(patient, height, weight, muac, functionalStatus, pregnant, breastfeeding, bmiForAge) {
  let calculatedStatus: string | null = null;
  let nutritionalScreening: string | null = null;
  let finalCondition: boolean;

  const BEDRIDDEN = "162752AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
  const YES = "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

  const resultBMI = CalcBMI(height, weight);

  // ========== ADULT LOGIC ==========
  const isAdult = patient.age >= 18;
  const isChild = patient.age < 18;
  if (isAdult) {
    // Priority 1: Functional Status 'bedridden' with MUAC
  if (functionalStatus === BEDRIDDEN && muac !== "") {
    
    if (muac > 23) {
      calculatedStatus = "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Normal
    } else if (muac >= 18 && muac <= 23) {
      calculatedStatus = "134722AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Moderate Malnutrition
    } else if (muac < 18) {
      calculatedStatus = "126598AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Severe Malnutrition
    }
  }

  // Priority 2: Pregnant or Breastfeeding with MUAC
  else if ((pregnant === YES || breastfeeding === YES) && muac !== "") {
    if (muac > 23) {
      calculatedStatus = "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Normal
    } else if (muac >= 19 && muac <= 23) {
      calculatedStatus = "134722AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Moderate Malnutrition
    } else if (muac < 19) {
      calculatedStatus = "126598AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Severe Malnutrition
    }
  }

  // Priority 3: Use BMI
  else if (resultBMI != null) {
    if (resultBMI >= 18.5 && resultBMI <= 24.99) {
      calculatedStatus = "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Normal
    } else if (resultBMI >= 17 && resultBMI <= 18.49) {
      calculatedStatus = "134723AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Mild Malnutrition
    } else if (resultBMI >= 16 && resultBMI <= 16.99) {
      calculatedStatus = "134722AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Moderate Malnutrition
    } else if (resultBMI < 16) {
      calculatedStatus = "126598AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Severe Malnutrition
    } else if (resultBMI >= 25 && resultBMI <= 29.99) {
      calculatedStatus = "114413AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Overweight
    } else if (resultBMI >= 30) {
      calculatedStatus = "132626AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Obese
    }
  }
  // ========== SCREENING CATEGORY ==========
  const effectiveStatus = calculatedStatus;  

  if (effectiveStatus === "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA") {
    nutritionalScreening = "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Normal
    finalCondition = true;
  } else if (
    effectiveStatus === "134723AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" || // Mild
    effectiveStatus === "134722AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" || // Moderate
    effectiveStatus === "126598AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"    // Severe
  ) {
    nutritionalScreening = "123815AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Undernourished
    finalCondition = false;
  } else if (
    effectiveStatus === "114413AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" || // Overweight
    effectiveStatus === "132626AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"    // Obese
  ) {
    nutritionalScreening = "114413AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Overweight Screening
    finalCondition = true;
  } else {
    nutritionalScreening = null;
    finalCondition = false;
  } 
const effectiveFood = nutritionalScreening
    return {
      status: calculatedStatus,
      screening: nutritionalScreening,
      supplementary: finalCondition
    }
  }

  // ========== CHILD LOGIC ==========
  else if (bmiForAge != null && isChild) {
    if (bmiForAge === "c93ec1cc-a4eb-43b9-b99b-ace42ca6106f") {
      calculatedStatus = "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else if (bmiForAge === "6f384ab3-5587-478e-a685-0b43c0f64163") {
      calculatedStatus = "134723AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else if (bmiForAge === "b782c7a5-639e-4f7e-9eee-608a62439885") {
      calculatedStatus = "134722AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else if (bmiForAge === "c3354c3c-b708-4821-94ee-cebc9eadf1e3") {
      calculatedStatus = "126598AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else if (bmiForAge === "9324e838-c96d-4312-91b0-deae5cc0334c") {
      calculatedStatus = "114413AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else if (bmiForAge === "9a41b3bb-7c37-40f2-9022-d0f672e171cc") {
      calculatedStatus = "114413AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    }  

    // ========== SCREENING CATEGORY ==========
  const effectiveStatus = calculatedStatus;  

  if (effectiveStatus === "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA") {
    nutritionalScreening = "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Normal
    finalCondition = true;
  } else if (
    effectiveStatus === "134723AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" || // Mild
    effectiveStatus === "134722AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" || // Moderate
    effectiveStatus === "126598AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"    // Severe
  ) {
    nutritionalScreening = "123815AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Undernourished
    finalCondition = false;
  } else if (
    effectiveStatus === "114413AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" || // Overweight
    effectiveStatus === "132626AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"    // Obese
  ) {
    nutritionalScreening = "114413AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; // Overweight Screening
    finalCondition = true;
  } else {
    nutritionalScreening = null;
    finalCondition = false;
  } 
const effectiveFood = nutritionalScreening
  return {
      status: calculatedStatus,
      screening: nutritionalScreening,
      supplementary: finalCondition
    }
  }
  
}

export function isTOVisible(followupDate, dispensedDays) {

  if (!followupDate || !dispensedDays) {
    return true;
  } else {
    return false;
  }
}

export async function CustomLatestObservations(patient, followupStatus) {
  return await getLatestObservation(patient.id, followupStatus);
}

export async function loadFollowupStatus(patient) {
  const status = await getLatestObs(
    patient.id,
    "222f64a8-a603-4d2e-b70e-2d90b622bb04",
    FOLLOWUP_ENCOUNTER_TYPE
  );

  const code = status?.valueCodeableConcept?.coding[0]?.code;

  const excludeStatuses = new Set([
    "162904AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", // Dead
    "160432AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", // Restart
    "159492AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", // TO
  ]);

  return excludeStatuses.has(code) ? "" : code;
}

export async function getEligibilityStatus(patient) {
  return await getLatestEligibilityFromLatestFollowup(patient.id);
}

export async function getAgeFromBirthdate(dateOfBirth) {
  if (dateOfBirth) {
    const birthdate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthdate.getDate())
    ) {
      age--;
    }
    return age;
  } else {
    return null;
  }
}

export async function getBirthdateFromAge(contactAge) {
  if (contactAge) {
    const today = new Date();
    const birthYear = today.getFullYear() - contactAge;
    const birthdate = new Date(today.setFullYear(birthYear));
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      timeZoneName: "short",
    };
    return (
      birthdate.toLocaleDateString("en-US", options) +
      " " +
      birthdate.toTimeString().split(" ")[0]
    );
  } else {
    return null;
  }
}
