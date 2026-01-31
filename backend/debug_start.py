import sys
import os

# Add the current directory to sys.path so we can import app modules
sys.path.append(os.getcwd())

try:
    print("1. Attempting to import settings...")
    from app.core.config import settings
    print(f"   SUCCESS: Project Name: {settings.PROJECT_NAME}")
    print(f"   SUCCESS: CORS Origins: {settings.BACKEND_CORS_ORIGINS}")
    
except Exception as e:
    print(f"   FAIL: Could not load settings. Error: {e}")
    sys.exit(1)

try:
    print("\n2. Attempting to connect to database...")
    from app.db.session import SessionLocal
    db = SessionLocal()
    print("   SUCCESS: Session created.")
except Exception as e:
    print(f"   FAIL: Could not create session. Error: {e}")
    sys.exit(1)

try:
    print("\n3. Attempting to query User table...")
    from app.models.user import User
    from sqlalchemy import text
    
    # Try a simple execute first to check connection
    db.execute(text("SELECT 1"))
    print("   SUCCESS: Database connection test (SELECT 1) passed.")
    
    # Check if table exists by querying
    user_count = db.query(User).count()
    print(f"   SUCCESS: User table queried. Count: {user_count}")
    
except Exception as e:
    print(f"   FAIL: Database query failed. Error: {e}")
    # checking if it is a no such table error
    if "no such table" in str(e).lower():
        print("   DIAGNOSIS: Tables haven't been created yet.")
    
finally:
    db.close()
