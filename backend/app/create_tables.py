from app.db.session import engine
from app.db.base import Base
# Import all models to ensure they are registered with Base
from app.models.user import User
from app.models.product import Product
from app.models.cart import Cart, CartItem
from app.models.order import Order, OrderItem
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_tables():
    logger.info("Creating tables...")
    Base.metadata.create_all(bind=engine)
    logger.info("Tables created successfully.")

if __name__ == "__main__":
    create_tables()
