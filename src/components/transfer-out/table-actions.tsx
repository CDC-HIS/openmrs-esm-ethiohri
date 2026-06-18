import React from "react";
import { useTranslation } from "react-i18next";
import {
  Layer,
  OverflowMenu,
  OverflowMenuItem,
  InlineLoading,
} from "@carbon/react";
import { showModal, useLayoutType } from "@openmrs/esm-framework";
import styles from "./encounter-action-menu.scss";
import ArtTransferForm from "../template/print";
import { getPrintData } from "../../api/api";
import type { PatientRecord } from "../../utils/types";

interface EncounterActionMenuProps {
  encounter: any;
  patientUuid?: string;
  mutateEncounters: () => void;
  isPastDate?: boolean;
}
export const EncounterActionMenu = ({
  encounter,
  patientUuid,
  mutateEncounters,
  isPastDate,
}: EncounterActionMenuProps) => {
  const [loading, setLoading] = React.useState(false);

  const [printData, setPrintData] = React.useState<PatientRecord | null>(null);
  const { t } = useTranslation();
  const isTablet = useLayoutType() === "tablet";

  const launchDeleteEncounterDialog = () => {
    const dispose = showModal("transfer-out-confirmation", {
      closeDeleteModal: () => dispose(),
      encounterUuid: encounter,
      patientUuid,
      onConfirmDelete: () => {
        mutateEncounters();
        dispose();
      },
    });
  };

  const handlePrint = async () => {
    if (!patientUuid) return;

    try {
      setLoading(true);
      const patientData: PatientRecord = await getPrintData(patientUuid);

      setPrintData(patientData);

      setTimeout(() => {
        const content = document.getElementById("print-root");
        if (!content) return;

        const iframe = document.createElement("iframe");
        iframe.style.position = "fixed";
        iframe.style.width = "0";
        iframe.style.height = "0";
        iframe.style.border = "0";
        document.body.appendChild(iframe);

        const doc = iframe.contentWindow?.document;
        if (!doc) return;

        doc.open();
        doc.write(`
        <html>
          <head>
            <title>Transfer Form</title>
            <style>
              @page { size: A4; }
              body { font-family: Arial; }
            </style>
          </head>
          <body>
            ${content.innerHTML}
          </body>
        </html>
      `);
        doc.close();

        setTimeout(() => {
          iframe.contentWindow?.print();
          document.body.removeChild(iframe);
          setPrintData(null);
        }, 300);
      }, 200);
    } catch (error) {
      console.error("Failed to fetch patient for printing", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <InlineLoading description="Loading patient data..." />;
  }
  return (
    <Layer className={styles.layer}>
      {printData && (
        <div className={styles.printContainer}>
          <div id="print-root">
            <ArtTransferForm data={printData} />
          </div>
        </div>
      )}
      <OverflowMenu
        aria-label={t("transferOut", "Transfer out")}
        size={isTablet ? "lg" : "sm"}
        flipped
        align="left"
      >
        {!isPastDate && (
          <OverflowMenuItem
            className={styles.menuItem}
            id="transferOutPatient"
            onClick={launchDeleteEncounterDialog}
            itemText={t("transferOutPatient", "Transfer Out Patient")}
          />
        )}
        <OverflowMenuItem
          className={styles.menuItem}
          id="print"
          onClick={handlePrint}
          itemText={t("print", "Print")}
        />
      </OverflowMenu>
    </Layer>
  );
};
