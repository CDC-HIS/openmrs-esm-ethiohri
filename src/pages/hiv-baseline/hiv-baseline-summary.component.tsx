import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ETable } from "../../components/data-table/E-table.component";
import { EmptyState } from "../../components/empty-state/empty-state.component";
import { DataTableSkeleton } from "@carbon/react";
import {
  regimen,
  encounterType_intake_A,
  encounterType_intake_B,
  dateOfHIVConfirmation,
  dateOfServiceEnrollmentConcept,
  artStartdate,
} from "../../constants";
import { fetchPatientLastEncounter } from "../../api/api";
import styles from "./hiv-baseline.scss";
import {
  EthiopicCalendar,
  toCalendar,
  CalendarDate,
} from "@internationalized/date";

interface HivBaselineTabListProps {
  patientUuid: string;
}

const HivBaselineTabList: React.FC<HivBaselineTabListProps> = ({
  patientUuid,
}) => {
  const { t } = useTranslation();
  const [tableRows, setTableRows] = useState([]);
  const [encounterA, setEncounterA] = useState([]);
  const [encounterB, setEncounterB] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const tableHeaders = [
    {
      key: "enrollmentDate",
      header: t("enrollmentDate", "Enrollment Date"),
    },
    {
      key: "hivConfirmationDate",
      header: t("hivConfirmationDate", "HIV Confirmation Date"),
    },
    { key: "regimen", header: t("regimen", "Regimen") },
    { key: "artStartdate", header: t("artStartdate", "ART Start Date") },
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
        ethiopianDate.day +
        "-" +
        formatDigit(ethiopianDate.month) +
        "-" +
        formatDigit(ethiopianDate.year);
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
    fetchPatientLastEncounter(patientUuid, encounterType_intake_A).then(
      (data) => {
        if (data) {
          setEncounterA(data.obs);
        }
      }
    );
    fetchPatientLastEncounter(patientUuid, encounterType_intake_B).then(
      (data) => {
        if (data) {
          setEncounterB(data.obs);
          setIsLoading(false);
        }
      }
    );
  }, [patientUuid, encounterType_intake_A, encounterType_intake_B]);

  useEffect(() => {
    let rows = [];
    if (encounterA && encounterB) {
      const enrollmentDate = encounterA
        .filter((x) => x.concept.uuid == dateOfServiceEnrollmentConcept)
        .map((x) => x.value);
      const hivConfirmationDate = encounterA
        .filter((x) => x.concept.uuid == dateOfHIVConfirmation)
        .map((x) => x.value);
      const regimenvalue = encounterB
        .filter((x) => x.concept.uuid == regimen)
        .map((x) => x.value.name.name);
      const artStartdatevalue = encounterB
        .filter((x) => x.concept.uuid == artStartdate)
        .map((x) => x.value);
      rows.push({
        id: 1,
        enrollmentDate: enrollmentDate
          ? gregToEth(enrollmentDate[enrollmentDate.length - 1])
          : "--",
        hivConfirmationDate: hivConfirmationDate
          ? gregToEth(hivConfirmationDate[hivConfirmationDate.length - 1])
          : "--",
        regimen: regimenvalue ? regimenvalue : "--",
        artStartdate: artStartdatevalue
          ? gregToEth(artStartdatevalue[artStartdatevalue.length - 1])
          : "--",
      });
      setTableRows(rows);
    }
  }, [encounterA, encounterB]);

  const headerTitle = t("hivBaseline", "HIV Baseline");

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

export default HivBaselineTabList;
