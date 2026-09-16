import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
     },

     forgotPasswordToken : {
        type: String
     },
     forgotPasswordTokenExpiry : {
        type: Date,
     }, 

     verifyToken : String,
     verifyTokenExpiry : {
        type: Date,
     }
    
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;