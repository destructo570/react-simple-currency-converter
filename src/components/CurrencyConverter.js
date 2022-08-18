import React, { useCallback, useRef, useState } from "react";
import { getConvertedValue } from "../api/ExchangeApi";
import { debounceFunction } from "../helper";

import "../styles/CurrencyConverter.css";
import CurrencyInput from "./CurrencyInput";

export default function CurrencyConverter() {
  const [fromSymbol, setfromSymbol] = useState("USD");
  const [toSymbol, setToSymbol] = useState("INR");
  const [toInputVal, setToInputVal] = useState("0");
  const [fromInputVal, setFromInputVal] = useState("0");
  const fromRef = useRef();
  const toRef = useRef();

  const fromSelectHandler = (e) => {
    if (e.target.value === toSymbol) {
      fromRef.current.value = fromSymbol;
    } else {
      setfromSymbol(e.target.value);
      fetchConvertedValue(e.target.value, toSymbol, fromInputVal);
    }
  };

  const fromInputHandler = (e) => {
    if (e.target.value[0] !== "-" && e.target.value !== "") {
      const val = parseFloat(e.target.value);
      setFromInputVal(val);
      fetchConvertedValue(fromSymbol, toSymbol, val);
    }
  };

  const toSelectHandler = (e) => {
    if (e.target.value === fromSymbol) {
      toRef.current.value = toSymbol;
    } else {
      setToSymbol(e.target.value);
      fetchConvertedValue(fromSymbol, e.target.value, fromInputVal);
    }
  };

  const fetchConvertedValue = useCallback(
    debounceFunction((from, to, amount) => {
      getConvertedValue(from, to, amount).then((data) => {
        setToInputVal(data);
      });
    }, 400),
    []
  );

  return (
    <div>
      <h1>Currency Converter</h1>
      <div className="wrapper">
        <CurrencyInput
          defaultSymbol="USD"
          onInputChange={fromInputHandler}
          onSelectChange={fromSelectHandler}
          ref={fromRef}
          inputValue={fromInputVal}
          disabled={false}
        />
        <CurrencyInput
          defaultSymbol="INR"
          onSelectChange={toSelectHandler}
          ref={toRef}
          inputValue={toInputVal}
          disabled={true}
        />
      </div>
    </div>
  );
}
