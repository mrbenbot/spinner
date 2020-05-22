import React, { useState } from "react";
import "./App.css";
import Spinner from "../Spinner";

function App() {
  const [pickedList, setPickedList] = useState([]);

  function addToList(name) {
    setPickedList([...pickedList, name]);
  }
  return (
    <div className="App">
      <Spinner addToList={addToList} />
      <ul>
        {pickedList.map(name => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
