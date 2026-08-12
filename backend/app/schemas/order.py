from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field

class OrderItemIn(BaseModel):
    product_id: str = Field(alias="productId")
    quantity: int

    model_config = ConfigDict(populate_by_name=True)


class OrderItemOut(BaseModel):
    product_id: str = Field(alias="productId")
    product_name: str = Field(alias="productName")
    price: float
    quantity: int

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class OrderCreate(BaseModel):
    customer_name: str = Field(alias="customerName")
    customer_phone: str = Field(alias="customerPhone")
    customer_address: str = Field(alias="customerAddress")
    city: str
    zip_code: Optional[str] = Field(default=None, alias="zipCode")
    comment: Optional[str] = None
    items: List[OrderItemIn]

    model_config = ConfigDict(populate_by_name=True)


class OrderOut(BaseModel):
    id: str
    customer_name: str = Field(alias="customerName")
    customer_phone: str = Field(alias="customerPhone")
    customer_address: str = Field(alias="customerAddress")
    city: str
    zip_code: Optional[str] = Field(default=None, alias="zipCode")
    comment: Optional[str] = None
    total_price: float = Field(alias="totalPrice")
    status: str
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")
    items: List[OrderItemOut] = []

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class OrderStatusUpdate(BaseModel):
    status: str