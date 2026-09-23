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
  customerEmail: string | null;
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
  customerEmail: string;
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
  const isFormData = options?.body instanceof FormData;
  const res = await fetch(`${API_BASE_URL}${path}`, {
    cache: 'no-store',
    ...options,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
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

// Browser-side checkout: goes through this app's /api/orders route, which creates
// the order on the backend and emails the customer a confirmation via Gmail.
export async function placeOrder(input: CreateOrderInput): Promise<Order> {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(res.status, body?.message || `Request failed with status ${res.status}`);
  }

  return res.json();
}

export function logLanguageChange(locale: string): Promise<{ message: string; locale: string; receivedAt: string }> {
  return apiFetch('/api/analytics/language-change', {
    method: 'POST',
    body: JSON.stringify({ locale }),
  });
}

export function resolveImageUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

// --- Admin ---

export type CreateProductInput = {
  name: string;
  description?: string;
  price: number;
  images?: string[];
  quantityAvailable?: number;
};

export type UpdateProductInput = {
  name?: string;
  description?: string;
  price?: number;
  oldPrice?: number;
  images?: string[];
  inStock?: boolean;
  quantityAvailable?: number;
};

function authHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` };
}

export function adminLogin(password: string): Promise<{ token: string }> {
  return apiFetch<{ token: string }>('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
}

export function getAllProductsAdmin(token: string): Promise<Product[]> {
  return apiFetch<Product[]>('/api/admin/products/getall', { headers: authHeaders(token) });
}

export function getDeletedProductsAdmin(token: string): Promise<Product[]> {
  return apiFetch<Product[]>('/api/admin/products/getonlydeleted', { headers: authHeaders(token) });
}

export function createProductAdmin(token: string, input: CreateProductInput): Promise<Product> {
  return apiFetch<Product>('/api/admin/products', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(input),
  });
}

export function updateProductAdmin(token: string, id: string, input: UpdateProductInput): Promise<Product> {
  return apiFetch<Product>(`/api/admin/products/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(input),
  });
}

export function deactivateProductAdmin(token: string, id: string): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(`/api/admin/products/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
}

export function listOrdersAdmin(token: string, status?: string): Promise<Order[]> {
  const query = status ? `?status=${encodeURIComponent(status)}` : '';
  return apiFetch<Order[]>(`/api/admin/orders${query}`, { headers: authHeaders(token) });
}

export function updateOrderStatusAdmin(token: string, id: string, status: string): Promise<Order> {
  return apiFetch<Order>(`/api/admin/orders/${encodeURIComponent(id)}/status`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify({ status }),
  });
}

export function uploadImageAdmin(token: string, file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('file', file);
  return apiFetch<{ url: string }>('/api/admin/upload', {
    method: 'POST',
    headers: authHeaders(token),
    body: formData,
  });
}

export function deleteImageAdmin(token: string, filename: string): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(`/api/admin/upload/${encodeURIComponent(filename)}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
}
