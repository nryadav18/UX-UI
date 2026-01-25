from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class Cart(Base):
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    
    # Relationships
    items = relationship("CartItem", back_populates="cart", cascade="all, delete-orphan")
    user = relationship("User")

class CartItem(Base):
    id = Column(Integer, primary_key=True, index=True)
    cart_id = Column(Integer, ForeignKey("cart.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("product.id"), nullable=False)
    quantity = Column(Integer, default=1)
    
    # Relationships
    cart = relationship("Cart", back_populates="items")
    product = relationship("Product")
