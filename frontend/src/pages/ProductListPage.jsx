import React, { useEffect, useState } from 'react';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-gold-100 transition-colors duration-300">
            <Navbar />
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8 px-4 sm:px-0">
                    <h2 className="text-3xl font-bold text-gold-600 dark:text-gold-500 tracking-tight">Latest Collection</h2>
                    <div className="h-1 flex-1 bg-gold-500/20 ml-6 rounded-full"></div>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 dark:text-gold-200 text-xl">Loading premium products...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductListPage;
