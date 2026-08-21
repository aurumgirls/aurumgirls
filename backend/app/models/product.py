import uuid
from sqlalchemy import Column, String, Float, Integer, Boolean, DateTime, ARRAY, CheckConstraint
from sqlalchemy.sql import func

from app.database import Base


class Product(Base):
    """A single product listing (e.g. a honey jar) shown on the shop."""

    __tablename__ = "products"
    __table_args__ = (
        # DB-level safety nets: even if application code has a bug, Postgres
        # itself will refuse to save a product with a non-positive price or
        # a negative stock count.
        CheckConstraint("price > 0", name="check_price_positive"),
        CheckConstraint("quantity_available >= 0", name="check_quantity_non_negative"),
    )

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))

    # URL-friendly identifier used in public product URLs, e.g. /products/wildflower-honey
    slug = Column(String, unique=True, index=True, nullable=False)

    name = Column(String(200), nullable=False)
    description = Column(String, nullable=True)

    price = Column(Float, nullable=False)
    # Optional "was" price, shown as a strikethrough when the product is discounted.
    old_price = Column(Float, nullable=True)

    images = Column(ARRAY(String), default=list)

    # in_stock is the flag actually used to decide whether a product shows up
    # on the public site (see products.py: filter(Product.in_stock == True)).
    # It's also used as a soft-delete: "deactivating" a product just sets this False.
    in_stock = Column(Boolean, default=True)
    quantity_available = Column(Integer, default=0)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
