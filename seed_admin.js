// Run this script after installing dependencies to create an admin user quickly
// node seed_admin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');

async function run(){
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/upcycled_marketplace';
  await mongoose.connect(MONGO_URI);
  const existing = await User.findOne({email:'admin@local'});
  if(existing){ console.log('Admin exists'); process.exit(0); }
  const hash = await bcrypt.hash('admin123', 10);
  const user = await User.create({name:'Admin', email:'admin@local', password:hash, role:'admin'});
  console.log('Created admin: admin@local / admin123');
  process.exit(0);
}
run();
