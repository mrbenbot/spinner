import React from "react";
import css from "./List.module.css";
function List({ options, lastSelected, toggleSpinnable }) {
  return (
    <ul className={css.list}>
      {options.map(({ title, spinnable }, i) => (
        <li
          key={title}
          style={{
            color:
              title === lastSelected
                ? "red"
                : spinnable
                ? "black"
                : "slategrey",
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={spinnable}
              onChange={() => toggleSpinnable(i)}
            ></input>
            {title}
          </label>
        </li>
      ))}
    </ul>
  );
}

export default List;
