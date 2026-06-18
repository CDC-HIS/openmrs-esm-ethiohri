import React, { useCallback, useEffect, useState } from "react";
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Pagination,
  DataTableSkeleton,
  InlineLoading,
  Tile,
  Layer,
} from "@carbon/react";
import { ConfigurableLink, useLayoutType } from "@openmrs/esm-framework";
import {
  ErrorState,
  EmptyDataIllustration,
} from "@openmrs/esm-patient-common-lib";
import { useTranslation } from "react-i18next";
import { EncounterActionMenu } from "./table-actions";
import { useEncounter } from "../../utils/useEncouter";
import { transferOutColumns } from "../../utils/constants";
import styles from "./table.scss";
import { formatDateVal } from "../../utils/getData";
const TransferOutDashboard: React.FC = () => {
  const headerTitle = "Scheduled Transfer Out";
  const { t } = useTranslation();
  const layout = useLayoutType();
  const isTablet = layout === "tablet";
  const isDesktop = layout === "small-desktop" || layout === "large-desktop";
  const [paginatedRows, setPaginatedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { encounters, total, isLoading, isError, mutate } = useEncounter(
    pageSize,
    currentPage,
  );

  const constructTableRows = useCallback((encounters: any[] = []) => {
    const rows = encounters.map((encounter) => {
      const tableRow: { [key: string]: any } = {
        id: encounter.uuid,
        actions: null,
      };

      transferOutColumns.forEach((column) => {
        if (column.key === "toDate") {
          tableRow[column.key] = formatDateVal(encounter?.toDate);
        } else if (column.key === "remainingDay") {
          const toDate = new Date(encounter?.toDate);
          const now = new Date();
          const diffInDays = Math.floor(
            (toDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
          );
          tableRow[column.key] = diffInDays;
        } else {
          tableRow[column.key] = encounter[column.key];
        }
      });

      return tableRow;
    });

    setPaginatedRows(rows);
  }, []);

  useEffect(() => {
    if (encounters?.length) {
      constructTableRows(encounters);
    } else {
      setPaginatedRows([]);
    }
  }, [encounters, constructTableRows, pageSize, currentPage, mutate]);

  if (isLoading)
    return <DataTableSkeleton role="progressbar" compact={isDesktop} zebra />;
  if (isError) return <ErrorState error={isError} headerTitle={headerTitle} />;

  return (
    <div className={styles.transferOutContainer}>
      <div className={styles.transferOutDetailHeaderContainer}>
        <div className={styles.desktopHeading}>
          <h4>{t("transferOut", headerTitle)}</h4>
        </div>
        <div className={styles.backgroundDataFetchingIndicator}>
          <span></span>
        </div>
      </div>
      {paginatedRows.length > 0 ? (
        <DataTable
          rows={paginatedRows}
          headers={transferOutColumns}
          useZebraStyles
          size={isTablet ? "lg" : "sm"}
          render={({
            rows,
            headers,
            getHeaderProps,
            getRowProps,
            getTableProps,
            getTableContainerProps,
          }) => (
            <TableContainer
              // title={headerTitle}
              description={isLoading && <InlineLoading />}
              {...getTableContainerProps()}
            >
              <Table {...getTableProps()} aria-label={headerTitle}>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader
                        key={header.key}
                        {...getHeaderProps({ header, isSortable: true })}
                      >
                        {header.header}
                      </TableHeader>
                    ))}
                    <TableHeader />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    const encounterItem = encounters?.find(
                      (enc) => enc.uuid === row.id,
                    );
                    const isPastDate =
                      new Date(encounterItem?.toDate) >= new Date();
                    const patientChartUrl =
                      "${openmrsSpaBase}/patient/${patientUuid}/chart/Patient%20Summary";
                    return (
                      <TableRow key={row.id} {...getRowProps({ row })}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>
                            {cell.info.header === "patientName" ? (
                              <ConfigurableLink
                                to={patientChartUrl}
                                templateParams={{ patientUuid: row.id }}
                              >
                                {cell.value}
                              </ConfigurableLink>
                            ) : (
                              <span
                                style={
                                  cell.info.header === "remainingDay" &&
                                  !isPastDate
                                    ? { color: "red", fontWeight: "bold" }
                                    : undefined
                                }
                              >
                                {cell.value}
                              </span>
                            )}
                          </TableCell>
                        ))}
                        <TableCell>
                          {encounterItem && (
                            <EncounterActionMenu
                              patientUuid={encounterItem?.uuid}
                              encounter={encounterItem}
                              mutateEncounters={mutate}
                              isPastDate={isPastDate}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        />
      ) : (
        <Layer>
          <Tile className={styles.tile}>
            <EmptyDataIllustration />
            <p className={styles.content}>
              {t("noTo", `There are no ${headerTitle} patients to display`)}
            </p>
          </Tile>
        </Layer>
      )}

      {paginatedRows.length > 0 && (
        <Pagination
          page={currentPage}
          pageSize={pageSize}
          pageSizes={[10, 20, 30, 40, 50]}
          totalItems={total}
          onChange={({ page, pageSize }) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          }}
        />
      )}
    </div>
  );
};

export default TransferOutDashboard;
