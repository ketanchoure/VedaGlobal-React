
const { addProduct, allProducts } = require("../Controller/product_controller");
const imageUpload = require("../middleware/multer");
// const { verifyUser } = require("../middlewares/verifyToken");


const product_routes = require("express").Router();

product_routes.post("/add",imageUpload.array("files",3), addProduct);

// product_routes.put("/update/:id",imageUpload.array("files",3), updateProduct);

product_routes.get("/all",allProducts)

// product_routes.get("/byid/:id",singleProduct)

// product_routes.delete("/delete/:id",verifyUser,deleteProduct) //not tested


module.exports=product_routes;
