const express =require("express")
const qoute_routes = require("../routes/qoute_routes")
const contact_routes = require("../routes/contact_routes")
const product_routes = require("../routes/Product_routes")
const Allrouters = express.Router() 
Allrouters.use("/quote",qoute_routes)

Allrouters.use("/contact",contact_routes)

Allrouters.use('/product',product_routes)

module.exports = Allrouters;