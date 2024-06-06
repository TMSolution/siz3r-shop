import React, { useEffect, useState, createContext } from "react";

// Create Context Object
export const Siz3rContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const Siz3rContextProvider = (props) => {
  const [measurements, setMeasurements] = useState(null);
  const [gender, setGender] = useState(null);
  const [userSizes, setUserSizes] = useState(null);
  const charts = {
    shirt: {
      xs: { width: 36, "shoulder to crotch height": 69 },
      s: { width: 46, "shoulder to crotch height": 71 },
      m: { width: 51, "shoulder to crotch height": 74 },
      l: { width: 56, "shoulder to crotch height": 76 },
      xl: { width: 61, "shoulder to crotch height": 79 },
      xxl: { width: 66, "shoulder to crotch height": 81 },
      xxxl: { width: 71, "shoulder to crotch height": 84 },
      xxxxl: { width: 76, "shoulder to crotch height": 86 },
      xxxxxl: { width: 81, "shoulder to crotch height": 89 },
    },
    pants: {
      xs: { "waist circumference": 66, "thigh left circumference": 52 },
      s: { "waist circumference": 72, "thigh left circumference": 56 },
      m: { "waist circumference": 78, "thigh left circumference": 60 },
      l: { "waist circumference": 86, "thigh left circumference": 62 },
      xl: { "waist circumference": 92, "thigh left circumference": 68 },
      xxl: { "waist circumference": 106, "thigh left circumference": 72 },
      xxxl: { "waist circumference": 116, "thigh left circumference": 74 },
      xxxxl: { "waist circumference": 130, "thigh left circumference": 74 },
      xxxxxl: { "waist circumference": 140, "thigh left circumference": 83 },
    },
  };
  const calculateUserSizes = (measurements) => {
    measurements.width =
      measurements["shoulder breadth"] +
      (measurements["forearm right circumference"] / (Math.PI * 2)) * 4;
    let userSizes = {};

    Object.entries(charts).forEach(([chartName, chart]) => {
      let lowestError = { error: Infinity, size: null };
      Object.entries(chart)
        //   .reverse()
        .forEach(([key, size]) => {
          let error = 0;
          Object.entries(measurements).forEach(
            ([measurementKey, measurementValue]) => {
              if (size[measurementKey]) {
                let currentError = Math.abs(
                  measurementValue - size[measurementKey]
                );
                error += currentError;

                if (measurementValue > size[measurementKey]) {
                  console.debug(
                    chartName,
                    " - ",
                    key,
                    "too small",
                    `(${measurementKey})`
                  );
                  error += Infinity;
                }
              }
            }
          );
          if (error < lowestError.error) {
            lowestError = { error, size: key };
          }
        });
      userSizes[chartName] = lowestError.size;
    });

    return userSizes;
  };
  const loadData = () => {
    let data = window.localStorage.getItem("_siz3rPlugin_measurements");
    if (data) {
      let _data = JSON.parse(data);
      setMeasurements(_data);
      setUserSizes(calculateUserSizes(_data.measurements));
      setGender(_data.gender);
    }
  };
  function readData(event) {
    console.debug("NEW EVENT", event);
    let data = event.detail;
    setMeasurements(data);
    setUserSizes(calculateUserSizes(data.measurements));
    setGender(data.gender);
  }
  useEffect(() => {
    // let data = window.localStorage.getItem("_siz3rPlugin_measurements");
    // data && setMeasurements(JSON.parse(data));

    loadData();

    window.addEventListener("_siz3rPlugin_event", readData);
    return () => {
      window.removeEventListener("_siz3rPlugin_event", readData);
    };
  }, []);
  return (
    <Siz3rContext.Provider
      value={{ measurements, userSizes, gender: measurements?.gender }}>
      {props.children}
    </Siz3rContext.Provider>
  );
};
