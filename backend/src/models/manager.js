import mongoose from 'mongoose';
const { Schema } = mongoose;

const managerSchema = new Schema({
    name: { type: String }, 
  email: { type: String, unique: true ,required:true},
        role:{
            type:String,
            enum:["manager","admin"],
            default:"manager",
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
  profilePic:{
        type: String,
        default:"",
        },
  isActive:{
        type:Boolean,
        default:true,
    },
   
       turf: [{ type: mongoose.Types.ObjectId, ref: "Turf" }],
       
   },
       { timestamps: true }
   
   );

 export const ManagerModel = mongoose.model('ManagerModel', managerSchema);