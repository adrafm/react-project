import React, { useState } from 'react';

const TemperatureConverter = () => {
  const [temperature, setTemperature] = useState('');
  const [fromUnit, setFromUnit] = useState('Celsius');
  const [toUnit, setToUnit] = useState('Fahrenheit');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const unitMap = {
    Celsius: 'سلسیوس',
    Fahrenheit: 'فارنهایت',
    Kelvin: 'کلوین',
  };

  const units = ['Celsius', 'Fahrenheit', 'Kelvin'];

  const convertTemperature = () => {
    const temp = parseFloat(temperature);

    setError('');
    setResult(null);

    if (isNaN(temp)) {
      setError('لطفاً یک عدد معتبر وارد کنید');
      return;
    }

    let convertedTemp;
    try {
      if (fromUnit === 'Celsius' && toUnit === 'Fahrenheit') {
        convertedTemp = (temp * 9) / 5 + 32;
      } else if (fromUnit === 'Fahrenheit' && toUnit === 'Celsius') {
        convertedTemp = ((temp - 32) * 5) / 9;
      } else if (fromUnit === 'Celsius' && toUnit === 'Kelvin') {
        convertedTemp = temp + 273.15;
      } else if (fromUnit === 'Kelvin' && toUnit === 'Celsius') {
        convertedTemp = temp - 273.15;
      } else if (fromUnit === 'Fahrenheit' && toUnit === 'Kelvin') {
        convertedTemp = ((temp - 32) * 5) / 9 + 273.15;
      } else if (fromUnit === 'Kelvin' && toUnit === 'Fahrenheit') {
        convertedTemp = ((temp - 273.15) * 9) / 5 + 32;
      } else {
        convertedTemp = temp;
      }

      setResult(convertedTemp.toFixed(2));
    } catch {
      setError('خطا در تبدیل');
    }
  };

  const switchUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="container">
      <div className="converter-box">
        <h1 className="header">
          مبدل دما
        </h1>

        <div className="input-group">
          <label className="label">دما</label>
          <input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="دما را وارد کنید"
            className="input-field"
          />
        </div>

        <div className="unit-selectors">
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="unit-select"
          >
            {units
              .filter((unit) => unit !== toUnit)
              .map((unit) => (
                <option key={unit} value={unit}>
                  {unitMap[unit]}
                </option>
              ))}
          </select>

          <button onClick={switchUnits} className="switch-button">
            ↔️
          </button>

          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="unit-select"
          >
            {units
              .filter((unit) => unit !== fromUnit)
              .map((unit) => (
                <option key={unit} value={unit}>
                  {unitMap[unit]}
                </option>
              ))}
          </select>
        </div>

        <button onClick={convertTemperature} className="convert-button">
          تبدیل
        </button>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {result !== null && (
          <div className="result-message">
            نتیجه: {result} {unitMap[toUnit]}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemperatureConverter;
