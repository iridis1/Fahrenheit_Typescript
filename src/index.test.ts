import request from 'supertest';
import { app } from './index';

describe('API Endpoints', () => {
  describe('GET /', () => {
    it('should return API information', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('endpoint');
      expect(response.body).toHaveProperty('examples');
      expect(response.body.message).toBe('Temperature Converter API');
    });
  });

  describe('GET /convert', () => {
    describe('Fahrenheit input', () => {
      it('should convert Fahrenheit correctly', async () => {
        const response = await request(app).get('/convert?fahrenheit=100');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          celsius: 37.78,
          fahrenheit: 100,
          kelvin: 310.93
        });
      });

      it('should convert freezing point correctly', async () => {
        const response = await request(app).get('/convert?fahrenheit=32');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          celsius: 0,
          fahrenheit: 32,
          kelvin: 273.15
        });
      });

      it('should convert boiling point correctly', async () => {
        const response = await request(app).get('/convert?fahrenheit=212');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          celsius: 100,
          fahrenheit: 212,
          kelvin: 373.15
        });
      });

      it('should handle negative values', async () => {
        const response = await request(app).get('/convert?fahrenheit=-40');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          celsius: -40,
          fahrenheit: -40,
          kelvin: 233.15
        });
      });

      it('should handle decimal values', async () => {
        const response = await request(app).get('/convert?fahrenheit=98.6');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          celsius: 37,
          fahrenheit: 98.6,
          kelvin: 310.15
        });
      });

      it('should return 400 for invalid fahrenheit value', async () => {
        const response = await request(app).get('/convert?fahrenheit=abc');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
      });

      it('should return 400 for empty fahrenheit value', async () => {
        const response = await request(app).get('/convert?fahrenheit=');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
      });
    });

    describe('Celsius input', () => {
      it('should convert Celsius correctly', async () => {
        const response = await request(app).get('/convert?celsius=37.78');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          celsius: 37.78,
          fahrenheit: 100,
          kelvin: 310.93
        });
      });

      it('should convert freezing point correctly', async () => {
        const response = await request(app).get('/convert?celsius=0');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          celsius: 0,
          fahrenheit: 32,
          kelvin: 273.15
        });
      });

      it('should convert boiling point correctly', async () => {
        const response = await request(app).get('/convert?celsius=100');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          celsius: 100,
          fahrenheit: 212,
          kelvin: 373.15
        });
      });

      it('should handle negative values', async () => {
        const response = await request(app).get('/convert?celsius=-40');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          celsius: -40,
          fahrenheit: -40,
          kelvin: 233.15
        });
      });

      it('should handle decimal values', async () => {
        const response = await request(app).get('/convert?celsius=25');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          celsius: 25,
          fahrenheit: 77,
          kelvin: 298.15
        });
      });

      it('should return 400 for invalid celsius value', async () => {
        const response = await request(app).get('/convert?celsius=xyz');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
      });

      it('should return 400 for empty celsius value', async () => {
        const response = await request(app).get('/convert?celsius=');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
      });
    });

    describe('Kelvin input', () => {
      it('should convert Kelvin correctly', async () => {
        const response = await request(app).get('/convert?kelvin=310.93');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          celsius: 37.78,
          fahrenheit: 100,
          kelvin: 310.93
        });
      });

      it('should convert freezing point correctly', async () => {
        const response = await request(app).get('/convert?kelvin=273.15');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          celsius: 0,
          fahrenheit: 32,
          kelvin: 273.15
        });
      });

      it('should convert boiling point correctly', async () => {
        const response = await request(app).get('/convert?kelvin=373.15');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          celsius: 100,
          fahrenheit: 212,
          kelvin: 373.15
        });
      });

      it('should handle absolute zero', async () => {
        const response = await request(app).get('/convert?kelvin=0');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          celsius: -273.15,
          fahrenheit: -459.67,
          kelvin: 0
        });
      });

      it('should return 400 for invalid kelvin value', async () => {
        const response = await request(app).get('/convert?kelvin=xyz');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
      });

      it('should return 400 for empty kelvin value', async () => {
        const response = await request(app).get('/convert?kelvin=');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
      });
    });

    describe('Error handling', () => {
      it('should return 400 when no parameters are provided', async () => {
        const response = await request(app).get('/convert');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Missing parameter: provide fahrenheit, celsius, or kelvin');
      });

      it('should return 400 when multiple parameters are provided', async () => {
        const response = await request(app).get('/convert?fahrenheit=100&celsius=37');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Provide only one parameter: fahrenheit, celsius, or kelvin');
      });

      it('should return 400 when all three parameters are provided', async () => {
        const response = await request(app).get('/convert?fahrenheit=100&celsius=37&kelvin=300');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Provide only one parameter: fahrenheit, celsius, or kelvin');
      });
    });
  });
});
