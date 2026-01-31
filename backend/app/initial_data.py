import logging
from app.db.session import SessionLocal
from app.models.product import Product

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def init_db():
    db = SessionLocal()
    try:
        # Check if we have enough products, if so, skip or we could append.
        # For this task, let's ensure these specific premium items exist.
        
        products_data = [
            {"name": "Gold Edition Smart Watch", "description": "Premium finish, health tracking, 48h battery.", "price": 499.0, "stock": 50, "image_url": "https://placehold.co/600x400/121212/D4AF37?text=Gold+Watch"},
            {"name": "Luxury Leather Bag", "description": "Handcrafted Italian leather, gold accents.", "price": 899.0, "stock": 15, "image_url": "https://placehold.co/600x400/121212/D4AF37?text=Leather+Bag"},
            {"name": "Pro Noise-Cancelling Headphones", "description": "Studio quality sound, active noise cancellation.", "price": 349.0, "stock": 100, "image_url": "https://placehold.co/600x400/121212/D4AF37?text=Headphones"},
            {"name": "4K Ultra Monitor", "description": "32-inch color accurate display for professionals.", "price": 799.0, "stock": 25, "image_url": "https://placehold.co/600x400/121212/D4AF37?text=4K+Monitor"},
            {"name": "Mechanical Keyboard", "description": "Gold-plated switches, RGB backlighting.", "price": 199.0, "stock": 60, "image_url": "https://placehold.co/600x400/121212/D4AF37?text=Keyboard"},
            {"name": "Designer Sunglasses", "description": "UV protection with gold frames.", "price": 249.0, "stock": 40, "image_url": "https://placehold.co/600x400/121212/D4AF37?text=Sunglasses"},
            {"name": "Limited Edition Console", "description": "Next-gen gaming with exclusive gold skin.", "price": 599.0, "stock": 10, "image_url": "https://placehold.co/600x400/121212/D4AF37?text=Console"},
            {"name": "Smart Home Hub", "description": "Control your entire home with voice.", "price": 149.0, "stock": 80, "image_url": "https://placehold.co/600x400/121212/D4AF37?text=Smart+Hub"},
            {"name": "Drone 4K Pro", "description": "Aerial photography with 3-axis gimbal.", "price": 1199.0, "stock": 8, "image_url": "https://placehold.co/600x400/121212/D4AF37?text=Drone"},
            {"name": "Wireless Charging Pad", "description": "Fast charging for all your devices.", "price": 59.0, "stock": 150, "image_url": "https://placehold.co/600x400/121212/D4AF37?text=Charger"},
            {"name": "Premium Fountain Pen", "description": "18k gold nib, smooth writing experience.", "price": 299.0, "stock": 30, "image_url": "https://placehold.co/600x400/121212/D4AF37?text=Fountain+Pen"},
            {"name": "Ergonomic Office Chair", "description": "Supportive mesh back with gold base.", "price": 450.0, "stock": 12, "image_url": "https://placehold.co/600x400/121212/D4AF37?text=Office+Chair"},
        ]

        existing_names = {p.name for p in db.query(Product).all()}

        added_count = 0
        for p_data in products_data:
            if p_data["name"] not in existing_names:
                product = Product(**p_data)
                db.add(product)
                added_count += 1
        
        db.commit()
        logger.info(f"Seeded {added_count} new products.")
        
    except Exception as e:
        logger.error(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    logger.info("Creating initial data")
    init_db()
    logger.info("Initial data created")
