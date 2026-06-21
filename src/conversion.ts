export interface Temperatures {
  celsius: number;
  fahrenheit: number;
  kelvin: number;
}

/** Het absolute nulpunt in Celsius (0 Kelvin). */
export const ABSOLUTE_ZERO_CELSIUS = -273.15;

/** Fout die wordt gegooid bij een temperatuur onder het absolute nulpunt. */
export class TemperatureRangeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TemperatureRangeError';
  }
}

function roundWithTwoDecimals(value: number): number {
  const rounded = parseFloat(value.toFixed(2));
  return rounded === 0 ? 0 : rounded;
}

/**
 * Converteert Fahrenheit naar Celsius
 * @param fahrenheit - De Fahrenheit waarde
 * @returns De Celsius waarde afgerond op 2 decimalen
 */
export function fahrenheitToCelsius(fahrenheit: number): number {
  return roundWithTwoDecimals((fahrenheit - 32) * (5 / 9));
}

/**
 * Converteert Celsius naar Fahrenheit
 * @param celsius - De Celsius waarde
 * @returns De Fahrenheit waarde afgerond op 2 decimalen
 */
export function celsiusToFahrenheit(celsius: number): number {
  return roundWithTwoDecimals((celsius * 9) / 5 + 32);
}

/**
 * Converteert Celsius naar Kelvin
 * @param celsius - De Celsius waarde
 * @returns De Kelvin waarde afgerond op 2 decimalen
 */
export function celsiusToKelvin(celsius: number): number {
  return roundWithTwoDecimals(celsius + 273.15);
}

/**
 * Converteert Kelvin naar Celsius
 * @param kelvin - De Kelvin waarde
 * @returns De Celsius waarde afgerond op 2 decimalen
 */
export function kelvinToCelsius(kelvin: number): number {
  return roundWithTwoDecimals(kelvin - 273.15);
}

/**
 * Berekent Celsius, Fahrenheit en Kelvin op basis van een Celsius waarde
 * @param celsius - De (ongeronde) Celsius waarde
 * @returns Alle drie de temperaturen afgerond op 2 decimalen
 */
export function temperaturesFromCelsius(celsius: number): Temperatures {
  const temperatures: Temperatures = {
    celsius: roundWithTwoDecimals(celsius),
    fahrenheit: roundWithTwoDecimals((celsius * 9) / 5 + 32),
    kelvin: roundWithTwoDecimals(celsius + 273.15),
  };

  if (temperatures.kelvin < 0) {
    throw new TemperatureRangeError('Temperature cannot be below absolute zero (0 Kelvin)');
  }

  return temperatures;
}

/**
 * Berekent alle temperaturen op basis van een Fahrenheit waarde
 */
export function temperaturesFromFahrenheit(fahrenheit: number): Temperatures {
  return temperaturesFromCelsius((fahrenheit - 32) * (5 / 9));
}

/**
 * Berekent alle temperaturen op basis van een Kelvin waarde
 */
export function temperaturesFromKelvin(kelvin: number): Temperatures {
  return temperaturesFromCelsius(kelvin - 273.15);
}

/**
 * Valideert of een string een geldig getal is
 * @param value - De te valideren string
 * @returns true als het een geldig getal is, anders false
 */
export function isValidNumber(value: string): boolean {
  if (value.trim().length === 0) return false;
  const parsed = Number(value);
  return !isNaN(parsed);
}
