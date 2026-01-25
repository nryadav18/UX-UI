from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.models.product import Product
from app.schemas.product import Product as ProductSchema, ProductCreate

router = APIRouter()

@router.get("/", response_model=List[ProductSchema])
def read_products(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve products.
    """
    products = db.query(Product).offset(skip).limit(limit).all()
    return products

@router.post("/", response_model=ProductSchema)
def create_product(
    *,
    db: Session = Depends(deps.get_db),
    product_in: ProductCreate,
    current_user: Any = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new product (Admin/Superuser only usually, but open for demo).
    """
    product = Product(**product_in.dict())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product
