
const faqs = [
    {
        question: "How long do NafaScents’ perfumes last?",
        answer: "Nafa Scents fragrances are crafted for lasting performance. Longevity can vary depending on your skin type, weather, and how the fragrance is applied. Usually our customers said it gives lasting more than 12 hours",
    },
    {
        question: "How do I choose the right fragrance for me?",
        answer: "Choose a fragrance based on the notes and scent profile you enjoy, such as fresh, woody, sweet, floral, or warm. Our fragrance descriptions can help you find the right match.",
    },
    {
        question: "Can I wear these perfumes every day?",
        answer: "Yes. Our collection includes versatile fragrances suitable for daily wear, work, casual outings, evenings, and special occasions.",
    },
    {
        question: "How should I apply perfume to last long?",
        answer: "Apply perfume to pulse points such as your wrists, neck, and behind the ears. For better longevity, apply it to clean, moisturized skin and avoid rubbing the fragrance after spraying.",
    }
];

const FAQSection = () => {
    return (
        <div className="py-[100px] bg-black relative">
            <div className="absolute  bg-gradient-to-b from-transparent via-white/[0.11] to-transparent top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-[600px]">
            </div>
            <div className="container">
                <div className="pb-[30px] text-center">
                    <span className="text-white border-1 border-[#FBE376] bg-[#f9e2744f] text-[18px] max-xl:text-[16px] font-normal rounded-full px-[20px] py-[8px] max-lg:text-[14px]">FAQ's</span>
                </div>
                <h2 className="text-white text-center text-[60px] font-light leading-[70px] max-xl:text-[50px] max-xl:leading-[50px] max-lg:text-[34px]">Frequently Asked <span className="text-[75px] max-xl:text-[50px] max-lg:text-[34px] italic font-timesNewRoman">Questions</span></h2>
                <div className="grid grid-cols-12 gap-x-[60px] gap-y-[50px] pt-[60px]">
                    {faqs.map((faq) => (
                        <div key={faq.question} className="col-span-6 max-lg:col-span-12">
                            <h6 className="text-[22px] font-manropeRegular text-white max-lg:text-center">{faq.question}</h6>
                            <h6 className="text-[15px] font-manropeRegular text-white font-light pt-[12px] max-lg:text-center">{faq.answer}</h6>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FAQSection;
