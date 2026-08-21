from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field, EmailStr


class OrderItemIn(BaseModel):
    """One line item as sent by the frontend when placing an order."""
    product_id: str = Field(alias="productId")
    quantity: int

    model_config = ConfigDict(populate_by_name=True)


class OrderItemOut(BaseModel):
    """One line item as returned to the frontend, including the price/name snapshot."""
    product_id: str = Field(alias="productId")
    product_name: str = Field(alias="productName")
    price: float
    quantity: int

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class OrderCreate(BaseModel):
    """
    Request body for POST /api/orders. EmailStr on customer_email validates
    the format before it ever reaches the database or the confirmation-email step.
    """
    customer_name: str = Field(alias="customerName")
    customer_phone: str = Field(alias="customerPhone")
    customer_email: EmailStr = Field(alias="customerEmail")
    customer_address: str = Field(alias="customerAddress")
    city: str
    zip_code: Optional[str] = Field(default=None, alias="zipCode")
    comment: Optional[str] = None
    items: List[OrderItemIn]

    model_config = ConfigDict(populate_by_name=True)


class OrderOut(BaseModel):
    """Full order response shape, including all line items, for the frontend/admin panel."""
    id: str
    customer_name: str = Field(alias="customerName")
    customer_phone: str = Field(alias="customerPhone")
    customer_email: EmailStr = Field(alias="customerEmail")
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
    """Request body for PATCH /api/admin/orders/{id}/status."""
    status: str
