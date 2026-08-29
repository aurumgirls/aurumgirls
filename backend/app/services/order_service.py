from typing import List, Optional

from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload

from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product
from app.schemas.order import OrderCreate
from app.utils.email import send_order_confirmation_email

VALID_STATUSES = {"pending", "paid", "processing", "shipped", "completed", "cancelled"}


def get_order_or_404(order_id: str, db: Session) -> Order:
    """
    Shared lookup used by both the public 'get order' route and the admin
    status-update route — avoids repeating the same query + 404 check twice.
    """
    order = db.query(Order).options(joinedload(Order.items)).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


def create_order(payload: OrderCreate, db: Session) -> Order:
    """
    Core order-creation logic: validates stock, snapshots each item's
    name/price, decrements product stock, creates the Order + OrderItem rows,
    and sends the confirmation email. Kept out of the router so this can be
    reused (e.g. from an admin "create order manually" feature later) without
    duplicating the stock/snapshot logic.
    """
    if not payload.items:
        raise HTTPException(status_code=400, detail="Order must contain at least one item")

    total_price = 0.0
    order_items = []

    for item in payload.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")
        if not product.in_stock or product.quantity_available < item.quantity:
            raise HTTPException(status_code=400, detail=f"Not enough stock for {product.name}")

        order_items.append(OrderItem(
            product_id=product.id,
            product_name=product.name,
            price=product.price,
            quantity=item.quantity,
        ))

        total_price += product.price * item.quantity

        product.quantity_available -= item.quantity
        if product.quantity_available <= 0:
            product.in_stock = False

    order = Order(
        customer_name=payload.customer_name,
        customer_phone=payload.customer_phone,
        customer_email=payload.customer_email,
        customer_address=payload.customer_address,
        city=payload.city,
        zip_code=payload.zip_code,
        comment=payload.comment,
        total_price=total_price,
        status="pending",
        items=order_items,
    )
    db.add(order)
    db.commit()
    db.refresh(order)

    # Email failure is logged inside send_order_confirmation_email and never
    # raised — the order is already saved and should not be rolled back
    # just because the email didn't go out.
    send_order_confirmation_email(order.customer_email, order)

    return order


def list_orders(status: Optional[str], db: Session) -> List[Order]:
    """Used by the admin panel's order list, optionally filtered by status."""
    query = db.query(Order).options(joinedload(Order.items))
    if status:
        query = query.filter(Order.status == status)
    return query.order_by(Order.created_at.desc()).all()


def update_order_status(order_id: str, new_status: str, db: Session) -> Order:
    """Validates the requested status against VALID_STATUSES, then applies it."""
    if new_status not in VALID_STATUSES:
        raise HTTPException(status_code=400, detail=f"Invalid status. Allowed: {sorted(VALID_STATUSES)}")

    order = get_order_or_404(order_id, db)
    order.status = new_status
    db.commit()
    db.refresh(order)
    return order
