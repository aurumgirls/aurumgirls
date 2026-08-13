"use client";

import { useCallback, useEffect, useState } from 'react';
import { listOrdersAdmin, updateOrderStatusAdmin, ApiError, type Order } from '@/lib/api';
import { CURRENCY, ORDER_STATUSES } from '@/lib/constants';
import { useAdminGuard } from '@/components/admin/useAdminGuard';
import { AdminNav } from '@/components/admin/AdminNav';
import { cn } from '@/lib/utils';

export default function AdminOrdersPage() {
  const { token, ready, logout } = useAdminGuard();
  const [statusFilter, setStatusFilter] = useState('');
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Pure fetch, no state writes — safe to call directly from the effect below.
  const fetchOrders = useCallback((): Promise<Order[]> => {
    if (!token) return Promise.resolve([]);
    return listOrdersAdmin(token, statusFilter || undefined);
  }, [token, statusFilter]);

  const applyOrders = useCallback((data: Order[]) => {
    setOrders(data);
    setLoadError(null);
  }, []);

  const applyLoadError = useCallback((err: unknown) => {
    if (err instanceof ApiError && err.status === 401) {
      logout();
      return;
    }
    setLoadError(err instanceof Error ? err.message : 'Failed to load orders');
  }, [logout]);

  // Reusable reload for after a status change (not called from an effect).
  const loadOrders = useCallback(async () => {
    try {
      applyOrders(await fetchOrders());
    } catch (err) {
      applyLoadError(err);
    }
  }, [fetchOrders, applyOrders, applyLoadError]);

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    fetchOrders()
      .then((data) => { if (!cancelled) applyOrders(data); })
      .catch((err) => { if (!cancelled) applyLoadError(err); });
    return () => { cancelled = true; };
  }, [ready, fetchOrders, applyOrders, applyLoadError]);

  if (!ready) return null;

  const handleStatusChange = async (order: Order, status: string) => {
    setUpdatingId(order.id);
    try {
      await updateOrderStatusAdmin(token!, order.id, status);
      await loadOrders();
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        logout();
        return;
      }
      alert(err instanceof Error ? err.message : 'Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <AdminNav onLogout={logout} />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-display text-forest mb-6">Orders</h1>

        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setStatusFilter('')}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium border transition-colors capitalize",
              statusFilter === '' ? "bg-forest text-cream border-forest" : "bg-white text-charcoal border-sand hover:bg-linen"
            )}
          >
            All
          </button>
          {ORDER_STATUSES.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium border transition-colors capitalize",
                statusFilter === status ? "bg-forest text-cream border-forest" : "bg-white text-charcoal border-sand hover:bg-linen"
              )}
            >
              {status}
            </button>
          ))}
        </div>

        {loadError && <p className="text-terracotta text-sm mb-4">{loadError}</p>}

        {!orders ? (
          <p className="text-slate">Loading…</p>
        ) : orders.length === 0 ? (
          <p className="text-slate">No orders in this view.</p>
        ) : (
          <div className="bg-white rounded-2xl border border-sand overflow-hidden overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-linen text-left text-xs uppercase text-slate">
                <tr>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">City / Address</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Placed</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-sand align-top">
                    <td className="px-4 py-3 font-medium text-forest">{order.customerName}</td>
                    <td className="px-4 py-3 text-slate">{order.customerPhone}</td>
                    <td className="px-4 py-3 text-slate">{order.city} — {order.customerAddress}</td>
                    <td className="px-4 py-3 text-slate">
                      {order.items.map((item) => `${item.quantity}× ${item.productName}`).join(', ')}
                    </td>
                    <td className="px-4 py-3 font-medium">{order.totalPrice.toFixed(2)} {CURRENCY}</td>
                    <td className="px-4 py-3 text-slate">{new Date(order.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        disabled={updatingId === order.id}
                        onChange={(e) => handleStatusChange(order, e.target.value)}
                        className="px-3 py-1.5 rounded-lg border border-sand text-sm capitalize disabled:opacity-60"
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
