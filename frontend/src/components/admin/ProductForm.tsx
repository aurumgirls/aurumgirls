"use client";

import { useState } from 'react';
import type { Product, CreateProductInput, UpdateProductInput } from '@/lib/api';
import { cn } from '@/lib/utils';
import { isValidPrice, isValidNonNegativeInt, isValidImageUrl } from '@/lib/validation';

type ProductFormProps = {
  product?: Product | null;
  onCancel: () => void;
  onSubmit: (input: CreateProductInput | UpdateProductInput) => Promise<void>;
};

type FieldKey = 'name' | 'price' | 'oldPrice' | 'quantityAvailable' | 'images';
type FieldErrors = Partial<Record<FieldKey, string>>;

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 150;

export function ProductForm({ product, onCancel, onSubmit }: ProductFormProps) {
  const isEdit = !!product;

  const [name, setName] = useState(product?.name ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [price, setPrice] = useState(product ? String(product.price) : '');
  const [oldPrice, setOldPrice] = useState(product?.oldPrice != null ? String(product.oldPrice) : '');
  const [imagesText, setImagesText] = useState(product?.images.join('\n') ?? '');
  const [quantityAvailable, setQuantityAvailable] = useState(product ? String(product.quantityAvailable) : '0');
  const [inStock, setInStock] = useState(product?.inStock ?? true);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = (images: string[]): FieldErrors => {
    const errors: FieldErrors = {};
    const trimmedName = name.trim();
    if (trimmedName.length < MIN_NAME_LENGTH || trimmedName.length > MAX_NAME_LENGTH) {
      errors.name = `Name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.`;
    }
    if (!isValidPrice(price)) {
      errors.price = 'Price must be a positive number (up to 2 decimals).';
    }
    if (oldPrice.trim() && !isValidPrice(oldPrice)) {
      errors.oldPrice = 'Old price must be a positive number (up to 2 decimals).';
    } else if (oldPrice.trim() && isValidPrice(price) && Number(oldPrice) <= Number(price)) {
      errors.oldPrice = 'Old price should be greater than the current price.';
    }
    if (!isValidNonNegativeInt(quantityAvailable)) {
      errors.quantityAvailable = 'Quantity must be a whole number, 0 or greater.';
    }
    if (images.some((url) => !isValidImageUrl(url))) {
      errors.images = 'Each image URL must start with http:// or https://.';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const images = imagesText.split('\n').map((s) => s.trim()).filter(Boolean);
    const errors = validate(images);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSaving(true);
    try {
      if (isEdit) {
        const input: UpdateProductInput = {
          name: name.trim(),
          description,
          price: Number(price),
          images,
          quantityAvailable: Number(quantityAvailable),
          inStock,
        };
        if (oldPrice.trim()) input.oldPrice = Number(oldPrice);
        await onSubmit(input);
      } else {
        const input: CreateProductInput = {
          name: name.trim(),
          description,
          price: Number(price),
          images,
          quantityAvailable: Number(quantityAvailable),
        };
        await onSubmit(input);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product');
    } finally {
      setIsSaving(false);
    }
  };

  const fieldClass = (field: FieldKey) =>
    cn(
      "w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none",
      fieldErrors[field] ? "border-terracotta focus:border-terracotta" : "border-sand focus:border-terracotta"
    );

  const clearFieldError = (field: FieldKey) =>
    setFieldErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white p-6 rounded-2xl border border-sand space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-forest mb-1">Name</label>
          <input type="text" value={name} onChange={(e) => { setName(e.target.value); clearFieldError('name'); }} className={fieldClass('name')} />
          {fieldErrors.name && <p className="text-terracotta text-xs mt-1">{fieldErrors.name}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-forest mb-1">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-sand text-sm focus:outline-none focus:border-terracotta" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-forest mb-1">Price</label>
          <input type="text" inputMode="decimal" value={price} onChange={(e) => { setPrice(e.target.value); clearFieldError('price'); }} className={fieldClass('price')} />
          {fieldErrors.price && <p className="text-terracotta text-xs mt-1">{fieldErrors.price}</p>}
        </div>

        {isEdit && (
          <div>
            <label className="block text-xs font-semibold text-forest mb-1">Old Price (optional)</label>
            <input type="text" inputMode="decimal" value={oldPrice} onChange={(e) => { setOldPrice(e.target.value); clearFieldError('oldPrice'); }} className={fieldClass('oldPrice')} />
            {fieldErrors.oldPrice && <p className="text-terracotta text-xs mt-1">{fieldErrors.oldPrice}</p>}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-forest mb-1">Quantity Available</label>
          <input type="text" inputMode="numeric" value={quantityAvailable} onChange={(e) => { setQuantityAvailable(e.target.value); clearFieldError('quantityAvailable'); }} className={fieldClass('quantityAvailable')} />
          {fieldErrors.quantityAvailable && <p className="text-terracotta text-xs mt-1">{fieldErrors.quantityAvailable}</p>}
        </div>

        {isEdit && (
          <div className="flex items-center gap-2 mt-6">
            <input id="inStock" type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="w-4 h-4" />
            <label htmlFor="inStock" className="text-sm text-charcoal">In stock</label>
          </div>
        )}

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-forest mb-1">Image URLs (one per line)</label>
          <textarea value={imagesText} onChange={(e) => { setImagesText(e.target.value); clearFieldError('images'); }} rows={3} placeholder="https://.../image1.jpg" className={fieldClass('images')} />
          {fieldErrors.images && <p className="text-terracotta text-xs mt-1">{fieldErrors.images}</p>}
        </div>
      </div>

      {error && <p className="text-terracotta text-sm">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2.5 bg-terracotta hover:bg-terracotta-light disabled:opacity-60 text-white rounded-full text-sm font-medium transition-colors"
        >
          {isSaving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Product'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 bg-white border border-sand text-charcoal rounded-full text-sm font-medium hover:bg-linen transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
