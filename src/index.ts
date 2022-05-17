/**
 * This is the entrypoint file of the application. It communicates the
 * important features of this microfrontend to the app shell. It
 * connects the app shell to the React application(s) that make up this
 * microfrontend.
 */

import {
  getAsyncLifecycle,
  defineConfigSchema,
  provide,
  getSyncLifecycle,
  getGlobalStore,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import ethiohriConfigOverrides from "./ethiohri-configuration-overrides.json";
import {
  addToBaseFormsRegistry,
  ControlRegistryItem,
  OHRIFormsTagLibraryStore,
} from "openmrs-ohri-form-engine-lib";
import formsRegistry from "./forms/forms-registry";
require("./vendor/lib/jquery-calendars/js/jquery.min.js");
require("./vendor/lib/jquery-calendars/js/jquery.plugin.min.js");
require("./vendor/lib/jquery-calendars/js/jquery.calendars.min.js");
require("./vendor/lib/jquery-calendars/js/jquery.calendars.all.min.js");
require("./vendor/lib/jquery-calendars/js/jquery.calendars.ethiopian.min.js");
require("./vendor/lib/jquery-calendars/js/jquery.calendars.ethiopian-am.js");
/**
 * This tells the app shell how to obtain translation files: that they
 * are JSON files in the directory `../translations` (which you should
 * see in the directory structure).
 */
const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

/**
 * This tells the app shell what versions of what OpenMRS backend modules
 * are expected. Warnings will appear if suitable modules are not
 * installed. The keys are the part of the module name after
 * `openmrs-module-`; e.g., `openmrs-module-fhir2` becomes `fhir2`.
 */
const backendDependencies = {
  fhir2: "^1.2.0",
  "webservices.rest": "^2.2.0",
};

/**
 * This function performs any setup that should happen at microfrontend
 * load-time (such as defining the config schema) and then returns an
 * object which describes how the React application(s) should be
 * rendered.
 */
function setupOpenMRS() {
  const moduleName = "@openmrs/esm-ethiohri-app";

  const options = { featureName: "ethiohri", moduleName };

  defineConfigSchema(moduleName, configSchema);
  provide(ethiohriConfigOverrides);
  addToBaseFormsRegistry(formsRegistry);
  const tagLibStore = getGlobalStore<Array<ControlRegistryItem>>(
    OHRIFormsTagLibraryStore,
    []
  );
  tagLibStore.getState().push({
    id: "eth-date",
    loadControl: () => import("./controls/calendar/calendar.component"),
    type: "eth-date",
  });
  return {
    pages: [],
    extensions: [
      {
        id: "ethiohri-program-summary-ext",
        slot: "program-management-summary-slot",
        load: getAsyncLifecycle(
          () =>
            import(
              "./pages/program-management/program-managment-summary.component"
            ),
          {
            featureName: "program-summary-extension",
            moduleName,
          }
        ),
      },
      // Sample code to add new sidenav links
      // {
      //   id: "ethiohri-dashboard",
      //   slot: "patient-chart-dashboard-slot",
      //   load: getSyncLifecycle(
      //     createDashboardLink(ethiohriDashboardMeta),
      //     options
      //   ),
      //   meta: ethiohriDashboardMeta,
      // },
      // {
      //   id: "ethiohri-summary-ext",
      //   slot: "ethiohri-dashboard-slot",
      //   load: getAsyncLifecycle(
      //     () =>
      //       import(
      //         "./pages/program-management/program-managment-summary.component"
      //       ),
      //     {
      //       featureName: "program-summary-extension",
      //       moduleName,
      //     }
      //   ),
      // },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
