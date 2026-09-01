from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.product import ProductCreate, ProductOut, ProductUpdate
from app.utils.auth import verify_admin
from app.services import product_service

public_router = APIRouter(prefix="/api/products", tags=["products"])
admin_router = APIRouter(prefix="/api/admin/products", tags=["admin-products"])

# OPEN ENDPOINTS


@public_router.get("", response_model=List[ProductOut])
def list_products(db: Session = Depends(get_db)):
    """Public shop listing — active products only."""
    return product_service.list_active_products(db)


@public_router.get("/{slug}", response_model=ProductOut)
def get_product(slug: str, db: Session = Depends(get_db)):
    """Public product detail page, looked up by slug."""
    return product_service.get_product_by_slug_or_404(slug, db)


# ADMIN ENDPOINTS


@admin_router.get("/getonlydeleted", response_model=List[ProductOut], dependencies=[Depends(verify_admin)])
def get_deleted_products(db: Session = Depends(get_db)):
    """Admin panel: deactivated products only."""
    return product_service.list_deleted_products(db)


@admin_router.get("/getall", response_model=List[ProductOut], dependencies=[Depends(verify_admin)])
def get_all(db: Session = Depends(get_db)):
    """Admin panel: every product regardless of state."""
    return product_service.list_all_products(db)


@admin_router.post("", response_model=ProductOut, status_code=201, dependencies=[Depends(verify_admin)])
def create_product(payload: ProductCreate, db: Session = Depends(get_db)):
    """Creates a new product with an auto-generated unique slug."""
    return product_service.create_product(payload, db)


@admin_router.patch("/{product_id}", response_model=ProductOut, dependencies=[Depends(verify_admin)])
def update_product(product_id: str, payload: ProductUpdate, db: Session = Depends(get_db)):
    """Partially updates a product — only fields present in the request body change."""
    return product_service.update_product(product_id, payload, db)


@admin_router.delete("/{product_id}", dependencies=[Depends(verify_admin)])
def deactivate_product(product_id: str, db: Session = Depends(get_db)):
    """Soft-deletes a product (marks it out of stock rather than removing the row)."""
    product_service.deactivate_product(product_id, db)
    return {"message": "Product successfully deleted"}
