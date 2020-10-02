import React, { useState, useEffect, useMemo } from "react";
import Select from "./components/Select";
import { operators } from "./resources/operators";
import { clusters } from "./resources/clusters";
import ToggleButton from "./components/ToggleButton";
import SubmitButton from "./components/SubmitButton";
import ResetButton from "./components/ResetButton";
import Table from "./components/Table";

const API_ADDRESS = "http://127.0.0.1:4999/";

const Page4 = () => {
  const [date, setDate] = useState(null);
  const [operator, setOperator] = useState(null);
  const [cluster, setCluster] = useState(null);
  const [line, setLine] = useState(null);
  const [operatorList, setOperatorList] = useState(operators);
  const [clusterList, setClusterList] = useState(clusters);
  const [categoryOption, setCategoryOption] = useState(true);
  const [linesList, setLinesList] = useState(null);
  const [linesListError, setLinesListError] = useState(null);
  const [linesListLoaded, setLinesListLoaded] = useState(false);
  const [data, setData] = useState(null);
  const [dataError, setDataError] = useState(null);
  const [isDataLoaded, setDataLoaded] = useState(false);

  function inputDateHandler(event) {
    event.preventDefault();
    setDate(event.target.value);
  }

  function categoryChange() {
    categoryOption ? setOperator(null) : setCluster(null);
    setCategoryOption(!categoryOption);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    getData();
    console.log(data);
  };

  // stats/delays?oper=<x>

  const getData = async () => {
    await fetch(
      `${API_ADDRESS}stats/delays?oper=${operator ? operator : "all"}`
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

  const columns = useMemo(
    () => [
      {
        Header: "Departure Delay",
        accessor: "departure_delay",
      },
      {
        Header: "Count",
        accessor: "count1",
      },
    ],
    []
  );
  useEffect(() => {
    getData();
    console.log(data);
  }, [operator]);

  const resetHandler = (e) => {
    e.preventDefault();
    setDate(null);
    setData(null);
    setCluster(null);
    setOperator(null);
    setCategoryOption(true);
    setLine(null);
  };

  const displayLineList = () => {
    return (
      ((operator && categoryOption) || (cluster && !categoryOption)) &&
      linesListLoaded
    );
  };

  const fetchLines = async () => {
    await fetch(`${API_ADDRESS}lines?operator=${operator}&date=2020-08-03`)
      .then((res) => res.json())
      .then(
        (result) => {
          setLinesList(
            result.Lines.map((line) => {
              return {
                value: line,
                name: line,
              };
            })
          );
          setLinesListLoaded(true);
        },
        (error) => {
          setLinesListError(error);
        }
      );
  };

  useEffect(() => {
    if (operator || cluster) {
      fetchLines();
    }
  }, [operator, cluster]);

  return (
    <div>
      <form>
        {/* <input
          onChange={inputDateHandler}
          type="date"
          min="2020-08-01"
          max="2020-08-31"
        />
        <ToggleButton
          selected={categoryOption}
          toggleSelected={categoryChange}
          onWording="By Operator"
          offWording="By Cluster"
        /> */}
        {/* {categoryOption ? ( */}
        <Select
          setSelected={setOperator}
          selection={operatorList}
          id="operator-select"
          name="Operators"
        />
        {/* ) : ( */}
        {/* <Select
            setSelected={setCluster}
            selection={clusterList}
            id="cluster-select"
            name="Clusters"
          />
        )} */}
        {/* {displayLineList() && (
          <Select
            setSelected={setLine}
            selection={linesList}
            id="line-select"
            name="Lines"
          />
        )} */}
        <SubmitButton submitHandler={submitHandler} />
        <ResetButton submitHandler={resetHandler} />
      </form>
      {data && <Table columns={columns} data={data} />}
      <h1>Date: {date ? date : "None"}</h1>
      <h1>Operator: {operator ? operator : "None"}</h1>
      <h1>Category: {categoryOption ? "By Operator" : "By Cluster"}</h1>
      <h1>Cluster: {cluster ? cluster : "None"}</h1>
      <h1>Line: {line ? line : "None"}</h1>
    </div>
  );
};

export default Page4;
