import React, { useState } from "react";
import "./App.css";
import Spinner from "../Spinner";
import List from "../List";

const possibleOptions = [
  "Ben",
  "Banwo",
  "Liz",
  "Joe",
  "Tao",
  "Mell",
  "Lizzie",
  "Chris",
  "Patrick",
  "Sarah",
];

function App() {
  const [options, setOptions] = useState(
    possibleOptions.map((title) => ({ title, spinnable: true }))
  );
  const [lastSelected, setLastSelected] = useState("");
  const [isOptionsBeingEdited, setIsOptionsBeingEdited] = useState(false);
  const [optionsRawText, setOptionsRawText] = useState("");

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
      return setOptions(
        optionsRawText.split(`\n`).reduce((acc, title) => {
          const trimmed = title.trim();
          const numDupes = acc.filter(
            (option) => option.title.split("(")[0] === title
          ).length;
          if (trimmed) {
            if (numDupes > 0) {
              return [
                ...acc,
                {
                  title: `${trimmed}(${numDupes})`,
                  spinnable: true,
                },
              ];
            }
            return [
              ...acc,
              {
                title: trimmed,
                spinnable: true,
              },
            ];
          }
          return acc;
        }, [])
      );
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
        <h1>
          Options<button onClick={handleEdit}>edit</button>
        </h1>
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
