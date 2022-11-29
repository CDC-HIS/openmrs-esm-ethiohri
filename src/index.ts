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
  getGlobalStore,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import ethiohriConfigOverrides from "./ethiohri-configuration-overrides.json";
import ethiohriConfig from "./ethiohri-config";
import {
  addToBaseFormsRegistry,
  ControlRegistryItem,
  OHRIFormsTagLibraryStore,
} from "@ohri/openmrs-ohri-form-engine-lib";
import formsRegistry from "./forms/forms-registry";
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

export const moduleName = "@icap-ethiopia/esm-ethiohri-app";

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
  const options = { featureName: "ethiohri", moduleName };

  defineConfigSchema(moduleName, configSchema);
  provide(ethiohriConfigOverrides);
  provide(ethiohriConfig);
  addToBaseFormsRegistry(formsRegistry);
  const tagLibStore = getGlobalStore<Array<ControlRegistryItem>>(
    OHRIFormsTagLibraryStore,
    []
  );
  tagLibStore.getState().push({
    id: "eth-date",
    loadControl: () => import("./controls/date/ethiohri-date.component"),
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
      {
        id: "hts-service-summary-list-ext",
        slot: "hts-service-summary-slot",
        load: getAsyncLifecycle(
          () => import("./pages/hiv-service/hiv-service-summary.component"),
          {
            featureName: "service-summary-extension",
            moduleName,
          }
        ),
      },
      {
        id: "ethiohri-visits-summary-ext",
        slot: "visits-summary-slot",
        load: getAsyncLifecycle(
          () => import("./pages/visits/visits-summary.component"),
          {
            featureName: "visit-summary-extension",
            moduleName,
          }
        ),
      },
      {
        id: "ethiohri-adherence-counselling-summary-ext",
        slot: "adherence-counselling-summary-slot",
        load: getAsyncLifecycle(
          () =>
            import(
              "./pages/adherence-counselling/adherence-counselling-summary.component"
            ),
          {
            featureName: "adherence-summary-extension",
            moduleName,
          }
        ),
      },
      /* {
        id: "hts-patient-encounters-list-ext",
        slot: "ethiohri-hts-summary-dashboard-slot",
        load: getAsyncLifecycle(
          () => import("./pages/hts/hts-overview-summary.component"),
          {
            featureName: "hts-patient-encounters-list",
            moduleName,
          }
        ),
      }, */
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
