
import Header from "../app/components/header/index.jsx";
import HeroSection from "../app/components/hero-section/index.jsx";
import BestSellerSection from "../app/components/best-seller-section/index.jsx";
import FragrancesSection from "../app/components/fragrances-section/index.jsx";
import ReviewsSection from "../app/components/reviews-section/index.jsx";
import FAQSection from "../app/components/faq-section/index.jsx";
import Footer from "../app/components/footer/index.jsx";

export default function Home() {
  return (
    <div className="">
      <Header />
      <HeroSection />
      <BestSellerSection />
      <FragrancesSection />
      <ReviewsSection />
      <FAQSection />
      <Footer />
    </div>
  );
}