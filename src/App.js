import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";
import Logo from "./logo.png";

function App() {
  //Create states for our table data, and errors/loading of it
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="App">
      <header>
        <img src={Logo} alt="logo" />
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
