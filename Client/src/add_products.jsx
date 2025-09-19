import React, { useState } from "react";
import axios from "axios";

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    details: [], // Array of { key, value } pairs
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...productData.details];
    newDetails[index][field] = value;
    setProductData({ ...productData, details: newDetails });
  };

  const addDetail = () => {
    setProductData({
      ...productData,
      details: [...productData.details, { key: "", value: "" }],
    });
  };

  const removeDetail = (index) => {
    const newDetails = [...productData.details];
    newDetails.splice(index, 1);
    setProductData({ ...productData, details: newDetails });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const detailsObject = {};
    productData.details.forEach(({ key, value }) => {
      if (key) detailsObject[key] = value;
    });

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("category", productData.category);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("details", JSON.stringify(detailsObject));

    images.forEach((image) => {
      formData.append("files", image);
    });

    try {
      const res = await axios.post("http://localhost:1111/product/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added!");
      console.log(res.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Add New Product
        </h2>

        {/* Inputs */}
        <input
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="category"
          placeholder="Category"
          value={productData.category}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={productData.description}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={productData.price}
          onChange={handleChange}
          required
          className="w-full mb-6 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        {/* Product Details */}
        <h4 className="text-lg font-semibold mb-3 text-gray-700">
          Product Details
        </h4>
        {productData.details.map((detail, index) => (
          <div
            key={index}
            className="flex gap-3 mb-3 items-center bg-gray-50 p-3 rounded-lg"
          >
            <input
              type="text"
              placeholder="Key"
              value={detail.key}
              onChange={(e) => handleDetailChange(index, "key", e.target.value)}
              required
              className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Value"
              value={detail.value}
              onChange={(e) =>
                handleDetailChange(index, "value", e.target.value)
              }
              required
              className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => removeDetail(index)}
              className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addDetail}
          className="mb-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          ➕ Add Detail
        </button>

        {/* File Upload */}
        <h4 className="text-lg font-semibold mb-3 text-gray-700">
          Upload Images
        </h4>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full mb-6 p-2 border rounded-lg"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
