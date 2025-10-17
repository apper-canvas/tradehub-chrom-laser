// Realistic mock product data
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize with realistic product data
let products = [
  {
    Id: 1,
    title: "iPhone 13 Pro - Graphite 256GB",
    description: "Mint condition iPhone 13 Pro with original box and all accessories. Battery health at 98%. Never dropped, always used with case and screen protector.",
    price: 799,
    condition: "Like New",
    location: "San Francisco, CA",
    images: ["https://picsum.photos/seed/iphone13/400/300"],
    sellerId: 1,
    category_c: 1,
    status: "active",
    datePosted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    Id: 2,
    title: "MacBook Air M2 - Space Gray",
    description: "2022 MacBook Air with M2 chip, 8GB RAM, 256GB SSD. Excellent condition with minimal signs of use. Includes original charger.",
    price: 999,
    condition: "Used",
    location: "Los Angeles, CA",
    images: ["https://picsum.photos/seed/macbookair/400/300"],
    sellerId: 1,
    category_c: 1,
    status: "active",
    datePosted: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    Id: 3,
    title: "Vintage Leather Armchair",
    description: "Beautiful vintage leather armchair from the 1960s. Professionally restored with genuine leather. Perfect for reading nook or home office.",
    price: 450,
    condition: "Refurbished",
    location: "Austin, TX",
    images: ["https://picsum.photos/seed/armchair/400/300"],
    sellerId: 2,
    category_c: 2,
    status: "active",
    datePosted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    Id: 4,
    title: "Mid-Century Modern Coffee Table",
    description: "Solid walnut coffee table with tapered legs. Original finish in excellent condition. Dimensions: 48L x 24W x 16H inches.",
    price: 325,
    condition: "Used",
    location: "Portland, OR",
    images: ["https://picsum.photos/seed/coffeetable/400/300"],
    sellerId: 2,
    category_c: 2,
    status: "active",
    datePosted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    Id: 5,
    title: "Sony WH-1000XM5 Noise Cancelling Headphones",
    description: "Latest model with industry-leading noise cancellation. Includes carrying case, cables, and original box. Used for only 2 months.",
    price: 299,
    condition: "Like New",
    location: "Seattle, WA",
    images: ["https://picsum.photos/seed/headphones/400/300"],
    sellerId: 3,
    category_c: 1,
    status: "active",
    datePosted: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    Id: 6,
    title: "Canon EOS R6 Mirrorless Camera Body",
    description: "Professional full-frame mirrorless camera. Shutter count under 5000. Comes with two batteries, charger, and memory card.",
    price: 2100,
    condition: "Used",
    location: "Denver, CO",
    images: ["https://picsum.photos/seed/camera/400/300"],
    sellerId: 3,
    category_c: 1,
    status: "active",
    datePosted: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    Id: 7,
    title: "Nike Air Jordan 1 Retro High - Size 10",
    description: "Classic Chicago colorway. Worn 3-4 times, excellent condition. Original box and extra laces included.",
    price: 275,
    condition: "Like New",
    location: "Chicago, IL",
    images: ["https://picsum.photos/seed/jordans/400/300"],
    sellerId: 4,
    category_c: 3,
    status: "active",
    datePosted: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    Id: 8,
    title: "Patagonia Men's Down Sweater - Large",
    description: "Warm and lightweight packable jacket. Navy blue color. Gently used, no stains or tears. Perfect for fall and winter.",
    price: 125,
    condition: "Used",
    location: "Boulder, CO",
    images: ["https://picsum.photos/seed/jacket/400/300"],
    sellerId: 4,
    category_c: 3,
    status: "active",
    datePosted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    Id: 9,
    title: "Road Bike - Trek Domane SL 5",
    description: "Carbon frame road bike, 56cm, Shimano 105 groupset. Well maintained, recently serviced. Includes pedals and bike computer.",
    price: 2500,
    condition: "Used",
    location: "San Diego, CA",
    images: ["https://picsum.photos/seed/roadbike/400/300"],
    sellerId: 5,
    category_c: 4,
    status: "active",
    datePosted: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    Id: 10,
    title: "Camping Tent - REI Half Dome 2 Plus",
    description: "Spacious 2-person tent with excellent ventilation. Used for 5 camping trips, always stored dry. Includes footprint and stakes.",
    price: 185,
    condition: "Used",
    location: "Salt Lake City, UT",
    images: ["https://picsum.photos/seed/tent/400/300"],
    sellerId: 5,
    category_c: 4,
    status: "active",
    datePosted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    Id: 11,
    title: "Samsung 4K Smart TV - 55 inch",
    description: "Crystal UHD display with HDR support. Barely used, moving and can't take it. Includes remote and wall mount bracket.",
    price: 425,
    condition: "Like New",
    location: "Phoenix, AZ",
    images: ["https://picsum.photos/seed/tv55/400/300"],
    sellerId: 6,
    category_c: 1,
    status: "active",
    datePosted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    Id: 12,
    title: "IKEA POÄNG Armchair with Cushion",
    description: "Comfortable bentwood armchair with washable cushion cover. Frame in excellent condition, cushion recently cleaned.",
    price: 75,
    condition: "Used",
    location: "Minneapolis, MN",
    images: ["https://picsum.photos/seed/poang/400/300"],
    sellerId: 6,
    category_c: 2,
    status: "active",
    datePosted: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    Id: 13,
    title: "Levi's 501 Original Jeans - 32x32",
    description: "Classic straight fit jeans in medium wash. Worn a handful of times, like new condition. Timeless style that never goes out of fashion.",
    price: 45,
    condition: "Like New",
    location: "Nashville, TN",
    images: ["https://picsum.photos/seed/levis501/400/300"],
    sellerId: 7,
    category_c: 3,
    status: "active",
    datePosted: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    Id: 14,
    title: "Yoga Mat with Carrying Strap - Manduka",
    description: "Premium 6mm thick yoga mat with excellent grip. Purple color. Gently used, always cleaned after use. Non-slip surface.",
    price: 65,
    condition: "Used",
    location: "Miami, FL",
    images: ["https://picsum.photos/seed/yogamat/400/300"],
    sellerId: 7,
    category_c: 4,
    status: "active",
    datePosted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    Id: 15,
    title: "Wooden Bookshelf - 5 Tier",
    description: "Solid wood bookshelf with 5 spacious shelves. Oak finish. Sturdy construction, perfect for home or office. Easy to assemble.",
    price: 150,
    condition: "Like New",
    location: "Boston, MA",
    images: ["https://picsum.photos/seed/bookshelf/400/300"],
    sellerId: 8,
    category_c: 2,
    status: "active",
    datePosted: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const productService = {
  async getAll() {
    await delay(300);
    return products.filter(p => p.status === "active").map(p => ({ ...p }));
  },

  async getById(id) {
    await delay(250);
    const product = products.find(p => p.Id === parseInt(id));
    return product ? { ...product } : null;
  },

  async getByCategory(categoryId) {
    await delay(300);
    return products
      .filter(p => p.category === categoryId && p.status === "active")
      .map(p => ({ ...p }));
  },

  async search(query, filters = {}) {
    await delay(350);
    let results = products.filter(p => p.status === "active");

    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(p => 
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
      );
    }

    if (filters.category) {
      results = results.filter(p => p.category === filters.category);
    }

    if (filters.condition) {
      results = results.filter(p => p.condition === filters.condition);
    }

    if (filters.minPrice !== undefined) {
      results = results.filter(p => p.price >= filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      results = results.filter(p => p.price <= filters.maxPrice);
    }

    return results.map(p => ({ ...p }));
  },

  async create(item) {
    await delay(400);
    const maxId = Math.max(...products.map(p => p.Id), 0);
    const newProduct = {
      ...item,
      Id: maxId + 1,
      datePosted: new Date().toISOString(),
      status: "active"
    };
    products.push(newProduct);
    return { ...newProduct };
  },

  async update(id, data) {
    await delay(300);
    const index = products.findIndex(p => p.Id === parseInt(id));
    if (index !== -1) {
      products[index] = { ...products[index], ...data };
      return { ...products[index] };
    }
    return null;
  },

  async delete(id) {
    await delay(250);
    const index = products.findIndex(p => p.Id === parseInt(id));
    if (index !== -1) {
      products.splice(index, 1);
      return true;
    }
    return false;
  },

async getMyListings(sellerId) {
    await delay(300);
    return products
      .filter(p => p.sellerId === sellerId)
      .map(p => ({ 
        ...p,
        views: p.views || Math.floor(Math.random() * 500) + 10,
        favorites: p.favorites || Math.floor(Math.random() * 50) + 1,
        promoted: p.promoted || false
      }));
  },

  async markAsSold(id) {
    await delay(300);
    const index = products.findIndex(p => p.Id === parseInt(id));
    if (index !== -1) {
      products[index] = { ...products[index], status: "sold" };
      return { ...products[index] };
    }
    throw new Error("Product not found");
  },

  async promote(id) {
    await delay(300);
    const index = products.findIndex(p => p.Id === parseInt(id));
    if (index !== -1) {
      products[index] = { ...products[index], promoted: true };
      return { ...products[index] };
    }
    throw new Error("Product not found");
  },

  async duplicate(id) {
    await delay(300);
    const product = products.find(p => p.Id === parseInt(id));
    if (product) {
      const newId = Math.max(...products.map(p => p.Id)) + 1;
      const newProduct = {
        ...product,
        Id: newId,
        title: `${product.title} (Copy)`,
        datePosted: new Date().toISOString(),
        status: "draft",
        views: 0,
        favorites: 0,
        promoted: false
      };
      products.unshift(newProduct);
      return { ...newProduct };
    }
    throw new Error("Product not found");
  },

  async bulkDelete(ids) {
    await delay(400);
    products = products.filter(p => !ids.includes(p.Id));
    return { success: true, count: ids.length };
  },

  async bulkMarkAsSold(ids) {
    await delay(400);
    ids.forEach(id => {
      const index = products.findIndex(p => p.Id === id);
      if (index !== -1) {
        products[index] = { ...products[index], status: "sold" };
      }
    });
    return { success: true, count: ids.length };
  },

  async bulkPromote(ids) {
    await delay(400);
    ids.forEach(id => {
      const index = products.findIndex(p => p.Id === id);
      if (index !== -1) {
        products[index] = { ...products[index], promoted: true };
      }
    });
    return { success: true, count: ids.length };
  }
};

export default productService;