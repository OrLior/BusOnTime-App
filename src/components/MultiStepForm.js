import React, { useState } from "react";
import Select from "./Select";
import { operators } from "../resources/operators";
import { dates } from "../resources/dates";
import SubmitButton from "./SubmitButton";

const API_ADDRESS = "http://127.0.0.1:4999/";

const MultiStepForm = ({ setData, setDataLoaded, setDataError }) => {
  //Set up function states for all variables we need in the form
  const [date, setDate] = useState(null);
  const [operator, setOperator] = useState(null);
  const [line, setLine] = useState(null);
  const [routeMKT, setRouteMKT] = useState(null);
  const [direction, setDirection] = useState(null);
  const [operatorList, setOperatorList] = useState(operators);
  const [datesList, setDatesList] = useState(dates);
  const [linesList, setLinesList] = useState(null);
  const [linesListError, setLinesListError] = useState(null);
  const [linesListLoaded, setLinesListLoaded] = useState(false);
  const [routeMKTList, setRouteMKTList] = useState(null);
  const [routeMKTListError, setRouteListMKTError] = useState(null);
  const [routeMKTListLoaded, setRouteMKTListLoaded] = useState(false);
  const [directionsList, setDirectionsList] = useState(null);
  const [directionsListError, setDirectionsListError] = useState(null);
  const [directionsListLoaded, setDirectionsListLoaded] = useState(false);

  const inputDateHandler = (e) => {
    setDate(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    getData();
  };

  const getData = async () => {
    if (operator && date && line && routeMKT && direction) {
      await fetch(
        `${API_ADDRESS}trips?operator=${operator}&date=${date}&line=${line}&mkt=${routeMKT}&direction=${direction}`
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
    } else if (operator && date && line && routeMKT) {
      await fetch(
        `${API_ADDRESS}directions?operator=${operator}&date=${date}&line=${line}&mkt=${routeMKT}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setDirectionsList(
              result.Directions.map((direction) => {
                return {
                  value: direction,
                  name: direction,
                };
              })
            );
            setDirectionsListLoaded(true);
          },
          (error) => {
            setDirectionsListError(error);
          }
        );
    } else if (operator && date && line) {
      await fetch(
        `${API_ADDRESS}mkts?operator=${operator}&date=${date}&line=${line}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setRouteMKTList(
              result.MKTs.map((MKT) => {
                return {
                  value: MKT,
                  name: MKT,
                };
              })
            );
            setRouteMKTListLoaded(true);
          },
          (error) => {
            setRouteListMKTError(error);
          }
        );
    } else if (operator && date) {
      await fetch(`${API_ADDRESS}lines?operator=${operator}&date=${date}`)
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
    }
  };

  return (
    <form>
      <input
        onChange={inputDateHandler}
        type="date"
        min={datesList[0].start}
        max={datesList[0].end}
      />
      <Select
        setSelected={setOperator}
        selection={operatorList}
        id="operator-select"
        name="Operator"
      />
      <Select
        setSelected={setLine}
        selection={linesList}
        id="line-select"
        name="Line"
      />
      <Select
        setSelected={setRouteMKT}
        selection={routeMKTList}
        id="routeMKT-select"
        name="Route MKT"
      />
      <Select
        setSelected={setDirection}
        selection={directionsList}
        id="directions-select"
        name="Directions"
        additionalOption={{ key: -1, value: "all", name: "All" }}
      />
      <SubmitButton submitHandler={submitHandler} />
    </form>
  );
};

export default MultiStepForm;
