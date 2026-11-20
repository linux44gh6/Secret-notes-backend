import mongoose from 'mongoose';
import { env } from '../config/env';
import { User } from '../models/user.model';

const seedAdmin = async () => {
  if (!env.admin.email || !env.admin.password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required in .env');
  }

  await mongoose.connect(env.mongoUri);

  const exists = await User.findOne({ email: env.admin.email.toLowerCase() });

  if (exists) {
    console.log('Admin already exists:', exists.email);
  } else {
    await User.create({
      name: env.admin.name,
      email: env.admin.email,
      password: env.admin.password,
      role: 'admin',
    });
    console.log('Admin created:', env.admin.email);
  }

  await mongoose.disconnect();
};

seedAdmin().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});