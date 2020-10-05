import React, { useState, useEffect, useMemo } from "react";
import Select from "./components/Select";
import { operators } from "./resources/operators";
// import { clusters } from "./resources/clusters";
// import ToggleButton from "./components/ToggleButton";
import SubmitButton from "./components/SubmitButton";
import ResetButton from "./components/ResetButton";
import Table from "./components/Table";
import { dates } from "./resources/dates";

const API_ADDRESS = "http://127.0.0.1:4999/";

// THIS PAGE IS MEANT TO HAVE ADDITIONAL FEATURES FOR CHOOSING SPECIFIC CLUSTERS, LINES, AND DATES. SINCE THE API DOES NOT SUPPORT THE FULL QUERY YET
// A LOT OF CODE IN THIS FILE IS THEREFORE COMMENTED OUT, AS THERE IS SUPPORT FROM THE FRONTEND TO ALLOW THESE FEATURES IN THE FUTURE.
// ANY COMMENTED OUT LINES ARE TO BE USED AS SOON AS THERE IS SUPPORT FOR FETCHING DATA WITH ADDITIONAL PARAMTERES'
// UNTIL THEN THEY CAN BE IGNORED ENTIRELY
const Page4 = () => {
  const [date, setDate] = useState(null);
  const [operator, setOperator] = useState(null);
  const [cluster, setCluster] = useState(null);
  // const [line, setLine] = useState(null);
  const [operatorList, setOperatorList] = useState(operators);
  // const [clusterList, setClusterList] = useState(clusters);
  // const [categoryOption, setCategoryOption] = useState(true);
  // const [linesList, setLinesList] = useState(null);
  // const [linesListError, setLinesListError] = useState(null);
  // const [linesListLoaded, setLinesListLoaded] = useState(false);
  const [data, setData] = useState(null);
  const [dataError, setDataError] = useState(null);
  const [datesList, setDatesList] = useState(dates);
  const [isDataLoaded, setDataLoaded] = useState(false);

  // const inputDateHandler = (event) => {
  //   event.preventDefault();
  //   setDate(event.target.value);
  // };

  // const categoryChange = () => {
  //   categoryOption ? setOperator(null) : setCluster(null);
  //   setCategoryOption(!categoryOption);
  // };

  // const submitHandler = (event) => {
  //   event.preventDefault();
  //   getData();
  // };

  const getData = async () => {
    await fetch(
      `${API_ADDRESS}stats/delays/?oper=${operator ? operator : "all"}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setData(Object.values(result)[0]);
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
        Header: "Departure Delay By Minutes",
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
    // console.log(data);
  }, [operator]);

  const resetHandler = (event) => {
    // event.preventDefault();
    // setDate(null);
    // setCluster(null);
    // setCategoryOption(true);
    // setLine(null);
    setData(null);
    setOperator(null);
    getData();
  };

  // const displayLineList = () => {
  //   return (
  //     ((operator && categoryOption) || (cluster && !categoryOption)) &&
  //     linesListLoaded
  //   );
  // };

  // const fetchLines = async () => {
  //   await fetch(`${API_ADDRESS}lines?operator=${operator}&date=2020-08-03`)
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         setLinesList(
  //           result.Lines.map((line) => {
  //             return {
  //               value: line,
  //               name: line,
  //             };
  //           })
  //         );
  //         setLinesListLoaded(true);
  //       },
  //       (error) => {
  //         setLinesListError(error);
  //       }
  //     );
  // };

  // useEffect(() => {
  //   // if (operator || cluster) {
  //   if (operator) {
  //     fetchLines();
  //   }
  //   // }, [operator, cluster]);
  // }, [operator]);

  return (
    <div>
      <form>
        <Select
          setSelected={setOperator}
          selection={operatorList}
          id="operator-select"
          name="Operators"
        />
        {/* NOT ALL OPTIONS AVAILABLE IN CURRENT VERSION, CODE IS HERE TO SUPPORT FUTURE CHANGES */}
        {/* <input
          onChange={inputDateHandler}
          type="date"
          min={datesList[0].start}
          max={datesList[0].end}
        />
        <ToggleButton
          selected={categoryOption}
          toggleSelected={categoryChange}
          onWording="By Operator"
          offWording="By Cluster"
        /> */}
        {/* {categoryOption ? ( */}
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
      {/* USED FOR DEBUGGING */}
      <h1>Operator: {operator ? operator : "None"}</h1>
      {/* <h1>Date: {date ? date : "None"}</h1> */}
      {/* <h1>Category: {categoryOption ? "By Operator" : "By Cluster"}</h1> */}
      {/* <h1>Cluster: {cluster ? cluster : "None"}</h1> */}
      {/* <h1>Line: {line ? line : "None"}</h1> */}
    </div>
  );
};

export default Page4;
