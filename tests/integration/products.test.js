import request from 'supertest';
import { app, server } from '../../server.js';
import mongoose from 'mongoose';
import Product from '../../models/products.js';

describe('/api/products', () => {
  afterAll(async () => {
    await mongoose.connection.close();
    if (server) {
      server.close();
    }
  });

  describe('GET /', () => {
    it('should return all products', async () => {
      // Insert a product to ensure there's something to fetch
      await Product.collection.insertMany([
        { name: 'Test Product', category: 'Electronics', price: 10, stock: 10 }
      ]);

      const res = await request(app).get('/api/products');
      
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body.some(p => p.name === 'Test Product')).toBeTruthy();

      // Clean up
      await Product.deleteMany({ name: 'Test Product' });
    });
  });
});
