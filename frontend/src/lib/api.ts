const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/$/, '');

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  oldPrice: number | null;
  images: string[];
  inStock: boolean;
  quantityAvailable: number;
  createdAt: string;
  updatedAt: string;
};

export type OrderItem = {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  city: string;
  zipCode: string | null;
  comment: string | null;
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
};

export type CreateOrderInput = {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  city: string;
  zipCode?: string;
  comment?: string;
  items: { productId: string; quantity: number }[];
};

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(res.status, body?.message || `Request failed with status ${res.status}`);
  }

  return res.json();
}

export function getProducts(): Promise<Product[]> {
  return apiFetch<Product[]>('/api/products');
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    return await apiFetch<Product>(`/api/products/${encodeURIComponent(slug)}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export function createOrder(input: CreateOrderInput): Promise<Order> {
  return apiFetch<Order>('/api/orders', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function resolveImageUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}
