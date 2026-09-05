import Image from "next/image";

const Footer = () => {
    return (
        <div className="bg-black pt-[60px] max-lg:pt-[40px]">
            <div className="container">
                <div className="grid grid-cols-12 gap-[20px] max-lg:gap-[24px] border-t border-[#fff] pt-[40px] max-lg:pt-[28px]">
                    <div className="col-span-9 max-lg:col-span-12">
                        <h6 className="text-[24px] max-lg:text-[18px] font-manropeRegular text-white max-lg:text-center">Important Links</h6>
                        <div className="flex items-center flex-wrap gap-[40px] max-xl:gap-[20px] max-lg:gap-x-[16px] max-lg:gap-y-[10px] pt-[20px] max-lg:pt-[12px] max-lg:justify-center">
                            <h6 className="text-[16px] max-lg:text-[14px] font-manropeRegular text-white font-light">Home</h6>
                            <h6 className="text-[16px] max-lg:text-[14px] font-manropeRegular text-white font-light">Products</h6>
                            <h6 className="text-[16px] max-lg:text-[14px] font-manropeRegular text-white font-light">Profile</h6>
                            <h6 className="text-[16px] max-lg:text-[14px] font-manropeRegular text-white font-light">Cart</h6>
                            <h6 className="text-[16px] max-lg:text-[14px] font-manropeRegular text-white font-light">Contact</h6>
                            <h6 className="text-[16px] max-lg:text-[14px] font-manropeRegular text-white font-light">Terms & Conditions</h6>
                            <h6 className="text-[16px] max-lg:text-[14px] font-manropeRegular text-white font-light">Privacy Policy</h6>
                        </div>
                    </div>
                    <div className="col-span-3 max-lg:col-span-12">
                        <h6 className="text-[24px] max-lg:text-[18px] font-manropeRegular text-white max-lg:text-center">Social Links</h6>
                        <div className="flex items-center gap-[10px] pt-[12px] max-lg:justify-center">
                            <a href="https://www.facebook.com/share/1Bi7TqaD2N/" target="_blank" rel="noopener noreferrer">
                                <Image className="w-[120px] max-xl:w-[100px] max-lg:w-[96px] cursor-pointer" src="/images/facebook.png" alt="facebook" width={1000} height={1000} />
                            </a>
                            <a href="https://www.instagram.com/nafascents_official?igsi=MXJycG53ajZkeGFvcg==" target="_blank" rel="noopener noreferrer">
                                <Image className="w-[120px] max-xl:w-[100px] max-lg:w-[96px] cursor-pointer" src="/images/instagram.png" alt="instagram" width={1000} height={1000} />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
            <div className="footer-nafa relative overflow-hidden pt-[80px] max-lg:pt-[40px]">
                <div className="footer-nafa-glow pointer-events-none absolute inset-0 z-0"></div>
                <div className="container relative z-10">
                    <Image className="w-full" src="/images/34.png" alt="nafa footer" width={2000} height={2000} />
                </div>
            </div>
        </div>
    )
}

export default Footer;