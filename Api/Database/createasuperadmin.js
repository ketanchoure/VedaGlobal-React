// scripts/createAdmin.js
require('dotenv').config({ path: 'Api' + '/.env' });
const mongoose = require("mongoose")
const User = require("../Model/User")
const { encryptPassword } = require("../middleware/auth")


console.log("MongoDB URL:", process.env.mongoDbUrl)
mongoose.connect("mongodb+srv://shivkumarloharkar:Tny9dZwuwEYHTE9t@cluster0.efn3se0.mongodb.net/Veda_global_new")


    .then(async () => {
        const user = await User.create({
            name:"superadmin",
            email: "superadmin@vedaglobal.com",
            password: encryptPassword("superadmin@vedaglobal"),
            role: "superadmin"
        });

        console.log("Admin created:", user);
        process.exit();
    })
    .catch(console.error);
