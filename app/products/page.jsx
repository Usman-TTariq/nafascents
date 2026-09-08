import Header from "../components/header/index.jsx";
import ReviewsSection from "../components/reviews-section/index.jsx";
import FAQSection from "../components/faq-section/index.jsx";
import Footer from "../components/footer/index.jsx";
import ProductPageHeroSection from "../components/product-page-hero-section/index.jsx";
import ProductPageListSection from "../components/product-page-list-section/index.jsx";

export default function Products() {
    return (
        <>
            <Header />
            <ProductPageHeroSection />
            <ProductPageListSection />
            <ReviewsSection />
            <FAQSection />
            <Footer />
        </>
    )
}