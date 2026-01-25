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
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Placeholder image if none provided */}
            <img
                src={product.image_url || "https://via.placeholder.com/300"}
                alt={product.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mt-1 truncate">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    <div className="flex items-center space-x-2">
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-16 border rounded px-2 py-1"
                        />
                        <button
                            onClick={handleAddToCart}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
