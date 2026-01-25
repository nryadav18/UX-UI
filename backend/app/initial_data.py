import logging
from app.db.session import SessionLocal
from app.models.product import Product

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def init_db():
    db = SessionLocal()
    try:
        if db.query(Product).first():
            logger.info("Products already exist.")
            return
        
        products = [
            Product(name="Smartphone X", description="Latest model with high-res camera", price=999.0, stock=50, image_url="https://via.placeholder.com/300?text=Phone"),
            Product(name="Laptop Pro", description="Powerful laptop for devs", price=1299.0, stock=20, image_url="https://via.placeholder.com/300?text=Laptop"),
            Product(name="Wireless Earbuds", description="Noise cancelling", price=199.0, stock=100, image_url="https://via.placeholder.com/300?text=Earbuds"),
            Product(name="Smart Watch", description="Track your fitness", price=299.0, stock=30, image_url="https://via.placeholder.com/300?text=Watch"),
        ]
        
        for p in products:
            db.add(p)
        db.commit()
        logger.info("Seeded initial products.")
    except Exception as e:
        logger.error(f"Error seeding data: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    logger.info("Creating initial data")
    init_db()
    logger.info("Initial data created")
