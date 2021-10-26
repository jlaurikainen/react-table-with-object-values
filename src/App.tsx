import faker from "faker";
import React, { useMemo } from "react";
import { CellProps, Column, useSortBy, useTable } from "react-table";

interface Data {
  id: number;
  name: { first: string; last: string };
  address: string;
  email: string;
}

const data: Data[] = new Array(10).fill(true).map((_, i) => ({
  id: i,
  name: {
    first: faker.name.firstName(),
    last: faker.name.lastName(),
  },
  address: faker.address.city(),
  email: faker.internet.email(),
}));

const CustomCell = (props: CellProps<Data>) => {
  const {
    id,
    name: { first, last },
    address,
    email,
  }: Data = props.data[props.row.index];

  return <div>{`${last}, ${first}`}</div>;
};

const App = () => {
  const columns: Column<Data>[] = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      {
        Header: "Name",
        accessor: (data) => data.name.last,
        Cell: CustomCell,
      },
      { Header: "Address", accessor: "address" },
      { Header: "Email", accessor: "email" },
    ],
    []
  );

  const tableData = useMemo(() => data, []);

  const { getTableBodyProps, getTableProps, headerGroups, prepareRow, rows } =
    useTable({ columns, data: tableData }, useSortBy);

  return (
    <table {...getTableProps}>
      <thead>
        {headerGroups.map((headerGroup) => {
          return (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? "D" : "U") : ""}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps}>
        {rows.map((row) => {
          prepareRow(row);

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default App;
