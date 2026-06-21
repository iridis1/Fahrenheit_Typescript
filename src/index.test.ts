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
      expect(response.body.message).toBe('Fahrenheit to Celsius Converter API');
    });
  });

  describe('GET /convert', () => {
    describe('Fahrenheit to Celsius conversion', () => {
      it('should convert Fahrenheit to Celsius correctly', async () => {
        const response = await request(app).get('/convert?fahrenheit=100');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          fahrenheit: 100,
          celsius: 37.78
        });
      });

      it('should convert freezing point correctly', async () => {
        const response = await request(app).get('/convert?fahrenheit=32');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          fahrenheit: 32,
          celsius: 0
        });
      });

      it('should convert boiling point correctly', async () => {
        const response = await request(app).get('/convert?fahrenheit=212');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          fahrenheit: 212,
          celsius: 100
        });
      });

      it('should handle negative values', async () => {
        const response = await request(app).get('/convert?fahrenheit=-40');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          fahrenheit: -40,
          celsius: -40
        });
      });

      it('should handle decimal values', async () => {
        const response = await request(app).get('/convert?fahrenheit=98.6');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          fahrenheit: 98.6,
          celsius: 37
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

    describe('Celsius to Fahrenheit conversion', () => {
      it('should convert Celsius to Fahrenheit correctly', async () => {
        const response = await request(app).get('/convert?celsius=37.78');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          celsius: 37.78,
          fahrenheit: 100
        });
      });

      it('should convert freezing point correctly', async () => {
        const response = await request(app).get('/convert?celsius=0');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          celsius: 0,
          fahrenheit: 32
        });
      });

      it('should convert boiling point correctly', async () => {
        const response = await request(app).get('/convert?celsius=100');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          celsius: 100,
          fahrenheit: 212
        });
      });

      it('should handle negative values', async () => {
        const response = await request(app).get('/convert?celsius=-40');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          celsius: -40,
          fahrenheit: -40
        });
      });

      it('should handle decimal values', async () => {
        const response = await request(app).get('/convert?celsius=25');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          celsius: 25,
          fahrenheit: 77
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

    describe('Error handling', () => {
      it('should return 400 when no parameters are provided', async () => {
        const response = await request(app).get('/convert');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Missing parameter: provide either fahrenheit or celsius');
      });

      it('should return 400 when both parameters are provided', async () => {
        const response = await request(app).get('/convert?fahrenheit=100&celsius=37');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Provide only one parameter: either fahrenheit or celsius, not both');
      });
    });
  });
});
