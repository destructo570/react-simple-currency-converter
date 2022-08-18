import { debounceFunction } from "../helper";

let headers = new Headers();
headers.append("apikey", "tjGaANKBODuKT25RInapnz6FyQkPE6RC");

let requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: headers,
};

export const getConvertedValue = async (from, to, amount) => {
  try {
    const response = await fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
      requestOptions
    );
    const data = await response.json();
    return data.result.toFixed(2);
  } catch (error) {
    console.log("error", error);
  }
};
