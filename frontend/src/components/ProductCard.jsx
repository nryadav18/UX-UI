import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        dispatch(addToCart({ product_id: product.id, quantity: Number(quantity) }));
    };

    return (
        <div className="glass glass-hover rounded-2xl overflow-hidden relative group">
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                    src={product.image_url || "https://via.placeholder.com/300"}
                    alt={product.name}
                    className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
            </div>
            
            <div className="p-5 relative z-20">
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        ${product.price}
                    </span>
                    
                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-14 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-center text-white focus:outline-none focus:border-blue-500/50"
                        />
                        <button
                            onClick={handleAddToCart}
                            className="bg-white text-black font-semibold px-4 py-1.5 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
