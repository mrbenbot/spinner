import React, { useState } from "react";
import { motion } from "framer-motion";

import arrow from "../../download.svg";
import css from "./Spinner.module.css";
import { getRandomNumber } from "../../libs";

function isInSegment(numOptions, rotation) {
  return (_, i) => {
    const lowerBound = Math.round((360 / numOptions) * i);
    const upperBound = Math.round((360 / numOptions) * (i + 1));
    return rotation >= lowerBound && rotation < upperBound;
  };
}
function getRotation(degrees) {
  const realRotation = Math.floor(270 - (degrees % 360));
  return realRotation < 0 ? realRotation + 360 : realRotation;
}

function Spinner({ handleSelection, options }) {
  const [degrees, setDegrees] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [hasSpun, setHasSpun] = useState(false);

  function spin() {
    if (!options.length) return;
    const newDegrees = degrees + getRandomNumber({ min: 1080, max: 5400 });
    const { title } = options.find(
      isInSegment(options.length, getRotation(newDegrees))
    );
    setSelected(title);
    setDegrees(newDegrees);
    if (!hasSpun) setHasSpun(true);
  }

  function handleAnimationEnd() {
    if (!hasSpun) return;
    handleSelection(selected);
  }

  return (
    <div className={css.container} onClick={spin}>
      <img className={css.arrow} src={arrow} alt="arrow" />
      <motion.div
        className={css.spinnerContainer}
        animate={{ rotate: degrees }}
        transition={{
          type: "spring",
          damping: 100,
          stiffness: 100,
        }}
        onAnimationComplete={handleAnimationEnd}
      >
        {options.map(({ title }, i) => {
          return (
            <motion.div
              className={css.section}
              key={title}
              style={{
                "--rotation": `${Math.round((360 / options.length) * i)}deg`,
              }}
              animate={{ color: title === selected ? "#ffffff" : "#000000" }}
              transition={{ delay: 1, duration: 0.4 }}
              data-name={title}
            ></motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default Spinner;
