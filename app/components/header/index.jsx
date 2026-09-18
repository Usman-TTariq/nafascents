import Logo from "./svg/logo";
import Profile from "./svg/profile";
import Link from "next/link";
import CartButton from "./cart-button";
import SearchBar from "./search-bar";

const Header = () => {
    return (
        <div className="absolute z-50 top-[10px] left-[50%] translate-x-[-50%] w-full container">
            <div className="flex items-center justify-between gap-[12px]">
                <Link href="/" aria-label="Go to home page">
                    <Logo className="w-[160px] max-lg:w-[112px] cursor-pointer shrink-0" />
                </Link>
                <div className="flex items-center gap-[30px] max-lg:hidden">
                    <Link href="/" className="text-[16px] font-manropeRegular text-white cursor-pointer">Home</Link>
                    <Link href="/products" className="text-[16px] font-manropeRegular text-white cursor-pointer">Products</Link>
                    <h6 className="text-[16px] font-manropeRegular text-white cursor-pointer">Contact</h6>
                </div>
                <div className="flex items-center gap-[10px] max-lg:gap-[6px] shrink-0">
                    <SearchBar />
                    <div className="flex items-center justify-center px-[10px] py-[7px] bg-[#ffffff4a] rounded-full cursor-pointer">
                        <Profile className="w-[16px]" />
                    </div>
                    <CartButton />
                </div>
            </div>
        </div>
    )
}

export default Header;