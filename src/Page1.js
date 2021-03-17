import React, { useState, useMemo } from "react";
import MultiStepForm from "./components/MultiStepForm";
import Table from "./components/Table";

const Page1 = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  //Create a react Memo for the columns of the table
  const columns = useMemo(
    () => [
      {
        Header: "Trip ID",
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
        Header: "Departed?",
        accessor: "departed",
        Cell: ({ cell: { value } }) => {
          return <div className="importantCell">{value ? "Yes" : "No"}</div>;
        },
      },
      {
        Header: "Departure Delay",
        accessor: "departure_delay",
        Cell: ({ cell: { value } }) => {
          return <div className="importantCell">{value >= 0 ? value + " mins" : "N/A"}</div>;
        },
      },
      {
        Header: "Notes",
        accessor: "notes",
      },
      {
        Header: "Detailed Route Description",
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
        Header: "Daily Trips",
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

  return (
    <div className="Page1">
      <MultiStepForm
        setData={setData}
        setDataLoaded={setIsLoaded}
        setDataError={setError}
      />
      {data && <Table columns={columns} data={data} />}
    </div>
  );
};

export default Page1;
