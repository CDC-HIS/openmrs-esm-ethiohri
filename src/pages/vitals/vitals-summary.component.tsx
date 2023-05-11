import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ETable } from "../../components/data-table/E-table.component";
import { EmptyState } from "../../components/empty-state/empty-state.component";
import { DataTableSkeleton } from "@carbon/react";
import {
  encounterType_intake_B,
  temperature,
  sbp,
  dbp,
  pulse,
  respiratoryRate,
  spo2,
} from "../../constants";
import { fetchPatientLastEncounter } from "../../api/api";
import styles from "../hiv-baseline/hiv-baseline.scss";
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
  const [encounterFollowUp, setencounterFollowUp] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const tableHeaders = [
    {
      key: "dateandtime",
      header: t("dateandtime", "Date and time"),
    },
    {
      key: "temperature",
      header: t("temperature", "Temperature"),
    },
    {
      key: "bp",
      header: t("bp", "BP"),
    },
    {
      key: "pulse",
      header: t("pulse", "Pulse"),
    },
    {
      key: "respiratoryRate",
      header: t("respiratoryRate", "R. Rate"),
    },
    {
      key: "spo2",
      header: t("spo2", "SPO2"),
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
    fetchPatientLastEncounter(patientUuid, encounterType_intake_B).then(
      (data) => {
        if (data) {
          setencounterFollowUp(data.obs);
          setIsLoading(false);
        }
      }
    );
  }, [patientUuid, encounterType_intake_B]);

  useEffect(() => {
    let rows = [];
    if (encounterFollowUp) {
      const dateandtimeValue = encounterFollowUp.map((x) => x.obsDatetime);
      const temperatureValue = encounterFollowUp
        .filter((x) => x.concept.uuid == temperature)
        .map((x) => x.value);
      const sbpValue = encounterFollowUp
        .filter((x) => x.concept.uuid == sbp)
        .map((x) => x.value);
      const dbpValue = encounterFollowUp
        .filter((x) => x.concept.uuid == dbp)
        .map((x) => x.value);
      const pulseValue = encounterFollowUp
        .filter((x) => x.concept.uuid == pulse)
        .map((x) => x.value);
      const respiratoryRateValue = encounterFollowUp
        .filter((x) => x.concept.uuid == respiratoryRate)
        .map((x) => x.value);
      const spo2Value = encounterFollowUp
        .filter((x) => x.concept.uuid == spo2)
        .map((x) => x.value);

      rows.push({
        id: 1,
        dateandtime: dateandtimeValue
          ? gregToEth(dateandtimeValue[dateandtimeValue.length - 1])
          : "--",
        temperature: temperatureValue
          ? temperatureValue[temperatureValue.length - 1]
          : "--",
        bp:
          (sbpValue ? sbpValue[sbpValue.length - 1] : "--") +
          "/" +
          (dbpValue ? dbpValue[dbpValue.length - 1] : "--"),
        pulse: pulseValue ? pulseValue[pulseValue.length - 1] : "--",
        respiratoryRate: respiratoryRateValue
          ? respiratoryRateValue[respiratoryRateValue.length - 1]
          : "--",
        spo2: spo2Value ? spo2Value[spo2Value.length - 1] : "--",
      });
      setTableRows(rows);
    }
  }, [encounterFollowUp]);

  const headerTitle = t("vitals", "Vitals");

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
