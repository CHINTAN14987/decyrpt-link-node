import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import { SALT_ROUND } from "../constants.js";
import ApiError from "../utils/ApiError.js";

const adminSchema=new Schema({
    email:{type:String, required:true, lowercase:true},
    password:{type:String, required:true},
    accessToken:{type:String}
}, {timestamp:true})

adminSchema.methods.isPassWordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

adminSchema.pre("save", async function(next){
    try {
        if (!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, SALT_ROUND);
        return next();
    } catch (error) {
        throw new ApiError(500, "Error while hashing password", error);
    }
})


export const Admin = mongoose.model("Admins", adminSchema);