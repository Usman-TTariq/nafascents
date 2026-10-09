"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../header/svg/logo";
import { useCart } from "../../context/cart-context";

const SHIPPING_FEE = 200;

const formatPrice = (value) => Number(value).toLocaleString("en-US");

const createOrderId = () => {
    const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `NS-${Date.now()}-${randomPart}`;
};

const panelClass =
    "bg-white rounded-[16px] border border-[#ebebeb] shadow-[0_2px_12px_rgba(0,0,0,0.04)] px-[18px] py-[20px] sm:px-[24px] sm:py-[24px]";

const labelClass =
    "block text-[11px] font-semibold tracking-[0.05em] text-[#888] uppercase pb-[8px] font-manropeRegular";

const fieldClass =
    "w-full rounded-[12px] border border-[#e3e3e3] bg-white px-[14px] py-[13px] text-[15px] text-[#121212] font-manropeRegular placeholder:text-[#aaa] outline-none transition-all duration-200 focus:border-[#F5BF56] focus:ring-[3px] focus:ring-[#F5BF56]/25 hover:border-[#ccc]";

const optionCardClass =
    "flex items-center justify-between rounded-[12px] border-2 border-[#F5BF56] bg-gradient-to-r from-[#fffdf5] to-[#fff9e8] px-[16px] py-[14px] shadow-[0_1px_4px_rgba(245,191,86,0.15)]";

const CheckoutSection = () => {
    const router = useRouter();
    const { items, subtotal, totalItems } = useCart();
    const total = subtotal + SHIPPING_FEE;

    const [email, setEmail] = useState("");
    const [marketingEmail, setMarketingEmail] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [apartment, setApartment] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");
    const [saveInfo, setSaveInfo] = useState(false);

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (items.length === 0) {
            router.replace("/products");
        }
    }, [items.length, router]);

    if (items.length === 0) {
        return null;
    }

    const handleCheckout = async (event) => {
        event.preventDefault();
        setError("");

        const trimmedEmail = email.trim();
        const trimmedPhone = phone.trim();
        const trimmedFirstName = firstName.trim();
        const trimmedLastName = lastName.trim();
        const trimmedAddress = address.trim();
        const trimmedCity = city.trim();

        if (
            !trimmedEmail ||
            !trimmedPhone ||
            !trimmedFirstName ||
            !trimmedLastName ||
            !trimmedAddress ||
            !trimmedCity
        ) {
            setError("Please fill in all required fields.");
            return;
        }

        const orderId = createOrderId();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId,
                    email: trimmedEmail,
                    phone: trimmedPhone,
                    firstName: trimmedFirstName,
                    lastName: trimmedLastName,
                    address: trimmedAddress,
                    apartment: apartment.trim(),
                    city: trimmedCity,
                    postalCode: postalCode.trim(),
                    items: items.map((item) => ({
                        slug: item.slug,
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                    subtotal,
                    shipping: SHIPPING_FEE,
                    total,
                    paymentMethod: "cod",
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error ?? "Unable to place order. Please try again.");
                setIsSubmitting(false);
                return;
            }

            router.push(`/payment/success?order=${encodeURIComponent(orderId)}`);
        } catch {
            setError("Unable to place order. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-svh bg-gradient-to-b from-[#f3f3f3] to-[#e8e8e8] font-manropeRegular py-[28px] sm:py-[40px]">
            <div className="container">
                <div className="flex items-center justify-between pb-[24px] sm:pb-[32px]">
                    <Link href="/" className="transition-opacity hover:opacity-85">
                        <Logo className="w-[128px] sm:w-[150px]" />
                    </Link>
                    <span className="text-[12px] sm:text-[13px] font-semibold tracking-[0.14em] text-[#121212] uppercase px-[14px] py-[8px] rounded-full border border-[#e5e5e5] bg-white shadow-sm">
                        Checkout
                    </span>
                </div>

                <form onSubmit={handleCheckout}>
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-[20px] lg:gap-[28px] items-start">
                        <div className="flex flex-col gap-[16px] max-lg:order-2">
                            <div className={panelClass}>
                                <label className={labelClass} htmlFor="shipping-country">
                                    Shipping country
                                </label>
                                <select
                                    id="shipping-country"
                                    className={`${fieldClass} cursor-pointer`}
                                    defaultValue="PK"
                                >
                                    <option value="PK">Pakistan</option>
                                </select>
                            </div>

                            <div className={panelClass}>
                                <label className={labelClass} htmlFor="checkout-email">
                                    Email address
                                </label>
                                <input
                                    id="checkout-email"
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    className={fieldClass}
                                    placeholder="you@example.com"
                                    required
                                />
                                <label className="flex items-center gap-[10px] cursor-pointer mt-[14px]">
                                    <input
                                        type="checkbox"
                                        checked={marketingEmail}
                                        onChange={(event) => setMarketingEmail(event.target.checked)}
                                        className="w-[16px] h-[16px] accent-[#F5BF56] rounded-[4px]"
                                    />
                                    <span className="text-[13px] text-[#666]">Email me with news and offers</span>
                                </label>
                            </div>

                            <div className={panelClass}>
                                <div className="pb-[16px] mb-[18px] border-b border-[#f0f0f0]">
                                    <span className="text-[12px] font-semibold tracking-[0.08em] text-[#121212] uppercase px-[4px] pb-[10px] border-b-[3px] border-[#F5BF56] inline-block">
                                        Delivery address
                                    </span>
                                </div>

                                <p className="text-[11px] font-semibold tracking-[0.05em] text-[#888] uppercase pb-[14px]">
                                    Add address
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] mb-[14px]">
                                    <div>
                                        <label className={labelClass} htmlFor="first-name">
                                            First name
                                        </label>
                                        <input
                                            id="first-name"
                                            type="text"
                                            value={firstName}
                                            onChange={(event) => setFirstName(event.target.value)}
                                            className={fieldClass}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass} htmlFor="last-name">
                                            Last name
                                        </label>
                                        <input
                                            id="last-name"
                                            type="text"
                                            value={lastName}
                                            onChange={(event) => setLastName(event.target.value)}
                                            className={fieldClass}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-[14px]">
                                    <label className={labelClass} htmlFor="phone">
                                        Mobile (for delivery updates)
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(event) => setPhone(event.target.value)}
                                        className={fieldClass}
                                        placeholder="03XX XXXXXXX"
                                        required
                                    />
                                </div>

                                <div className="mb-[14px]">
                                    <label className={labelClass} htmlFor="address">
                                        Address
                                    </label>
                                    <input
                                        id="address"
                                        type="text"
                                        value={address}
                                        onChange={(event) => setAddress(event.target.value)}
                                        className={fieldClass}
                                        placeholder="Street address"
                                        required
                                    />
                                </div>

                                <div className="mb-[14px]">
                                    <label className={labelClass} htmlFor="apartment">
                                        Apartment, suite, etc. (optional)
                                    </label>
                                    <input
                                        id="apartment"
                                        type="text"
                                        value={apartment}
                                        onChange={(event) => setApartment(event.target.value)}
                                        className={fieldClass}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] mb-[14px]">
                                    <div>
                                        <label className={labelClass} htmlFor="city">
                                            City
                                        </label>
                                        <input
                                            id="city"
                                            type="text"
                                            value={city}
                                            onChange={(event) => setCity(event.target.value)}
                                            className={fieldClass}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass} htmlFor="postal">
                                            Postal code (optional)
                                        </label>
                                        <input
                                            id="postal"
                                            type="text"
                                            value={postalCode}
                                            onChange={(event) => setPostalCode(event.target.value)}
                                            className={fieldClass}
                                        />
                                    </div>
                                </div>

                                <label className="flex items-center gap-[10px] cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={saveInfo}
                                        onChange={(event) => setSaveInfo(event.target.checked)}
                                        className="w-[16px] h-[16px] accent-[#F5BF56] rounded-[4px]"
                                    />
                                    <span className="text-[13px] text-[#666]">Save this information for next time</span>
                                </label>
                            </div>

                            <div className={panelClass}>
                                <p className={`${labelClass} pb-[14px]`}>Shipping method</p>
                                <div className={optionCardClass}>
                                    <span className="text-[14px] text-[#121212] font-medium">Standard delivery</span>
                                    <span className="text-[14px] text-[#121212] font-semibold">
                                        {formatPrice(SHIPPING_FEE)} PKR
                                    </span>
                                </div>
                            </div>

                            <div className={panelClass}>
                                <p className={`${labelClass} pb-[6px]`}>Payment</p>
                                <p className="text-[13px] text-[#777] pb-[14px]">
                                    Pay when your order is delivered to your door.
                                </p>
                                <div className="rounded-[14px] border-2 border-[#F5BF56] overflow-hidden shadow-[0_1px_4px_rgba(245,191,86,0.12)]">
                                    <div className="flex items-center gap-[12px] px-[16px] py-[15px] bg-gradient-to-r from-[#fffdf5] to-[#fff9e8] border-b border-[#F5BF56]/20">
                                        <span className="w-[18px] h-[18px] rounded-full border-[5px] border-[#F5BF56] bg-white shrink-0" />
                                        <span className="text-[14px] text-[#121212] font-semibold">
                                            Cash on Delivery (COD)
                                        </span>
                                    </div>
                                    <p className="px-[16px] py-[14px] text-[13px] text-[#666] leading-[1.6] bg-white">
                                        Please keep{" "}
                                        <span className="font-semibold text-[#121212]">{formatPrice(total)} PKR</span>{" "}
                                        ready in cash when your order arrives.
                                    </p>
                                </div>
                            </div>

                            {error && (
                                <p className="text-[14px] text-[#b42318] bg-[#fef3f2] border border-[#fecdca] rounded-[12px] px-[14px] py-[12px]">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed bg-gradient-to-b from-[#FCE481] to-[#F5BF56] hover:from-[#fdeaa0] hover:to-[#e8b04d] text-[#121212] rounded-full px-[24px] py-[17px] text-[16px] font-semibold shadow-[0_4px_14px_rgba(245,191,86,0.35)] transition-all duration-200"
                            >
                                {isSubmitting ? "Placing order..." : "Complete order"}
                            </button>

                            <p className="text-center text-[12px] text-[#999] pb-[8px]">
                                Secure checkout · Free returns on unopened items
                            </p>
                        </div>

                        <aside
                            className={`${panelClass} max-lg:order-1 lg:sticky lg:top-[28px] shadow-[0_4px_24px_rgba(0,0,0,0.06)]`}
                        >
                            <div className="flex items-center justify-between pb-[18px] border-b border-[#f0f0f0] mb-[18px]">
                                <span className="text-[12px] font-semibold tracking-[0.08em] text-[#121212] uppercase">
                                    {totalItems} {totalItems === 1 ? "item" : "items"}
                                </span>
                                <Link
                                    href="/products"
                                    className="text-[13px] text-[#888] hover:text-[#121212] transition-colors"
                                >
                                    Edit
                                </Link>
                            </div>

                            <ul className="flex flex-col gap-[18px] pb-[18px]">
                                {items.map((item) => (
                                    <li key={item.slug} className="flex gap-[14px]">
                                        <div className="relative shrink-0">
                                            <div className="w-[76px] h-[92px] rounded-[12px] overflow-hidden bg-[#f8f8f8] border border-[#eee]">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={76}
                                                    height={92}
                                                    className="w-full h-full object-contain p-[6px]"
                                                />
                                            </div>
                                            <span className="absolute -top-[6px] -right-[6px] min-w-[22px] h-[22px] px-[6px] rounded-full bg-[#121212] text-white text-[11px] font-medium flex items-center justify-center ring-2 ring-white">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0 pt-[4px]">
                                            <p className="text-[15px] font-semibold text-[#121212]">
                                                {formatPrice(item.price * item.quantity)} PKR
                                            </p>
                                            <p className="text-[13px] text-[#666] leading-[1.45] pt-[6px] line-clamp-2">
                                                {item.name}
                                            </p>
                                            <p className="text-[12px] text-[#aaa] pt-[6px]">Qty: {item.quantity}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="rounded-[12px] bg-[#fafafa] border border-[#f0f0f0] px-[16px] py-[16px] space-y-[10px]">
                                <div className="flex justify-between text-[14px] text-[#666]">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(subtotal)} PKR</span>
                                </div>
                                <div className="flex justify-between text-[14px] text-[#666]">
                                    <span>Shipping</span>
                                    <span>{formatPrice(SHIPPING_FEE)} PKR</span>
                                </div>
                                <div className="flex justify-between items-center pt-[12px] mt-[4px] border-t border-[#e8e8e8]">
                                    <span className="text-[12px] font-semibold tracking-[0.06em] text-[#121212] uppercase">
                                        Total to pay
                                    </span>
                                    <span className="text-[20px] font-bold text-[#121212]">
                                        {formatPrice(total)} PKR
                                    </span>
                                </div>
                            </div>
                        </aside>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutSection;
