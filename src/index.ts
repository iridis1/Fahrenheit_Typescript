import express, { Request, Response } from 'express';

const app = express();
const PORT = 80;

app.use(express.json());

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
