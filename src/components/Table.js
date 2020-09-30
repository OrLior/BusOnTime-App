import React, { useState, useMemo } from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";

export default function Table({ data }) {
  const columns = useMemo(
    () => [
      {
        Header: "Service ID",
        accessor: "service_id",
      },
      {
        Header: "Route ID",
        accessor: "route_id",
      },
      {
        Header: "Direction",
        accessor: "route_direction",
      },
      {
        Header: "Route Alternative",
        accessor: "route_alternative",
        Cell: ({ cell: { value } }) => {
          return <>{value === "0" || value === "#" ? "ראשית" : value}</>;
        },
      },
      {
        Header: "Bus ID",
        accessor: "bus_id",
      },
      {
        Header: "Planned Start Date",
        accessor: "planned_start_date",
      },
      {
        Header: "Planned Start Time",
        accessor: "planned_start_time",
      },
      {
        Header: "Departed",
        accessor: "departed",
        Cell: ({ cell: { value } }) => {
          return <>{value ? "Yes" : "No"}</>;
        },
      },
      {
        Header: "Departure Delay",
        accessor: "departure_delay",
      },
      {
        Header: "Notes",
        accessor: "notes",
      },
      {
        Header: "Route Long Name",
        accessor: "route_long_name",
      },
      {
        Header: "Start Stop ID",
        accessor: "start_stop_id",
      },
      {
        Header: "Start Stop City",
        accessor: "start_stop_city",
      },
      {
        Header: "Start Stop Name",
        accessor: "start_stop_name",
      },
      {
        Header: "Num Stops",
        accessor: "num_stops",
      },
      {
        Header: "Num Trips",
        accessor: "num_trips",
      },
      {
        Header: "Line Type Desc",
        accessor: "line_type_desc",
      },
      {
        Header: "Cluster Name",
        accessor: "cluster_name",
      },
      {
        Header: "Cluster Sub Desc",
        accessor: "cluster_sub_desc",
        Cell: ({ cell: { value } }) => {
          return <>{value ? `${value}` : "N/A"}</>;
        },
      },
      {
        Header: "Route MKT",
        accessor: "route_mkt",
      },
      {
        Header: "Route Type",
        accessor: "route_type",
      },
      {
        Header: "File Date",
        accessor: "file_date",
      },
    ],
    []
  );
  const [filterInput, setFilterInput] = useState("");
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    setFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter("service_id", value);
    setFilterInput(value);
  };

  return data ? (
    <>
      <div id="reactTable">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                      column.isSorted
                        ? column.isSortedDesc
                          ? "sort-desc"
                          : "sort-asc"
                        : ""
                    }
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <input
        className="filter"
        value={filterInput || ""}
        onChange={handleFilterChange}
        placeholder={"Search service id"}
      />
    </>
  ) : (
    <></>
  );
}
