import { getSyncLifecycle } from '@openmrs/esm-framework';
import { createLeftPanelLink } from './left-panel-link.component';

const moduleName = '@openmrs/esm-bed-management-app';

const options = {
  featureName: 'bed-management',
  moduleName,
};

export const summaryLeftPanelLink = getSyncLifecycle(
  createLeftPanelLink({
    name: 'summary',
    title: 'Summary',
  }),
  options,
);

export const wardAllocationLeftPanelLink = getSyncLifecycle(
  createLeftPanelLink({
    name: 'ward-allocation',
    title: 'Ward Allocation',
  }),
  options,
);
