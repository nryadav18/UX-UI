import api from './api';

const getProducts = async () => {
    const response = await api.get('products/');
    return response.data;
};

const createProduct = async (productData) => {
    const response = await api.post('products/', productData);
    return response.data;
};

const productService = {
    getProducts,
    createProduct
};

export default productService;
