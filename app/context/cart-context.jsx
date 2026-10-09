"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import CartSidebar from "../components/cart/cart-sidebar";

const CartContext = createContext(null);

const parsePrice = (value) => Number(String(value).replace(/,/g, ""));

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const addToCart = useCallback((product, quantity = 1) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.slug === product.slug);

            if (existing) {
                return prev.map((item) =>
                    item.slug === product.slug
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [
                ...prev,
                {
                    slug: product.slug,
                    name: product.name,
                    image: product.mainImage,
                    price: parsePrice(product.price),
                    quantity,
                },
            ];
        });
    }, []);

    const removeFromCart = useCallback((slug) => {
        setItems((prev) => prev.filter((item) => item.slug !== slug));
    }, []);

    const updateQuantity = useCallback((slug, quantity) => {
        if (quantity < 1) {
            setItems((prev) => prev.filter((item) => item.slug !== slug));
            return;
        }

        setItems((prev) =>
            prev.map((item) => (item.slug === slug ? { ...item, quantity } : item))
        );
    }, []);

    const openCart = useCallback(() => setIsOpen(true), []);
    const closeCart = useCallback(() => setIsOpen(false), []);

    const clearCart = useCallback(() => {
        setItems((prev) => (prev.length === 0 ? prev : []));
        setIsOpen(false);
    }, []);

    const totalItems = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items]
    );

    const subtotal = useMemo(
        () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [items]
    );

    const value = useMemo(
        () => ({
            items,
            isOpen,
            totalItems,
            subtotal,
            addToCart,
            removeFromCart,
            updateQuantity,
            openCart,
            closeCart,
            clearCart,
        }),
        [items, isOpen, totalItems, subtotal, addToCart, removeFromCart, updateQuantity, openCart, closeCart, clearCart]
    );

    return (
        <CartContext.Provider value={value}>
            {children}
            <CartSidebar />
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }

    return context;
};
