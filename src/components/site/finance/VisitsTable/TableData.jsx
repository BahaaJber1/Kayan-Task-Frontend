import { visitsTableColumns } from "@app/components/site/finance/VisitsTable/Columns.jsx";
import { Button } from "@app/components/ui/button.jsx";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@app/components/ui/input-group.jsx";
import { visitsData } from "@app/dev-data/finance/visits.data.js";
import { cn } from "@app/lib/utils.js";
import Container from "@app/ui/Container.jsx";
import TableDataPagination from "@components/site/finance/VisitsTable/TableDataPagination.jsx";
import TableDataViewOptions from "@components/site/finance/VisitsTable/TableDataViewOptions.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table.jsx";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import StatusBadge from "../../StatusBadge.jsx";

const TableData = ({ visits = [] }) => {
  const [sortingAmount, setSortingAmount] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data: visits,
    columns: visitsTableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSortingAmount,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sortingAmount,
      columnFilters: columnFilters,
    },
  });

  const { getHeaderGroups, getRowModel, getColumn, resetColumnFilters } = table;

  return (
    <Container className={cn("rounded-lg border p-5")}>
      <Container className={cn("items-center md:flex-row")}>
        <InputGroup>
          <InputGroupInput
            placeholder="Search Doctor Name"
            value={getColumn("doctor_name")?.getFilterValue() ?? ""}
            onChange={(e) =>
              getColumn("doctor_name")?.setFilterValue(e.target.value)
            }
          />
          <InputGroupAddon>
            <BiSearch />
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput
            placeholder="Search Patient Name"
            value={getColumn("patient_name")?.getFilterValue() ?? ""}
            onChange={(e) =>
              getColumn("patient_name")?.setFilterValue(e.target.value)
            }
          />
          <InputGroupAddon>
            <BiSearch />
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput
            placeholder="Search Visit ID"
            value={getColumn("id")?.getFilterValue() ?? ""}
            onChange={(e) => getColumn("id")?.setFilterValue(e.target.value)}
          />
          <InputGroupAddon>
            <BiSearch />
          </InputGroupAddon>
        </InputGroup>
        <Button variant="outline" onClick={() => resetColumnFilters()}>
          Clear Filters
        </Button>
      </Container>

      <Container className={cn("flex-row items-center justify-end")}>
        {getRowModel().rows.length} results
        <TableDataViewOptions table={table} />
      </Container>

      <Container>
        <Table>
          <TableHeader>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {getRowModel().rows?.length ? (
              getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const value = cell.getValue();
                    console.log({ cell, value });
                    let displayValue;

                    if (cell.column.id === "treatments") {
                      displayValue = value?.length || 0;
                    } else if (value instanceof Date) {
                      displayValue = value.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      });
                    } else if (cell.column.id === "status") {
                      displayValue = (
                        <StatusBadge status={value} showText={false} />
                      );
                    } else {
                      displayValue = flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      );
                    }

                    return <TableCell key={cell.id}>{displayValue}</TableCell>;
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={visitsTableColumns?.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Container>
      <Container>
        <TableDataPagination table={table} />
      </Container>
    </Container>
  );
};

export default TableData;
