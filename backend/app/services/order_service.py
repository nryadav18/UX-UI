from sqlalchemy.orm import Session
from app.models.order import Order, OrderItem, OrderStatus
from app.services import cart_service
from fastapi import HTTPException

def place_order(db: Session, user_id: int) -> Order:
    cart = cart_service.get_cart(db, user_id)
    if not cart.items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    
    # Create Order
    new_order = Order(
        user_id=user_id,
        total_amount=cart.total_price,
        status=OrderStatus.PLACED
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    
    # Move items
    for item in cart.items:
        order_item = OrderItem(
            order_id=new_order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price_at_purchase=item.product.price
        )
        db.add(order_item)
    
    # Clear Cart
    cart_service.clear_cart(db, cart.id)
    db.commit()
    db.refresh(new_order)
    return new_order

def get_orders(db: Session, user_id: int):
    return db.query(Order).filter(Order.user_id == user_id).all()
