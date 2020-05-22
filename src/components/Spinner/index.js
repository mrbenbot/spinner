import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import cn from "classnames";

import arrow from "../../download.svg";
import css from "./Spinner.module.css";

const initialState = [
  "person 1",
  "person 2",
  "person 3",
  "person 4",
  "person 5",
  "person 6",
  "person 7",
  "person 8",
  "person 9",
  "person 10",
  "person 11",
  "person 12",
  "person 13",
].sort(() => Math.random() - 0.5);

const useRandomiser = ({ min, max }) => {
  const [value, setValue] = useState(0);
  const spin = () => {
    setValue(value + Math.random() * (max - min) + min);
  };
  return [value, spin];
};

function Spinner({ addToList }) {
  const [degrees, spin] = useRandomiser({ min: 1080, max: 5000 });
  const [rotation, setRotation] = useState(270);
  const [selection, setSelection] = useState(-1);
  const [bootcampers, setBootcampers] = useState(initialState);
  const [hasSpun, setHasSpun] = useState(false);

  useEffect(() => {
    const realRotation = Math.floor(270 - (degrees % 360));
    setRotation(realRotation < 0 ? realRotation + 360 : realRotation);
  }, [degrees]);

  useEffect(() => {
    if (hasSpun) {
      setSelection(
        bootcampers.findIndex((_, i) => {
          const lowerBound = Math.round((360 / bootcampers.length) * i);
          const upperBound = Math.round((360 / bootcampers.length) * (i + 1));
          return rotation >= lowerBound && rotation < upperBound;
        })
      );
    }
  }, [rotation]);

  useEffect(() => {
    if (!bootcampers.length) {
      setTimeout(() => {
        setHasSpun(false);
        setBootcampers(initialState);
      }, 1000);
    }
  }, [bootcampers, hasSpun]);

  function handleAnimationEnd() {
    if (hasSpun) {
      setSelection(-1);
      addToList(bootcampers[selection]);
      setBootcampers(
        [
          ...bootcampers.slice(0, selection),
          ...bootcampers.slice(selection + 1)
        ].sort(() => Math.random() - 0.5)
      );
    }
  }

  return (
    <div
      className={css.container}
      onClick={() => {
        setHasSpun(true);
        spin();
      }}
    >
      <img className={css.arrow} src={arrow} alt="arrow" />
      <motion.div
        className={css.spinnerContainer}
        animate={{ rotate: degrees }}
        transition={{
          type: "spring",
          damping: 100,
          stiffness: 100
        }}
        onAnimationComplete={handleAnimationEnd}
      >
        {bootcampers.map((name, i) => {
          return (
            <motion.div
              className={cn(css.section)}
              key={name}
              style={{
                "--rotation": `${Math.round((360 / bootcampers.length) * i)}deg`
              }}
              animate={{ color: i === selection ? "#ffffff" : "#000000" }}
              transition={{ delay: 1, duration: 0.4 }}
              data-name={name}
            ></motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default Spinner;
