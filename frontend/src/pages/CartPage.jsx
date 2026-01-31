import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCart, removeFromCart, resetCartState } from '../redux/slices/cartSlice';
import orderService from '../services/orderService';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart, isLoading, isError, message } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    const handleRemove = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handlePlaceOrder = async () => {
        try {
            await orderService.placeOrder();
            alert('Order Placed Successfully!');
            navigate('/orders');
            dispatch(getCart()); // Refresh empty cart
        } catch (error) {
            alert('Failed to place order');
        }
    };

    if (isLoading) return <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-gold-100 pt-20 text-center transition-colors">Loading cart...</div>;
    if (isError) return <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-gold-100 pt-20 text-center transition-colors">Error: {message}</div>;

    return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-gold-100 transition-colors duration-300">
            <Navbar />
            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gold-600 dark:text-gold-500 mb-8 pl-4 border-l-4 border-gold-500">Shopping Cart</h1>

                {!cart || !cart.items || cart.items.length === 0 ? (
                    <div className="glass rounded-2xl p-16 text-center border border-gold-500/20">
                        <p className="text-gray-500 dark:text-gold-200 text-xl mb-4">Your cart is currently empty.</p>
                        <button onClick={() => navigate('/')} className="text-gold-600 dark:text-gold-500 underline hover:text-gold-500 dark:hover:text-gold-400">Return to Shop</button>
                    </div>
                ) : (
                    <div className="glass rounded-2xl overflow-hidden backdrop-blur-md border border-gold-500/10 transition-colors">
                        <ul className="divide-y divide-gold-500/10">
                            {cart.items.map((item) => (
                                <li key={item.id} className="p-6 flex flex-col md:flex-row justify-between items-center hover:bg-gold-500/5 transition-colors gap-4">
                                    <div className="flex items-center gap-6 w-full md:w-auto">
                                        <div className="w-20 h-20 bg-light-card dark:bg-dark-card border border-gold-500/20 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                                            {item.product.image_url ? (
                                                <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-2xl">🛍️</span>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-gold-100">{item.product.name}</h3>
                                            <p className="text-gray-500 dark:text-gold-300">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between w-full md:w-auto gap-8">
                                        <span className="font-bold text-2xl text-gold-600 dark:text-gold-400">${(item.product.price * item.quantity).toFixed(2)}</span>
                                        <button
                                            onClick={() => handleRemove(item.product.id)}
                                            className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-400/10 px-4 py-2 rounded-lg transition-colors border border-red-500/20 hover:border-red-500/40"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="p-8 border-t border-gold-500/10 bg-gold-500/5 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex flex-col items-center md:items-start">
                                <span className="text-sm text-gray-500 dark:text-gold-300 uppercase tracking-wider">Total Amount</span>
                                <span className="text-4xl font-bold text-gold-600 dark:text-gold-500 drop-shadow-sm">
                                    ${cart.total_price.toFixed(2)}
                                </span>
                            </div>
                            <button
                                onClick={handlePlaceOrder}
                                className="w-full md:w-auto bg-gradient-to-r from-gold-600 to-gold-500 text-white dark:text-dark-bg font-bold px-10 py-4 rounded-xl hover:from-gold-500 hover:to-gold-400 shadow-lg shadow-gold-500/20 hover:scale-105 transition-all duration-200"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
