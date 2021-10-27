import faker from "faker";
import React, { Fragment, useMemo } from "react";
import { CellProps, Column, useSortBy, useTable } from "react-table";

interface DataFragment {
  value: string;
  sortValue?: number | string;
}

interface Data {
  id: DataFragment;
  name: DataFragment;
  address: DataFragment;
  email: DataFragment;
}

const data: Data[] = new Array(10).fill(true).map((_, i) => ({
  id: {
    value: i.toString(),
    sortValue: i,
  },
  name: {
    value: faker.name.findName(),
    sortValue: Math.floor(Math.random() * 10),
  },
  address: {
    value: faker.address.city(),
    sortValue: Math.floor(Math.random() * 10),
  },
  email: {
    value: faker.internet.email(),
    sortValue: Math.floor(Math.random() * 10),
  },
}));

const HeaderCell = (props: CellProps<Data>) => {
  return <Fragment>{props.column.id}</Fragment>;
};

const CustomCell = (props: CellProps<Data>) => {
  const key = props.cell.column.id as keyof Data;
  const data = props.cell.row.original[key];

  return <div>{data.value}</div>;
};

const App = () => {
  const columns: Column<Data>[] = useMemo(
    () => [
      {
        id: "id",
        accessor: (data) => data.id.value,
        Header: HeaderCell,
        Cell: CustomCell,
      },
      {
        id: "name",
        accessor: (data) => data.name.value,
        Header: HeaderCell,
        Cell: CustomCell,
      },
      {
        id: "address",
        accessor: (data) => data.address.value,
        Header: HeaderCell,
        Cell: CustomCell,
      },
      {
        id: "email",
        accessor: (data) => data.email.value,
        Header: HeaderCell,
        Cell: CustomCell,
      },
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
                    {column.isSorted ? (column.isSortedDesc ? " D" : " U") : ""}
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
