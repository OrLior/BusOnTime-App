import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="App">
      <header>
        <h1>BusOnTime</h1>
      </header>
      <Form
        setData={setData}
        setDataLoaded={setIsLoaded}
        setDataError={setError}
      />
      {data && <Table data={data} />}
    </div>
  );
}

export default App;
