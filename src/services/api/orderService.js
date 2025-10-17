import { getApperClient } from "@/services/apperClient";

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper function to get table name
const getTableName = () => 'order_c';

// Mock orders data
const orders = [
  {
    Id: 1,
    userId: 1,
    orderNumber: 'ORD-2024-001',
    orderDate: '2024-01-15T10:30:00Z',
    status: 'delivered',
    price: 299.99,
    product: {
      title: 'Wireless Headphones'
    },
    seller: {
      name: 'TechStore'
    }
  },
  {
    Id: 2,
    userId: 1,
    orderNumber: 'ORD-2024-002',
    orderDate: '2024-01-20T14:45:00Z',
    status: 'processing',
    price: 149.99,
    product: {
      title: 'Smart Watch'
    },
    seller: {
      name: 'GadgetHub'
    }
  },
  {
    Id: 3,
    userId: 2,
    orderNumber: 'ORD-2024-003',
    orderDate: '2024-01-25T09:15:00Z',
    status: 'pending',
    price: 89.99,
    product: {
      title: 'USB-C Cable'
    },
    seller: {
      name: 'AccessoriesPlus'
    }
  }
];

const orderService = {
  async getAll() {
    await delay(500);
    return orders.map(order => ({ ...order }));
  },

  async getByUserId(userId) {
    await delay(500);
    return orders
      .filter(order => order.userId === userId)
      .map(order => ({ ...order }))
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  },

  async getById(id) {
    await delay(300);
    const order = orders.find(o => o.Id === parseInt(id));
    return order ? { ...order } : null;
  },

  async updateStatus(id, status) {
    await delay(400);
    const index = orders.findIndex(o => o.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Order not found');
    }
    orders[index] = { ...orders[index], status };
    return { ...orders[index] };
  },

  async searchOrders(userId, searchTerm) {
    await delay(300);
    if (!searchTerm || searchTerm.trim() === '') {
      return this.getByUserId(userId);
    }

    const term = searchTerm.toLowerCase();
    const userOrders = orders.filter(order => order.userId === userId);

    return userOrders
      .filter(order => {
        return (
          order.orderNumber.toLowerCase().includes(term) ||
          order.product.title.toLowerCase().includes(term) ||
          order.seller.name.toLowerCase().includes(term) ||
          order.status.toLowerCase().includes(term)
        );
      })
      .map(order => ({ ...order }))
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  },

  async filterOrders(userId, filters) {
    await delay(400);
    let filtered = orders.filter(order => order.userId === userId);

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(order => order.status === filters.status);
    }

    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      filtered = filtered.filter(order => new Date(order.orderDate) >= fromDate);
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(order => new Date(order.orderDate) <= toDate);
    }

    if (filters.minPrice !== undefined && filters.minPrice !== null) {
      filtered = filtered.filter(order => order.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
      filtered = filtered.filter(order => order.price <= parseFloat(filters.maxPrice));
    }

    return filtered
      .map(order => ({ ...order }))
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  },

  async getOrderStats(userId) {
    await delay(300);
    const userOrders = orders.filter(order => order.userId === userId);
    
    const totalPurchases = userOrders.length;
    const totalSpent = userOrders.reduce((sum, order) => sum + order.price, 0);
    const pendingOrders = userOrders.filter(order => 
      order.status === 'pending' || order.status === 'processing'
    ).length;

    return {
      totalPurchases,
      totalSpent,
      pendingOrders
    };
  }
};

export default orderService;