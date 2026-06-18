/* eslint-disable unused-imports/no-unused-imports */
import {
  getAsyncLifecycle,
  defineConfigSchema,
  getSyncLifecycle,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";

import { PatientList } from "./components/patient-lists/patient-list.component";
import { createLeftPanelLink } from "./components/side-menu/left-pannel-link.component";

export const moduleName = "@icap-ethiopia/esm-ethiohri-app";
export const options = { featureName: "ethiohri", moduleName };

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const root = getAsyncLifecycle(
  () => import("./root.component"),
  options,
);

export const homeLeftPanelLink = getSyncLifecycle(
  createLeftPanelLink({
    name: "home",
    title: "Home",
  }),
  options,
);

export const homeDashboard = getAsyncLifecycle(
  () => import("./components/home/home.component"),
  options,
);

export const patientList = getSyncLifecycle(PatientList, {
  featureName: "home",
  moduleName,
});
