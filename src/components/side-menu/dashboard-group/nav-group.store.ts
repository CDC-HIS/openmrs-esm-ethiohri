// nav-group.store.ts
import { createGlobalStore, createUseStore } from "@openmrs/esm-framework";

interface NavGroupStore {
  navGroups: string[];
}

const initialState: NavGroupStore = {
  navGroups: [],
};

const navGroupStore = createGlobalStore<NavGroupStore>(
  "nav-groups",
  initialState,
);

export function registerNavGroup(slotName: string) {
  if (!slotName) return;

  const { navGroups } = navGroupStore.getState();

  const exists = navGroups.includes(slotName);

  if (exists) return;

  navGroupStore.setState({
    navGroups: [...navGroups, slotName],
  });
}

export function unregisterNavGroup(slotName: string) {
  const { navGroups } = navGroupStore.getState();

  navGroupStore.setState({
    navGroups: navGroups.filter((group) => group !== slotName),
  });
}

export const useNavGroups = createUseStore(navGroupStore);
