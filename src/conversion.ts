/**
 * Converteert Fahrenheit naar Celsius
 * @param fahrenheit - De Fahrenheit waarde
 * @returns De Celsius waarde afgerond op 2 decimalen
 */
export function fahrenheitToCelsius(fahrenheit: number): number {
  const celsius = (fahrenheit - 32) * (5 / 9);
  return parseFloat(celsius.toFixed(2));
}

/**
 * Converteert Celsius naar Fahrenheit
 * @param celsius - De Celsius waarde
 * @returns De Fahrenheit waarde afgerond op 2 decimalen
 */
export function celsiusToFahrenheit(celsius: number): number {
  const fahrenheit = (celsius * 9 / 5) + 32;
  return parseFloat(fahrenheit.toFixed(2));
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
