
const { addProduct, allProducts, getProductById, updateProduct, deleteProduct } = require("../Controller/product_controller");
const { verifyadmin, authorizeRole } = require("../middleware/auth");
const imageUpload = require("../middleware/multer");


const product_routes = require("express").Router();

product_routes.post("/add",authorizeRole(['superadmin','admin']),imageUpload.array("files",3), addProduct);
// product_routes.post("/add",imageUpload.array("files",3), addProduct);

product_routes.put("/update/:id",imageUpload.array("files",3), updateProduct);

product_routes.get("/all",verifyadmin,allProducts)

product_routes.get("/byid/:id",getProductById)

product_routes.delete("/delete/:id",deleteProduct) 


module.exports=product_routes;
