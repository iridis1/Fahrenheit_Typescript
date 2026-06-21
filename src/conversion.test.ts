import { TemperatureConversion, TemperatureRangeError } from './conversion';

describe('fahrenheitToCelsius', () => {
  it('should convert freezing point correctly', () => {
    expect(TemperatureConversion.fahrenheitToCelsius(32)).toBe(0);
  });

  it('should convert boiling point correctly', () => {
    expect(TemperatureConversion.fahrenheitToCelsius(212)).toBe(100);
  });

  it('should convert negative values correctly', () => {
    expect(TemperatureConversion.fahrenheitToCelsius(-40)).toBe(-40);
  });

  it('should round to 2 decimal places', () => {
    expect(TemperatureConversion.fahrenheitToCelsius(100)).toBe(37.78);
    expect(TemperatureConversion.fahrenheitToCelsius(98.6)).toBe(37);
  });

  it('should handle decimal values', () => {
    expect(TemperatureConversion.fahrenheitToCelsius(50)).toBe(10);
    expect(TemperatureConversion.fahrenheitToCelsius(77)).toBe(25);
  });

  it('should handle zero', () => {
    expect(TemperatureConversion.fahrenheitToCelsius(0)).toBe(-17.78);
  });
});

describe('celsiusToFahrenheit', () => {
  it('should convert freezing point correctly', () => {
    expect(TemperatureConversion.celsiusToFahrenheit(0)).toBe(32);
  });

  it('should convert boiling point correctly', () => {
    expect(TemperatureConversion.celsiusToFahrenheit(100)).toBe(212);
  });

  it('should convert negative values correctly', () => {
    expect(TemperatureConversion.celsiusToFahrenheit(-40)).toBe(-40);
  });

  it('should round to 2 decimal places', () => {
    expect(TemperatureConversion.celsiusToFahrenheit(37.78)).toBe(100);
    expect(TemperatureConversion.celsiusToFahrenheit(37)).toBe(98.6);
  });

  it('should handle decimal values', () => {
    expect(TemperatureConversion.celsiusToFahrenheit(10)).toBe(50);
    expect(TemperatureConversion.celsiusToFahrenheit(25)).toBe(77);
  });

  it('should handle zero', () => {
    expect(TemperatureConversion.celsiusToFahrenheit(0)).toBe(32);
  });
});

describe('celsiusToKelvin', () => {
  it('should convert freezing point correctly', () => {
    expect(TemperatureConversion.celsiusToKelvin(0)).toBe(273.15);
  });

  it('should convert boiling point correctly', () => {
    expect(TemperatureConversion.celsiusToKelvin(100)).toBe(373.15);
  });

  it('should convert absolute zero correctly', () => {
    expect(TemperatureConversion.celsiusToKelvin(-273.15)).toBe(0);
  });

  it('should handle decimal values', () => {
    expect(TemperatureConversion.celsiusToKelvin(37.78)).toBe(310.93);
  });
});

describe('kelvinToCelsius', () => {
  it('should convert freezing point correctly', () => {
    expect(TemperatureConversion.kelvinToCelsius(273.15)).toBe(0);
  });

  it('should convert boiling point correctly', () => {
    expect(TemperatureConversion.kelvinToCelsius(373.15)).toBe(100);
  });

  it('should convert absolute zero correctly', () => {
    expect(TemperatureConversion.kelvinToCelsius(0)).toBe(-273.15);
  });
});

describe('temperaturesFromCelsius', () => {
  it('should return all three temperatures', () => {
    expect(TemperatureConversion.temperaturesFromCelsius(100)).toEqual({
      celsius: 100,
      fahrenheit: 212,
      kelvin: 373.15,
    });
  });
});

describe('temperaturesFromFahrenheit', () => {
  it('should return all three temperatures', () => {
    expect(TemperatureConversion.temperaturesFromFahrenheit(98.6)).toEqual({
      celsius: 37,
      fahrenheit: 98.6,
      kelvin: 310.15,
    });
  });
});

describe('temperaturesFromKelvin', () => {
  it('should return all three temperatures', () => {
    expect(TemperatureConversion.temperaturesFromKelvin(0)).toEqual({
      celsius: -273.15,
      fahrenheit: -459.67,
      kelvin: 0,
    });
  });
});

describe('absolute zero validation', () => {
  it('should allow absolute zero', () => {
    expect(TemperatureConversion.temperaturesFromCelsius(-273.15).kelvin).toBe(0);
    expect(TemperatureConversion.temperaturesFromFahrenheit(-459.67).kelvin).toBe(0);
    expect(TemperatureConversion.temperaturesFromKelvin(0).kelvin).toBe(0);
  });

  it('should throw for Celsius below absolute zero', () => {
    expect(() => TemperatureConversion.temperaturesFromCelsius(-300)).toThrow(TemperatureRangeError);
  });

  it('should throw for Fahrenheit below absolute zero', () => {
    expect(() => TemperatureConversion.temperaturesFromFahrenheit(-500)).toThrow(TemperatureRangeError);
  });

  it('should throw for Kelvin below absolute zero', () => {
    expect(() => TemperatureConversion.temperaturesFromKelvin(-1)).toThrow(TemperatureRangeError);
  });
});

describe('isValidNumber', () => {
  it('should return true for valid numbers', () => {
    expect(TemperatureConversion.isValidNumber('123')).toBe(true);
    expect(TemperatureConversion.isValidNumber('123.45')).toBe(true);
    expect(TemperatureConversion.isValidNumber('-123')).toBe(true);
    expect(TemperatureConversion.isValidNumber('-123.45')).toBe(true);
    expect(TemperatureConversion.isValidNumber('0')).toBe(true);
    expect(TemperatureConversion.isValidNumber('0.0')).toBe(true);
  });

  it('should return false for invalid values', () => {
    expect(TemperatureConversion.isValidNumber('abc')).toBe(false);
    expect(TemperatureConversion.isValidNumber('')).toBe(false);
    expect(TemperatureConversion.isValidNumber(' ')).toBe(false);
    expect(TemperatureConversion.isValidNumber('123abc')).toBe(false);
    expect(TemperatureConversion.isValidNumber('abc123')).toBe(false);
    expect(TemperatureConversion.isValidNumber('NaN')).toBe(false);
    expect(TemperatureConversion.isValidNumber('undefined')).toBe(false);
  });

  it('should handle edge cases', () => {
    expect(TemperatureConversion.isValidNumber(' 123 ')).toBe(true);
    expect(TemperatureConversion.isValidNumber('123.45.67')).toBe(false);
  });
});

describe('Conversion round-trip', () => {
  it('should maintain precision in round-trip conversion', () => {
    const originalFahrenheit = 100;
    const celsius = TemperatureConversion.fahrenheitToCelsius(originalFahrenheit);
    const backToFahrenheit = TemperatureConversion.celsiusToFahrenheit(celsius);
    expect(backToFahrenheit).toBe(originalFahrenheit);
  });

  it('should maintain precision in reverse round-trip conversion', () => {
    const originalCelsius = 37.78;
    const fahrenheit = TemperatureConversion.celsiusToFahrenheit(originalCelsius);
    const backToCelsius = TemperatureConversion.fahrenheitToCelsius(fahrenheit);
    expect(backToCelsius).toBe(originalCelsius);
  });

  it('should maintain precision in Celsius/Kelvin round-trip conversion', () => {
    const originalCelsius = 25;
    const kelvin = TemperatureConversion.celsiusToKelvin(originalCelsius);
    const backToCelsius = TemperatureConversion.kelvinToCelsius(kelvin);
    expect(backToCelsius).toBe(originalCelsius);
  });
});
