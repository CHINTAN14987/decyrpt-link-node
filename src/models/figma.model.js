import mongoose, {Schema} from "mongoose";

const figmaSchema=new Schema({
    userEmail:{type:String, required:true, lowercase:true},
    password:{type:String, required:true},
   link:{type:String}
}, {timestamp:true})





export const Figma = mongoose.model("Figmas", figmaSchema);