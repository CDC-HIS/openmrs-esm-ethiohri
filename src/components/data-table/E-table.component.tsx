import React, { useEffect, useState } from "react";
import {
  DataTable,
  Table,
  TableCell,
  TableContainer,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@carbon/react";
import styles from "./E-table.scss";
import { LazyCell } from "../lazy-cell/lazy-cell.component";

interface TableProps {
  tableHeaders: any;
  tableRows: any;
}

export const ETable: React.FC<TableProps> = ({ tableHeaders, tableRows }) => {
  return (
    <TableContainer>
      <DataTable rows={tableRows} headers={tableHeaders} size="short">
        {({ rows, headers, getHeaderProps, getTableProps }) => (
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader
                    className={`${styles.productiveHeading01} ${styles.text02}`}
                    {...getHeaderProps({
                      header,
                      isSortable: header.isSortable,
                    })}
                  >
                    {header.header?.content ?? header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>
                      <LazyCell lazyValue={cell.value?.content ?? cell.value} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DataTable>
    </TableContainer>
  );
};
