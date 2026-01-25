import React, { useEffect, useState } from 'react';
import orderService from '../services/orderService';
import Navbar from '../components/Navbar';

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await orderService.getOrders();
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Orders</h1>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Order #{order.id}
                                    </h3>
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                            order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="border-t border-gray-200 pt-4">
                                    <dl className="divide-y divide-gray-200">
                                        <div className="py-2 flex justify-between">
                                            <dt className="text-sm font-medium text-gray-500">Date Placed</dt>
                                            <dd className="text-sm text-gray-900">{new Date(order.created_at).toLocaleDateString()}</dd>
                                        </div>
                                        <div className="py-2 flex justify-between">
                                            <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                                            <dd className="text-sm text-gray-900 font-bold">${order.total_amount}</dd>
                                        </div>
                                        {/* Ideally list items here too, but for summary it's okay */}
                                    </dl>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistoryPage;
