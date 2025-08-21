import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [form, setForm] = useState({ name: '', description: '', price: '' });
  const [image, setImage] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleImage = e => setImage(e.target.files[0]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', form.name);
      data.append('description', form.description);
      data.append('price', form.price);
      data.append('seller', JSON.parse(localStorage.getItem('user')).id); // seller id
      if (image) data.append('image', image);

      const res = await axios.post('http://localhost:5000/api/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Product uploaded');
      setForm({ name: '', description: '', price: '' });
      setImage(null);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="w-full mb-3 p-2 border rounded"/>
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full mb-3 p-2 border rounded"/>
      <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="w-full mb-3 p-2 border rounded"/>
      <input type="file" onChange={handleImage} className="mb-3"/>
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Upload Product</button>
    </form>
  );
};

export default AddProduct;
