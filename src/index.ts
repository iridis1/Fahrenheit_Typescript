import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import {
  isValidNumber,
  temperaturesFromFahrenheit,
  temperaturesFromCelsius,
  temperaturesFromKelvin,
} from './conversion';

const app = express();
const PORT = 80;

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Temperature Converter API',
      version: '1.0.0',
      description: 'Een Express TypeScript webservice voor het converteren tussen Celsius, Fahrenheit en Kelvin',
    },
    servers: [
      {
        url: 'http://localhost',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/index.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /convert:
 *   get:
 *     summary: Converteert tussen Celsius, Fahrenheit en Kelvin
 *     description: Geef precies één parameter op. De response bevat altijd celsius, fahrenheit en kelvin.
 *     tags: [Conversion]
 *     parameters:
 *       - in: query
 *         name: fahrenheit
 *         required: false
 *         schema:
 *           type: number
 *         description: De Fahrenheit waarde om te converteren
 *       - in: query
 *         name: celsius
 *         required: false
 *         schema:
 *           type: number
 *         description: De Celsius waarde om te converteren
 *       - in: query
 *         name: kelvin
 *         required: false
 *         schema:
 *           type: number
 *         description: De Kelvin waarde om te converteren
 *     responses:
 *       200:
 *         description: Succesvolle conversie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 celsius:
 *                   type: number
 *                 fahrenheit:
 *                   type: number
 *                 kelvin:
 *                   type: number
 *       400:
 *         description: Ontbrekende of ongeldige parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
app.get('/convert', (req: Request, res: Response) => {
  const { fahrenheit, celsius, kelvin } = req.query;

  const provided = [fahrenheit, celsius, kelvin].filter((value) => value !== undefined);

  if (provided.length === 0) {
    return res.status(400).json({ error: 'Missing parameter: provide fahrenheit, celsius, or kelvin' });
  }

  if (provided.length > 1) {
    return res.status(400).json({ error: 'Provide only one parameter: fahrenheit, celsius, or kelvin' });
  }

  if (fahrenheit !== undefined) {
    if (!isValidNumber(fahrenheit as string)) {
      return res.status(400).json({ error: 'Invalid fahrenheit value' });
    }
    return res.json(temperaturesFromFahrenheit(parseFloat(fahrenheit as string)));
  }

  if (celsius !== undefined) {
    if (!isValidNumber(celsius as string)) {
      return res.status(400).json({ error: 'Invalid celsius value' });
    }
    return res.json(temperaturesFromCelsius(parseFloat(celsius as string)));
  }

  if (!isValidNumber(kelvin as string)) {
    return res.status(400).json({ error: 'Invalid kelvin value' });
  }
  return res.json(temperaturesFromKelvin(parseFloat(kelvin as string)));
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: API informatie
 *     tags: [General]
 *     responses:
 *       200:
 *         description: API informatie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 endpoint:
 *                   type: string
 *                 example:
 *                   type: string
 */
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Temperature Converter API',
    endpoint: '/convert?fahrenheit=<value> or /convert?celsius=<value> or /convert?kelvin=<value>',
    examples: [
      '/convert?fahrenheit=100',
      '/convert?celsius=37.78',
      '/convert?kelvin=310.93'
    ]
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export { app };
