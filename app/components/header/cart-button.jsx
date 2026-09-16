"use client";

import Cart from "./svg/cart";
import { useCart } from "../../context/cart-context";

const CartButton = () => {
    const { openCart, totalItems } = useCart();

    return (
        <button
            type="button"
            onClick={openCart}
            className="relative flex items-center gap-[8px] px-[22px] py-[7px] max-lg:px-[10px] bg-[#ffffff4a] rounded-full cursor-pointer"
            aria-label="Open cart"
        >
            <Cart className="w-[15px]" />
            <span className="text-[16px] font-medium font-manropeRegular text-white max-lg:hidden">Cart</span>
            {totalItems > 0 && (
                <span className="absolute -top-[6px] -right-[4px] min-w-[18px] h-[18px] px-[4px] rounded-full bg-[#F5BF56] text-[10px] font-manropeRegular text-black flex items-center justify-center">
                    {totalItems}
                </span>
            )}
        </button>
    );
};

export default CartButton;
