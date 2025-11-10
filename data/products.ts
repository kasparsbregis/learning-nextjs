export interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // in dollars
  category: string;
  rating: number; // 1-5 stars
  reviews: number; // number of reviews
  inStock: boolean;
  tags: string[]; // ["sale", "featured", "new", etc.]
  image: string;
  discount?: number; // percentage discount (0-100)
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    description:
      "Premium over-ear headphones with active noise cancellation and 30-hour battery life",
    price: 299.99,
    category: "Electronics",
    rating: 4.7,
    reviews: 2341,
    inStock: true,
    tags: ["featured", "sale"],
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    discount: 20,
  },
  {
    id: 2,
    name: "4K Ultra HD Smart TV 55-inch",
    description:
      "Stunning picture quality with HDR support and built-in streaming apps",
    price: 479.99,
    category: "Electronics",
    rating: 4.5,
    reviews: 1829,
    inStock: true,
    tags: ["featured", "bestseller"],
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
  },
  {
    id: 3,
    name: "Leather Messenger Bag",
    description:
      "Handcrafted genuine leather bag with multiple compartments for laptop and essentials",
    price: 129.99,
    category: "Fashion",
    rating: 4.8,
    reviews: 542,
    inStock: true,
    tags: ["new", "trending"],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
  },
  {
    id: 4,
    name: "Running Shoes - Performance Pro",
    description:
      "Lightweight athletic shoes with responsive cushioning for serious runners",
    price: 89.99,
    category: "Sports",
    rating: 4.6,
    reviews: 3210,
    inStock: true,
    tags: ["sale", "bestseller"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    discount: 25,
  },
  {
    id: 5,
    name: "Stainless Steel Coffee Maker",
    description:
      "Programmable 12-cup coffee maker with thermal carafe and auto-brew feature",
    price: 79.99,
    category: "Home & Kitchen",
    rating: 4.3,
    reviews: 987,
    inStock: true,
    tags: ["featured"],
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400",
  },
  {
    id: 6,
    name: "The Art of Programming - Complete Guide",
    description:
      "Comprehensive guide to modern software development practices and design patterns",
    price: 45.99,
    category: "Books",
    rating: 4.9,
    reviews: 1456,
    inStock: true,
    tags: ["bestseller", "educational"],
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
  },
  {
    id: 7,
    name: "Wireless Gaming Mouse",
    description:
      "Ergonomic high-precision mouse with customizable RGB lighting and programmable buttons",
    price: 59.99,
    category: "Electronics",
    rating: 4.4,
    reviews: 2103,
    inStock: false,
    tags: ["gaming", "new"],
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
  },
  {
    id: 8,
    name: "Yoga Mat - Extra Thick",
    description:
      "Non-slip 8mm thick yoga mat with carrying strap, perfect for all fitness levels",
    price: 34.99,
    category: "Sports",
    rating: 4.6,
    reviews: 1672,
    inStock: true,
    tags: ["sale", "eco-friendly"],
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
    discount: 15,
  },
  {
    id: 9,
    name: "Ceramic Non-Stick Cookware Set",
    description:
      "10-piece cookware set with ceramic coating, includes pots, pans, and lids",
    price: 159.99,
    category: "Home & Kitchen",
    rating: 4.7,
    reviews: 823,
    inStock: true,
    tags: ["featured", "eco-friendly"],
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
  },
  {
    id: 10,
    name: "Portable Bluetooth Speaker",
    description: "Waterproof speaker with 360° sound and 20-hour battery life",
    price: 49.99,
    category: "Electronics",
    rating: 4.2,
    reviews: 3456,
    inStock: true,
    tags: ["sale", "outdoor"],
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    discount: 30,
  },
  {
    id: 11,
    name: "Mystery Thriller Novel - Dark Secrets",
    description:
      "Gripping page-turner that will keep you guessing until the very end",
    price: 14.99,
    category: "Books",
    rating: 4.5,
    reviews: 2891,
    inStock: true,
    tags: ["bestseller", "trending"],
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
  },
  {
    id: 12,
    name: "Smart Watch - Fitness Tracker",
    description:
      "Advanced fitness tracking with heart rate monitor, GPS, and sleep tracking",
    price: 199.99,
    category: "Electronics",
    rating: 4.4,
    reviews: 1567,
    inStock: false,
    tags: ["new", "fitness"],
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
  },
  {
    id: 13,
    name: "Memory Foam Pillow Set (2-Pack)",
    description:
      "Hypoallergenic pillows with cooling gel technology for better sleep",
    price: 69.99,
    category: "Home & Kitchen",
    rating: 4.6,
    reviews: 1234,
    inStock: true,
    tags: ["sale", "comfort"],
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400",
    discount: 10,
  },
  {
    id: 14,
    name: "Men's Classic Denim Jacket",
    description:
      "Timeless denim jacket with comfortable fit and durable construction",
    price: 79.99,
    category: "Fashion",
    rating: 4.5,
    reviews: 689,
    inStock: true,
    tags: ["classic", "trending"],
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400",
  },
  {
    id: 15,
    name: "Indoor Plant Care Kit",
    description:
      "Complete kit with watering can, spray bottle, pruning shears, and plant food",
    price: 29.99,
    category: "Home & Kitchen",
    rating: 4.3,
    reviews: 456,
    inStock: true,
    tags: ["new", "eco-friendly"],
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400",
  },
  {
    id: 16,
    name: "Professional DSLR Camera",
    description:
      "24MP full-frame sensor with 4K video recording and dual card slots",
    price: 1299.99,
    category: "Electronics",
    rating: 4.9,
    reviews: 892,
    inStock: false,
    tags: ["professional", "featured"],
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
  },
  {
    id: 17,
    name: "Resistance Bands Set",
    description:
      "5-piece resistance band set with different tension levels and door anchor",
    price: 24.99,
    category: "Sports",
    rating: 4.4,
    reviews: 2145,
    inStock: true,
    tags: ["sale", "fitness", "bestseller"],
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400",
    discount: 20,
  },
  {
    id: 18,
    name: "Cookbook - Healthy Meals in 30 Minutes",
    description:
      "Over 150 quick and nutritious recipes for busy weeknight dinners",
    price: 24.99,
    category: "Books",
    rating: 4.7,
    reviews: 1823,
    inStock: true,
    tags: ["bestseller", "educational"],
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
  },
];
