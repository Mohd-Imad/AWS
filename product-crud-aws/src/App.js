import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [productData, setProductData] = useState({
    id: '',
    name: '',
    price: '',
    qty: '',
  });
  const [productImage, setProductImage] = useState(null)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleImageChange = async (event) => {
    setProductImage(event.target.files[0]);
    const response = await axios.get(
      "https://m4mkv9q3tj.execute-api.ap-south-1.amazonaws.com/test/gen_presigned_url",
    );
    var finalUrl = JSON.parse(response.data.body).presignedUrl
    setProductImage(finalUrl);
    console.log(finalUrl);
    // console.log(response.data.body);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the product data
    const productPayload = {
      ...productData,
      image: productImage, // Send the presigned URL here
    };

    try {
      const response = await axios.post(
        'https://m4mkv9q3tj.execute-api.ap-south-1.amazonaws.com/test/add_new_product',
        productPayload
      );
      console.log(response.data);
      // Reset form fields after successful submission
      setProductData({
        id: '',
        name: '',
        price: '',
        qty: '',
      });
      setProductImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1 className="form-header">Add Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ID:</label>
            <input
              type="text"
              name="id"
              value={productData.id}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="text"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Quantity:</label>
            <input
              type="text"
              name="qty"
              value={productData.qty}
              onChange={handleInputChange}
            />
          </div>
          <button className="submit-button" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
