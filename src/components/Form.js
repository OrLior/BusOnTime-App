import React, { useState, useMemo } from "react";
import Select from "./Select";

const API_ADDRESS = "http://127.0.0.1:4999/";

const Form = ({ setData, setDataLoaded, setDataError }) => {
  const operatorList = useMemo(
    () => [
      { value: 2, name: "רכבת ישראל" },
      { value: 3, name: "אגד" },
      { value: 4, name: "אגד תעבורה" },
      { value: 5, name: "דן" },
      { value: 6, name: "ש.א.מ" },
      { value: 7, name: "נסיעות ותיירות" },
      { value: 8, name: "גי.בי.טורס" },
      { value: 10, name: "מועצה אזורית אילות" },
      { value: 14, name: "נתיב אקספרס" },
      { value: 15, name: "מטרופולין" },
      { value: 16, name: "סופרבוס" },
      { value: 18, name: "קווים" },
      { value: 20, name: "כרמלית" },
      { value: 21, name: "סיטי פס" },
      { value: 23, name: "גלים" },
      { value: 24, name: "מועצה אזורית גולן" },
      { value: 25, name: "אפיקים" },
      { value: 30, name: "דן צפון" },
      { value: 31, name: "דן בדרום" },
      { value: 32, name: "דן באר שבע" },
      { value: 42, name: "ירושלים-רמאללה איחוד" },
      { value: 44, name: "ירושלים-אבו-תור-ענאתא איחוד" },
      { value: 45, name: "ירושלים-אלווסט איחוד" },
      { value: 47, name: "ירושלים-הר הזיתים" },
      { value: 49, name: "ירושלים - עיסאוויה מחנה שעפאט איחוד" },
      { value: 50, name: "ירושלים-דרום איחוד" },
      { value: 51, name: "ירושלים-צור באהר איחוד" },
      { value: 91, name: "מוניות מטרו קו" },
      { value: 92, name: "מוניות שי-לי" },
      { value: 93, name: "מוניות מאיה יצחק שדה" },
      { value: 94, name: "מוניות שירן נסיעות " },
      { value: 95, name: "מוניות יהלום תחבורה" },
      { value: 96, name: "מוניות גלים" },
      { value: 97, name: "אודליה מוניות בעמ" },
      { value: 98, name: "מוניות רב קווית 4-5" },
      { value: 130, name: "מוניות הדר לוד" },
    ],
    []
  );

  const [date, setDate] = useState(null);
  const [operator, setOperator] = useState(null);
  const [line, setLine] = useState(null);
  const [routeMKT, setRouteMKT] = useState(null);
  const [direction, setDirection] = useState(null);

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

  const getData = () => {
    if (operator && date && line && routeMKT && direction) {
      fetch(
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
      fetch(
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
      fetch(`${API_ADDRESS}mkts?operator=${operator}&date=${date}&line=${line}`)
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
      fetch(`${API_ADDRESS}lines?operator=${operator}&date=${date}`)
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
        min="2020-08-01"
        max="2020-08-31"
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
      <button onClick={submitHandler} className="submit-button" type="submit">
        <i className="fas fa-chevron-right"></i>
      </button>
    </form>
  );
};

export default Form;
