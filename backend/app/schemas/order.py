from typing import List, Optional
from pydantic import BaseModel
from app.schemas.product import Product
from datetime import datetime
from enum import Enum

# Cart Schemas
class CartItemBase(BaseModel):
    product_id: int
    quantity: int

class CartItemCreate(CartItemBase):
    pass

class CartItemUpdate(CartItemBase):
    pass

class CartItem(CartItemBase):
    id: int
    product: Product

    class Config:
        from_attributes = True

class Cart(BaseModel):
    id: int
    items: List[CartItem] = []
    total_price: float = 0.0 # Computed field

    class Config:
        from_attributes = True

# Order Schemas
class OrderStatus(str, Enum):
    PLACED = "PLACED"
    SHIPPED = "SHIPPED"
    DELIVERED = "DELIVERED"

class OrderItemBase(BaseModel):
    product_id: int
    quantity: int

class OrderItem(OrderItemBase):
    price_at_purchase: float
    product: Product
    
    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    # Usually created from cart, but basic structure
    pass

class Order(BaseModel):
    id: int
    total_amount: float
    status: OrderStatus
    items: List[OrderItem]
    created_at: datetime

    class Config:
        from_attributes = True
