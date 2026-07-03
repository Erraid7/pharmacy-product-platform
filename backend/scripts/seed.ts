import 'dotenv/config';
import mongoose from 'mongoose';
import { UserModel } from '../src/models/User.js';
import { ProductModel } from '../src/models/Product.js';

async function seed() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pharmaflow';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await UserModel.deleteMany({});
    await ProductModel.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const admin = new UserModel({
      email: 'admin@pharmaflow.com',
      password: 'admin123',
      role: 'admin',
    });
    await admin.save();
    console.log('Created admin user: admin@pharmaflow.com');

    // Create worker users
    const worker1 = new UserModel({
      email: 'worker1@pharmaflow.com',
      password: 'worker123',
      role: 'worker',
    });
    await worker1.save();
    console.log('Created worker: worker1@pharmaflow.com');

    const worker2 = new UserModel({
      email: 'worker2@pharmaflow.com',
      password: 'worker123',
      role: 'worker',
    });
    await worker2.save();
    console.log('Created worker: worker2@pharmaflow.com');

    // Create sample products
    const products = [
      {
        name: 'Paracetamol 500mg',
        status: 'needed',
        createdBy: worker1._id,
      },
      {
        name: 'Ibuprofen 200mg',
        status: 'needed',
        createdBy: worker2._id,
      },
      {
        name: 'Amoxicillin 250mg',
        status: 'ordered',
        createdBy: worker1._id,
        orderedBy: admin._id,
      },
    ];

    for (const productData of products) {
      const product = new ProductModel(productData);
      await product.save();
      console.log(`Created product: ${product.name}`);
    }

    console.log('\nSeed data created successfully!');
    console.log('\nDefault credentials:');
    console.log('Admin: admin@pharmaflow.com / admin123');
    console.log('Worker 1: worker1@pharmaflow.com / worker123');
    console.log('Worker 2: worker2@pharmaflow.com / worker123');

    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
