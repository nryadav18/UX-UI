import api from './api';

const placeOrder = async () => {
    const response = await api.post('orders/');
    return response.data;
};

const getOrders = async () => {
    const response = await api.get('orders/');
    return response.data;
};

const orderService = {
    placeOrder,
    getOrders
};

export default orderService;
