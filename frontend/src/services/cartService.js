import api from './api';

const getCart = async () => {
    const response = await api.get('cart/');
    return response.data;
};

const addToCart = async (itemData) => {
    // itemData: { product_id, quantity }
    const response = await api.post('cart/add', itemData);
    return response.data;
};

const removeFromCart = async (productId) => {
    const response = await api.delete(`cart/remove/${productId}`);
    return response.data;
};

const cartService = {
    getCart,
    addToCart,
    removeFromCart
};

export default cartService;
