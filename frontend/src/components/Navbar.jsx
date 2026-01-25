import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../redux/slices/authSlice';
import { clearCartLocal } from '../redux/slices/cartSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        dispatch(clearCartLocal());
        navigate('/login');
    };

    const cartItemCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold text-gray-800">E-Shop</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-gray-600 hover:text-gray-900">Products</Link>
                        {user ? (
                            <>
                                <Link to="/cart" className="text-gray-600 hover:text-gray-900">
                                    Cart ({cartItemCount})
                                </Link>
                                <Link to="/orders" className="text-gray-600 hover:text-gray-900">Orders</Link>
                                <button
                                    onClick={onLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
                                <Link to="/register" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
