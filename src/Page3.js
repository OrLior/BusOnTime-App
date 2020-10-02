import React, { useState, useMemo, useEffect } from "react";
import Select from "./components/Select";
import { operators } from "./resources/operators";
import { clusters } from "./resources/clusters";
import SubmitButton from "./components/SubmitButton";
import ToggleButton from "./components/ToggleButton";
import ResetButton from "./components/ResetButton";
import Table from "./components/Table";

const API_ADDRESS = "http://127.0.0.1:4999/";

const Page3 = () => {
  const [date, setDate] = useState(null);
  const [operator, setOperator] = useState(null);
  const [cluster, setCluster] = useState(null);
  const [operatorList, setOperatorList] = useState(operators);
  const [clusterList, setClusterList] = useState(clusters);
  const [filterOption, setFilterOption] = useState(true);
  const [categoryOption, setCategoryOption] = useState(true);
  const [data, setData] = useState(null);
  const [dataError, setDataError] = useState(null);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: "Agency",
        accessor: "agency_id",
        Cell: ({ cell: { value } }) => {
          return (
            <>
              {
                operatorList.filter((obj) => {
                  return obj.value === value;
                })[0]?.name
              }
            </>
          );
        },
      },
      {
        Header: "Cluster",
        accessor: "cluster_id",
        Cell: ({ cell: { value } }) => {
          return (
            <>
              {
                clusterList.filter((obj) => {
                  return obj.value === value;
                })[0]?.name
              }
            </>
          );
        },
      },
      {
        Header: "Route Short Name",
        accessor: "route_short_name",
      },
      {
        Header: "Route Long Name",
        accessor: "route_long_name",
      },
      {
        Header: "Route MKT",
        accessor: "route_mkt",
      },
      {
        Header: "Performance",
        accessor: "performance",
        Cell: ({ cell: { value } }) => {
          return <>{(value * 100).toFixed(2)}%</>;
        },
      },
    ],
    []
  );

  const categoryChange = () => {
    setCategoryOption(!categoryOption);
  };

  const filterChange = () => {
    setFilterOption(!filterOption);
  };

  const inputDateHandler = (e) => {
    e.preventDefault();
    setDate(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    getData();
    console.log(data);
  };

  const getData = async () => {
    await fetch(
      `${API_ADDRESS}stats/byLine?date=${date ? date : "all"}&ignoreRareTrips=${
        filterOption ? "true" : "false"
      }&desc=${categoryOption ? "true" : "false"}&oper=${
        operator ? operator : "all"
      }&cluster=${cluster ? cluster : "all"}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setData(Object.values(result)[0]);
          console.log(data);
          setDataLoaded(true);
        },
        (error) => {
          setDataError(error);
        }
      );
  };

  const resetHandler = (e) => {
    e.preventDefault();
    setDate(null);
    setData(null);
    setCluster(null);
    setOperator(null);
    setCategoryOption(true);
    setFilterOption(true);
  };

  useEffect(() => {
    getData();
    console.log(data);
  }, [categoryOption]);

  return (
    <div>
      <form>
        <label className="rare-trips-checkbox-label" htmlFor="filter">
          Ignore rare trips?
        </label>
        <input
          className="rare-trips-checkbox"
          type="checkbox"
          defaultChecked
          id="filter"
          onChange={filterChange}
        />
        <ToggleButton
          selected={categoryOption}
          toggleSelected={categoryChange}
          onWording="Best Lines"
          offWording="Worst Lines"
        />
        <input
          onChange={inputDateHandler}
          type="date"
          min="2020-08-01"
          max="2020-08-31"
        />
        <Select
          setSelected={setOperator}
          selection={operatorList}
          id="operator-select"
          name="Operators"
        />
        <Select
          setSelected={setCluster}
          selection={clusterList}
          id="cluster-select"
          name="Clusters"
        />
        <SubmitButton submitHandler={submitHandler} />
        <ResetButton submitHandler={resetHandler} />
      </form>
      {data && <Table columns={columns} data={data} />}
      <h1>Date: {date ? date : "None"}</h1>
      <h1>Operator: {operator ? operator : "None"}</h1>
      <h1>Cluster: {cluster ? cluster : "None"}</h1>
      <h1>Category: {categoryOption ? "Best Lines" : "Worst Lines"}</h1>
      <h1>Filter: {filterOption ? "On" : "Off"}</h1>
    </div>
  );
};

export default Page3;
