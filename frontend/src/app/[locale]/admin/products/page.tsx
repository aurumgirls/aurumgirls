"use client";

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  getAllProductsAdmin,
  getDeletedProductsAdmin,
  createProductAdmin,
  updateProductAdmin,
  deactivateProductAdmin,
  resolveImageUrl,
  ApiError,
  type Product,
  type CreateProductInput,
  type UpdateProductInput,
} from '@/lib/api';
import { CURRENCY, FALLBACK_SWATCH } from '@/lib/constants';
import { useAdminGuard } from '@/components/admin/useAdminGuard';
import { AdminNav } from '@/components/admin/AdminNav';
import { ProductForm } from '@/components/admin/ProductForm';
import { cn } from '@/lib/utils';

type View = 'active' | 'deactivated' | 'all';

export default function AdminProductsPage() {
  const { token, ready, logout } = useAdminGuard();
  const [view, setView] = useState<View>('active');
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<'closed' | 'create' | 'edit'>('closed');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Pure fetch, no state writes — safe to call directly from the effect below.
  const fetchProducts = useCallback((): Promise<Product[]> => {
    if (!token) return Promise.resolve([]);
    return view === 'deactivated' ? getDeletedProductsAdmin(token) : getAllProductsAdmin(token);
  }, [token, view]);

  const applyProducts = useCallback((data: Product[]) => {
    setProducts(view === 'active' ? data.filter((p) => p.inStock) : data);
    setLoadError(null);
  }, [view]);

  const applyLoadError = useCallback((err: unknown) => {
    if (err instanceof ApiError && err.status === 401) {
      logout();
      return;
    }
    setLoadError(err instanceof Error ? err.message : 'Failed to load products');
  }, [logout]);

  // Reusable reload for after create/edit/deactivate actions (not called from an effect).
  const loadProducts = useCallback(async () => {
    try {
      applyProducts(await fetchProducts());
    } catch (err) {
      applyLoadError(err);
    }
  }, [fetchProducts, applyProducts, applyLoadError]);

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    fetchProducts()
      .then((data) => { if (!cancelled) applyProducts(data); })
      .catch((err) => { if (!cancelled) applyLoadError(err); });
    return () => { cancelled = true; };
  }, [ready, fetchProducts, applyProducts, applyLoadError]);

  if (!ready) return null;

  const handleCreate = async (input: CreateProductInput | UpdateProductInput) => {
    await createProductAdmin(token!, input as CreateProductInput);
    setFormMode('closed');
    await loadProducts();
  };

  const handleUpdate = async (input: CreateProductInput | UpdateProductInput) => {
    if (!editingProduct) return;
    await updateProductAdmin(token!, editingProduct.id, input as UpdateProductInput);
    setFormMode('closed');
    setEditingProduct(null);
    await loadProducts();
  };

  const handleDeactivate = async (product: Product) => {
    if (!confirm(`Deactivate "${product.name}"?`)) return;
    try {
      await deactivateProductAdmin(token!, product.id);
      await loadProducts();
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        logout();
        return;
      }
      alert(err instanceof Error ? err.message : 'Failed to deactivate product');
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <AdminNav onLogout={logout} />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-display text-forest">Products</h1>
          <button
            onClick={() => {
              setEditingProduct(null);
              setFormMode(formMode === 'create' ? 'closed' : 'create');
            }}
            className="px-5 py-2.5 bg-forest hover:bg-forest-light text-cream rounded-full text-sm font-medium transition-colors"
          >
            {formMode === 'create' ? 'Close' : '+ New Product'}
          </button>
        </div>

        {formMode === 'create' && (
          <div className="mb-8">
            <ProductForm token={token!} onCancel={() => setFormMode('closed')} onSubmit={handleCreate} />
          </div>
        )}

        {formMode === 'edit' && editingProduct && (
          <div className="mb-8">
            <ProductForm product={editingProduct} token={token!} onCancel={() => { setFormMode('closed'); setEditingProduct(null); }} onSubmit={handleUpdate} />
          </div>
        )}

        <div className="flex gap-2 mb-6">
          {(['active', 'deactivated', 'all'] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium border transition-colors capitalize",
                view === v ? "bg-forest text-cream border-forest" : "bg-white text-charcoal border-sand hover:bg-linen"
              )}
            >
              {v}
            </button>
          ))}
        </div>

        {loadError && <p className="text-terracotta text-sm mb-4">{loadError}</p>}

        {!products ? (
          <p className="text-slate">Loading…</p>
        ) : products.length === 0 ? (
          <p className="text-slate">No products in this view.</p>
        ) : (
          <div className="bg-white rounded-2xl border border-sand overflow-hidden overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-linen text-left text-xs uppercase text-slate">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-sand">
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden relative flex items-center justify-center" style={{ backgroundColor: FALLBACK_SWATCH }}>
                        {product.images[0] && (
                          <Image src={resolveImageUrl(product.images[0])} alt={product.name} fill unoptimized className="object-contain p-1" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-forest">{product.name}</td>
                    <td className="px-4 py-3 text-slate">{product.slug}</td>
                    <td className="px-4 py-3">
                      {product.price.toFixed(2)} {CURRENCY}
                      {product.oldPrice != null && (
                        <span className="text-slate line-through ml-2">{product.oldPrice.toFixed(2)} {CURRENCY}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">{product.quantityAvailable}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "px-2 py-1 rounded-md text-xs font-semibold",
                        product.inStock ? "bg-forest/10 text-forest" : "bg-terracotta/10 text-terracotta"
                      )}>
                        {product.inStock ? 'Active' : 'Deactivated'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditingProduct(product); setFormMode('edit'); }}
                          className="text-forest hover:text-terracotta text-xs font-medium"
                        >
                          Edit
                        </button>
                        {product.inStock && (
                          <button
                            onClick={() => handleDeactivate(product)}
                            className="text-terracotta hover:text-terracotta-light text-xs font-medium"
                          >
                            Deactivate
                          </button>
                        )}
                      </div>
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
