# FarmStack

**Author:** Gautam Yadav  

FarmStack is a full-stack e-commerce platform designed for farmers and buyers. It allows sellers to upload and manage products and buyers to browse, buy, add to cart, and purchase products. The project is built with React + Vite for the frontend and Node.js + Express + MongoDB for the backend.

**Live Demo:** [https://farmstack-stores.netlify.app/](https://farmstack-stores.netlify.app/)  
**GitHub Repository:** [https://github.com/Gautam0804/farmstack-store](https://github.com/Gautam0804/farmstack-store)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Seller (Farmers)
- Register/Login as a seller
- Upload products with images
- Edit and delete products
- View all uploaded products
- Manage orders from buyers

### Buyer
- Register/Login as a buyer
- Browse products by category or search
- Add products to cart or wishlist
- Checkout and pay via Razorpay
- View order history and product details

### Admin
- (Optional) Manage users, products, and orders

---

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Authentication:** JWT  
- **File Storage:** Local uploads folder (can be extended to AWS S3 or Cloudinary)  
- **Payment Gateway:** Razorpay (optional)  

---

## Folder Structure

### Frontend (`farmStack`)
farmStack/
├─ public/ # Static assets like images
├─ src/
│ ├─ assets/ # Images, icons, etc.
│ ├─ components/ # Reusable React components
│ ├─ context/ # React Context for global state (cart, wishlist)
│ ├─ data/ # Sample/static data
│ ├─ pages/ # Pages for buyer and seller
│ │ ├─ auth/ # Login/Register pages
│ │ ├─ buyer/ # Buyer-related pages
│ │ └─ seller/ # Seller-related pages
│ ├─ App.jsx # Main React component
│ ├─ index.css
│ └─ main.jsx # Entry point
├─ package.json
└─ vite.config.js

shell
Copy
Edit

### Backend (`farmstack-backend`)
farmstack-backend/
├─ controllers/ # Route controllers (auth, products, cart, orders)
├─ middleware/ # Authentication and upload middleware
├─ models/ # MongoDB models (User, Product, Cart, Order)
├─ routes/ # API routes
├─ uploads/ # Product images uploaded by sellers
├─ config/ # Database configuration
├─ server.js # Entry point
├─ package.json
└─ .env # Environment variables

yaml
Copy
Edit

---

## Installation

1. Clone the repository
```bash
git clone https://github.com/Gautam0804/farmstack-store.git
cd farmstack
Frontend setup

bash
Copy
Edit
cd farmStack
npm install
npm run dev
Frontend will run on http://localhost:5173 by default.

Backend setup

bash
Copy
Edit
cd farmstack-backend
npm install
Create a .env file with:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run the server:

bash
Copy
Edit
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
Seller (Farmer)
Register or log in as a seller

Upload products with images, price, and stock details

Edit or delete products as needed

Manage orders received from buyers

Buyer
Register or log in as a buyer

Browse available products

Add items to cart or wishlist

Checkout and pay via Razorpay

View order history

Contributing
Fork the repository

Create your branch: git checkout -b feature-name

Commit changes: git commit -m 'Add some feature'

Push to branch: git push origin feature-name

Create a pull request

License
This project is licensed under the MIT License.
