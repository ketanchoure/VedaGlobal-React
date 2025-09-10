const { Create_quote, getallqoute, getallqoutebyid, deletequote } = require("../Controller/Quote_controller");

const qoute_routes = require("express").Router();

qoute_routes.post("/create",Create_quote);

qoute_routes.get("/getall",getallqoute);

qoute_routes.get("/byid/:id",getallqoutebyid);

qoute_routes.delete("/delete/:id",deletequote);


module.exports=qoute_routes;
