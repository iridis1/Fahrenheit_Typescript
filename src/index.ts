import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();
const PORT = 80;

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fahrenheit to Celsius Converter API',
      version: '1.0.0',
      description: 'Een Express TypeScript webservice voor het converteren van Fahrenheit naar Celsius',
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
 *     summary: Converteert Fahrenheit naar Celsius of Celsius naar Fahrenheit
 *     tags: [Conversion]
 *     parameters:
 *       - in: query
 *         name: fahrenheit
 *         required: false
 *         schema:
 *           type: number
 *         description: De Fahrenheit waarde om te converteren naar Celsius
 *       - in: query
 *         name: celsius
 *         required: false
 *         schema:
 *           type: number
 *         description: De Celsius waarde om te converteren naar Fahrenheit
 *     responses:
 *       200:
 *         description: Succesvolle conversie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fahrenheit:
 *                   type: number
 *                 celsius:
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
  const { fahrenheit, celsius } = req.query;

  if (!fahrenheit && !celsius) {
    return res.status(400).json({ error: 'Missing parameter: provide either fahrenheit or celsius' });
  }

  if (fahrenheit && celsius) {
    return res.status(400).json({ error: 'Provide only one parameter: either fahrenheit or celsius, not both' });
  }

  if (fahrenheit) {
    const fahrenheitValue = parseFloat(fahrenheit as string);

    if (isNaN(fahrenheitValue)) {
      return res.status(400).json({ error: 'Invalid fahrenheit value' });
    }

    const celsiusValue = (fahrenheitValue - 32) * (5 / 9);

    res.json({
      fahrenheit: fahrenheitValue,
      celsius: parseFloat(celsiusValue.toFixed(2))
    });
  } else if (celsius) {
    const celsiusValue = parseFloat(celsius as string);

    if (isNaN(celsiusValue)) {
      return res.status(400).json({ error: 'Invalid celsius value' });
    }

    const fahrenheitValue = (celsiusValue * 9 / 5) + 32;

    res.json({
      celsius: celsiusValue,
      fahrenheit: parseFloat(fahrenheitValue.toFixed(2))
    });
  }
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
    message: 'Fahrenheit to Celsius Converter API',
    endpoint: '/convert?fahrenheit=<value> or /convert?celsius=<value>',
    examples: [
      '/convert?fahrenheit=100',
      '/convert?celsius=37.78'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
