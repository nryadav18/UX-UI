# E-Commerce Portal

A full-stack E-Commerce application with Product Listing, Cart, and Order Management.

## Tech Stack
- **Backend**: FastAPI, SQLAlchemy, Alembic, SQLite, Python 3.
- **Frontend**: React 19, Vite, Redux Toolkit, Tailwind CSS.

## Setup Instructions

### Backend
1. Navigate to `backend/`.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Initialize Database:
   ```bash
   python -m alembic upgrade head
   ```
4. Seed Data (Optional):
   ```bash
   python -m app.initial_data
   ```
5. Run Server:
   ```bash
   uvicorn app.main:app --reload --port 8001
   ```
   Api Docs: http://localhost:8001/docs

### Frontend
1. Navigate to `frontend/`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run Development Server:
   ```bash
   npm run dev
   ```
   App: http://localhost:5173

## Features
- User Auth (Register/Login)
- Browse Products
- Add/Remove from Cart
- Place Order
- View Order History

## Environment Variables
Create a `.env` file in `backend/` (optional, defaults provided in `config.py`).
