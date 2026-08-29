from typing import List

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate
from app.utils.slug import slugify


def get_product_by_slug_or_404(slug: str, db: Session) -> Product:
    """Used by the public product-detail route."""
    product = db.query(Product).filter(Product.slug == slug).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product Not Found")
    return product


def get_product_by_id_or_404(product_id: str, db: Session) -> Product:
    """
    Shared lookup for the two admin routes that act on a product by id
    (update and deactivate) — avoids repeating the same query + 404 check.
    """
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


def list_active_products(db: Session) -> List[Product]:
    """Public shop listing — only products currently marked in_stock."""
    return db.query(Product).filter(Product.in_stock == True).order_by(Product.created_at.desc()).all()


def list_deleted_products(db: Session) -> List[Product]:
    """Admin panel: only deactivated products."""
    return db.query(Product).filter(Product.in_stock == False).order_by(Product.created_at.desc()).all()


def list_all_products(db: Session) -> List[Product]:
    """Admin panel: every product regardless of state."""
    return db.query(Product).order_by(Product.created_at.desc()).all()


def generate_unique_slug(name: str, db: Session) -> str:
    """
    Turns a product name into a slug and appends -2, -3, etc. if the base
    slug is already taken. Pulled out on its own since slug generation is
    the one piece of create_product's logic that could plausibly be reused
    elsewhere (e.g. a future bulk-import feature).
    """
    base_slug = slugify(name)
    slug = base_slug
    counter = 1
    while db.query(Product).filter(Product.slug == slug).first():
        counter += 1
        slug = f"{base_slug}-{counter}"
    return slug


def create_product(payload: ProductCreate, db: Session) -> Product:
    """Creates a new product with a guaranteed-unique slug."""
    slug = generate_unique_slug(payload.name, db)
    product = Product(slug=slug, **payload.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


def update_product(product_id: str, payload: ProductUpdate, db: Session) -> Product:
    """Partially updates a product — only fields actually sent are changed."""
    product = get_product_by_id_or_404(product_id, db)
    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(product, field, value)
    db.commit()
    db.refresh(product)
    return product


def deactivate_product(product_id: str, db: Session) -> None:
    """Soft-deletes a product: marks it out of stock instead of deleting the row."""
    product = get_product_by_id_or_404(product_id, db)
    if product.in_stock == 0:
        raise HTTPException(status_code=400, detail="Product already deleted")
    product.in_stock = False
    product.quantity_available = 0
    db.commit()
