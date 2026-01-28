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

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {message}</div>;

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-white mb-8 pl-2 border-l-4 border-blue-500">Shopping Cart</h1>

                {!cart || !cart.items || cart.items.length === 0 ? (
                    <div className="glass rounded-2xl p-10 text-center">
                        <p className="text-gray-400 text-xl">Your cart is empty.</p>
                    </div>
                ) : (
                    <div className="glass rounded-2xl overflow-hidden backdrop-blur-md border border-white/5">
                        <ul className="divide-y divide-white/10">
                            {cart.items.map((item) => (
                                <li key={item.id} className="p-6 flex justify-between items-center hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                                            {/* Placeholder for product image if available, else icon */}
                                            <span className="text-2xl">🛍️</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{item.product.name}</h3>
                                            <p className="text-gray-400">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-6">
                                        <span className="font-bold text-2xl text-white">${item.product.price * item.quantity}</span>
                                        <button
                                            onClick={() => handleRemove(item.product.product_id)} // Note: item.product_id might be needed from schema
                                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-red-400/20"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="p-6 border-t border-white/10 bg-white/5 flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-400">Total Amount</span>
                                <span className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
                                    ${cart.total_price}
                                </span>
                            </div>
                            <button
                                onClick={handlePlaceOrder}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-8 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/20 hover:scale-105 transition-all duration-200"
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
