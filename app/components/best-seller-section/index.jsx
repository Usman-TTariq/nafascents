import Image from "next/image";
import Link from "next/link";

const BestSellerSection = () => {
    return (
        <div className="bg-black py-[60px] max-lg:py-[40px]">
            <div className="container">
                <div className="grid grid-cols-12 gap-[60px] max-2xl:gap-[40px] max-lg:gap-[20px]">
                    <div className="col-span-6 max-lg:col-span-12">
                        <Image className="w-full max-lg:w-[72%] max-lg:mx-auto" src="/images/bestseller.png" alt="best-seller-section" width={1000} height={1000} />
                    </div>
                    <div className="col-span-6 my-auto max-lg:col-span-12">
                        <div className="pb-[30px] max-lg:text-center max-lg:pb-[12px]">
                            <span className="text-white border-1 border-[#FBE376] bg-[#f9e2744f] text-[18px] max-xl:text-[16px] max-lg:text-[14px] font-normal rounded-full px-[20px] py-[8px]">#1 Best Seller</span>
                        </div>
                        <h2 className="text-white max-lg:text-center text-[60px] font-light leading-[70px] max-2xl:text-[50px] max-xl:text-[34px] max-xl:leading-[50px] max-lg:leading-[40px]">Meet <span className="text-[75px] max-xl:text-[50px] max-lg:text-[34px] italic font-timesNewRoman">Flow Wanted</span> <br className="max-lg:hidden"/> Our Signature Scent</h2>
                        <h6 className="text-[18px] max-lg:text-[15px] font-manropeRegular text-white font-light py-[12px] max-lg:py-[8px] max-lg:text-center">A bold blend created for those who leave a lasting impression. Flow Wanted balances depth, warmth, and confidence in a scent designed to feel distinctive from the first spray to the final note.</h6>
                        <div className="max-lg:text-center">
                            <Link href="/product/flow-wanted" className="hero-order-btn hero-fade-btn mt-[10px] inline-block cursor-pointer bg-gradient-to-b from-[#FCE481] to-[#F5BF56] text-black border-2 border-white rounded-full px-[20px] py-[10px] font-manropeRegular text-[18px] max-lg:text-[16px] font-medium">Order Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BestSellerSection;