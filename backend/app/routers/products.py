from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductOut, ProductUpdate
from app.utils.slug import slugify
from app.utils.auth import verify_admin

public_router = APIRouter(prefix="/api/products", tags=["products"])
admin_router = APIRouter(prefix="/api/admin/products", tags=["admin-products"])

# OPEN ENDPOINTS

# Endpoint For getting all products which is active
@public_router.get("", response_model=List[ProductOut])
def list_products(db: Session = Depends(get_db)):
    return db.query(Product).filter(Product.in_stock == True).order_by(Product.created_at.desc()).all()

# Endpoint For getting the product with this slug
@public_router.get("/{slug}", response_model=ProductOut)
def get_product(slug: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.slug == slug).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product Not Found")
    return product


# ADMIN ENDPOINTS

# Endpoint for getting only Deactivated Products
@admin_router.get("/getonlydeleted", response_model=List[ProductOut], dependencies=[Depends(verify_admin)])
def get_deleted_products(db: Session = Depends(get_db)):
    products = db.query(Product).filter(Product.in_stock == False).order_by(Product.created_at.desc()).all()
    return products

# Endpoint For getting both type of products: Activated And Deactivated
@admin_router.get("/getall", response_model=List[ProductOut], dependencies=[Depends(verify_admin)])
def get_all(db: Session = Depends(get_db)):
    products = db.query(Product).order_by(Product.created_at.desc()).all()
    return products

# Endpoint For Creating a new product
@admin_router.post("", response_model=ProductOut, status_code=201, dependencies=[Depends(verify_admin)])
def create_product(payload: ProductCreate, db: Session = Depends(get_db)):
    base_slug = slugify(payload.name)
    slug = base_slug
    counter = 1
    while db.query(Product).filter(Product.slug == slug).first():
        counter += 1
        slug = f"{base_slug}-{counter}"

    product = Product(slug=slug, **payload.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

# Endpoint For Change something in product
@admin_router.patch("/{product_id}", response_model=ProductOut, dependencies=[Depends(verify_admin)])
def update_product(product_id: str, payload: ProductUpdate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(product, field, value)

    db.commit()
    db.refresh(product)
    return product

# Endpoint For Deactivate the product
@admin_router.delete("/{product_id}", dependencies=[Depends(verify_admin)])
def deactivate_product(product_id: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if product.in_stock == 0:
        raise HTTPException(status_code=400, detail="Product already deleted")

    product.in_stock = False
    product.quantity_available = 0
    db.commit()
    return {"message": "Product Succefully Deleted"}