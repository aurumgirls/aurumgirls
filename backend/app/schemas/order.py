from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field, EmailStr


class OrderItemIn(BaseModel):
    """One line item as sent by the frontend when placing an order."""
    product_id: str = Field(alias="productId")
    # gt=0: without this, a negative/zero quantity was only caught by the DB
    # CheckConstraint later, which surfaces as an ugly 500 instead of a clean
    # 400 with a real message.
    quantity: int = Field(gt=0)

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
    customer_name: str = Field(alias="customerName", min_length=2, max_length=100)
    customer_phone: str = Field(alias="customerPhone", min_length=7, max_length=20)
    customer_email: EmailStr = Field(alias="customerEmail")
    customer_address: str = Field(alias="customerAddress", min_length=5, max_length=255)
    city: str = Field(max_length=100)
    zip_code: Optional[str] = Field(default=None, max_length=20, alias="zipCode")
    comment: Optional[str] = Field(default=None, max_length=500)
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
