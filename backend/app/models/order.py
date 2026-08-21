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
    customer_name = Column(String, nullable=False)
    customer_phone = Column(String, nullable=False)
    customer_email = Column(String, nullable=False)
    customer_address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    zip_code = Column(String, nullable=True)
    comment = Column(String, nullable=True)

    # Computed once at order creation (sum of item price * quantity); not
    # recalculated later even if product prices change afterward.
    total_price = Column(Float, nullable=False)

    # One of: pending, paid, processing, shipped, completed, cancelled
    # (see VALID_STATUSES in routers/orders.py — keep that set in sync with
    # whatever statuses the frontend/admin panel actually use).
    status = Column(String, nullable=False, default="pending")

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Cascade delete: if an Order row is deleted, its OrderItem rows go with it.
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
