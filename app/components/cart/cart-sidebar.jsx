"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useCart } from "../../context/cart-context";

const formatPrice = (value) => Number(value).toLocaleString("en-US");

const CartSidebar = () => {
    const { items, isOpen, subtotal, removeFromCart, closeCart } = useCart();

    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleEscape = (event) => {
            if (event.key === "Escape") closeCart();
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, closeCart]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100]">
            <button
                type="button"
                className="absolute inset-0 bg-black/60 cursor-pointer"
                onClick={closeCart}
                aria-label="Close cart overlay"
            />

            <aside className="absolute top-0 right-0 h-full w-full max-w-[420px] bg-white flex flex-col shadow-2xl">
                <div className="flex items-center justify-between px-[24px] py-[20px] border-b border-[#e8e8e8]">
                    <div className="flex items-center gap-[12px]">
                        <div className="relative flex items-center justify-center w-[34px] h-[34px] rounded-full bg-[#111]">
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                                <path
                                    d="M19 2H4.17L3.99 0.85C3.91 0.36 3.49 0 3 0H0V2H2.14L4.01 14.15C4.09 14.64 4.51 15 5 15H17V13H5.86L5.55 11H17C17.45 11 17.84 10.7 17.96 10.27L19.96 3.27C20.0043 3.12105 20.0128 2.96378 19.985 2.8109C19.9572 2.65802 19.8939 2.51383 19.8 2.39C19.61 2.14 19.31 1.99 19 1.99V2ZM6 16C5.46957 16 4.96086 16.2107 4.58579 16.5858C4.21071 16.9609 4 17.4696 4 18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20C6.53043 20 7.03914 19.7893 7.41421 19.4142C7.78929 19.0391 8 18.5304 8 18C8 17.4696 7.78929 16.9609 7.41421 16.5858C7.03914 16.2107 6.53043 16 6 16ZM15 16C14.4696 16 13.9609 16.2107 13.5858 16.5858C13.2107 16.9609 13 17.4696 13 18C13 18.5304 13.2107 19.0391 13.5858 19.4142C13.9609 19.7893 14.4696 20 15 20C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18C17 17.4696 16.7893 16.9609 16.4142 16.5858C16.0391 16.2107 15.5304 16 15 16Z"
                                    fill="white"
                                />
                            </svg>
                            {items.length > 0 && (
                                <span className="absolute -top-[4px] -right-[4px] min-w-[18px] h-[18px] px-[4px] rounded-full bg-[#F5BF56] text-[10px] font-manropeRegular text-black flex items-center justify-center">
                                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                                </span>
                            )}
                        </div>
                        <h2 className="text-[22px] font-manropeRegular text-black font-medium">Cart</h2>
                    </div>

                    <button
                        type="button"
                        onClick={closeCart}
                        className="text-[28px] leading-none text-[#666] cursor-pointer px-[4px]"
                        aria-label="Close cart"
                    >
                        ×
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-[24px] py-[8px]">
                    {items.length === 0 ? (
                        <h6 className="text-[15px] font-manropeRegular text-[#777] py-[40px] text-center">
                            Your cart is empty.
                        </h6>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.slug}
                                className="flex items-start gap-[14px] py-[18px] border-b border-[#ececec] last:border-b-0"
                            >
                                <button
                                    type="button"
                                    onClick={() => removeFromCart(item.slug)}
                                    className="mt-[4px] w-[22px] h-[22px] rounded-full border border-[#ddd] text-[#999] text-[14px] leading-none cursor-pointer shrink-0"
                                    aria-label={`Remove ${item.name} from cart`}
                                >
                                    ×
                                </button>

                                <div className="w-[72px] h-[72px] rounded-[8px] overflow-hidden bg-[#f5f5f5] shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={72}
                                        height={72}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h6 className="text-[11px] font-manropeRegular text-[#999] uppercase tracking-wide">
                                        NAFA Scents
                                    </h6>
                                    <h6 className="text-[15px] font-manropeRegular text-black font-medium pt-[2px] truncate">
                                        {item.quantity} x {item.name}
                                    </h6>
                                    <h6 className="text-[15px] font-manropeRegular text-[#111] font-medium pt-[6px]">
                                        {formatPrice(item.price * item.quantity)} PKR
                                    </h6>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="border-t border-[#e8e8e8] px-[24px] py-[20px] bg-[#fafafa]">
                    <div className="flex items-center justify-between pb-[18px]">
                        <h6 className="text-[13px] font-manropeRegular text-[#888] uppercase tracking-wide">
                            Sub-total
                        </h6>
                        <h6 className="text-[18px] font-manropeRegular text-black font-semibold">
                            {formatPrice(subtotal)} PKR
                        </h6>
                    </div>

                    <button
                        type="button"
                        className="w-full cursor-pointer bg-gradient-to-b from-[#FCE481] to-[#F5BF56] text-black rounded-full px-[20px] py-[14px] font-manropeRegular text-[16px] font-semibold"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </aside>
        </div>
    );
};

export default CartSidebar;
