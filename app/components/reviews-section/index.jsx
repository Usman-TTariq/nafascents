import Quotation from "./svg/quotation";

const reviews = [
    {
        text: "Every drop of Vella perfume is carefully crafted to embody sophistication, balance, and timeless beauty.",
        name: "Wahid Khan",
    },
    {
        text: "Brother absolutely love this scent. The fragrance stays for hours and feels premium from the first spray.",
        name: "Adnan Tanoli",
    },
    {
        text: "Perfume ki fragrance bohat achi aur classy hai. Everyday wear ke liye perfect lagti hai.",
        name: "Wahid Khan",
    },
    {
        text: "I really loved this scent. It feels balanced, warm, and unique compared to other perfumes I have tried.",
        name: "Usman Tariq",
    },
    {
        text: "The perfume is absolutely amazing! Long-lasting and elegant, I keep getting compliments on it.",
        name: "Benazeer Khan",
    },
    {
        text: "Velvet Rose by Nafa Scents is a lovely floral fragrance with a soft, luxurious finish.",
        name: "Areesha",
    },
];

const ReviewCard = ({ text, name }) => (
    <div className="bg-[#ffffff12] rounded-2xl p-[30px] w-[400px] min-h-[180px] shrink-0 flex flex-col">
        <h6 className="text-[16px] font-manropeRegular text-white font-light">{text}</h6>
        <div className="flex items-center justify-between mt-auto pt-[30px]">
            <h6 className="text-[20px] font-manropeRegular text-white">{name}</h6>
            <Quotation className="w-[16px]" />
        </div>
    </div>
);

const ReviewsSection = () => {
    const rowOne = reviews.slice(0, 3);
    const rowTwo = reviews.slice(3);
    const loopRowOne = [...rowOne, ...rowOne, ...rowOne, ...rowOne];
    const loopRowTwo = [...rowTwo, ...rowTwo, ...rowTwo, ...rowTwo];

    return (
        <div className="bg-black py-[100px]">
            <div className="container">
                <div className="grid grid-cols-12 gap-[0px]">
                    <div className="col-span-6 max-lg:col-span-12">
                        <div className="pb-[20px] text-right hidden max-lg:block max-lg:text-center">
                            <span className="text-white border-1 border-[#FBE376] bg-[#f9e2744f] text-[18px] max-xl:text-[16px] font-normal rounded-full px-[20px] py-[8px]">Reviews</span>
                        </div>
                        <h2 className="text-white text-[65px] max-2xl:text-[55px] max-xl:text-[45px] max-xl:leading-[60px] max-lg:text-[34px] font-light leading-[90px] max-lg:text-center">Loved by Fragrance <span className="text-[75px] max-xl:text-[50px] max-lg:text-[34px] italic font-timesNewRoman">Enthusiasts</span></h2>
                    </div>
                    <div className="col-span-6 my-auto max-lg:col-span-12">
                        <div className="pb-[20px] text-right max-lg:hidden">
                            <span className="text-white border-1 border-[#FBE376] bg-[#f9e2744f] text-[18px] max-xl:text-[16px] font-normal rounded-full px-[20px] py-[8px]">Reviews</span>
                        </div>
                        <h6 className="text-[18px] font-manropeRegular text-white text-right font-light py-[12px] max-lg:text-center">Every drop of Vella perfume is carefully crafted to embody <br className="max-xl:hidden" /> sophistication, balance, and timeless beauty.</h6>
                    </div>
                </div>
                <div className="relative overflow-hidden pt-[30px]">
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[140px] bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0)_100%)]"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[140px] bg-[linear-gradient(270deg,#000_0%,rgba(0,0,0,0)_100%)]"></div>
                    <div className="overflow-hidden pb-[20px]">
                        <div className="reviews-marquee-track reviews-marquee-left">
                            {loopRowOne.map((review, index) => (
                                <ReviewCard key={`row-one-${index}`} text={review.text} name={review.name} />
                            ))}
                        </div>
                    </div>
                    <div className="overflow-hidden">
                        <div className="reviews-marquee-track reviews-marquee-right">
                            {loopRowTwo.map((review, index) => (
                                <ReviewCard key={`row-two-${index}`} text={review.text} name={review.name} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewsSection;
