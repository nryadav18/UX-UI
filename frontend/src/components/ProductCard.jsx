import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/slices/cartSlice';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        dispatch(addToCart({ product_id: product.id, quantity: Number(quantity) }));
    };

    const handleBuyNow = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        dispatch(addToCart({ product_id: product.id, quantity: Number(quantity) }));
        navigate('/cart');
    };

    return (
        <div className="glass glass-hover rounded-2xl overflow-hidden relative group bg-light-card dark:bg-dark-card border border-gold-500/20 transition-colors duration-300">
            <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <img
                    src={product.image_url || "https://via.placeholder.com/300?text=No+Image"}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=No+Image" }}
                />
            </div>

            <div className="p-5 relative z-20">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gold-100 mb-2 truncate">{product.name}</h3>
                <p className="text-gray-600 dark:text-gold-200/80 text-sm mb-4 line-clamp-2 h-10">{product.description}</p>

                <div className="flex items-center justify-between mt-2 mb-4">
                    <span className="text-2xl font-bold text-gold-600 dark:text-gold-500">
                        ${product.price}
                    </span>

                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-16 bg-light-bg dark:bg-dark-bg border border-gold-500/30 rounded-lg px-2 py-1.5 text-center text-gray-800 dark:text-gold-100 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-transparent border border-gold-500 text-gold-600 dark:text-gold-500 font-semibold px-4 py-2 rounded-xl hover:bg-gold-500 hover:text-white dark:hover:text-dark-bg transition-colors duration-200 text-sm"
                    >
                        Add to Cart
                    </button>
                    <button
                        onClick={handleBuyNow}
                        className="flex-1 bg-gold-500 text-white dark:text-dark-bg font-bold px-4 py-2 rounded-xl hover:bg-gold-400 transition-colors duration-200 text-sm shadow-lg shadow-gold-500/20"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
