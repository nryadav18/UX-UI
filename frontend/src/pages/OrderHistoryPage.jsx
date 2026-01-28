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
                <h1 className="text-3xl font-bold text-white mb-8 pl-2 border-l-4 border-purple-500">Your Orders</h1>
                {orders.length === 0 ? (
                    <div className="glass rounded-2xl p-10 text-center">
                        <p className="text-gray-400 text-xl">No orders found.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        <span className="text-purple-400">#</span>
                                        Order {order.id}
                                    </h3>
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${order.status === 'DELIVERED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                            order.status === 'SHIPPED' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="border-t border-white/10 pt-4">
                                    <dl className="divide-y divide-white/5">
                                        <div className="py-3 flex justify-between items-center">
                                            <dt className="text-sm font-medium text-gray-400">Date Placed</dt>
                                            <dd className="text-sm text-white font-mono">{new Date(order.created_at).toLocaleDateString()}</dd>
                                        </div>
                                        <div className="py-3 flex justify-between items-center">
                                            <dt className="text-sm font-medium text-gray-400">Total Amount</dt>
                                            <dd className="text-lg text-white font-bold bg-white/5 px-3 py-1 rounded-lg">${order.total_amount}</dd>
                                        </div>
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
