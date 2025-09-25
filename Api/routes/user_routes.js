
const { login, createadmin } = require("../Controller/user_controller");
const { verifyadmin, authorizeRole } = require("../middleware/auth");

const user_routes = require("express").Router();

user_routes.post('/login',login)

user_routes.post("/create-admin", verifyadmin, authorizeRole(['superadmin',]),createadmin );



module.exports=user_routes;