import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from '../../services/cartService';

const initialState = {
    cart: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const getCart = createAsyncThunk('cart/get', async (_, thunkAPI) => {
    try {
        return await cartService.getCart();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.detail) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const addToCart = createAsyncThunk('cart/add', async (itemData, thunkAPI) => {
    try {
        return await cartService.addToCart(itemData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.detail) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const removeFromCart = createAsyncThunk('cart/remove', async (productId, thunkAPI) => {
    try {
        return await cartService.removeFromCart(productId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.detail) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        resetCartState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        },
        clearCartLocal: (state) => {
            state.cart = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.cart = action.payload;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload;
            });
    },
});

export const { resetCartState, clearCartLocal } = cartSlice.actions;
export default cartSlice.reducer;
