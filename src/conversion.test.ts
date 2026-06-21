import {
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  celsiusToKelvin,
  kelvinToCelsius,
  temperaturesFromCelsius,
  temperaturesFromFahrenheit,
  temperaturesFromKelvin,
  isValidNumber,
} from './conversion';

describe('fahrenheitToCelsius', () => {
  it('should convert freezing point correctly', () => {
    expect(fahrenheitToCelsius(32)).toBe(0);
  });

  it('should convert boiling point correctly', () => {
    expect(fahrenheitToCelsius(212)).toBe(100);
  });

  it('should convert negative values correctly', () => {
    expect(fahrenheitToCelsius(-40)).toBe(-40);
  });

  it('should round to 2 decimal places', () => {
    expect(fahrenheitToCelsius(100)).toBe(37.78);
    expect(fahrenheitToCelsius(98.6)).toBe(37);
  });

  it('should handle decimal values', () => {
    expect(fahrenheitToCelsius(50)).toBe(10);
    expect(fahrenheitToCelsius(77)).toBe(25);
  });

  it('should handle zero', () => {
    expect(fahrenheitToCelsius(0)).toBe(-17.78);
  });
});

describe('celsiusToFahrenheit', () => {
  it('should convert freezing point correctly', () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
  });

  it('should convert boiling point correctly', () => {
    expect(celsiusToFahrenheit(100)).toBe(212);
  });

  it('should convert negative values correctly', () => {
    expect(celsiusToFahrenheit(-40)).toBe(-40);
  });

  it('should round to 2 decimal places', () => {
    expect(celsiusToFahrenheit(37.78)).toBe(100);
    expect(celsiusToFahrenheit(37)).toBe(98.6);
  });

  it('should handle decimal values', () => {
    expect(celsiusToFahrenheit(10)).toBe(50);
    expect(celsiusToFahrenheit(25)).toBe(77);
  });

  it('should handle zero', () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
  });
});

describe('celsiusToKelvin', () => {
  it('should convert freezing point correctly', () => {
    expect(celsiusToKelvin(0)).toBe(273.15);
  });

  it('should convert boiling point correctly', () => {
    expect(celsiusToKelvin(100)).toBe(373.15);
  });

  it('should convert absolute zero correctly', () => {
    expect(celsiusToKelvin(-273.15)).toBe(0);
  });

  it('should handle decimal values', () => {
    expect(celsiusToKelvin(37.78)).toBe(310.93);
  });
});

describe('kelvinToCelsius', () => {
  it('should convert freezing point correctly', () => {
    expect(kelvinToCelsius(273.15)).toBe(0);
  });

  it('should convert boiling point correctly', () => {
    expect(kelvinToCelsius(373.15)).toBe(100);
  });

  it('should convert absolute zero correctly', () => {
    expect(kelvinToCelsius(0)).toBe(-273.15);
  });
});

describe('temperaturesFromCelsius', () => {
  it('should return all three temperatures', () => {
    expect(temperaturesFromCelsius(100)).toEqual({
      celsius: 100,
      fahrenheit: 212,
      kelvin: 373.15,
    });
  });
});

describe('temperaturesFromFahrenheit', () => {
  it('should return all three temperatures', () => {
    expect(temperaturesFromFahrenheit(98.6)).toEqual({
      celsius: 37,
      fahrenheit: 98.6,
      kelvin: 310.15,
    });
  });
});

describe('temperaturesFromKelvin', () => {
  it('should return all three temperatures', () => {
    expect(temperaturesFromKelvin(0)).toEqual({
      celsius: -273.15,
      fahrenheit: -459.67,
      kelvin: 0,
    });
  });
});

describe('isValidNumber', () => {
  it('should return true for valid numbers', () => {
    expect(isValidNumber('123')).toBe(true);
    expect(isValidNumber('123.45')).toBe(true);
    expect(isValidNumber('-123')).toBe(true);
    expect(isValidNumber('-123.45')).toBe(true);
    expect(isValidNumber('0')).toBe(true);
    expect(isValidNumber('0.0')).toBe(true);
  });

  it('should return false for invalid values', () => {
    expect(isValidNumber('abc')).toBe(false);
    expect(isValidNumber('')).toBe(false);
    expect(isValidNumber(' ')).toBe(false);
    expect(isValidNumber('123abc')).toBe(false);
    expect(isValidNumber('abc123')).toBe(false);
    expect(isValidNumber('NaN')).toBe(false);
    expect(isValidNumber('undefined')).toBe(false);
  });

  it('should handle edge cases', () => {
    expect(isValidNumber(' 123 ')).toBe(true);
    expect(isValidNumber('123.45.67')).toBe(false);
  });
});

describe('Conversion round-trip', () => {
  it('should maintain precision in round-trip conversion', () => {
    const originalFahrenheit = 100;
    const celsius = fahrenheitToCelsius(originalFahrenheit);
    const backToFahrenheit = celsiusToFahrenheit(celsius);
    expect(backToFahrenheit).toBe(originalFahrenheit);
  });

  it('should maintain precision in reverse round-trip conversion', () => {
    const originalCelsius = 37.78;
    const fahrenheit = celsiusToFahrenheit(originalCelsius);
    const backToCelsius = fahrenheitToCelsius(fahrenheit);
    expect(backToCelsius).toBe(originalCelsius);
  });

  it('should maintain precision in Celsius/Kelvin round-trip conversion', () => {
    const originalCelsius = 25;
    const kelvin = celsiusToKelvin(originalCelsius);
    const backToCelsius = kelvinToCelsius(kelvin);
    expect(backToCelsius).toBe(originalCelsius);
  });
});
