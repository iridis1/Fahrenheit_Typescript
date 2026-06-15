# Fahrenheit to Celsius Converter API

Een Express TypeScript webservice voor het converteren van Fahrenheit naar Celsius.

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

## API Endpoint

### GET /convert?fahrenheit=<waarde>

Converteert Fahrenheit naar Celsius.

**Parameters:**
- `fahrenheit` (number, vereist) - De Fahrenheit waarde om te converteren

**Voorbeeld:**
```bash
curl "http://localhost/convert?fahrenheit=100"
```

**Response:**
```json
{
  "fahrenheit": 100,
  "celsius": 37.78
}
```

**Foutmeldingen:**
- `400` - Ontbrekende of ongeldige fahrenheit parameter

### GET /

Basis endpoint met API informatie.

**Response:**
```json
{
  "message": "Fahrenheit to Celsius Converter API",
  "endpoint": "/convert?fahrenheit=<value>",
  "example": "/convert?fahrenheit=100"
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