export const products = [
    {
        slug: "flow-wanted",
        name: "Flow Wanted",
        titleChars: "11",
        category: "For Unisex",
        heroBackground: "/images/productbk1.png",
        mainImage: "/images/flowwantedbottle.png",
        gallery: [
            "/images/flow1.png",
            "/images/flow2.png",
            "/images/flow3.png",
            "/images/flow4.png",
        ],
        cardBackground: "/images/scentgradient4.png",
        cardImage: "/images/flowwantedbottle.png",
        tester: "/images/tester1.png",
        testerName: "Alpha",
        bestSeller: true,
        price: "2,500",
        compareAtPrice: "3,000",
        notes: {
            top: "Lemon, ginger, lavender, and mint heart.",
            middle: "Apple, juniper, Guatemalan cardamom, and geranium.",
            base: "Tonka bean, amberwood, and Haitian vetiver.",
        },
        description: [
            "Flow Wanted is a bold unisex fragrance for those who trust their instincts and make their own moves. Addictive, confident, and effortlessly magnetic, it’s made to leave a lasting impression from day to night.",
            "It is a popular woody and spicy unisex fragrance featuring standout notes of lemon, cardamom, and vetiver.",
        ],
    },
    {
        slug: "the-gentlemen",
        name: "The Gentlemen",
        titleChars: "13",
        category: "For Men",
        heroBackground: "/images/productbk2.png",
        mainImage: "/images/thegentlemenbottle.png",
        gallery: [
            "/images/thegentlemenbottle.png",
            "/images/thegentlemen.png",
        ],
        cardBackground: "/images/scentgradient5.png",
        cardImage: "/images/thegentlemenbottle.png",
        tester: "/images/tester3.png",
        testerName: "Flow Wanted",
        bestSeller: false,
        price: "2,500",
        compareAtPrice: "3,000",
        notes: {
            top: "Bergamot, lavender, and crisp green notes.",
            middle: "Geranium, nutmeg, and soft florals.",
            base: "Cedarwood, musk, and amber.",
        },
        description: [
            "The Gentlemen is a refined masculine fragrance with a confident edge. Clean, polished, and modern — crafted for everyday wear and evening presence.",
            "It balances freshness and depth with standout notes of bergamot, cedarwood, and musk.",
        ],
    },
    {
        slug: "alpha-male",
        name: "Alpha Male",
        titleChars: "10",
        category: "For Men",
        heroBackground: "/images/productbk3.png",
        mainImage: "/images/alphabottle.png",
        gallery: [
            "/images/alphabottle.png",
            "/images/alpha.png",
        ],
        cardBackground: "/images/scentgradient3.png",
        cardImage: "/images/alphabottle.png",
        tester: "/images/tester5.png",
        testerName: "The Gentlemen",
        bestSeller: true,
        price: "2,500",
        compareAtPrice: "3,000",
        notes: {
            top: "Citrus, mint, and aquatic freshness.",
            middle: "Pepper, lavender, and aromatic herbs.",
            base: "Woody notes, amber, and musk.",
        },
        description: [
            "Alpha Male is fresh, powerful, and effortlessly modern. Built for all-day confidence with a bold opening and a strong lasting finish.",
            "A versatile masculine scent featuring citrus brightness, aromatic heart, and a woody dry down.",
        ],
    },
    {
        slug: "sirr-al-oud",
        name: "Sirr Al Oud",
        titleChars: "11",
        category: "For Unisex",
        heroBackground: "/images/productbk4.png",
        mainImage: "/images/sirraloudbottle.png",
        gallery: [
            "/images/sirraloudbottle.png",
            "/images/sirraloud.png",
        ],
        cardBackground: "/images/scentgradient2.png",
        cardImage: "/images/sirraloudbottle.png",
        tester: "/images/tester2.png",
        testerName: "Velvet Rose",
        bestSeller: false,
        price: "2,500",
        compareAtPrice: "3,000",
        notes: {
            top: "Saffron, rose, and warm spices.",
            middle: "Oud, patchouli, and incense.",
            base: "Amber, sandalwood, and musk.",
        },
        description: [
            "Sirr Al Oud is a deep, luxurious fragrance wrapped in oud warmth. Rich, mysterious, and crafted for those who love bold oriental character.",
            "A unisex scent with standout notes of saffron, oud, and amber for lasting elegance.",
        ],
    },
    {
        slug: "velvet-rose",
        name: "Velvet Rose",
        titleChars: "11",
        category: "For Women",
        heroBackground: "/images/productbk5.png",
        mainImage: "/images/velvetrosebottle.png",
        gallery: [
            "/images/velvetrosebottle.png",
            "/images/velvetrose.png",
        ],
        cardBackground: "/images/scentgradient1.png",
        cardImage: "/images/velvetrosebottle.png",
        tester: "/images/tester4.png",
        testerName: "Sirr Al Oud",
        bestSeller: false,
        price: "2,500",
        compareAtPrice: "3,000",
        notes: {
            top: "Rose petals, berry accents, and soft citrus.",
            middle: "Peony, jasmine, and velvet florals.",
            base: "Vanilla, musk, and warm woods.",
        },
        description: [
            "Velvet Rose is a soft, elegant floral fragrance with rich warmth. Romantic, refined, and designed to feel luxurious from the first spray.",
            "A feminine scent featuring rose, jasmine, and a smooth vanilla-musk finish.",
        ],
    },
];

export function getProductBySlug(slug) {
    return products.find((product) => product.slug === slug) ?? null;
}

export function getAllProductSlugs() {
    return products.map((product) => product.slug);
}
