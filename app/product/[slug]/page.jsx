import { notFound } from "next/navigation";
import Header from "../../components/header/index.jsx";
import Footer from "../../components/footer/index.jsx";
import ProductDetailSection from "../../components/product-detail-section/index.jsx";
import ProductPageHeroSection from "../../components/product-page-hero-section/index.jsx";
import { getAllProductSlugs, getProductBySlug } from "../../data/products.js";

export function generateStaticParams() {
    return getAllProductSlugs().map((slug) => ({ slug }));
}

export default async function ProductPage({ params }) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) notFound();

    return (
        <>
            <Header />
            <ProductPageHeroSection
                title={product.name}
                background={product.heroBackground}
                titleChars={product.titleChars}
            />
            <ProductDetailSection product={product} />
            <Footer />
        </>
    );
}
