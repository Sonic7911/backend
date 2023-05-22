// Filename: models/userSchema.js

// Import mongoose package for creating schema
import mongoose from 'mongoose';

// Defining schema for our database
const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

export default mongoose.model('User', schema);
