import { BASE_URL, API_KEY } from "../core/constans/currency"

export const listAllCurrencies = async () => {
  try {
    const url = `${BASE_URL}/list?api_key=${API_KEY}`
    const response = await fetch(url);
    const request = await response.json();
    const currencies = request.status === "success" ? request.currencies : {}
    const currenciesInArr = Object.keys(currencies).map(key => ({currency: key, country: currencies[key]}));
    return currenciesInArr;
  } catch (error) {
    console.log(error);
    return
  }
  
}

export const convertCurrency = async (from:string, to: string, amount: string) => {
  try {
    const url = `${BASE_URL}/convert?api_key=${API_KEY}&from=${from}&to=${to}&amount=${amount}&format=json`;
    const response = await fetch(url);
    const request = await response.json();
    const rateForAmount = request.status === "success" ? Number(request.rates[to].rate_for_amount).toFixed(2) : '';
    return rateForAmount;
  } catch (error) {
    console.log(error);
    return
  }
}
