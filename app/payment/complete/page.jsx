import { Suspense } from "react";
import Header from "../../components/header/index.jsx";
import Footer from "../../components/footer/index.jsx";
import PaymentStatus from "../../components/payment-status/index.jsx";

export default function PaymentCompletePage() {
    return (
        <>
            <Header />
            <Suspense fallback={null}>
                <PaymentStatus
                    title="Payment processing"
                    description="Your payment session has ended. If you completed payment, confirmation may arrive shortly."
                    tone="neutral"
                />
            </Suspense>
            <Footer />
        </>
    );
}
