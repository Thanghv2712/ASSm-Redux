import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../interfaces/product';
import { toast } from 'react-toastify';

type CartProps = {
    cartItems: any[];
};

const initialState: CartProps = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<IProduct>) => {
            const newProduct = action.payload;

            const existingProduct = state.cartItems.findIndex((item) => item.id === newProduct.id);

            if (existingProduct === -1) {
                state.cartItems.push(newProduct);
            } else {
                state.cartItems[existingProduct].quantity++;

                toast.success('Đã thêm vào giỏ hàng', {
                    position: 'top-center',
                });
            }
        },
        increase: (state, action: PayloadAction<number>) => {
            const currentProduct = state.cartItems.find((item) => item.id === action.payload);
            currentProduct.quantity++;
        },
        decrease: (state, action: PayloadAction<number>) => {
            const currentProduct = state.cartItems.find((item) => item.id === action.payload);
            currentProduct.quantity--;

            if (currentProduct.quantity < 1) {
                state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
                currentProduct.quantity = 1;

                toast.warning('Đã xóa khỏi giỏ hàng', {
                    position: 'top-center',
                });
            }
        },
        clear: (state) => {
            state.cartItems = [];
        },
    },
});

export const { add, increase, decrease, clear } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
