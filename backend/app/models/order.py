import uuid
from sqlalchemy import Column, String, Float, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class Order(Base):
    """
    A customer order. Snapshots of item name/price live on OrderItem (not here),
    so this row stays accurate even if a product's price/name changes later.
    """

    __tablename__ = "orders"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))

    # Contact/shipping details entered at checkout.
    # Lengths mirror the limits enforced in schemas/order.py (OrderCreate) —
    # keeping them in sync means a value that passes schema validation is
    # also guaranteed to fit the column, and vice versa.
    customer_name = Column(String(100), nullable=False)
    customer_phone = Column(String(20), nullable=False)
    customer_email = Column(String, nullable=False)
    customer_address = Column(String(255), nullable=False)
    city = Column(String(100), nullable=False)
    zip_code = Column(String(20), nullable=True)
    comment = Column(String(500), nullable=True)

    # Computed once at order creation (sum of item price * quantity); not
    # recalculated later even if product prices change afterward.
    total_price = Column(Float, nullable=False)

    # One of: pending, paid, processing, shipped, completed, cancelled
    # (see VALID_STATUSES in services/order_service.py — keep that set in
    # sync with whatever statuses the frontend/admin panel actually use).
    status = Column(String(20), nullable=False, default="pending")

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Cascade delete: if an Order row is deleted, its OrderItem rows go with it.
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
