"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Star from "./svg/star";
import { products } from "../../data/products.js";

const fragrances = [
    products.find((p) => p.slug === "velvet-rose"),
    products.find((p) => p.slug === "sirr-al-oud"),
    products.find((p) => p.slug === "alpha-male"),
    products.find((p) => p.slug === "flow-wanted"),
    products.find((p) => p.slug === "the-gentlemen"),
    products.find((p) => p.slug === "obsession"),
];

const cardTransform = (index, hovered) => {
    if (hovered === null) return "scale(1)";
    if (index === hovered) return "scale(var(--fragrance-hover-scale))";
    if (index === hovered - 1) return "scale(var(--fragrance-near-scale)) translateX(calc(var(--fragrance-shift) * -1))";
    if (index === hovered + 1) return "scale(var(--fragrance-near-scale)) translateX(var(--fragrance-shift))";
    if (index < hovered) return "translateX(calc(var(--fragrance-far-shift) * -1))";
    return "translateX(var(--fragrance-far-shift))";
};

const FragrancesSection = () => {
    const [hovered, setHovered] = useState(null);

    return (
        <div className=" py-[80px] max-lg:py-[40px] bg-black relative">
            <div className="absolute  bg-gradient-to-b from-transparent via-white/[0.11] to-transparent top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-[550px] max-lg:h-[320px]">
            </div>
            <div className="pb-[30px] max-lg:pb-[16px] text-center">
                <span className="text-white border-1 border-[#FBE376] bg-[#f9e2744f] text-[18px] max-xl:text-[16px] max-lg:text-[14px] font-normal rounded-full px-[20px] py-[8px]">Fragrances</span>
            </div>
            <h2 className="text-white text-center text-[60px] font-light leading-[70px] max-xl:text-[50px] max-xl:leading-[50px] max-lg:text-[34px] max-lg:leading-[40px] max-lg:px-4">Discover Your <span className="text-[75px] max-xl:text-[50px] max-lg:text-[34px] italic font-timesNewRoman">Signature</span> Scent</h2>
            <div
                className="fragrance-row gap-[36px] max-xl:gap-[16px] max-lg:gap-[20px] pt-[70px] max-xl:pt-[48px] max-lg:pt-[28px] px-[60px] max-xl:px-[28px] max-lg:px-5"
                onMouseLeave={() => setHovered(null)}
            >
                {fragrances.map((fragrance, index) => (
                    <div
                        key={fragrance.slug}
                        className="fragrance-slot"
                        style={{ zIndex: hovered === index ? 3 : hovered !== null && Math.abs(index - hovered) === 1 ? 2 : 1 }}
                        onMouseEnter={() => setHovered(index)}
                    >
                    <div
                        className="fragrance-card relative p-[14px] max-xl:p-[10px] max-lg:p-[8px]"
                        style={{ transform: cardTransform(index, hovered) }}
                    >
                        <Image className="absolute top-0 left-0 w-full h-full pointer-events-none" src={fragrance.cardBackground} alt={fragrance.name} width={1000} height={1000} />
                        <div className="relative">
                            <Image className="w-full h-full" src={fragrance.cardImage} alt={fragrance.name} width={3000} height={3000} />
                            <div className="absolute z-10 top-[10px] left-[10px] flex flex-col items-start gap-[6px]">
                                {fragrance.bestSeller && (
                                    <div className="px-[12px] py-[5px] bg-[#6b5c2ecc] rounded-full">
                                        <h6 className="text-[12px] max-xl:text-[10px] font-medium font-manropeRegular text-white">Best Seller</h6>
                                    </div>
                                )}
                                <div className="px-[12px] py-[5px] bg-[#ffffff4a] rounded-full">
                                    <h6 className="text-[12px] max-xl:text-[10px] font-medium font-manropeRegular text-white">50ml</h6>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start justify-between gap-[10px] max-xl:gap-[6px] relative z-10 py-[10px]">
                            <div className="min-w-0 flex-1 pr-[4px]">
                                <h6 className="text-[18px] max-2xl:text-[15px] max-xl:text-[14px] font-manropeRegular text-white font-normal leading-[1.2] break-words">
                                    {fragrance.name}
                                </h6>
                                <div className="flex items-center gap-[4px] pt-[2px]">
                                    <Star className="w-[12px] shrink-0" />
                                    <h6 className="text-[13px] max-xl:text-[12px] font-manropeRegular text-white font-normal">4.8</h6>
                                    <h6 className="text-[13px] max-xl:text-[12px] font-manropeRegular text-[#c7c7c7] font-normal">(10)</h6>
                                </div>
                            </div>
                            <div className="shrink-0 text-right">
                                <h6 className="text-[16px] max-2xl:text-[14px] max-xl:text-[13px] font-manropeRegular text-white font-normal whitespace-nowrap">
                                    {fragrance.price} PKR
                                </h6>
                                <h6 className="text-[13px] max-2xl:text-[12px] max-xl:text-[11px] font-manropeRegular text-[#c7c7c7] font-normal whitespace-nowrap">
                                    <s>{fragrance.compareAtPrice} PKR</s>
                                </h6>
                            </div>
                        </div>
                        <div>
                            <Link href={`/product/${fragrance.slug}`} className=" block w-full text-center hero-order-btn hero-fade-btn cursor-pointer bg-[#fff] text-black border-2 border-white rounded-full px-[20px] py-[6px] max-xl:px-[12px] max-xl:py-[8px] max-lg:px-[10px] max-lg:py-[7px] font-manropeRegular text-[18px] max-xl:text-[14px] max-lg:text-[13px] font-medium">Order Now</Link>
                            {/* <Link href={`/product/${fragrance.slug}`} className=" block w-full text-center hero-order-btn hero-fade-btn cursor-pointer bg-[#fff] text-black border-2 border-white rounded-full px-[20px] py-[6px] max-xl:px-[12px] max-xl:py-[8px] max-lg:px-[10px] max-lg:py-[7px] font-manropeRegular text-[18px] max-xl:text-[14px] max-lg:text-[13px] font-medium">Order Now</Link> */}
                        </div>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FragrancesSection;
