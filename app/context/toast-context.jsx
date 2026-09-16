"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    const timeoutRef = useRef(null);

    const showToast = useCallback((text) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setMessage(text);

        timeoutRef.current = setTimeout(() => {
            setMessage(null);
        }, 3000);
    }, []);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const value = useMemo(() => ({ showToast }), [showToast]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            {message && (
                <div
                    role="status"
                    aria-live="polite"
                    className="fixed top-[90px] max-lg:top-[72px] left-1/2 -translate-x-1/2 z-[110] flex items-center gap-[10px] px-[20px] py-[12px] rounded-full bg-[#111] border border-white/10 shadow-lg animate-[toast-in_0.25s_ease-out]"
                >
                    <span className="flex items-center justify-center w-[22px] h-[22px] rounded-full bg-[#F5BF56] text-black text-[13px] font-bold">
                        ✓
                    </span>
                    <span className="text-[14px] font-manropeRegular text-white whitespace-nowrap">
                        {message}
                    </span>
                </div>
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast must be used within ToastProvider");
    }

    return context;
};
