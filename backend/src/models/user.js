import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String }, 
  email: { type: String, unique: true ,required:true},
        role:{
            type:String,
            enum:["user","manager","admin"],
            default:"user",
        },
  phoneNumber:{ 
        type: String,
        minLength:10,
        },
  password:{
        type: String,
        required:true,
        minLen:8,
        },
  profilepic:{
        type: String,
        default:"",
        },
  isActive:{
        type:Boolean,
        default:true,
    },
},
{
      timestamps:true,
}
);

 export const UserModel = mongoose.model('UserModel', userSchema);