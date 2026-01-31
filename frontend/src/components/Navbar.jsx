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
        <nav className="glass sticky top-0 z-50 mb-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            E-Shop
                        </Link>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link to="/" className="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200">Products</Link>
                        {user ? (
                            <>
                                <Link to="/cart" className="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200">
                                    Cart ({cartItemCount})
                                </Link>
                                <Link to="/orders" className="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200">Orders</Link>
                                <button
                                    onClick={onLogout}
                                    className="bg-red-500/10 hover:bg-red-500/20 text-red-500 dark:bg-red-500/20 dark:hover:bg-red-500/40 border border-red-500/50 px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200">Login</Link>
                                <Link to="/register" className="bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:bg-blue-600/20 dark:hover:bg-blue-600/40 dark:text-blue-400 border border-blue-500/50 px-6 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm">
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
