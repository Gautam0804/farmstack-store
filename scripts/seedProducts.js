const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

const sampleProducts = [
  {
    name: "Organic Tomatoes",
    price: 30,
    location: "Bihar",
    image: "https://source.unsplash.com/featured/?tomatoes"
  },
  {
    name: "Fresh Carrots",
    price: 25,
    location: "Delhi",
    image: "https://source.unsplash.com/featured/?carrots"
  },
  {
    name: "Sweet Mangoes",
    price: 100,
    location: "Maharashtra",
    image: "https://source.unsplash.com/featured/?mango"
  },
  {
    name: "Farm Eggs",
    price: 80,
    location: "Punjab",
    image: "https://source.unsplash.com/featured/?eggs"
  },
  {
    name: "Raw Honey",
    price: 150,
    location: "Uttarakhand",
    image: "https://source.unsplash.com/featured/?honey"
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted ✔️');
    process.exit();
  })
  .catch(err => console.error(err));
