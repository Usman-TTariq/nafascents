"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCart } from "../../context/cart-context";

const PaymentStatus = ({ title, description, tone = "neutral", clearCartOnMount = false }) => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order");
    const { clearCart } = useCart();

    useEffect(() => {
        if (!clearCartOnMount) return;
        clearCart();
    }, [clearCartOnMount, clearCart]);

    const toneClasses = {
        success: "border-[#22c55e]/40 text-[#86efac]",
        failure: "border-[#ef4444]/40 text-[#fca5a5]",
        neutral: "border-[#F5BF56]/40 text-[#F5BF56]",
    };

    return (
        <div className="bg-black pt-[120px] max-lg:pt-[100px] pb-[80px] max-lg:pb-[40px]">
            <div className="container max-w-[720px] text-center">
                <div
                    className={`inline-block rounded-full border px-[18px] py-[8px] text-[14px] font-manropeRegular mb-[20px] ${toneClasses[tone] ?? toneClasses.neutral}`}
                >
                    Payment status
                </div>
                <h1 className="text-white text-[42px] max-lg:text-[30px] font-manropeRegular font-light pb-[12px]">
                    {title}
                </h1>
                <h6 className="text-[#c7c7c7] text-[16px] max-lg:text-[14px] font-manropeRegular leading-[1.7] pb-[16px]">
                    {description}
                </h6>
                {orderId && (
                    <div className="inline-block rounded-[12px] border border-white/15 bg-white/5 px-[18px] py-[12px] mb-[28px]">
                        <h6 className="text-[12px] font-manropeRegular text-[#999] uppercase tracking-wide pb-[4px]">
                            Order ID
                        </h6>
                        <h6 className="text-[16px] font-manropeRegular text-white font-medium">{orderId}</h6>
                    </div>
                )}
                {!orderId && <div className="pb-[12px]" />}
                <div className="flex items-center justify-center gap-[12px] flex-wrap">
                    <Link
                        href="/"
                        className="inline-block cursor-pointer bg-gradient-to-b from-[#FCE481] to-[#F5BF56] text-black rounded-full px-[22px] py-[12px] font-manropeRegular text-[15px] font-semibold"
                    >
                        Back to home
                    </Link>
                    <Link
                        href="/products"
                        className="inline-block cursor-pointer border border-white/30 text-white rounded-full px-[22px] py-[12px] font-manropeRegular text-[15px] font-medium"
                    >
                        View products
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentStatus;
