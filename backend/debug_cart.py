import sys
import os

# Add the current directory to sys.path so we can import app modules
sys.path.append(os.getcwd())

from app.db.session import SessionLocal
from app.models.cart import Cart, CartItem
from app.models.user import User
from app.models.product import Product
from app.services import cart_service
from sqlalchemy import text

db = SessionLocal()

try:
    print("1. Checking tables...")
    # Check if tables exist
    db.execute(text("SELECT 1 FROM cart LIMIT 1"))
    print("   SUCCESS: 'cart' table exists.")
    db.execute(text("SELECT 1 FROM cartitem LIMIT 1"))
    print("   SUCCESS: 'cartitem' table exists.")
    
    print("\n2. Checking User...")
    user = db.query(User).first()
    if not user:
        print("   INFO: No user found. Creating test user...")
        # Create a dummy user for testing if needed, though this might fail if password hashing is required and not imported
        # For now, just report
        print("   WARNING: No user found to test cart service.")
    else:
        print(f"   SUCCESS: Found user ID {user.id}")

        print("\n3. Checking Product...")
        product = db.query(Product).first()
        if not product:
            print("   INFO: No product found. Creating test product...")
            product = Product(
                name="Test Product",
                description="A test product",
                price=99.99,
                stock=10
            )
            db.add(product)
            db.commit()
            db.refresh(product)
            print(f"   SUCCESS: Created test product ID {product.id}")
        else:
            print(f"   SUCCESS: Found product ID {product.id}")
            
        print("\n4. Testing cart_service.add_to_cart...")
        try:
            cart = cart_service.add_to_cart(db, user.id, product.id, 1)
            print(f"   SUCCESS: Added to cart. Cart ID: {cart.id}, Total: {cart.total_price}")
            print(f"   Items: {[f'{item.product.name} x{item.quantity}' for item in cart.items]}")
        except Exception as e:
            print(f"   FAIL: cart_service.add_to_cart failed. Error: {e}")

except Exception as e:
    print(f"   FAIL: Database check failed. Error: {e}")
    if "no such table" in str(e).lower():
        print("   DIAGNOSIS: Tables missing.")

finally:
    db.close()
