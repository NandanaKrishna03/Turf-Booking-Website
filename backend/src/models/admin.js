import mongoose from 'mongoose';
const { Schema } = mongoose;

const adminSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
   

 export const AdminModel = mongoose.model('AdminModel', adminSchema);