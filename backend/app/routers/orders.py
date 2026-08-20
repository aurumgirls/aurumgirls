from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.database import get_db
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product
from app.schemas.order import OrderCreate, OrderOut, OrderStatusUpdate
from app.utils.auth import verify_admin

public_router = APIRouter(prefix="/api/orders", tags=["orders"])
admin_router = APIRouter(prefix="/api/admin/orders", tags=["admin-orders"])

VALID_STATUSES = {"pending", "paid", "processing", "shipped", "completed", "cancelled"}

# PUBLIC ENDPOINTS
@public_router.post("", response_model=OrderOut, status_code=201)
def create_order(payload: OrderCreate, db: Session = Depends(get_db)):
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
    return order


@public_router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: str, db: Session = Depends(get_db)):
    order = db.query(Order).options(joinedload(Order.items)).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

# ADMIN ENDPOINTS

@admin_router.get("", response_model=List[OrderOut], dependencies=[Depends(verify_admin)])
def list_orders(status: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Order).options(joinedload(Order.items))
    if status:
        query = query.filter(Order.status == status)
    return query.order_by(Order.created_at.desc()).all()


@admin_router.patch("/{order_id}/status", response_model=OrderOut, dependencies=[Depends(verify_admin)])
def update_order_status(order_id: str, payload: OrderStatusUpdate, db: Session = Depends(get_db)):
    if payload.status not in VALID_STATUSES:
        raise HTTPException(status_code=400, detail=f"Invalid status. Allowed: {sorted(VALID_STATUSES)}")

    order = db.query(Order).options(joinedload(Order.items)).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.status = payload.status
    db.commit()
    db.refresh(order)
    return order
