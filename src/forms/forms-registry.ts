import intake_a_1_0 from "./intake-a/2.0.json";
import intake_b_1_0 from "./intake-b/2.0.json";
import family_information_1_0 from "././family-members/1.0.json";
import phdp_1_0 from "./phdp/1.0.json";
import positive_tracking_1_0 from "./positive-case-tracking/1.0.json";
import followup_1_0 from "./followup/2.1.json";
import retest_1_0 from "./re-test/1.0.json";
import post_exposure_1_0 from "./post-exposure/1.0.json";
import pre_exposure_screening_1_0 from "./pre-exposure-screening/1.0.json";
import pmtct_1_0 from "./pmtct/1.0.json";
import pre_exposure_followup_1_0 from "./pre-exposure-followup/1.0.json";

export default {
  eth_hiv: {
    intake_a: {
      "1.0": intake_a_1_0,
    },
    intake_b: {
      "1.0": intake_b_1_0,
    },
    family_information: {
      "1.0": family_information_1_0,
    },
    phdp: {
      "1.0": phdp_1_0,
    },
    followup: {
      "1.0": followup_1_0,
    },
    positive_tracking: {
      "1.0": positive_tracking_1_0,
    },
    retest: {
      "1.0": retest_1_0,
    },
    post_exposure: {
      "1.0": post_exposure_1_0,
    },
    pre_exposure_screening: {
      "1.0": pre_exposure_screening_1_0,
    },
    pmtct: {
      "1.0": pmtct_1_0,
    },
    pre_exposure_followup: {
      "1.0": pre_exposure_followup_1_0,
    },
  },
};
