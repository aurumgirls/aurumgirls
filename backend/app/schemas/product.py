from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field


class ProductBase(BaseModel):
    """Shared fields between creating and reading a product."""
    # max_length values mirror the DB column limits; price/quantity bounds
    # mirror the CheckConstraints on the Product model — validating here
    # means a bad value gets a clean 400 instead of only being caught by
    # the DB and surfacing as a 500.
    name: str = Field(max_length=200)
    description: Optional[str] = Field(default=None, max_length=2000)
    price: float = Field(gt=0)
    images: List[str] = Field(default=[], max_length=10)
    quantity_available: int = Field(default=0, ge=0, alias="quantityAvailable")

    model_config = ConfigDict(populate_by_name=True)


class ProductCreate(ProductBase):
    """Request body for POST /api/admin/products (creating a new product)."""
    pass


class ProductUpdate(BaseModel):
    """
    Request body for PATCH /api/admin/products/{id}.
    Every field is optional — only the fields actually sent are updated
    (see update_data = payload.model_dump(exclude_unset=True) in the router).
    """
    name: Optional[str] = Field(default=None, max_length=200)
    description: Optional[str] = Field(default=None, max_length=2000)
    price: Optional[float] = Field(default=None, gt=0)
    old_price: Optional[float] = Field(default=None, gt=0, alias="oldPrice")
    images: Optional[List[str]] = Field(default=None, max_length=10)
    in_stock: Optional[bool] = Field(default=None, alias="inStock")
    quantity_available: Optional[int] = Field(default=None, ge=0, alias="quantityAvailable")

    model_config = ConfigDict(populate_by_name=True)


class ProductOut(ProductBase):
    """
    Response shape returned to the frontend. Uses camelCase aliases
    (oldPrice, inStock, createdAt, updatedAt) to match what the Next.js
    frontend expects, while the Python/DB side stays snake_case.
    """
    id: str
    slug: str
    old_price: Optional[float] = Field(default=None, alias="oldPrice")
    in_stock: bool = Field(alias="inStock")
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
