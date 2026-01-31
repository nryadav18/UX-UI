import sqlite3
import pandas as pd
import os

# Get the directory of the current script
current_dir = os.path.dirname(os.path.abspath(__file__))
# Database path
db_path = os.path.join(current_dir, "sql_app.db")

print(f"Connecting to database at: {db_path}")

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Get all tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    print("\n--- Tables in Database ---")
    for table in tables:
        print(f"- {table[0]}")

    # Inspect Users
    print("\n--- Users (First 5) ---")
    try:
        df_users = pd.read_sql_query("SELECT id, email, full_name, is_active, is_superuser FROM user LIMIT 5", conn)
        print(df_users)
    except Exception as e:
        print(f"Could not read users: {e}")

    # Inspect Products
    print("\n--- Products (First 5) ---")
    try:
        df_products = pd.read_sql_query("SELECT id, name, price, stock, owner_id FROM product LIMIT 5", conn)
        print(df_products)
    except Exception as e:
        print(f"Could not read products: {e}")
       
    # Inspect Password Reset Tokens (if any table for it? No, they are JWTs, stateless. But let's check Orders)
    print("\n--- Orders (limit 5) ---")
    try:
        df_orders = pd.read_sql_query("SELECT id, user_id, status, total_price FROM \"order\" LIMIT 5", conn)
        print(df_orders)
    except Exception as e:
        print(f"Could not read orders: {e}")

    conn.close()

except sqlite3.Error as e:
    print(f"Error connecting to database: {e}")
