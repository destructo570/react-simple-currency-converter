import React from "react";
import { SYMBOL_LIST } from "../helper";

const CurrencyInput = React.forwardRef((props, ref) => {
  const symbolList = SYMBOL_LIST.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  return (
    <div>
      <select
        ref={ref}
        defaultValue={props.defaultSymbol}
        onChange={props.onSelectChange}
      >
        {symbolList}
      </select>
      <input
        type="text"
        value={props.inputValue}
        onChange={props.onInputChange}
        disabled={props.disabled}
      />
    </div>
  );
});

export default CurrencyInput;
