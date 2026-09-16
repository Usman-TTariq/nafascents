import Image from "next/image";

const ProductPageHeroSection = ({
    title = "PRODUCTS",
    background = "/images/productpagebk.png",
    titleChars,
}) => {
    const chars = titleChars ?? String(title.replace(/\s/g, "").length);

    return (
        <div className="product-page-hero relative bg-black pt-[150px] pb-[60px] overflow-hidden">
            <Image className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" src={background} alt={`${title} background`} width={1920} height={1080} />
            <div className="absolute inset-y-0 left-0 z-[1] w-[180px] max-lg:w-[56px] bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0)_100%)] pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 z-[1] w-[180px] max-lg:w-[56px] bg-[linear-gradient(270deg,#000_0%,rgba(0,0,0,0)_100%)] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 z-[1] w-full h-[35%] bg-[linear-gradient(0deg,#000_0%,rgba(0,0,0,0)_100%)] pointer-events-none"></div>
            <div className="container relative z-10">
                <h1
                    className="product-page-title font-manropeRegular text-white uppercase"
                    style={{ "--title-chars": chars }}
                >
                    {title}
                </h1>
            </div>
        </div>
    )
}

export default ProductPageHeroSection;
