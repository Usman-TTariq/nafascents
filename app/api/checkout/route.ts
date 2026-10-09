import { NextRequest, NextResponse } from "next/server";

const TOKEN_URL = "https://secure.rapid-gateway.com/oauth2/token";
const PAYMENT_URL = "https://secure.rapid-gateway.com/rapid/process-transaction";

type CheckoutBody = {
    amount?: number;
    phone?: string;
    email?: string;
    orderId?: string;
};

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as CheckoutBody;
        const { amount, phone, email, orderId } = body;

        if (!amount || amount <= 0) {
            return NextResponse.json({ error: "Invalid order amount." }, { status: 400 });
        }

        if (!phone?.trim() || !email?.trim() || !orderId?.trim()) {
            return NextResponse.json(
                { error: "Phone, email, and order ID are required." },
                { status: 400 }
            );
        }

        const merchantId = process.env.RG_MERCHANT_ID;
        const clientSecret = process.env.RG_CLIENT_SECRET;
        const baseUrl = process.env.BASE_URL;

        if (!merchantId || !clientSecret || !baseUrl) {
            return NextResponse.json(
                { error: "Payment gateway is not configured on the server." },
                { status: 500 }
            );
        }

        const credentials = Buffer.from(`${merchantId}:${clientSecret}`).toString("base64");

        const tokenResponse = await fetch(TOKEN_URL, {
            method: "POST",
            headers: {
                Authorization: `Basic ${credentials}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "grant_type=client_credentials",
        });

        if (!tokenResponse.ok) {
            return NextResponse.json(
                { error: "Unable to authenticate with payment gateway." },
                { status: 502 }
            );
        }

        const tokenData = (await tokenResponse.json()) as { access_token?: string };
        const accessToken = tokenData.access_token;

        if (!accessToken) {
            return NextResponse.json(
                { error: "Payment gateway did not return an access token." },
                { status: 502 }
            );
        }

        const merchantName = process.env.RG_MERCHANT_NAME ?? "NAFA Scents";

        const paymentBody = new URLSearchParams({
            MERCHANT_ID: merchantId,
            MERCHANT_NAME: merchantName,
            TXNAMT: String(Math.round(amount)),
            CURRENCY_CODE: "PKR",
            CUSTOMER_MOBILE_NO: phone.trim(),
            CUSTOMER_EMAIL_ADDRESS: email.trim(),
            BASKET_ID: orderId.trim(),
            SUCCESS_URL: `${baseUrl}/payment/success`,
            FAILURE_URL: `${baseUrl}/payment/failure`,
            CHECKOUT_URL: `${baseUrl}/payment/complete`,
            VERSION: "MY_VER_1.0",
            PROCCODE: "0",
        });

        const paymentResponse = await fetch(PAYMENT_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: paymentBody.toString(),
            redirect: "manual",
        });

        const redirectUrl = paymentResponse.headers.get("location");

        if (!redirectUrl) {
            const gatewayMessage = await paymentResponse.text();
            return NextResponse.json(
                {
                    error: "Payment gateway did not return a redirect URL.",
                    details: gatewayMessage.slice(0, 300),
                },
                { status: 502 }
            );
        }

        return NextResponse.json({ redirectUrl });
    } catch {
        return NextResponse.json({ error: "Checkout request failed." }, { status: 500 });
    }
}
