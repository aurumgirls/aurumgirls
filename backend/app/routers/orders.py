from typing import List, Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.order import OrderCreate, OrderOut, OrderStatusUpdate
from app.utils.auth import verify_admin
from app.services import order_service

public_router = APIRouter(prefix="/api/orders", tags=["orders"])
admin_router = APIRouter(prefix="/api/admin/orders", tags=["admin-orders"])

# PUBLIC ENDPOINTS


@public_router.post("", response_model=OrderOut, status_code=201)
def create_order(payload: OrderCreate, db: Session = Depends(get_db)):
    """Creates a new order from the cart. See order_service.create_order for the logic."""
    return order_service.create_order(payload, db)


@public_router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: str, db: Session = Depends(get_db)):
    """Fetches a single order by id — public so a customer can check their own order."""
    return order_service.get_order_or_404(order_id, db)


# ADMIN ENDPOINTS


@admin_router.get("", response_model=List[OrderOut], dependencies=[Depends(verify_admin)])
def list_orders(status: Optional[str] = None, db: Session = Depends(get_db)):
    """Lists orders for the admin panel, optionally filtered by status."""
    return order_service.list_orders(status, db)


@admin_router.patch("/{order_id}/status", response_model=OrderOut, dependencies=[Depends(verify_admin)])
def update_order_status(order_id: str, payload: OrderStatusUpdate, db: Session = Depends(get_db)):
    """Updates an order's status (pending -> paid -> processing -> shipped -> completed)."""
    return order_service.update_order_status(order_id, payload.status, db)
