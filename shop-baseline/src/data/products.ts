import type { Product } from "../types";


export const products: Product[] = [
  {
    id: 1,
    title: "Premium Leather Backpack",
    description: "Handcrafted genuine leather backpack with multiple compartments. Perfect for daily use or weekend getaways.",
    price: 129.99,
    image: "https://images.pexels.com/photos/934673/pexels-photo-934673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Accessories"
  },
  {
    id: 2,
    title: "Minimalist Stainless Steel Watch",
    description: "Elegant timepiece with sapphire crystal glass and premium stainless steel construction.",
    price: 199.99,
    image: "https://images.pexels.com/photos/9978722/pexels-photo-9978722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Accessories"
  },
  {
    id: 3,
    title: "Wireless Noise-Cancelling Headphones",
    description: "Premium audio experience with 40-hour battery life and active noise cancellation technology.",
    price: 249.99,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Electronics"
  },
  {
    id: 4,
    title: "Organic Cotton T-Shirt",
    description: "Ultra-soft 100% organic cotton t-shirt with a relaxed fit. Sustainably produced and ethically sourced.",
    price: 34.99,
    image: "https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Clothing"
  },
  {
    id: 5,
    title: "Ceramic Pour-Over Coffee Maker",
    description: "Handcrafted ceramic pour-over coffee maker with precision drip design for the perfect cup every time.",
    price: 59.99,
    image: "https://images.pexels.com/photos/2878710/pexels-photo-2878710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Home"
  },
  {
    id: 6,
    title: "Sustainable Bamboo Utensil Set",
    description: "Travel-friendly utensil set made from sustainable bamboo. Includes fork, knife, spoon, and chopsticks.",
    price: 24.99,
    image: "https://images.pexels.com/photos/5908232/pexels-photo-5908232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Home"
  },
  {
    id: 7,
    title: "Smart Home Security Camera",
    description: "HD security camera with motion detection, two-way audio, and smartphone notifications.",
    price: 89.99,
    image: "https://images.pexels.com/photos/3945673/pexels-photo-3945673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Electronics"
  },
  {
    id: 8,
    title: "Merino Wool Scarf",
    description: "Luxuriously soft merino wool scarf. Lightweight yet warm for year-round comfort.",
    price: 49.99,
    image: "https://images.pexels.com/photos/5699162/pexels-photo-5699162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Accessories"
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowerCaseQuery = query.toLowerCase();
  return products.filter(
    product => 
      product.title.toLowerCase().includes(lowerCaseQuery) || 
      product.description.toLowerCase().includes(lowerCaseQuery) ||
      product.category.toLowerCase().includes(lowerCaseQuery)
  );
};