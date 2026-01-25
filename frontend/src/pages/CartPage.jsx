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
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

                {!cart || !cart.items || cart.items.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <ul className="divide-y divide-gray-200">
                            {cart.items.map((item) => (
                                <li key={item.id} className="p-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
                                        <p className="text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="font-bold">${item.product.price * item.quantity}</span>
                                        <button
                                            onClick={() => handleRemove(item.product.product_id)} // Note: item.product_id might be needed from schema
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                            <span className="text-xl font-bold">Total: ${cart.total_price}</span>
                            <button
                                onClick={handlePlaceOrder}
                                className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
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
