"use client";

import { CartProvider } from "../context/cart-context";
import { ToastProvider } from "../context/toast-context";

const CartProviderWrapper = ({ children }) => {
    return (
        <ToastProvider>
            <CartProvider>{children}</CartProvider>
        </ToastProvider>
    );
};

export default CartProviderWrapper;
