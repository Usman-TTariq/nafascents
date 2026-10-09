import { Suspense } from "react";
import Header from "../../components/header/index.jsx";
import Footer from "../../components/footer/index.jsx";
import PaymentStatus from "../../components/payment-status/index.jsx";

export default function PaymentSuccessPage() {
    return (
        <>
            <Header />
            <Suspense fallback={null}>
                <PaymentStatus
                    title="Order placed"
                    description="Thank you for your order. You chose Cash on Delivery — please keep the exact amount ready when your package arrives."
                    tone="success"
                    clearCartOnMount
                />
            </Suspense>
            <Footer />
        </>
    );
}
