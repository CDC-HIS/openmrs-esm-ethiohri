import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ETable } from "../../components/data-table/E-table.component";
import { EmptyState } from "../empty-state/empty-state.component";
import { DataTableSkeleton } from "@carbon/react";
import {
  encounterType_follow_UP,
  tptfollowup3HP,
  tptfollowupINH,
  tptfollowup3HR,
  cotrimoxazolestarted,
  fluconazolestarted,
  arvDispensecode,
} from "../../constants";
import { fetchPatientLastEncounter } from "../../api/api";
import styles from "../hiv-baseline/hiv-baseline.scss";
import {
  EthiopicCalendar,
  toCalendar,
  CalendarDate,
} from "@internationalized/date";

interface ActiveMedicationsProps {
  patientUuid: string;
}

const ActiveMedications: React.FC<ActiveMedicationsProps> = ({
  patientUuid,
}) => {
  const { t } = useTranslation();
  const [tableRows, setTableRows] = useState([]);
  const [encounterFollowUp, setencounterFollowUp] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const tableHeaders = [
    {
      key: "tptfollowup3HP",
      header: t("tptfollowup3HP", "TPT follow up (3HP)"),
    },
    {
      key: "tptfollowupINH",
      header: t("tptfollowupINH", "TPT follow up (INH)"),
    },
    {
      key: "tptfollowup3HR",
      header: t("tptfollowup3HR", "TPT follow up (3HR)"),
    },
    {
      key: "cotrimoxazolestarted",
      header: t("cotrimoxazolestarted", "Cotrimoxazole started"),
    },
    {
      key: "fluconazolestarted",
      header: t("fluconazolestarted", "Fluconazole started"),
    },
    {
      key: "arvDispensecode",
      header: t("arvDispensecode", "ARV Dispense code"),
    },
  ];
  function gregToEth(gregdate) {
    if (!gregdate) return null;
    let dmy = new Date(gregdate.toString())
      .toLocaleDateString("en-US")
      .split("/");
    if (dmy.length == 3) {
      let year = parseInt(dmy[2], 10);
      let month = parseInt(dmy[0], 10);
      let day = parseInt(dmy[1], 10);
      let gregorianDate = new CalendarDate(year, month, day);
      let ethiopianDate = toCalendar(gregorianDate, new EthiopicCalendar());
      let finalDate =
        ethiopianDate.year +
        "-" +
        formatDigit(ethiopianDate.month) +
        "-" +
        formatDigit(ethiopianDate.day);
      return finalDate;
    } else return "--";
  }
  function formatDigit(number) {
    return parseInt(number, 10).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  }
  useEffect(() => {
    setIsLoading(true);
    fetchPatientLastEncounter(patientUuid, encounterType_follow_UP).then(
      (data) => {
        if (data) {
          setencounterFollowUp(data.obs);
          setIsLoading(false);
        }
      }
    );
  }, [patientUuid, encounterType_follow_UP]);

  useEffect(() => {
    let rows = [];
    if (encounterFollowUp) {
      const tptfollowup3HPValue = encounterFollowUp
        .filter((x) => x.concept.uuid == tptfollowup3HP)
        .map((x) => x.value.name.name);
      const tptfollowupINHValue = encounterFollowUp
        .filter((x) => x.concept.uuid == tptfollowupINH)
        .map((x) => x.value.name.name);
      const tptfollowup3HRValue = encounterFollowUp
        .filter((x) => x.concept.uuid == tptfollowup3HR)
        .map((x) => x.value.name.name);
      const cotrimoxazolestartedValue = encounterFollowUp
        .filter((x) => x.concept.uuid == cotrimoxazolestarted)
        .map((x) => x.value.name.name);
      const fluconazolestartedValue = encounterFollowUp
        .filter((x) => x.concept.uuid == fluconazolestarted)
        .map((x) => x.value.name.name);
      const arvDispensecodeValue = encounterFollowUp
        .filter((x) => x.concept.uuid == arvDispensecode)
        .map((x) => x.value.name.name);

      rows.push({
        id: 1,
        tptfollowup3HP: tptfollowup3HPValue
          ? tptfollowup3HPValue[tptfollowup3HPValue.length - 1]
          : "--",
        tptfollowupINH: tptfollowupINHValue
          ? tptfollowupINHValue[tptfollowupINHValue.length - 1]
          : "--",
        tptfollowup3HR: tptfollowup3HRValue
          ? tptfollowup3HRValue[tptfollowup3HRValue.length - 1]
          : "--",
        cotrimoxazolestarted: cotrimoxazolestartedValue
          ? cotrimoxazolestartedValue[cotrimoxazolestartedValue.length - 1]
          : "--",
        fluconazolestarted: fluconazolestartedValue
          ? fluconazolestartedValue[fluconazolestartedValue.length - 1]
          : "--",
        arvDispensecode: arvDispensecodeValue
          ? arvDispensecodeValue[arvDispensecodeValue.length - 1]
          : "--",
      });
      setTableRows(rows);
    }
  }, [encounterFollowUp]);

  const headerTitle = t("activeMedicationsTableTitle", "Active Medications");

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={5} />
      ) : tableRows.length > 0 ? (
        <>
          <div className={styles.widgetContainer}>
            <div className={styles.widgetHeaderContainer}>
              <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>
                {headerTitle}
              </h4>
            </div>
            <ETable tableHeaders={tableHeaders} tableRows={tableRows} />
          </div>
        </>
      ) : (
        <EmptyState displayText={""} headerTitle={headerTitle} />
      )}
    </>
  );
};

export default ActiveMedications;
