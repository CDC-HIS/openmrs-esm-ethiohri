// dashboard-group.factory.tsx
import React, { memo } from "react";
import { DashboardGroupExtension } from "./dashboard-group.extension";

export interface CreateDashboardGroupProps {
  title: string;
  slotName?: string;
  isExpanded?: boolean;
}

export const createDashboardGroup = ({
  title,
  slotName,
  isExpanded = true,
}: CreateDashboardGroupProps) => {
  const DashboardGroup = memo(({ basePath }: { basePath: string }) => (
    <DashboardGroupExtension
      title={title}
      slotName={slotName}
      basePath={basePath}
      isExpanded={isExpanded}
    />
  ));

  DashboardGroup.displayName = `DashboardGroup(${title})`;

  return DashboardGroup;
};
