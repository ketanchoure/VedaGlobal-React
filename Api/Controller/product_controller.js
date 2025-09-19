const { product } = require("../Model/product_schema");

exports.addProduct = async (req, res) => {
    try {
      const {category, name, description, details } = req.body;
    
      if (!category || !name || !description || !details ) {
        return res.status(400).send('fill required fields');
    }
      const files = []
      if (req.files && req.files.length > 0) {
        req.files.forEach(data => {
          console.log(data)
          const fileurl = `${req.protocol}://${req.get('host')}/product/${data.filename}`;
          files.push(fileurl)
        });
      }
      let detailsdata={}
      if (req.body.details) {
        try {
          detailsdata = JSON.parse(req.body.details); // ✅ parse JSON string to object
        } catch (e) {
          detailsdata = req.body.details; // fallback if not valid JSON
        }
      }
  
      const newProduct = await product.create({
        category, 
        name, 
        description, 
        details:detailsdata,
        imageUrl: files
       
      });
      return res.status(200).json({ message: "Product Added SUccessfully", data: newProduct });
    
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
};

exports.allProducts = async (req, res) => {
    try {
      const products = await product.find()
      if (products) {
        return res.status(200).json({ products });
      } else {
        return res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
};