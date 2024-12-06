import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [rates, setRates] = useState({}); 
  const [fromCurrency, setFromCurrency] = useState("USD"); 
  const [toCurrency, setToCurrency] = useState("EUR"); 
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null); 

  useEffect(() => {
    fetch("https://api.exchangerate.host/latest")
      .then((response) => response.json())
      .then((data) => {
        setRates(data.rates); 
      })
      .catch((error) => console.error("API xatolik:", error));
  }, []);


  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const result = (amount * rates[toCurrency]) / rates[fromCurrency];
      setConvertedAmount(result); 
    }
  }, [fromCurrency, toCurrency, amount, rates]); 

  return (
    <div className="app">
      <h1>Valyuta Konvertori</h1>
      
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Miqdor kiriting"
      />
      
      <select onChange={(e) => setFromCurrency(e.target.value)} value={fromCurrency}>
        {Object.keys(rates).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      <span>ga</span>

      <select onChange={(e) => setToCurrency(e.target.value)} value={toCurrency}>
        {Object.keys(rates).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      
      <div>
        {convertedAmount !== null ? (
          <p>
            {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
          </p>
        ) : (
          <p>Valyuta kurslari yuklanmoqda...</p>
        )}
      </div>
    </div>
  );
};

export default App;
