"use client";

import { useState } from "react";

const fieldClass =
    "w-full bg-transparent border-b border-white/30 px-[2px] py-[12px] text-[15px] text-white font-manropeRegular placeholder:text-white/35 outline-none focus:border-[#F5BF56] transition-colors";

const ContactSection = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState("");

    const update = (key) => (event) => {
        setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus("sending");
        setError("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                setStatus("error");
                setError(data.error || "Could not send your message.");
                return;
            }

            setStatus("sent");
            setForm({ firstName: "", lastName: "", email: "", message: "" });
        } catch {
            setStatus("error");
            setError("Could not send your message. Please try again.");
        }
    };

    return (
        <div className="bg-black pt-[70px] max-lg:pt-[40px] pb-[90px] max-lg:pb-[48px]">
            <div className="container">
                <div className="grid grid-cols-12 gap-[48px] max-lg:gap-[36px] items-start">
                    <div className="col-span-5 max-lg:col-span-12">
                        <h1 className="text-white text-[64px] max-xl:text-[52px] max-lg:text-[40px] leading-[1.05] italic font-timesNewRoman">
                            Get in Touch
                        </h1>
                        <h2 className="pt-[10px] text-[#F5BF56] text-[28px] max-lg:text-[22px] italic font-timesNewRoman">
                            We&apos;d like to hear from you!
                        </h2>
                        <p className="pt-[18px] max-w-[360px] text-[15px] max-lg:text-[14px] leading-[1.7] font-manropeRegular text-[#c7c7c7]">
                            If you have any inquiries or just want to say hi, please use the contact form.
                        </p>

                        <a
                            href="mailto:nafascents@gmail.com"
                            className="mt-[48px] max-lg:mt-[28px] inline-flex items-center gap-[10px] text-[15px] font-manropeRegular text-white hover:text-[#F5BF56] transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <path
                                    d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-11Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                                <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            nafascents@gmail.com
                        </a>

                        <div className="flex items-center gap-[12px] pt-[22px]">
                            <a
                                href="https://www.instagram.com/nafascents_official"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-[38px] h-[38px] rounded-full border border-white/30 flex items-center justify-center text-white hover:border-[#F5BF56] hover:text-[#F5BF56] transition-colors"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                                    <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
                                </svg>
                            </a>
                            <a
                                href="https://www.facebook.com/share/1Bi7TqaD2N/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="w-[38px] h-[38px] rounded-full border border-white/30 flex items-center justify-center text-white hover:border-[#F5BF56] hover:text-[#F5BF56] transition-colors"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                    <path d="M14.5 8.5V6.8c0-.7.5-1 1.2-1H17V3h-2.1C12.4 3 11 4.5 11 6.6v1.9H9v2.7h2V21h3.5v-9.8h2.3l.4-2.7h-2.7Z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="col-span-7 max-lg:col-span-12">
                        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-x-[28px] gap-y-[22px]">
                            <label className="block">
                                <span className="block text-[13px] font-manropeRegular text-[#c7c7c7] pb-[4px]">First Name</span>
                                <input
                                    required
                                    value={form.firstName}
                                    onChange={update("firstName")}
                                    className={fieldClass}
                                    autoComplete="given-name"
                                />
                            </label>
                            <label className="block">
                                <span className="block text-[13px] font-manropeRegular text-[#c7c7c7] pb-[4px]">Last Name</span>
                                <input
                                    required
                                    value={form.lastName}
                                    onChange={update("lastName")}
                                    className={fieldClass}
                                    autoComplete="family-name"
                                />
                            </label>
                        </div>

                        <label className="block pt-[22px]">
                            <span className="block text-[13px] font-manropeRegular text-[#c7c7c7] pb-[4px]">
                                Email <span className="text-[#F5BF56]">*</span>
                            </span>
                            <input
                                required
                                type="email"
                                value={form.email}
                                onChange={update("email")}
                                className={fieldClass}
                                autoComplete="email"
                            />
                        </label>

                        <label className="block pt-[22px]">
                            <span className="block text-[13px] font-manropeRegular text-[#c7c7c7] pb-[4px]">Message</span>
                            <textarea
                                required
                                rows={5}
                                value={form.message}
                                onChange={update("message")}
                                className={`${fieldClass} resize-none`}
                            />
                        </label>

                        {status === "sent" && (
                            <p className="pt-[18px] text-[14px] font-manropeRegular text-[#86efac]">
                                Message sent. We&apos;ll get back to you soon.
                            </p>
                        )}
                        {status === "error" && (
                            <p className="pt-[18px] text-[14px] font-manropeRegular text-[#fca5a5]">{error}</p>
                        )}

                        <div className="flex justify-end pt-[28px]">
                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed bg-gradient-to-b from-[#FCE481] to-[#F5BF56] text-black rounded-full px-[36px] py-[12px] font-manropeRegular text-[15px] font-medium"
                            >
                                {status === "sending" ? "Sending..." : "Send"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
