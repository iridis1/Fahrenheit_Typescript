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
 *     summary: Converteert Fahrenheit naar Celsius
 *     tags: [Conversion]
 *     parameters:
 *       - in: query
 *         name: fahrenheit
 *         required: true
 *         schema:
 *           type: number
 *         description: De Fahrenheit waarde om te converteren
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
  const { fahrenheit } = req.query;

  if (!fahrenheit) {
    return res.status(400).json({ error: 'Missing fahrenheit parameter' });
  }

  const fahrenheitValue = parseFloat(fahrenheit as string);

  if (isNaN(fahrenheitValue)) {
    return res.status(400).json({ error: 'Invalid fahrenheit value' });
  }

  const celsius = (fahrenheitValue - 32) * (5 / 9);

  res.json({
    fahrenheit: fahrenheitValue,
    celsius: parseFloat(celsius.toFixed(2))
  });
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
    endpoint: '/convert?fahrenheit=<value>',
    example: '/convert?fahrenheit=100'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
