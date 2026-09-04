"use client";

import Image from "next/image";
import { useState } from "react";
import Star from "./svg/star";

const fragrances = [
    {
        name: "Velvet Rose",
        background: "/images/scentgradient1.png",
        product: "/images/velvetrosebottle.png",
    },
    {
        name: "Sirr Al Oud",
        background: "/images/scentgradient2.png",
        product: "/images/sirraloudbottle.png",
    },
    {
        name: "Alpha Male",
        background: "/images/scentgradient3.png",
        product: "/images/alphabottle.png",
        bestSeller: true,
    },
    {
        name: "Flow Wanted",
        background: "/images/scentgradient4.png",
        product: "/images/flowwantedbottle.png",
        bestSeller: true,
    },
    {
        name: "The Gentlemen",
        background: "/images/scentgradient5.png",
        product: "/images/thegentlemenbottle.png",
    },
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
        <div className=" py-[80px] bg-black relative">
            <div className="absolute  bg-gradient-to-b from-transparent via-white/[0.11] to-transparent top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-[550px]">
            </div>
            <div className="pb-[30px] text-center">
                <span className="text-white border-1 border-[#FBE376] bg-[#f9e2744f] text-[18px] max-xl:text-[16px] max-lg:text-[14px] font-normal rounded-full px-[20px] py-[8px]">Fragrances</span>
            </div>
            <h2 className="text-white text-center text-[60px] font-light leading-[70px] max-xl:text-[50px] max-xl:leading-[50px] max-lg:text-[34px]">Discover Your <span className="text-[75px] max-xl:text-[50px] max-lg:text-[34px] italic font-timesNewRoman">Signature</span> Scent</h2>
            <div
                className="fragrance-row gap-[36px] max-xl:gap-[16px] pt-[70px] max-xl:pt-[48px] px-[60px] max-xl:px-[28px]"
                onMouseLeave={() => setHovered(null)}
            >
                {fragrances.map((fragrance, index) => (
                    <div
                        key={fragrance.name}
                        className="fragrance-slot"
                        style={{ zIndex: hovered === index ? 3 : hovered !== null && Math.abs(index - hovered) === 1 ? 2 : 1 }}
                        onMouseEnter={() => setHovered(index)}
                    >
                    <div
                        className="fragrance-card relative p-[14px] max-xl:p-[10px]"
                        style={{ transform: cardTransform(index, hovered) }}
                    >
                        <Image className="absolute top-0 left-0 w-full h-full" src={fragrance.background} alt={fragrance.name} width={1000} height={1000} />
                        <div className="relative">
                            <Image className="w-full h-full" src={fragrance.product} alt={fragrance.name} width={3000} height={3000} />
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
                        <div className="flex items-start justify-between relative z-10 py-[10px]">
                            <div>
                                <h6 className="text-[22px] max-2xl:text-[18px] max-xl:text-[16px] font-manropeRegular text-white font-normal">{fragrance.name}</h6>
                                <div className="flex items-center gap-[4px]">
                                    <Star className="w-[12px]" />
                                    <h6 className="text-[14px] font-manropeRegular text-white font-normal">4.8</h6>
                                    <h6 className="text-[14px] font-manropeRegular text-[#c7c7c7] font-normal">(10)</h6>
                                </div>
                            </div>
                            <div>
                                <h6 className="text-[18px] max-xl:text-[15px] font-manropeRegular text-white font-normal text-right">2500 PKR</h6>
                                <h6 className="text-[15px] max-xl:text-[13px] font-manropeRegular text-[#c7c7c7] font-normal text-right"><s>3000 PKR</s></h6>
                            </div>
                        </div>
                        <div>
                            <button className="w-full hero-order-btn hero-fade-btn cursor-pointer bg-[#fff] text-black border-2 border-white rounded-full px-[20px] py-[10px] max-xl:px-[12px] max-xl:py-[8px] font-manropeRegular text-[18px] max-xl:text-[14px] font-medium">Order Now</button>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FragrancesSection;
