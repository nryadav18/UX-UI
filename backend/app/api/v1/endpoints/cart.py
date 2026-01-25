from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api import deps
from app.services import cart_service
from app.schemas.order import Cart, CartItemCreate

router = APIRouter()

@router.get("/", response_model=Cart)
def view_cart(
    db: Session = Depends(deps.get_db),
    current_user: Any = Depends(deps.get_current_active_user),
) -> Any:
    return cart_service.get_cart(db, current_user.id)

@router.post("/add", response_model=Cart)
def add_item_to_cart(
    *,
    db: Session = Depends(deps.get_db),
    item_in: CartItemCreate,
    current_user: Any = Depends(deps.get_current_active_user),
) -> Any:
    return cart_service.add_to_cart(db, current_user.id, item_in.product_id, item_in.quantity)

@router.delete("/remove/{product_id}", response_model=Cart)
def remove_item_from_cart(
    product_id: int,
    db: Session = Depends(deps.get_db),
    current_user: Any = Depends(deps.get_current_active_user),
) -> Any:
    return cart_service.remove_from_cart(db, current_user.id, product_id)
