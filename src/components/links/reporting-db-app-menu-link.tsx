import React from "react";
import { useTranslation } from "react-i18next";
import { ConfigurableLink } from "@openmrs/esm-framework";

export default function ReportingDashboardMenuLink() {
  const { t } = useTranslation();
  return (
    <ConfigurableLink to="${openmrsBase}/module/reporting/dashboard/index.form">
      {t("reportingDashboard", "Reporting")}
    </ConfigurableLink>
  );
}
