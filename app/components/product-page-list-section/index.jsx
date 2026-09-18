import Image from "next/image";
import Link from "next/link";
import Star from "../fragrances-section/svg/star";
import { products } from "../../data/products.js";

const ProductPageListSection = () => {
    return (
        <div className="bg-black pt-[90px] max-sm:pt-[20px] pb-[40px]">
            <div className="grid grid-cols-5 max-xl:grid-cols-3 max-lg:grid-cols-2 gap-[36px] max-xl:gap-[16px] max-lg:gap-[16px] px-[60px] max-xl:px-[28px] max-lg:px-5">
                {products.map((product) => (
                    <div key={product.slug} className="relative p-[14px] max-xl:p-[10px] max-lg:p-[8px]">
                        <Image className="absolute top-0 left-0 w-full h-full pointer-events-none" src={product.cardBackground} alt={product.name} width={1000} height={1000} />
                        <div className="relative">
                            <Image className="w-full h-full" src={product.cardImage} alt={product.name} width={3000} height={3000} />
                            <div className="absolute z-10 top-[10px] left-[10px] flex flex-col items-start gap-[6px]">
                                {product.bestSeller && (
                                    <div className="px-[12px] py-[5px] bg-[#6b5c2ecc] rounded-full">
                                        <h6 className="text-[12px] max-xl:text-[10px] font-medium font-manropeRegular text-white">Best Seller</h6>
                                    </div>
                                )}
                                <div className="px-[12px] py-[5px] bg-[#ffffff4a] rounded-full">
                                    <h6 className="text-[12px] max-xl:text-[10px] font-medium font-manropeRegular text-white">50ml</h6>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10 py-[10px]">
                            <h6 className="lg:hidden text-[14px] max-sm:text-center font-manropeRegular text-white font-normal leading-[1.35]">{product.name}</h6>
                            <div className="flex items-start justify-between gap-[8px] max-lg:pt-[6px]">
                                <div className="min-w-0">
                                    <h6 className="hidden lg:block text-[22px] 2xl:text-[22px] max-2xl:text-[16px] max-xl:text-[16px] font-manropeRegular text-white font-normal whitespace-nowrap">{product.name}</h6>
                                    <div className="flex items-center gap-[4px]">
                                        <Star className="w-[12px]" />
                                        <h6 className="text-[14px] max-lg:text-[12px] font-manropeRegular text-white font-normal">4.8</h6>
                                        <h6 className="text-[14px] max-lg:text-[12px] font-manropeRegular text-[#c7c7c7] font-normal">(10)</h6>
                                    </div>
                                </div>
                                <div className="shrink-0 text-right">
                                    <h6 className="text-[18px] max-2xl:text-[15px] max-xl:text-[15px] max-lg:text-[14px] font-manropeRegular text-white font-normal whitespace-nowrap">{product.price} PKR</h6>
                                    <h6 className="text-[15px] max-2xl:text-[13px] max-xl:text-[13px] max-lg:text-[12px] font-manropeRegular text-[#c7c7c7] font-normal whitespace-nowrap"><s>{product.compareAtPrice} PKR</s></h6>
                                </div>
                            </div>
                        </div>
                        <Link
                            href={`/product/${product.slug}`}
                            className="relative z-10 block w-full text-center cursor-pointer bg-[#fff] text-black border-2 border-white rounded-full px-[20px] py-[10px] max-xl:px-[12px] max-xl:py-[8px] max-lg:px-[10px] max-lg:py-[7px] font-manropeRegular text-[18px] max-xl:text-[14px] max-lg:text-[13px] font-medium"
                        >
                            Order Now
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductPageListSection;
