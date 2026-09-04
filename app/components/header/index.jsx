import Logo from "./svg/logo";
import Cart from "./svg/cart";
import Profile from "./svg/profile";
import Search from "./svg/search";

const Header = () => {
    return (
        <div className="absolute z-10 top-[10px] left-[50%] translate-x-[-50%] w-full container">
            <div className="flex items-center justify-between">
                <Logo className="w-[160px] cursor-pointer" />
                <div className="flex items-center gap-[30px]">
                    <h6 className="text-[16px] font-manropeRegular text-white cursor-pointer">Home</h6>
                    <h6 className="text-[16px] font-manropeRegular text-white cursor-pointer">Products</h6>
                    <h6 className="text-[16px] font-manropeRegular text-white cursor-pointer">Contact</h6>
                </div>
                <div className="flex items-center gap-[10px]">
                    <div className="flex items-center justify-center px-[10px] py-[5px] bg-[#ffffff4a] rounded-full cursor-pointer">
                        <Search className="w-[15px]" />
                    </div>
                    <div className="flex items-center justify-center px-[10px] py-[7px] bg-[#ffffff4a] rounded-full cursor-pointer">
                        <Profile className="w-[16px]" />
                    </div>
                    <div className="flex items-center gap-[8px] px-[22px] py-[7px] bg-[#ffffff4a] rounded-full cursor-pointer">
                        <Cart className="w-[15px]" />
                        <h6 className="text-[16px] font-medium font-manropeRegular text-white">Cart</h6>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Header;