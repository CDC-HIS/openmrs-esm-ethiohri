import type { OpenmrsResource } from "@openmrs/esm-framework";

export interface OpenmrsEncounter extends OpenmrsResource {
  encounterDatetime: Date;
  encounterType: string;
  patient: string;
  location: string;
  encounterProviders?: Array<{ encounterRole: string; provider: string }>;
  obs: Array<OpenmrsResource>;
  form?: string;
  visit?: string;
}

export interface PatientSummary {
  // Demographics
  next_cca_screening_date?: number;
  follow_up_date?: number;
  missed_days?: string;
  tpt_start_date?: number;
  tpt_completed_date?: number;
  tpt_discontinued_date?: number;
  next_ncd_screening_date?: number;
  patient_name: string;
  age: number;
  sex?: "MALE" | "FEMALE";
  mrn?: string;
  birthdate?: number;
  region?: string;
  zone?: string;
  woreda?: string;
  kebele?: string;
  house_number?: string;
  mobile_phone?: string;
  address_completeness?: "GREEN" | "YELLOW" | "RED" | string;

  hiv_confirmed_date?: number;
  // ART & HIV
  current_status?: string;
  art_start_date?: number;
  months_on_art?: number;
  current_regimen?: string;
  regimen_line?: string;
  regimen_dose?: string;
  vl_status?: string;
  last_vl_date?: number;
  last_vl_result?: string;
  is_suppressed?: boolean;
  dsd_category?: string;
  tx_curr_end_date?: number;
  vl_eligibility_date?: number;

  // TB & TPT
  tpt_status?: string;
  tb_treatment_start_date?: number;
  tb_treatment_completed_date?: number;
  tb_treatment_discontinued_date?: number;
  active_tb_diagnosis_date?: number;

  // Screening
  ict_screening_status?: string;
  ncd_screening_status?: string;
  cxca_screening_status?: string;
  ncd_code?: string;
  pregnancy_status?: string;
  family_planning_method?: string;

  // Appointments & Tracking
  next_appointment_date?: number;
  last_visit_date?: number;
  last_updated?: number;
  days_overdue?: number;
  transfer_in_date?: number;
  registration_date?: number;

  // Misc
  patient_uuid: string;
  client_id: number;
  phrh_code?: string;
  uan?: string;
  target_population?: string;
  pmtct_status?: string;
  icd_number?: string;
  nutritional_status?: string;
}
export type LabData = {
  LFT_ALT: string;
  LFT_AST: string;
  Creatine: string;
  TLC: string;
  CD4: string;
  Viral_Load: string;
  Weight: string;
  Height: string;
  BMI: string;
  WHO_Stage: string;
  Func_Status: string;
};
export type PatientRecord = {
  uuid: string;
  referralNo: string | null;
  cardNo: string;
  uniqueArtNo: string;
  referralDate: string | null;
  fromFacility: string | null;
  toFacility: string | null;
  fullName: string;
  age: string;
  sex: string;
  region: string | null;
  zone: string | null;
  woreda: string | null;
  kebele: string | null;
  mobile: string | null;
  hivConfirmedDate: string;
  startedOnArt: string;
  artEligibility: string | null;
  whoStage: string | null;
  cd4: string | null;
  tlc: string | null;
  artStartDate: string;
  originalRegimen: string;
  currentRegimen: string;
  reasonChange: string | null;
  artAdherence: string | null;
  cotrim: string;
  cotrimStartDate: string | null;
  cotrimStopDate: string | null;
  inh: string;
  inhStartDate: string | null;
  inhCompletedDate: string | null;
  inhDiscontinuedDate: string | null;
  tbRx: string;
  tbRxStartDate: string | null;
  tbRxCompletedDate: string | null;
  tbRxDiscontinuedDate: string | null;
  flucon: string;
  fluconStartDate: string | null;
  fluconStopDate: string | null;
  motherPmctCare: string | null;
  motherPmctBookingDate: string | null;
  childPmctCare: string | null;
  childPmctEnrollmentDate: string | null;
  arvUsedForPmct: string | null;
  baseline: LabData;
  current: LabData;
  transferReason: string | null;
  clinicianName: string | null;
  clinicianPhone: string | null;
  clinicianEmail: string | null;
  resourceVersion: string;
};
