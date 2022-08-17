import React, { useRef, useState } from "react";
import { SYMBOL_LIST } from "../helper";
import "../styles/CurrencyConverter.css";

let headers = new Headers();
headers.append("apikey", "tjGaANKBODuKT25RInapnz6FyQkPE6RC");

let requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: headers,
};

export default function CurrencyConverter() {
  const [currentFromSymbol, setCurrentFromSymbol] = useState("USD");
  const [currentToSymbol, setCurrentToSymbol] = useState("INR");
  const [toInputVal, setToInputVal] = useState("0");
  const [fromInputVal, setFromInputVal] = useState("0");
  const fromSymRef = useRef();
  const toSymRef = useRef();

  const listItems = SYMBOL_LIST.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  const onFromChangeHanlder = (e) => {
    if (e.target.value === currentToSymbol) {
      fromSymRef.current.value = currentFromSymbol;
    } else {
      setCurrentFromSymbol(e.target.value);
      getConvertedValue(e.target.value, currentToSymbol, fromInputVal);
    }
  };

  const onToChangeHanlder = (e) => {
    if (e.target.value === currentFromSymbol) {
      toSymRef.current.value = currentToSymbol;
    } else {
      setCurrentToSymbol(e.target.value);
      getConvertedValue(currentFromSymbol, e.target.value, fromInputVal);
    }
  };

  const onFromInputChangeHandler = (e) => {
    if (e.target.value[0] !== "-" && e.target.value !== "") {
      const val = parseFloat(e.target.value);
      setFromInputVal(val);
      getConvertedValue(currentFromSymbol, currentToSymbol, val);
    }
  };

  const onToInputChangeHandler = (e) => {
    if (e.target.value[0] !== "-" && e.target.value !== "") {
      const val = parseFloat(e.target.value);
      setToInputVal(val);
    }
  };

  const getConvertedValue = (from, to, amount) => {
    fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setToInputVal(result.result.toFixed(2));
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <div className="wrapper">
        <div>
          <select
            ref={fromSymRef}
            defaultValue="USD"
            onChange={onFromChangeHanlder}
          >
            {listItems}
          </select>
          <input
            type="text"
            value={fromInputVal}
            onChange={onFromInputChangeHandler}
          />
        </div>
        <div>
          <select
            ref={toSymRef}
            defaultValue="INR"
            onChange={onToChangeHanlder}
          >
            {listItems}
          </select>
          <input
            type="text"
            value={toInputVal}
            onChange={onToInputChangeHandler}
          />
        </div>
      </div>
    </div>
  );
}
