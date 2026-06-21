export interface Temperatures {
  celsius: number;
  fahrenheit: number;
  kelvin: number;
}

/** Fout die wordt gegooid bij een temperatuur onder het absolute nulpunt. */
export class TemperatureRangeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TemperatureRangeError';
  }
}

/** Bundelt alle temperatuurconversies en bijbehorende validatie. */
export class TemperatureConversion {
  /** Het absolute nulpunt in Celsius (0 Kelvin). */
  static readonly ABSOLUTE_ZERO_CELSIUS = -273.15;

  private static roundWithTwoDecimals(value: number): number {
    const rounded = parseFloat(value.toFixed(2));
    return rounded === 0 ? 0 : rounded;
  }

  /**
   * Converteert Fahrenheit naar Celsius
   * @param fahrenheit - De Fahrenheit waarde
   * @returns De Celsius waarde afgerond op 2 decimalen
   */
  static fahrenheitToCelsius(fahrenheit: number): number {
    return this.roundWithTwoDecimals((fahrenheit - 32) * (5 / 9));
  }

  /**
   * Converteert Celsius naar Fahrenheit
   * @param celsius - De Celsius waarde
   * @returns De Fahrenheit waarde afgerond op 2 decimalen
   */
  static celsiusToFahrenheit(celsius: number): number {
    return this.roundWithTwoDecimals((celsius * 9) / 5 + 32);
  }

  /**
   * Converteert Celsius naar Kelvin
   * @param celsius - De Celsius waarde
   * @returns De Kelvin waarde afgerond op 2 decimalen
   */
  static celsiusToKelvin(celsius: number): number {
    return this.roundWithTwoDecimals(celsius + 273.15);
  }

  /**
   * Converteert Kelvin naar Celsius
   * @param kelvin - De Kelvin waarde
   * @returns De Celsius waarde afgerond op 2 decimalen
   */
  static kelvinToCelsius(kelvin: number): number {
    return this.roundWithTwoDecimals(kelvin - 273.15);
  }

  /**
   * Berekent Celsius, Fahrenheit en Kelvin op basis van een Celsius waarde
   * @param celsius - De (ongeronde) Celsius waarde
   * @returns Alle drie de temperaturen afgerond op 2 decimalen
   */
  static temperaturesFromCelsius(celsius: number): Temperatures {
    const temperatures: Temperatures = {
      celsius: this.roundWithTwoDecimals(celsius),
      fahrenheit: this.roundWithTwoDecimals((celsius * 9) / 5 + 32),
      kelvin: this.roundWithTwoDecimals(celsius + 273.15),
    };

    if (temperatures.kelvin < 0) {
      throw new TemperatureRangeError('Temperature cannot be below absolute zero (0 Kelvin)');
    }

    return temperatures;
  }

  /**
   * Berekent alle temperaturen op basis van een Fahrenheit waarde
   */
  static temperaturesFromFahrenheit(fahrenheit: number): Temperatures {
    return this.temperaturesFromCelsius((fahrenheit - 32) * (5 / 9));
  }

  /**
   * Berekent alle temperaturen op basis van een Kelvin waarde
   */
  static temperaturesFromKelvin(kelvin: number): Temperatures {
    return this.temperaturesFromCelsius(kelvin - 273.15);
  }

  /**
   * Valideert of een string een geldig getal is
   * @param value - De te valideren string
   * @returns true als het een geldig getal is, anders false
   */
  static isValidNumber(value: string): boolean {
    if (value.trim().length === 0) return false;
    const parsed = Number(value);
    return !isNaN(parsed);
  }
}
