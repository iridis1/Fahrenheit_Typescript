# Temperature Converter API

Een Express TypeScript webservice voor het converteren tussen Celsius, Fahrenheit en Kelvin.

## Installatie

1. Installeer de dependencies:
```bash
npm install
```

## Gebruik

### Development mode (met auto-restart)
```bash
npm run dev
```

### Productie build
```bash
npm run build
npm start
```

De server draait standaard op poort 80.

## Swagger Documentatie

De API documentatie is beschikbaar via Swagger UI op:
```
http://localhost/api-docs
```

Swagger UI biedt een interactieve interface om de API endpoints te testen en te documenteren.

## API Endpoint

### GET /convert?fahrenheit=<waarde> of /convert?celsius=<waarde> of /convert?kelvin=<waarde>

Converteert tussen Celsius, Fahrenheit en Kelvin. Elke response bevat altijd alle drie de waarden.

**Parameters:**
- `fahrenheit` (number, optioneel) - De Fahrenheit waarde om te converteren
- `celsius` (number, optioneel) - De Celsius waarde om te converteren
- `kelvin` (number, optioneel) - De Kelvin waarde om te converteren

**Opmerking:** Geef precies één parameter op (fahrenheit, celsius of kelvin), niet meerdere.

**Voorbeeld:**
```bash
curl "http://localhost/convert?fahrenheit=100"
curl "http://localhost/convert?celsius=37.78"
curl "http://localhost/convert?kelvin=310.93"
```

**Response:**
```json
{
  "celsius": 37.78,
  "fahrenheit": 100,
  "kelvin": 310.93
}
```

**Foutmeldingen:**
- `400` - Geen parameter opgegeven (geef fahrenheit, celsius of kelvin op)
- `400` - Meerdere parameters opgegeven (geef er slechts één op)
- `400` - Ongeldige parameter waarde

### GET /

Basis endpoint met API informatie.

**Response:**
```json
{
  "message": "Temperature Converter API",
  "endpoint": "/convert?fahrenheit=<value> or /convert?celsius=<value> or /convert?kelvin=<value>",
  "examples": [
    "/convert?fahrenheit=100",
    "/convert?celsius=37.78",
    "/convert?kelvin=310.93"
  ]
}
```

## Project Structuur

```
Fahrenheit_Typescript/
├── src/
│   └── index.ts          # Express server met conversie endpoint
├── package.json          # Project configuratie en scripts
├── tsconfig.json         # TypeScript configuratie
└── README.md             # Dit bestand
```r