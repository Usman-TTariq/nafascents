"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Star from "../fragrances-section/svg/star";
import { useCart } from "../../context/cart-context";
import { useToast } from "../../context/toast-context";

const ratingBreakdown = [
    { stars: 5, count: 8, percent: 80 },
    { stars: 4, count: 2, percent: 20 },
    { stars: 3, count: 0, percent: 0 },
    { stars: 2, count: 0, percent: 0 },
    { stars: 1, count: 0, percent: 0 },
];

const productReviews = [
    {
        text: "Brother absolutely love this scent. And to be honest Meri expectation se zyada achi fragrance hai highly recomended.",
        name: "Adnan Tanoli",
        stars: 5,
    },
    {
        text: "Behtreen perfume hy or inka Alpha tester tou alg hi level, roz office lga kr jati hun or sab puchte hain konsi fragrance hy. Price k hisab se best hy, highly recommended! or next alpha order krungi.",
        name: "Humera",
        stars: 5,
    },
    {
        text: "Amazing long lasting fragrance. Pehli spray se hi feel hota hai premium quality. Everyday wear ke liye perfect hai.",
        name: "Saad Ahmed",
        stars: 5,
    },
    {
        text: "It has a sharp but classy aroma that stays fresh throughout the day. Premium packaging and worth every rupee!",
        name: "Gufran Malik",
        stars: 4,
    },
    {
        text: "Flow Wanted is bold, warm, and unique. I keep getting compliments whenever I wear it. Definitely ordering again.",
        name: "Usman Tariq",
        stars: 5,
    },
    {
        text: "Fragrance bohat achi aur classy hai. Projection strong hai aur lasting bhi impressive. Highly recommended.",
        name: "Wahid Khan",
        stars: 5,
    },
    {
        text: "Flow Wanted smells amazing and lasts really long. I could still smell it after 12 hours, which honestly impressed me. Definitely one of my favorites.",
        name: "Ahsan Yousuf",
        stars: 4,
    },
    {
        text: "The perfume is absolutely amazing! Long-lasting and elegant, I keep getting compliments on it from friends and family.",
        name: "Benazeer Khan",
        stars: 5,
    },
    {
        text: "Soft yet powerful scent. Bottle look premium hai aur fragrance bhi expectations se better nikli. Love it!",
        name: "Areesha",
        stars: 5,
    },
    {
        text: "Best purchase so far from Nafa Scents. Fresh opening with a warm dry down. Will buy more for gifts too.",
        name: "Hamza Ali",
        stars: 5,
    },
];

const EMPTY_STAR = "#3d3228";

const parsePrice = (value) => Number(String(value).replace(/,/g, ""));

const formatPrice = (value) =>
    Number(value).toLocaleString("en-US");

const ProductDetailSection = ({ product }) => {
    const { addToCart } = useCart();
    const { showToast } = useToast();
    const [activeImage, setActiveImage] = useState(product.mainImage);
    const [quantity, setQuantity] = useState(1);
    const [reviewRating, setReviewRating] = useState(1);

    const handleAddToCart = () => {
        addToCart(
            {
                slug: product.slug,
                name: product.name,
                mainImage: activeImage,
                price: product.price,
            },
            quantity
        );
        showToast("Product added to cart");
    };

    useEffect(() => {
        setActiveImage(product.mainImage);
        setQuantity(1);
        setReviewRating(1);
    }, [product.slug, product.mainImage]);

    const isMainImage = activeImage === product.mainImage;
    const totalPrice = formatPrice(parsePrice(product.price) * quantity);
    const totalCompareAtPrice = formatPrice(parsePrice(product.compareAtPrice) * quantity);

    return (
        <div className="bg-black pt-[100px] max-lg:pt-[80px] pb-[80px] max-lg:pb-[40px]">
            <div className="container">
                <div className="grid grid-cols-12 gap-[40px] max-xl:gap-[28px] max-lg:gap-[24px]">
                    <div className="col-span-6 max-lg:col-span-12">
                        <div className={`relative rounded-[24px] max-lg:rounded-[16px] overflow-hidden ${isMainImage ? "bg-[#111]" : "bg-white"}`}>
                            <Image
                                className={`w-full aspect-square ${isMainImage ? "object-cover" : "object-contain"}`}
                                src={activeImage}
                                alt={product.name}
                                width={1200}
                                height={1200}
                            />
                            <div className="absolute top-[14px] left-[14px] max-lg:top-[10px] max-lg:left-[10px] z-10">
                                <Image
                                    className="w-[95px] max-lg:w-[48px] h-auto rounded-[8px]"
                                    src={product.tester}
                                    alt={`Free Tester ${product.testerName}`}
                                    width={228}
                                    height={261}
                                />
                                <h6 className={`text-[14px] max-lg:text-[9px] font-manropeRegular text-center pt-[4px] drop-shadow ${isMainImage ? "text-white" : "text-black font-semibold"}`}>
                                    Free Tester <br /> {product.testerName}
                                </h6>
                            </div>
                            <div className="absolute top-[14px] right-[14px] max-lg:top-[10px] max-lg:right-[10px] z-10 flex flex-col gap-[8px] max-lg:gap-[6px]">
                                {product.gallery.map((image) => (
                                    <button
                                        key={image}
                                        type="button"
                                        onClick={() => setActiveImage(image)}
                                        className={`w-[55px] max-lg:w-[40px] aspect-square rounded-[8px] overflow-hidden bg-white cursor-pointer border ${activeImage === image ? "border-[#F5BF56]" : "border-transparent"
                                            }`}
                                    >
                                        <Image
                                            className="w-full h-full object-contain"
                                            src={image}
                                            alt={`${product.name} gallery`}
                                            width={846}
                                            height={1059}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-span-6 max-lg:col-span-12 flex flex-col justify-center">
                        <h2 className="text-white max-lg:text-center text-[60px] font-light leading-[70px] max-2xl:text-[50px] max-xl:text-[34px] max-xl:leading-[50px] max-lg:leading-[40px]">
                            <span className="text-[75px] max-xl:text-[50px] max-lg:text-[34px] italic font-timesNewRoman">{product.name}</span> {product.category} | NAFA Scents
                        </h2>

                        <div className="flex flex-wrap items-center gap-[10px] max-lg:gap-[8px] pt-[18px] max-lg:pt-[14px]">
                            <div className="flex items-center gap-[4px]">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Star key={index} className="w-[14px] max-lg:w-[12px]" />
                                ))}
                                <h6 className="text-[14px] font-manropeRegular text-white pl-[4px]">4.8 (10)</h6>
                            </div>
                            {product.bestSeller && (
                                <div className="px-[12px] py-[5px] bg-[#6b5c2ecc] rounded-full">
                                    <h6 className="text-[12px] font-medium font-manropeRegular text-white">Best Seller</h6>
                                </div>
                            )}
                            <div className="flex items-center gap-[6px] px-[12px] py-[5px] bg-[#1dde3069] rounded-full">
                                <span className="w-[8px] h-[8px] rounded-full bg-[#22c55e]"></span>
                                <h6 className="text-[12px] font-medium font-manropeRegular text-white">In Stock</h6>
                            </div>
                            <div className="px-[12px] py-[5px] bg-[#ffffff54] rounded-full">
                                <h6 className="text-[12px] font-medium font-manropeRegular text-white">Perfume Spray 50ml</h6>
                            </div>
                        </div>

                        <div className="h-px w-full bg-white/20 my-[22px] max-lg:my-[16px]"></div>

                        <div className="flex items-center justify-between gap-[16px] flex-wrap">
                            <div className="flex items-end gap-[10px]">
                                <h6 className="text-[28px] max-xl:text-[24px] max-lg:text-[20px] font-manropeRegular text-white font-medium">
                                    Price: {totalPrice} PKR
                                </h6>
                                <h6 className="text-[16px] max-lg:text-[14px] font-manropeRegular text-[#c7c7c7] pb-[4px]">
                                    <s>{totalCompareAtPrice} PKR</s>
                                </h6>
                            </div>
                            <div className="flex items-center gap-[18px] px-[16px] py-[8px] rounded-full border border-white/30">
                                <button
                                    type="button"
                                    className="text-white text-[20px] leading-none cursor-pointer px-[4px]"
                                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                    aria-label="Decrease quantity"
                                >
                                    −
                                </button>
                                <h6 className="text-[16px] font-manropeRegular text-white min-w-[16px] text-center">{quantity}</h6>
                                <button
                                    type="button"
                                    className="text-white text-[20px] leading-none cursor-pointer px-[4px]"
                                    onClick={() => setQuantity((prev) => prev + 1)}
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="pt-[22px] max-lg:pt-[16px]">
                            <h6 className="text-[18px] max-lg:text-[16px] font-manropeRegular text-white font-medium pb-[10px]">
                                Fragrance Notes:
                            </h6>
                            <h6 className="text-[16px] max-lg:text-[14px] font-manropeRegular text-white font-light leading-[1.7]">
                                Top Notes: {product.notes.top}
                            </h6>
                            <h6 className="text-[16px] max-lg:text-[14px] font-manropeRegular text-white font-light leading-[1.7]">
                                Notes: {product.notes.middle}
                            </h6>
                            <h6 className="text-[16px] max-lg:text-[14px] font-manropeRegular text-white font-light leading-[1.7]">
                                Base Notes: {product.notes.base}
                            </h6>
                        </div>

                        <div className="flex items-center gap-[14px] max-lg:gap-[10px] pt-[28px] max-lg:pt-[20px]">
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className="flex-1 flex items-center justify-center gap-[8px] cursor-pointer bg-white text-black rounded-full px-[20px] py-[12px] max-lg:py-[10px] font-manropeRegular text-[16px] max-lg:text-[14px] font-medium"
                            >
                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                                    <path
                                        d="M19 2H4.17L3.99 0.85C3.91 0.36 3.49 0 3 0H0V2H2.14L4.01 14.15C4.09 14.64 4.51 15 5 15H17V13H5.86L5.55 11H17C17.45 11 17.84 10.7 17.96 10.27L19.96 3.27C20.0043 3.12105 20.0128 2.96378 19.985 2.8109C19.9572 2.65802 19.8939 2.51383 19.8 2.39C19.61 2.14 19.31 1.99 19 1.99V2ZM6 16C5.46957 16 4.96086 16.2107 4.58579 16.5858C4.21071 16.9609 4 17.4696 4 18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20C6.53043 20 7.03914 19.7893 7.41421 19.4142C7.78929 19.0391 8 18.5304 8 18C8 17.4696 7.78929 16.9609 7.41421 16.5858C7.03914 16.2107 6.53043 16 6 16ZM15 16C14.4696 16 13.9609 16.2107 13.5858 16.5858C13.2107 16.9609 13 17.4696 13 18C13 18.5304 13.2107 19.0391 13.5858 19.4142C13.9609 19.7893 14.4696 20 15 20C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18C17 17.4696 16.7893 16.9609 16.4142 16.5858C16.0391 16.2107 15.5304 16 15 16Z"
                                        fill="black"
                                    />
                                </svg>
                                Add To Cart
                            </button>
                            <button
                                type="button"
                                className="flex-1 cursor-pointer bg-gradient-to-b from-[#FCE481] to-[#F5BF56] text-black rounded-full px-[20px] py-[12px] max-lg:py-[10px] font-manropeRegular text-[16px] max-lg:text-[14px] font-medium"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-[48px] max-lg:pt-[28px]">
                    <h6 className="text-[22px] max-lg:text-[18px] font-manropeRegular text-white font-medium pb-[12px]">
                        Description:
                    </h6>
                    {product.description.map((paragraph, index) => (
                        <h6
                            key={paragraph}
                            className={`text-[18px] max-lg:text-[14px] font-manropeRegular text-white font-light leading-[1.8] ${index > 0 ? "pt-[12px]" : ""}`}
                        >
                            {paragraph}
                        </h6>
                    ))}
                </div>

                <div className="mt-[48px] max-lg:mt-[32px] border-t border-white/20 pt-[40px] max-lg:pt-[28px]">
                    <h2 className="text-white text-center text-[58px] max-xl:text-[40px] max-lg:text-[32px] italic font-timesNewRoman pb-[36px] max-lg:pb-[24px]">
                        Customer Reviews
                    </h2>

                    <div className="grid grid-cols-12 gap-[40px] max-lg:gap-[28px]">
                        <div className="col-span-6 max-lg:col-span-12 max-lg:border-b max-lg:border-white/20 max-lg:pb-[28px] lg:border-r lg:border-white/20 lg:pr-[40px]">
                            <div className="flex items-center gap-[3px]">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Star key={index} className="w-[14px]" width={18} height={18} />
                                ))}
                                <h6 className="text-[16px] max-lg:text-[16px] font-manropeRegular text-white font-medium pl-[4px]">
                                    4.8 out of 5
                                </h6>
                            </div>
                            <h6 className="text-[15px] max-lg:text-[14px] font-manropeRegular text-white font-light pt-[8px] pb-[24px]">
                                Based on 10 reviews
                            </h6>

                            <div className="flex flex-col gap-[22px]">
                                {ratingBreakdown.map((row) => (
                                    <div key={row.stars} className="flex items-center gap-[12px]">
                                        <div className="flex items-center gap-[3px] shrink-0 ">
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <Star
                                                    key={index}
                                                    className="w-[16px]"
                                                    width={20}
                                                    height={20}
                                                    fill={index < row.stars ? "#FFCE2D" : EMPTY_STAR}
                                                />
                                            ))}
                                        </div>
                                        <div className="flex-1 h-[26px] rounded-md bg-[#583400] overflow-hidden">
                                            <div
                                                className="h-full rounded-md bg-[#E8A03A]"
                                                style={{ width: `${row.percent}%` }}
                                            ></div>
                                        </div>
                                        <h6 className="text-[14px] font-manropeRegular text-white w-[16px] text-right">
                                            {row.count}
                                        </h6>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-6 max-lg:col-span-12 lg:pl-[8px]">
                            <h6 className="text-[22px] max-lg:text-[18px] font-manropeRegular text-white font-medium pb-[16px]">
                                Write a Review
                            </h6>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full bg-[#1a1a1a] text-white placeholder:text-[#8a8a8a] rounded-[10px] px-[16px] py-[14px] max-lg:py-[12px] font-manropeRegular text-[15px] outline-none border border-white/10 mb-[12px]"
                            />
                            <textarea
                                placeholder={`Share your experience with ${product.name}...`}
                                rows={4}
                                className="w-full bg-[#1a1a1a] text-white placeholder:text-[#8a8a8a] rounded-[10px] px-[16px] py-[14px] max-lg:py-[12px] font-manropeRegular text-[15px] outline-none border border-white/10 resize-none mb-[16px]"
                            />
                            <h6 className="text-[15px] max-lg:text-[14px] font-manropeRegular text-white pb-[10px]">
                                How would you rate <span className="italic">{product.name}</span>:
                            </h6>
                            <div className="flex items-center justify-between gap-[8px] pb-[30px]">
                                {Array.from({ length: 5 }).map((_, index) => {
                                    const value = index + 1;
                                    return (
                                        <button
                                            key={value}
                                            type="button"
                                            onClick={() => setReviewRating(value)}
                                            className="cursor-pointer"
                                            aria-label={`Rate ${value} stars`}
                                        >
                                            <Star
                                                className="w-[38px] max-lg:w-[24px]"
                                                width={48}
                                                height={48}
                                                fill={value <= reviewRating ? "#FFCE2D" : EMPTY_STAR}
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                            <button
                                type="button"
                                className="cursor-pointer bg-gradient-to-b from-[#FCE481] to-[#F5BF56] text-black rounded-full px-[40px] py-[14px] max-lg:py-[12px] font-manropeRegular text-[16px] max-lg:text-[15px] font-medium"
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-[56px] max-lg:mt-[36px]">
                    <div className="flex items-center justify-between gap-[16px] pb-[28px] max-lg:pb-[20px]">
                        <h2 className="text-white text-[40px] max-xl:text-[34px] max-lg:text-[28px] font-manropeRegular font-light">
                            Reviews
                        </h2>
                        <button
                            type="button"
                            className="flex items-center gap-[8px] cursor-pointer text-white border border-white rounded-full px-[18px] py-[8px] max-lg:px-[14px] max-lg:py-[6px] font-manropeRegular text-[15px] max-lg:text-[13px]"
                        >
                            Most Recent
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
                                <path d="M1 1.5L6 6.5L11 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-12 gap-[20px] max-lg:gap-[14px]">
                        {productReviews.map((review) => (
                            <div
                                key={`${review.name}-${review.text.slice(0, 24)}`}
                                className="col-span-6 max-lg:col-span-12 bg-[#57360840] rounded-[16px] p-[28px] max-lg:p-[18px] flex flex-col min-h-[170px] max-lg:min-h-[150px]"
                            >
                                <h6 className="text-[15px] max-lg:text-[14px] font-manropeRegular text-white font-light leading-[1.7]">
                                    {review.text}
                                </h6>
                                <div className="flex items-center justify-between gap-[12px] mt-auto pt-[24px] max-lg:pt-[16px]">
                                    <h6 className="text-[16px] max-lg:text-[15px] font-manropeRegular text-white">
                                        {review.name}
                                    </h6>
                                    <div className="flex items-center gap-[3px] shrink-0">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <Star
                                                key={index}
                                                className="w-[14px]"
                                                width={14}
                                                height={14}
                                                fill={index < review.stars ? "#FFCE2D" : EMPTY_STAR}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailSection;
