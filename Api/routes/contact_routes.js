const { Create_contact, getallcontact, getallcontactbyid, deletecontact } = require("../Controller/Contact_controller");

const contact_routes = require("express").Router();

contact_routes.post("/create",Create_contact)

contact_routes.get("/getall",getallcontact);

contact_routes.get("/byid/:id",getallcontactbyid);

contact_routes.delete("/delete/:id",deletecontact);

module.exports=contact_routes;