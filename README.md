FarmStack

FarmStack is a full-stack e-commerce platform for farmers and buyers. It allows sellers to upload and manage products and buyers to browse, add to cart, and purchase products. The project is built with React + Vite for the frontend and Node.js + Express + MongoDB for the backend.

Table of Contents

Features

Tech Stack

Folder Structure

Installation

Available Scripts

Usage

Contributing

License

Features
Seller

Register/Login as a seller

Upload products with image

Edit and delete products

View all uploaded products

Buyer

Register/Login as a buyer

Browse products

Add products to cart or wishlist

Checkout and payment

View order history

Admin

(Optional) Manage users, products, and orders

Tech Stack

Frontend: React, Vite, Tailwind CSS

Backend: Node.js, Express

Database: MongoDB

Authentication: JWT

File Storage: Local uploads folder (can be extended to AWS S3 or Cloudinary)

Payment Gateway: Razorpay (optional)

Folder Structure
Frontend (farmStack)
farmStack/
├─ public/                 # Static assets like images
├─ src/
│  ├─ assets/              # Images, icons, etc.
│  ├─ components/          # Reusable React components
│  ├─ context/             # React Context for global state (cart, wishlist)
│  ├─ data/                # Sample/static data
│  ├─ pages/               # Pages for buyer and seller
│  │  ├─ auth/             # Login/Register pages
│  │  ├─ buyer/            # Buyer-related pages
│  │  └─ seller/           # Seller-related pages
│  ├─ App.jsx              # Main React component
│  ├─ index.css
│  └─ main.jsx             # Entry point
├─ package.json
└─ vite.config.js

Backend (farmstack-backend)
farmstack-backend/
├─ controllers/            # Route controllers (auth, products, cart, orders)
├─ middleware/             # Authentication and upload middleware
├─ models/                 # MongoDB models (User, Product, Cart, Order)
├─ routes/                 # API routes
├─ uploads/                # Product images uploaded by sellers
├─ config/                 # Database configuration
├─ server.js               # Entry point
├─ package.json
└─ .env                    # Environment variables

Installation
1. Clone the repository
git clone https://github.com/yourusername/farmstack.git
cd farmstack

2. Frontend setup
cd farmStack
npm install
npm run dev


Frontend will run on http://localhost:5173 by default.

3. Backend setup
cd farmstack-backend
npm install


Create a .env file with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Run the server:

npm run dev


Backend will run on http://localhost:5000.

Available Scripts
Frontend

npm run dev – Runs Vite dev server

npm run build – Builds the production bundle

npm run preview – Preview production build

Backend

npm run dev – Run server with nodemon

node server.js – Run server normally

Usage

Register as a seller and log in

Upload products from seller dashboard

Register as a buyer and log in

Browse products, add to cart, and checkout

View orders and product details

Contributing

Fork the repository

Create your branch: git checkout -b feature-name

Commit changes: git commit -m 'Add some feature'

Push to branch: git push origin feature-name

Create a pull request
License

This project is licensed under the MIT License.