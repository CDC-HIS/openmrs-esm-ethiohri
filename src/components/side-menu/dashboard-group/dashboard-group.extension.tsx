// dashboard-group.extension.tsx

import React, { useEffect, useMemo, useState } from "react";
import { ExtensionSlot } from "@openmrs/esm-framework";

import { ChevronDown, ChevronRight, Category } from "@carbon/react/icons";

import { registerNavGroup, unregisterNavGroup } from "./nav-group.store";

import styles from "./dashboard-group.scss";

export interface DashboardGroupExtensionProps {
  title: string;
  slotName?: string;
  basePath: string;
  isExpanded?: boolean;
}

export function DashboardGroupExtension({
  title,
  slotName,
  basePath,
  isExpanded = true,
}: DashboardGroupExtensionProps) {
  const resolvedSlotName = useMemo(
    () => slotName ?? title.toLowerCase().replace(/\s+/g, "-"),
    [slotName, title],
  );

  const [expanded, setExpanded] = useState(isExpanded);

  useEffect(() => {
    registerNavGroup(resolvedSlotName);

    return () => {
      unregisterNavGroup(resolvedSlotName);
    };
  }, [resolvedSlotName]);

  return (
    <div className={styles.navGroup}>
      <button
        type="button"
        className={styles.navGroupHeader}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className={styles.navGroupLeft}>
          <Category size={16} className={styles.groupIcon} />

          <span className={styles.navGroupTitle}>{title}</span>
        </div>

        <div
          className={`${styles.chevronIcon} ${expanded ? styles.expanded : styles.collapsed}`}
        >
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
      </button>

      {expanded && (
        <div className={styles.navGroupItems}>
          <ExtensionSlot
            name={resolvedSlotName}
            state={{
              basePath,
            }}
          />
        </div>
      )}
    </div>
  );
}
