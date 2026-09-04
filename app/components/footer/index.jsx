import Image from "next/image";

const Footer = () => {
    return (
        <div className="bg-black pt-[60px]">
            <div className="container">
                <div className="grid grid-cols-12 gap-[20px]  border-t border-[#fff] pt-[40px]">
                    <div className="col-span-9 max-lg:col-span-12">
                        <h6 className="text-[24px] font-manropeRegular text-white max-lg:text-center">Important Links</h6>
                        <div className="flex items-center gap-[40px] max-xl:gap-[20px] pt-[20px] max-lg:justify-center">
                            <h6 className="text-[16px] font-manropeRegular text-white font-light">Home</h6>
                            <h6 className="text-[16px] font-manropeRegular text-white font-light">Products</h6>
                            <h6 className="text-[16px] font-manropeRegular text-white font-light">Profile</h6>
                            <h6 className="text-[16px] font-manropeRegular text-white font-light">Cart</h6>
                            <h6 className="text-[16px] font-manropeRegular text-white font-light">Contact</h6>
                            <h6 className="text-[16px] font-manropeRegular text-white font-light">Terms & Conditions</h6>
                            <h6 className="text-[16px] font-manropeRegular text-white font-light">Privacy Policy</h6>
                        </div>
                    </div>
                    <div className="col-span-3 max-lg:col-span-12">
                        <h6 className="text-[24px] font-manropeRegular text-white max-lg:text-center">Social Links</h6>
                        <div className="flex items-center gap-[10px] pt-[12px] max-lg:justify-center">
                            <Image className="w-[120px] max-xl:w-[100px] cursor-pointer" src="/images/facebook.png" alt="facebook" width={1000} height={1000} />
                            <Image className="w-[120px] max-xl:w-[100px] cursor-pointer" src="/images/instagram.png" alt="facebook" width={1000} height={1000} />
                        </div>
                    </div>
                </div>

            </div>
            <div className="footer-nafa relative overflow-hidden pt-[80px]">
                <div className="footer-nafa-glow pointer-events-none absolute inset-0 z-0"></div>
                <Image className="w-full relative z-10" src="/images/34.png" alt="nafa footer" width={2000} height={2000} />
            </div>
        </div>
    )
}

export default Footer;