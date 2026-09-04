"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const slides = [
    {
        title: "FLOW WANTED",
        background: "/images/flowwantedbk.png",
        product: "/images/flowanted.png",
        tester: "/images/tester1.png",
        testerName: "Alpha",
        description: "Bold, magnetic and made to stand out.",
        productBottom: "-60px",
    },
    {
        title: "SIRR AL OUD",
        background: "/images/sirraloudbk.png",
        product: "/images/sirraloud.png",
        tester: "/images/tester2.png",
        testerName: "Velvet Rose",
        description: "Deep oud warmth with a luxurious finish.",
        productBottom: "-130px",
    },
    {
        title: "THE GENTLEMEN",
        background: "/images/thegentlemenbk.png",
        product: "/images/thegentlemen.png",
        tester: "/images/tester3.png",
        testerName: "Flow Wanted",
        description: "Refined freshness with a confident masculine edge.",
        productBottom: "-110px",
    },
    {
        title: "ALPHA MALE",
        background: "/images/alphabk.png",
        product: "/images/alpha.png",
        tester: "/images/tester5.png",
        testerName: "The Gentlemen",
        description: "Fresh, powerful and effortlessly modern all day.",
        productBottom: "-125px",
    },
    {
        title: "VELVET ROSE",
        background: "/images/velvetrosebk.png",
        product: "/images/velvetrose.png",
        tester: "/images/tester4.png",
        testerName: "Sirr Al Oud",
        description: "Rich florals wrapped in soft, elegant warmth.",
        productBottom: "-100px",
    }
];

const HOLD_MS = 2800;
const TRANSITION_MS = 1400;
const LOOP_SLIDES = true;

const HeroSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);
    const [started, setStarted] = useState(false);
    const [settled, setSettled] = useState(false);
    const isSwapRef = useRef(false);

    useEffect(() => {
        const start = window.setTimeout(() => setStarted(true), 400);
        const settle = window.setTimeout(() => setSettled(true), 1200);
        return () => {
            window.clearTimeout(start);
            window.clearTimeout(settle);
        };
    }, []);

    useEffect(() => {
        if (!started) return;

        let index = 0;
        let cancelled = false;
        let advanceTimer;
        let clearPrevTimer;

        const scheduleNext = () => {
            advanceTimer = window.setTimeout(() => {
                if (cancelled) return;
                const nextIndex = index + 1;
                if (!LOOP_SLIDES && nextIndex >= slides.length) return;

                isSwapRef.current = true;
                setSettled(false);
                setPrevIndex(index);
                index = nextIndex % slides.length;
                setActiveIndex(index);

                clearPrevTimer = window.setTimeout(() => {
                    if (cancelled) return;
                    setPrevIndex(null);
                    setSettled(true);
                }, TRANSITION_MS);

                scheduleNext();
            }, HOLD_MS);
        };

        scheduleNext();

        return () => {
            cancelled = true;
            window.clearTimeout(advanceTimer);
            window.clearTimeout(clearPrevTimer);
        };
    }, [started]);

    const titleRef = useRef(null);
    const activeSlide = slides[activeIndex];
    const isSwap = isSwapRef.current;

    useLayoutEffect(() => {
        const title = titleRef.current;
        if (!title) return;

        const fitTitle = () => {
            title.style.fontSize = "";
            const available = title.clientWidth;
            if (!available) return;

            const range = document.createRange();
            range.selectNodeContents(title);
            const textWidth = range.getBoundingClientRect().width;
            if (textWidth <= 0) return;

            const currentSize = parseFloat(getComputedStyle(title).fontSize);
            title.style.fontSize = `${currentSize * (available / textWidth) * 0.992}px`;
        };

        fitTitle();
        document.fonts?.ready?.then(fitTitle);
        const observer = new ResizeObserver(fitTitle);
        observer.observe(title);

        return () => observer.disconnect();
    }, [activeIndex, started]);

    return (
        <div className="relative h-[110vh] pt-[80px] overflow-hidden bg-black">
            <div className="absolute bottom-[180px] left-[50%] translate-x-[-50%] flex items-center gap-[30px] z-40">
                {slides.map((slide, index) => (
                    <h6
                        key={slide.title}
                        className={`hero-slide-num font-manropeRegular cursor-pointer ${index === activeIndex ? "hero-slide-num-active" : ""}`}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </h6>
                ))}
            </div>
            <div className="absolute bottom-[0px] left-[0px] w-full h-[500px] z-30 bg-[linear-gradient(0deg,rgba(0,0,0,1)_0%,rgba(255,255,255,0)_100%)] pointer-events-none"></div>
            {slides.map((slide, index) => {
                const isActive = index === activeIndex;
                const isLeaving = index === prevIndex;
                if (!isActive && !isLeaving) return null;

                const bgPhase = isLeaving ? "leave" : !started ? "wait" : settled && isActive ? "shown" : "enter";
                const productPhase = isLeaving
                    ? "leave"
                    : !started
                        ? "wait"
                        : settled && isActive
                            ? "shown"
                            : isSwap
                                ? "enter-follow"
                                : "enter";

                return (
                    <div key={slide.title} className="contents">
                        <Image
                            className={`absolute top-[0px] left-[0px] w-full h-full object-cover pointer-events-none hero-bg-${bgPhase}`}
                            src={slide.background}
                            alt={`${slide.title} background`}
                            width={1000}
                            height={1000}
                            preload={index === 0}
                            loading={index === 0 ? "eager" : "lazy"}
                        />
                        <div
                            className={`absolute left-0 w-full z-20 pointer-events-none hero-product-${productPhase}`}
                            style={{ bottom: slide.productBottom }}
                        >
                            <Image
                                className="w-full"
                                src={slide.product}
                                alt={slide.title}
                                width={2000}
                                height={2000}
                                preload={index === 0}
                                loading={index === 0 ? "eager" : "lazy"}
                            />
                        </div>
                    </div>
                );
            })}
            <div key={activeIndex} className={`container relative z-10 ${isSwap ? "hero-copy-follow" : "hero-copy-first"}`}>
                <h1
                    ref={titleRef}
                    className="hero-fade-title font-manropeRegular text-white"
                    style={{ "--title-chars": String(activeSlide.title.length) }}
                >
                    {activeSlide.title}
                </h1>
                <div className="flex items-start justify-between w-full">
                    <div className="relative z-40">
                        <h6 className="hero-fade-copy text-[20px] font-manropeRegular text-white max-w-[280px]">{activeSlide.description}</h6>
                        <button className="hero-order-btn hero-fade-btn mt-[20px] cursor-pointer bg-gradient-to-b from-[#FCE481] to-[#F5BF56] text-black border-2 border-white rounded-full px-[20px] py-[10px] font-manropeRegular text-[18px] font-medium">Order Now</button>
                    </div>
                    <div className="hero-fade-tester">
                        <Image src={activeSlide.tester} className="w-[150px]" alt={`${activeSlide.testerName} Tester`} width={1000} height={1000} />
                        <h6 className="text-[18px] font-manropeRegular text-white text-center">
                            {activeSlide.testerName}
                            {activeSlide.testerName === "Alpha" ? " " : <br />}
                            <span className="font-semibold">Tester</span>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;
