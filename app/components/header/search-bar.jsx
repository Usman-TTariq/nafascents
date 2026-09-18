"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Search from "./svg/search";
import { products } from "../../data/products.js";

const SearchBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    const results = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) return [];

        return products.filter(
            (product) =>
                product.name.toLowerCase().includes(normalizedQuery) ||
                product.slug.toLowerCase().includes(normalizedQuery) ||
                product.category.toLowerCase().includes(normalizedQuery)
        );
    }, [query]);

    const closeSearch = () => {
        setIsOpen(false);
        setQuery("");
    };

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                closeSearch();
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                closeSearch();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        window.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    if (!isOpen) {
        return (
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center px-[10px] py-[5px] bg-[#ffffff4a] rounded-full cursor-pointer"
                aria-label="Open search"
            >
                <Search className="w-[15px]" />
            </button>
        );
    }

    return (
        <div ref={containerRef} className="relative z-[60]">
            <div className="flex items-center gap-[10px] bg-white rounded-full px-[14px] py-[8px] w-[280px] max-lg:w-[min(280px,calc(100vw-130px))] shadow-lg">
                <Search className="w-[15px] shrink-0" stroke="#111" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search"
                    className="flex-1 min-w-0 bg-transparent text-[15px] font-manropeRegular text-black placeholder:text-[#999] outline-none"
                    aria-label="Search products"
                />
                <button
                    type="button"
                    onClick={closeSearch}
                    className="text-[#999] text-[20px] leading-none cursor-pointer px-[2px]"
                    aria-label="Close search"
                >
                    ×
                </button>
            </div>

            {query.trim() && (
                <div className="absolute top-[calc(100%+2px)] right-0 w-[320px] max-lg:w-[min(320px,calc(100vw-40px))] max-h-[320px] overflow-y-auto bg-[#111]/95 backdrop-blur-md rounded-[16px] shadow-2xl border border-[#FBE376]/30 z-[60]">
                    {results.length > 0 ? (
                        results.map((product) => (
                            <Link
                                key={product.slug}
                                href={`/product/${product.slug}`}
                                onClick={closeSearch}
                                className="flex items-center gap-[12px] px-[14px] py-[12px] border-b border-white/10 last:border-b-0 hover:bg-[#f9e27414] cursor-pointer transition-colors"
                            >
                                <div className="w-[48px] h-[48px] rounded-[8px] overflow-hidden bg-[#1a1a1a] shrink-0 border border-white/10">
                                    <Image
                                        src={product.cardImage}
                                        alt={product.name}
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <h6 className="text-[15px] font-manropeRegular text-white font-medium truncate">
                                        {product.name}
                                    </h6>
                                    <h6 className="text-[13px] font-manropeRegular text-[#c7c7c7] pt-[2px]">
                                        {product.category} · <span className="text-[#F5BF56]">{product.price} PKR</span>
                                    </h6>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <h6 className="px-[14px] py-[16px] text-[14px] font-manropeRegular text-[#c7c7c7] text-center">
                            No products found
                        </h6>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
