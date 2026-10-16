import Header from "../components/header/index.jsx";
import Footer from "../components/footer/index.jsx";
import ProductPageHeroSection from "../components/product-page-hero-section/index.jsx";
import ContactSection from "../components/contact-section/index.jsx";

export const metadata = {
    title: "Contact | NAFA Scents",
    description: "Get in touch with NAFA Scents. Send a message to nafascents@gmail.com.",
};

export default function ContactPage() {
    return (
        <>
            <Header />
            <ProductPageHeroSection title="CONTACT" />
            <ContactSection />
            <Footer />
        </>
    );
}
