from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field


class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    images: List[str] = []
    quantity_available: int = Field(default=0, alias="quantityAvailable")

    model_config = ConfigDict(populate_by_name=True)


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    old_price: Optional[float] = Field(default=None, alias="oldPrice")
    images: Optional[List[str]] = None
    in_stock: Optional[bool] = Field(default=None, alias="inStock")
    quantity_available: Optional[int] = Field(default=None, alias="quantityAvailable")

    model_config = ConfigDict(populate_by_name=True)


class ProductOut(ProductBase):
    id: str
    slug: str
    old_price: Optional[float] = Field(default=None, alias="oldPrice")
    in_stock: bool = Field(alias="inStock")
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)