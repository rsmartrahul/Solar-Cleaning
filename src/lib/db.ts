import fs from 'fs';
import path from 'path';
import { kv } from '@vercel/kv';

const DB_PATH = path.join(process.cwd(), 'db.json');
const KV_KEY = 'solar_mushroom_db';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  businessType: 'solar' | 'mushroom';
  image: string;
  stock: number;
  specs: Record<string, string>;
}

export interface User {
  email: string;
  password?: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  businessType: 'solar' | 'mushroom';
}

export interface Order {
  id: string;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid';
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  createdAt: string;
}

export interface Quote {
  id: string;
  name: string;
  companyName: string;
  phone: string;
  email: string;
  productRequirement: string;
  quantity: number;
  message: string;
  status: 'Pending' | 'Contacted' | 'Closed';
  createdAt: string;
}

export interface DatabaseSchema {
  users: User[];
  products: Product[];
  orders: Order[];
  quotes?: Quote[];
}

function getLocalDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initialDb: DatabaseSchema = { users: [], products: [], orders: [], quotes: [] };
      fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2));
      return initialDb;
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    if (!parsed.quotes) {
      parsed.quotes = [];
    }
    return parsed;
  } catch (error) {
    console.error('Error reading local database file:', error);
    return { users: [], products: [], orders: [], quotes: [] };
  }
}

function saveLocalDb(data: DatabaseSchema): boolean {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing local database file:', error);
    return false;
  }
}

export async function getDb(): Promise<DatabaseSchema> {
  if (process.env.KV_REST_API_URL) {
    try {
      const data = await kv.get<DatabaseSchema>(KV_KEY);
      if (data) {
        if (!data.quotes) {
          data.quotes = [];
        }
        return data;
      }
      // Seed Vercel KV with local db or initial state if it's empty
      const initialDb = getLocalDb();
      await kv.set(KV_KEY, initialDb);
      return initialDb;
    } catch (error) {
      console.error('Error reading from Vercel KV, falling back to local database:', error);
    }
  }
  return getLocalDb();
}

export async function saveDb(data: DatabaseSchema): Promise<boolean> {
  if (process.env.KV_REST_API_URL) {
    try {
      await kv.set(KV_KEY, data);
      return true;
    } catch (error) {
      console.error('Error writing to Vercel KV:', error);
      return false;
    }
  }
  return saveLocalDb(data);
}
