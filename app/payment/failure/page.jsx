import { Suspense } from "react";
import Header from "../../components/header/index.jsx";
import Footer from "../../components/footer/index.jsx";
import PaymentStatus from "../../components/payment-status/index.jsx";

export default function PaymentFailurePage() {
    return (
        <>
            <Header />
            <Suspense fallback={null}>
                <PaymentStatus
                    title="Payment failed"
                    description="Your payment could not be completed. You can return to checkout and try again."
                    tone="failure"
                />
            </Suspense>
            <Footer />
        </>
    );
}
