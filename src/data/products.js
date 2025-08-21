// src/data/products.js
const products = [
  {
    id: 1,
    name: "Organic Basmati Rice",
    price: 1200,
    location: "Delhi",
    image: "https://plus.unsplash.com/premium_photo-1723925093264-40b6b957c44d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFzbWF0aSUyMHJpY2V8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 2,
    name: "Fresh Alphonso Mangoes (Dozen)",
    price: 900,
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuZ29zfGVufDB8fDB8fHww"
  },
  {
    id: 3,
    name: "Desi Cow Ghee (1L)",
    price: 650,
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1707425197195-240b7ad69047?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2hlZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 4,
    name: "Organic Tomatoes (1kg)",
    price: 80,
    location: "Pune",
    image: "https://plus.unsplash.com/premium_photo-1661811820259-2575b82101bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9tYXRvfGVufDB8fDB8fHww"
  },
  {
    id: 5,
    name: "Fresh Paneer (500g)",
    price: 250,
    location: "Chennai",
    image: "https://images.unsplash.com/photo-1630748661719-875c3b7ebfb7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBhbmVlcnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 6,
    name: "Wheat Flour (5kg)",
    price: 350,
    location: "Jaipur",
    image: "https://images.unsplash.com/photo-1532590766017-8572c43b007c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdoZWV0JTIwZmxvdXJ8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 7,
    name: "Raw Honey (500ml)",
    price: 499,
    location: "Hyderabad",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmF3JTIwaG9uZXl8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 8,
    name: "Groundnut Oil (1L)",
    price: 320,
    location: "Lucknow",
    image: "https://images.unsplash.com/photo-1610547939489-73202bc6afda?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGdyb3VuZG51dCUyMG9pbHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 9,
    name: "Fresh Green Chilli (250g)",
    price: 40,
    location: "Kolkata",
    image: "https://images.unsplash.com/photo-1731126658226-55101ad227f7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJlc2glMjBncmVlbiUyMGNoaWxsaXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 10,
    name: "Organic Potatoes (2kg)",
    price: 120,
    location: "Patna",
    image: "https://images.unsplash.com/photo-1552661397-4233881ea8c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3JnYW5pYyUyMHBvdGF0b3N8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 11,
    name: "Masoor Dal (1kg)",
    price: 160,
    location: "Varanasi",
    image: "https://plus.unsplash.com/premium_photo-1701064865147-48dcd4d63015?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFzb29yJTIwZGFsfGVufDB8fDB8fHww"
  },
  {
    id: 12,
    name: "Turmeric Powder (200g)",
    price: 150,
    location: "Nagpur",
    image: "https://images.unsplash.com/photo-1702041295331-840d4d9aa7c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHVybWVyaWMlMjBwb3dkZXJ8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 13,
    name: "Coriander Powder (200g)",
    price: 130,
    location: "Ahmedabad",
    image: "https://images.unsplash.com/photo-1590080876880-5e1f1b3d7f52"
  },
  {
    id: 14,
    name: "Fresh Milk (1L)",
    price: 60,
    location: "Indore",
    image: "https://images.unsplash.com/photo-1588167056545-0d8f2f24f81d"
  },
  {
    id: 15,
    name: "Fresh Oranges (1kg)",
    price: 120,
    location: "Nagpur",
    image: "https://images.unsplash.com/photo-1582281298059-7a4599e1b9f3"
  },
  {
    id: 16,
    name: "Cucumber (1kg)",
    price: 50,
    location: "Bhopal",
    image: "https://images.unsplash.com/photo-1592928306012-f4b54b1e849b"
  },
  {
    id: 17,
    name: "Cauliflower (1pc)",
    price: 40,
    location: "Kanpur",
    image: "https://images.unsplash.com/photo-1592928306001-d9d44cc979f2"
  },
  {
    id: 18,
    name: "Onions (2kg)",
    price: 180,
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1604908177225-f14e1adf29a6"
  },
  {
    id: 19,
    name: "Fresh Bananas (Dozen)",
    price: 70,
    location: "Kochi",
    image: "https://images.unsplash.com/photo-1574226516831-e1dff420e43e"
  },
  {
    id: 20,
    name: "Organic Apples (1kg)",
    price: 220,
    location: "Shimla",
    image: "https://images.unsplash.com/photo-1606813909021-3a63dbdcb21a"
  },
  {
    id: 21,
    name: "Papaya (1pc)",
    price: 90,
    location: "Goa",
    image: "https://images.unsplash.com/photo-1606813909400-43d11d8efb2c"
  },
  {
    id: 22,
    name: "Sugarcane Juice (1L)",
    price: 100,
    location: "Gurgaon",
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f"
  },
  {
    id: 23,
    name: "Fresh Coconut (1pc)",
    price: 60,
    location: "Kerala",
    image: "https://images.unsplash.com/photo-1603048297349-5eac3bbfb6b5"
  },
  {
    id: 24,
    name: "Chana Dal (1kg)",
    price: 140,
    location: "Ranchi",
    image: "https://images.unsplash.com/photo-1633933356723-bb0a4e1a31a5"
  },
  {
    id: 25,
    name: "Black Pepper (100g)",
    price: 220,
    location: "Kerala",
    image: "https://images.unsplash.com/photo-1589307004390-f3e63011d8ab"
  },
  {
    id: 26,
    name: "Organic Carrots (1kg)",
    price: 80,
    location: "Shimla",
    image: "https://images.unsplash.com/photo-1604908177225-f14e1adf29a6"
  },
  {
    id: 27,
    name: "Mustard Oil (1L)",
    price: 200,
    location: "Patna",
    image: "https://images.unsplash.com/photo-1607958215231-50e1c38e5543"
  },
  {
    id: 28,
    name: "Fresh Grapes (500g)",
    price: 150,
    location: "Nasik",
    image: "https://images.unsplash.com/photo-1582281298059-7a4599e1b9f3"
  },
  {
    id: 29,
    name: "Fresh Strawberries (250g)",
    price: 180,
    location: "Mahabaleshwar",
    image: "https://images.unsplash.com/photo-1576402187872-34e7dbe1d1f1"
  },
  {
    id: 30,
    name: "Organic Tea Leaves (250g)",
    price: 300,
    location: "Darjeeling",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655"
  }
];

export default products;
