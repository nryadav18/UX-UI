from typing import List, Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api import deps
from app.services import order_service
from app.schemas.order import Order

router = APIRouter()

@router.post("/", response_model=Order)
def place_order(
    db: Session = Depends(deps.get_db),
    current_user: Any = Depends(deps.get_current_active_user),
) -> Any:
    return order_service.place_order(db, current_user.id)

@router.get("/", response_model=List[Order])
def list_orders(
    db: Session = Depends(deps.get_db),
    current_user: Any = Depends(deps.get_current_active_user),
) -> Any:
    return order_service.get_orders(db, current_user.id)
