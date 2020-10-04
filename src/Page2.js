import React, { useState, useMemo, useEffect } from "react";
import ToggleButton from "./components/ToggleButton";
import SubmitButton from "./components/SubmitButton";
import ResetButton from "./components/ResetButton";
import Table from "./components/Table";
import { operators } from "./resources/operators";
import { clusters } from "./resources/clusters";
import { dates } from "./resources/dates";

const API_ADDRESS = "http://127.0.0.1:4999/";

const Page2 = () => {
  const [date, setDate] = useState(null);
  const [categoryOption, setCategoryOption] = useState(true);
  const [data, setData] = useState(null);
  const [operatorsList, setOperatorsList] = useState(operators);
  const [clustersList, setClustersList] = useState(clusters);
  const [datesList, setDatesList] = useState(dates);
  const [dataError, setDataError] = useState(null);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const operatorColumns = useMemo(
    () => [
      {
        Header: "Operator",
        accessor: "agency_id",
        Cell: ({ cell: { value } }) => {
          return (
            <>
              {
                operatorsList.filter((obj) => {
                  return obj.value === value;
                })[0]?.name
              }
            </>
          );
        },
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
  const clusterColumns = useMemo(
    () => [
      {
        Header: "Cluster",
        accessor: "cluster_id",
        Cell: ({ cell: { value } }) => {
          return (
            <>
              {
                clustersList.filter((obj) => {
                  return obj.value === value;
                })[0]?.name
              }
            </>
          );
        },
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

  const inputDateHandler = (event) => {
    event.preventDefault();
    setDate(event.target.value);
  };

  const categoryChange = () => {
    setCategoryOption(!categoryOption);
  };

  const resetHandler = (e) => {
    setCategoryOption(true);
    setDate(null);
    setData(null);
    getData();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    getData();
    console.log(data);
  };

  const getData = async () => {
    await fetch(
      `${API_ADDRESS}stats/main/?by=${categoryOption ? "oper" : "clust"}&date=${
        date ? date : "all"
      }`
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

  useEffect(() => {
    getData();
    console.log(data);
  }, [categoryOption]);

  return (
    <div>
      <form>
        <ToggleButton
          selected={categoryOption}
          toggleSelected={categoryChange}
          onWording="By Operator"
          offWording="By Cluster"
        />
        <input
          onChange={inputDateHandler}
          type="date"
          min={datesList[0].start}
          max={datesList[0].end}
        />
        <SubmitButton submitHandler={submitHandler} />
        <ResetButton submitHandler={resetHandler} />
      </form>
      {data ? (
        <Table
          columns={categoryOption ? operatorColumns : clusterColumns}
          data={data}
        />
      ) : (
        <>
          <p>No Relevant Data To Show</p>
        </>
      )}
      {/* USED FOR DEBUGGING */}
      <h1>Date: {date ? date : "None"}</h1>
      <h1>Category: {categoryOption ? "By Operator" : "By Cluster"}</h1>
    </div>
  );
};

export default Page2;
