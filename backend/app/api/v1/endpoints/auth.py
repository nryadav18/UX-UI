from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.api import deps
from app.core import security
from app.core.config import settings
from app.models.user import User
from app.schemas.user import UserCreate, User as UserSchema, Token

router = APIRouter()

@router.post("/register", response_model=UserSchema)
def register(
    *,
    db: Session = Depends(deps.get_db),
    user_in: UserCreate,
) -> Any:
    """
    Create new user.
    """
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system",
        )
    hashed_password = security.get_password_hash(user_in.password)
    db_obj = User(
        email=user_in.email,
        hashed_password=hashed_password,
        full_name=user_in.full_name,
        is_superuser=user_in.is_superuser,
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.post("/login", response_model=Token)
def login_access_token(
    db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user.email, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }

@router.post("/password-recovery/{email}")
def recover_password(email: str, db: Session = Depends(deps.get_db)) -> Any:
    """
    Password Recovery
    """
    user = db.query(User).filter(User.email == email).first()
    
    if not user:
        # We generally shouldn't reveal if a user exists, but for this demo/MVP we will return success even if not found, 
        # or error if you prefer open debugging. Let's return success to avoid enumeration, but log the issue.
        # However, to help the USER debugging right now:
        raise HTTPException(
            status_code=404,
            detail="The user with this email does not exist in the system",
        )
    
    password_reset_token = security.create_password_reset_token(email=email)
    
    # SIMULATION: Log the token instead of sending email
    print("\n" + "="*50)
    print(f"PASSWORD RESET EMAIL SIMULATION")
    print(f"To: {email}")
    print(f"Token: {password_reset_token}")
    print(f"Link: http://localhost:5173/reset-password?token={password_reset_token}")
    print("="*50 + "\n")
    
    return {"msg": "Password recovery email sent"}

from pydantic import BaseModel

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

@router.post("/reset-password")
def reset_password(
    payload: ResetPasswordRequest,
    db: Session = Depends(deps.get_db)
) -> Any:
    """
    Reset password
    """
    email = security.verify_password_reset_token(payload.token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid request")
    
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
        
    hashed_password = security.get_password_hash(payload.new_password)
    user.hashed_password = hashed_password
    db.add(user)
    db.commit()
    
    return {"msg": "Password updated successfully"}
