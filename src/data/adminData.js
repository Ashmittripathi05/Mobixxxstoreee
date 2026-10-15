import { products } from './products';

// ─── Simulated Orders ──────────────────────────────────────────────────────
const statuses = ['Delivered', 'Processing', 'Shipped', 'Cancelled'];
const statusWeights = [0.55, 0.2, 0.17, 0.08]; // probability weights
const cities = [
  'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai',
  'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Surat', 'Nagpur', 'Indore', 'Bhopal', 'Chandigarh',
];
const firstNames = [
  'Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Ananya', 'Rohit', 'Pooja',
  'Arjun', 'Divya', 'Kiran', 'Meera', 'Suresh', 'Neha', 'Aditya',
  'Kavya', 'Sanjay', 'Riya', 'Deepak', 'Anjali',
];
const lastNames = [
  'Sharma', 'Patel', 'Singh', 'Kumar', 'Verma', 'Mehta', 'Shah',
  'Gupta', 'Joshi', 'Nair', 'Reddy', 'Rao', 'Iyer', 'Pandey', 'Mishra',
];

function pickWeighted(arr, weights) {
  const r = Math.random();
  let cum = 0;
  for (let i = 0; i < arr.length; i++) {
    cum += weights[i];
    if (r < cum) return arr[i];
  }
  return arr[arr.length - 1];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function dateAgo(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

function generateOrders(count = 60) {
  const orders = [];
  for (let i = 0; i < count; i++) {
    const product = randItem(products);
    const qty = randInt(1, 2);
    const status = pickWeighted(statuses, statusWeights);
    const daysAgo = randInt(0, 180);
    const name = `${randItem(firstNames)} ${randItem(lastNames)}`;
    const city = randItem(cities);
    orders.push({
      id: `ORD${String(1000 + i).padStart(5, '0')}`,
      customerName: name,
      city,
      product: product.name,
      brand: product.brand,
      productId: product.id,
      price: product.price,
      qty,
      total: product.price * qty,
      status,
      date: dateAgo(daysAgo),
      paymentMethod: randItem(['UPI', 'Credit Card', 'Debit Card', 'COD']),
    });
  }
  // Sort newest first
  return orders.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export const orders = generateOrders(60);

// ─── Stock Data (derived from products) ───────────────────────────────────
function generateStock() {
  return products.map(p => {
    const stock = randInt(0, 50);
    return {
      id: p.id,
      name: p.name,
      brand: p.brand,
      price: p.price,
      storage: p.storageOptions?.[0] || '128GB',
      stock,
      status: stock === 0 ? 'Out of Stock' : stock < 8 ? 'Low Stock' : 'In Stock',
      lastRestocked: dateAgo(randInt(1, 60)),
    };
  });
}

export let stockData = generateStock();

// ─── Revenue by Month (last 6 months) ─────────────────────────────────────
function getMonthlyRevenue() {
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleString('default', { month: 'short', year: '2-digit' });
    const monthOrders = orders.filter(o => {
      const od = new Date(o.date);
      return od.getMonth() === d.getMonth() && od.getFullYear() === d.getFullYear()
        && o.status !== 'Cancelled';
    });
    const revenue = monthOrders.reduce((s, o) => s + o.total, 0);
    months.push({ label, revenue, count: monthOrders.length });
  }
  return months;
}

export const monthlyRevenue = getMonthlyRevenue();

// ─── Summary Stats ─────────────────────────────────────────────────────────
export function getAdminStats() {
  const validOrders = orders.filter(o => o.status !== 'Cancelled');
  const totalRevenue = validOrders.reduce((s, o) => s + o.total, 0);
  const avgOrderValue = validOrders.length > 0 ? Math.round(totalRevenue / validOrders.length) : 0;

  const now = new Date();
  const thisMonthOrders = validOrders.filter(o => {
    const d = new Date(o.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const thisMonthRevenue = thisMonthOrders.reduce((s, o) => s + o.total, 0);

  // Top products by sales
  const productSales = {};
  validOrders.forEach(o => {
    productSales[o.product] = (productSales[o.product] || 0) + o.qty;
  });
  const topProducts = Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, units]) => ({ name, units }));

  // Brand revenue
  const brandRevenue = {};
  validOrders.forEach(o => {
    brandRevenue[o.brand] = (brandRevenue[o.brand] || 0) + o.total;
  });
  const topBrands = Object.entries(brandRevenue)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([brand, revenue]) => ({ brand, revenue }));

  return {
    totalOrders: orders.length,
    deliveredOrders: validOrders.length,
    cancelledOrders: orders.filter(o => o.status === 'Cancelled').length,
    totalRevenue,
    thisMonthRevenue,
    thisMonthOrders: thisMonthOrders.length,
    avgOrderValue,
    topProducts,
    topBrands,
    lowStockCount: stockData.filter(s => s.status === 'Low Stock').length,
    outOfStockCount: stockData.filter(s => s.status === 'Out of Stock').length,
  };
}
