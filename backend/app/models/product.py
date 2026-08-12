import uuid
from sqlalchemy import Column, String, Float, Integer, Boolean, DateTime, ARRAY
from sqlalchemy.sql import func

from app.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    slug = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    price = Column(Float, nullable=False)
    old_price = Column(Float, nullable=True)
    images = Column(ARRAY(String), default=list)
    in_stock = Column(Boolean, default=True)
    quantity_available = Column(Integer, default=0)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())