import React from "react";
import { navigate } from "@openmrs/esm-framework";
import { useTranslation } from "react-i18next";
import styles from "./test-patient-details-button.component.scss";

interface TestPatientDetailsButtonProps {
  onTransition?: () => void;
  patientUuid: string;
}

const TestPatientDetailsButton: React.FC<TestPatientDetailsButtonProps> = ({
  patientUuid,
  onTransition,
}) => {
  const { t } = useTranslation();
  const handleClick = React.useCallback(() => {
    navigate({
      to: `\${openmrsSpaBase}/patient/${patientUuid}/chart/Clinical Visits`,
    });
    onTransition && onTransition();
  }, [onTransition, patientUuid]);

  return (
    <li className="cds--overflow-menu-options__option">
      <button
        className="cds--overflow-menu-options__btn"
        role="menuitem"
        title={t("Open Forms", "Test patient details")}
        data-floating-menu-primary-focus
        onClick={handleClick}
      >
        <span className="cds--overflow-menu-options__option-content">
          {t("testactionbutton", "Test patient details")}
        </span>
      </button>
    </li>
  );
};

export default TestPatientDetailsButton;
