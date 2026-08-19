"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { uploadImageAdmin, deleteImageAdmin, resolveImageUrl, ApiError, type Product, type CreateProductInput, type UpdateProductInput } from '@/lib/api';
import { cn } from '@/lib/utils';
import { isValidPrice, isValidNonNegativeInt, isValidImageUrl } from '@/lib/validation';

type ProductFormProps = {
  product?: Product | null;
  token: string;
  onCancel: () => void;
  onSubmit: (input: CreateProductInput | UpdateProductInput) => Promise<void>;
};

type FieldKey = 'name' | 'price' | 'oldPrice' | 'quantityAvailable' | 'images';
type FieldErrors = Partial<Record<FieldKey, string>>;

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 150;

export function ProductForm({ product, token, onCancel, onSubmit }: ProductFormProps) {
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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const images = imagesText.split('\n').map((s) => s.trim()).filter(Boolean);

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setUploadError(null);
    setIsUploading(true);
    try {
      const { url } = await uploadImageAdmin(token, file);
      setImagesText((prev) => (prev.trim() ? `${prev.trim()}\n${url}` : url));
      clearFieldError('images');
    } catch (err) {
      setUploadError(err instanceof ApiError ? err.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const removed = images[index];
    setImagesText(images.filter((_, i) => i !== index).join('\n'));
    if (removed.startsWith('/static/uploads/')) {
      deleteImageAdmin(token, removed.split('/').pop()!).catch(() => {});
    }
  };

  const validate = (): FieldErrors => {
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
      errors.images = 'Each image must be a valid URL or an uploaded file.';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const errors = validate();
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
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-forest">Images</label>
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-medium text-terracotta hover:text-terracotta-light disabled:opacity-60"
            >
              {isUploading ? 'Uploading...' : '+ Upload image'}
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelected} className="hidden" />
          </div>

          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {images.map((url, i) => (
                <div key={`${url}-${i}`} className="relative w-16 h-16 rounded-lg overflow-hidden border border-sand bg-linen">
                  <Image src={resolveImageUrl(url)} alt="" fill unoptimized className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-charcoal/70 text-white flex items-center justify-center"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {uploadError && <p className="text-terracotta text-xs mb-1">{uploadError}</p>}

          <textarea value={imagesText} onChange={(e) => { setImagesText(e.target.value); clearFieldError('images'); }} rows={3} placeholder="https://.../image1.jpg or paste one URL per line" className={fieldClass('images')} />
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
