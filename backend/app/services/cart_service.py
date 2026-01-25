from sqlalchemy.orm import Session
from app.models.cart import Cart, CartItem
from app.models.product import Product
from fastapi import HTTPException

def get_cart(db: Session, user_id: int) -> Cart:
    cart = db.query(Cart).filter(Cart.user_id == user_id).first()
    if not cart:
        cart = Cart(user_id=user_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    
    # Calculate total price
    total = 0.0
    for item in cart.items:
        total += item.quantity * item.product.price
    cart.total_price = total
    return cart

def add_to_cart(db: Session, user_id: int, product_id: int, quantity: int) -> Cart:
    cart = get_cart(db, user_id)
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Check if item exists
    cart_item = db.query(CartItem).filter(CartItem.cart_id == cart.id, CartItem.product_id == product_id).first()
    if cart_item:
        cart_item.quantity += quantity
    else:
        cart_item = CartItem(cart_id=cart.id, product_id=product_id, quantity=quantity)
        db.add(cart_item)
    
    db.commit()
    db.refresh(cart)
    return get_cart(db, user_id) # Refresh total

def remove_from_cart(db: Session, user_id: int, product_id: int) -> Cart:
    cart = get_cart(db, user_id)
    cart_item = db.query(CartItem).filter(CartItem.cart_id == cart.id, CartItem.product_id == product_id).first()
    if cart_item:
        db.delete(cart_item)
        db.commit()
        db.refresh(cart)
    return get_cart(db, user_id)

def clear_cart(db: Session, cart_id: int):
    db.query(CartItem).filter(CartItem.cart_id == cart_id).delete()
    db.commit()
