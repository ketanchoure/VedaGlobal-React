const { product } = require("../Model/product_schema");
const fs = require('fs');
const path = require('path');


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
console.log("user",req.user)

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

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { category, name, description, details } = req.body;
    
    // Fetch existing product from DB
    const existingProduct = await product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    let detailsData = {};
    if (details) {
      try {
        detailsData = JSON.parse(details);
      } catch {
        detailsData = details;
      }
    }

   

     // Handle file uploads
     let fileUrls = existingProduct.imageUrl; // Default to existing images
     if (req.files && req.files.length > 0) {
       fileUrls = [];
 
       // Delete old images
       if (Array.isArray(existingProduct.imageUrl)) {
        existingProduct.imageUrl.forEach((imgUrl) => {
           console.log("img",imgUrl)
           const fileName = imgUrl.split('/product/')[1];
           const filePath = path.join(__dirname, '..', 'Uploads', fileName);
           if (fs.existsSync(filePath)) {
             fs.unlinkSync(filePath);
           }
         });
       }
 
       // Add new uploaded image URLs
       req.files.forEach(file => {
         const fileUrl = `${req.protocol}://${req.get('host')}/product/${file.filename}`;
         fileUrls.push(fileUrl);
       });
     }
 
     const updateData = {
      category,
      name,
      description,
      details: detailsData,
      imageUrl: fileUrls,
    };

    const updatedProduct = await product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });


    res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const foundProduct = await product.findById(productId);

    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product: foundProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
