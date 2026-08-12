import uuid
from sqlalchemy import Column, String, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    order_id = Column(String, ForeignKey("orders.id"), nullable=False)
    product_id = Column(String, ForeignKey("products.id"), nullable=False)

    product_name = Column(String, nullable=False)  # снимок названия на момент заказа
    price = Column(Float, nullable=False)  # снимок цены на момент заказа
    quantity = Column(Integer, nullable=False)

    order = relationship("Order", back_populates="items")