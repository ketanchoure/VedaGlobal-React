// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type : String },
    email: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true,
    },
    role: {
        type : String,
        enum : ['admin', 'superadmin'],
        required : true
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
module.exports = User;