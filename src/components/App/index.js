import React, { useState } from "react";
import "./App.css";
import Spinner from "../Spinner";
import List from "../List";

import { arrayFromRawText } from "../../libs";
import { useEffect } from "react";

const defaultOptions = [
  "Ben",
  "Liz.K",
  "Joe",
  "Tao",
  "Mell",
  "Liz.E",
  "Chris",
  "James",
  "Tim",
  "Kyle",
]
  .sort()
  .map((title) => ({
    title,
    spinnable: true,
  }));

function App() {
  const [options, setOptions] = useState(
    () => JSON.parse(localStorage.getItem("options")) || defaultOptions
  );
  const [lastSelected, setLastSelected] = useState("");
  const [isOptionsBeingEdited, setIsOptionsBeingEdited] = useState(false);
  const [optionsRawText, setOptionsRawText] = useState("");

  useEffect(() => {
    localStorage.setItem("options", JSON.stringify(options));
  }, [options]);

  function handleSelection(title) {
    setLastSelected(title);
  }

  function toggleSpinnable(i) {
    setOptions([
      ...options.slice(0, i),
      { ...options[i], spinnable: !options[i].spinnable },
      ...options.slice(i + 1),
    ]);
  }

  function handleEdit() {
    setIsOptionsBeingEdited(!isOptionsBeingEdited);
    if (isOptionsBeingEdited) {
      return setOptions(arrayFromRawText(optionsRawText));
    }
    return setOptionsRawText(`${options.map(({ title }) => title).join(`\n`)}`);
  }

  return (
    <div className="App">
      <Spinner
        handleSelection={handleSelection}
        options={options.filter(({ spinnable }) => spinnable)}
      />
      <div>
        <div>
          <h1>Options</h1>
          <button onClick={handleEdit}>
            {isOptionsBeingEdited ? "save" : "edit"}
          </button>
          <button
            onClick={() => {
              setIsOptionsBeingEdited(false);
              setOptions(defaultOptions);
            }}
          >
            reset to default
          </button>
        </div>
        {isOptionsBeingEdited ? (
          <textarea
            onChange={({ target }) => setOptionsRawText(target.value)}
            rows={options.length}
            value={optionsRawText}
          ></textarea>
        ) : (
          <List
            options={options}
            lastSelected={lastSelected}
            toggleSpinnable={toggleSpinnable}
          />
        )}
      </div>
    </div>
  );
}

export default App;
