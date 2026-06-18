# Fahrenheit to Celsius Converter API

Een Express TypeScript webservice voor het converteren van Fahrenheit naar Celsius en vice versa.

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

### GET /convert?fahrenheit=<waarde> of /convert?celsius=<waarde>

Converteert Fahrenheit naar Celsius of Celsius naar Fahrenheit.

**Parameters:**
- `fahrenheit` (number, optioneel) - De Fahrenheit waarde om te converteren naar Celsius
- `celsius` (number, optioneel) - De Celsius waarde om te converteren naar Fahrenheit

**Opmerking:** Geef precies één parameter op (fahrenheit of celsius), niet beide.

**Voorbeeld Fahrenheit naar Celsius:**
```bash
curl "http://localhost/convert?fahrenheit=100"
```

**Voorbeeld Celsius naar Fahrenheit:**
```bash
curl "http://localhost/convert?celsius=37.78"
```

**Response (Fahrenheit naar Celsius):**
```json
{
  "fahrenheit": 100,
  "celsius": 37.78
}
```

**Response (Celsius naar Fahrenheit):**
```json
{
  "celsius": 37.78,
  "fahrenheit": 100.00
}
```

**Foutmeldingen:**
- `400` - Geen parameter opgegeven (geef fahrenheit of celsius op)
- `400` - Beide parameters opgegeven (geef er slechts één op)
- `400` - Ongeldige parameter waarde

### GET /

Basis endpoint met API informatie.

**Response:**
```json
{
  "message": "Fahrenheit to Celsius Converter API",
  "endpoint": "/convert?fahrenheit=<value> or /convert?celsius=<value>",
  "examples": [
    "/convert?fahrenheit=100",
    "/convert?celsius=37.78"
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
```