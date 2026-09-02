import uuid
from sqlalchemy import Column, String, Integer, Float, ForeignKey, CheckConstraint
from sqlalchemy.orm import relationship

from app.database import Base


class OrderItem(Base):
    """
    A single line item within an order. Stores its own snapshot of the product's
    name and price at the time of purchase, so historical orders stay accurate
    even if the product is later renamed, repriced, or deleted.
    """

    __tablename__ = "order_items"
    __table_args__ = (
        # DB-level safety nets, same idea as on Product: reject a quantity < 1
        # or a non-positive price even if application code has a bug.
        CheckConstraint("quantity >= 1", name="check_quantity_positive"),
        CheckConstraint("price > 0", name="check_item_price_positive"),
    )

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    order_id = Column(String, ForeignKey("orders.id"), nullable=False)
    product_id = Column(String, ForeignKey("products.id"), nullable=False)

    # 200 matches Product.name's limit — this is a snapshot copy of that field.
    product_name = Column(String(200), nullable=False)
    price = Column(Float, nullable=False)  # snapshot of the product price at order time
    quantity = Column(Integer, nullable=False)

    order = relationship("Order", back_populates="items")
