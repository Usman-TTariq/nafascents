import { NextRequest, NextResponse } from "next/server";
import { MongoServerError } from "mongodb";
import { createOrder, findOrderByOrderIdAndEmail, type OrderItem } from "../../../lib/orders";

type OrderBody = {
    orderId?: string;
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    apartment?: string;
    city?: string;
    postalCode?: string;
    items?: OrderItem[];
    subtotal?: number;
    shipping?: number;
    total?: number;
    paymentMethod?: string;
};

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as OrderBody;

        const required = [
            body.orderId,
            body.email,
            body.phone,
            body.firstName,
            body.lastName,
            body.address,
            body.city,
            body.items?.length,
            body.total,
        ];

        if (required.some((value) => !value)) {
            return NextResponse.json({ error: "Missing required order fields." }, { status: 400 });
        }

        if (body.paymentMethod !== "cod") {
            return NextResponse.json({ error: "Unsupported payment method." }, { status: 400 });
        }

        const order = await createOrder({
            orderId: body.orderId!.trim(),
            email: body.email!.trim(),
            phone: body.phone!.trim(),
            firstName: body.firstName!.trim(),
            lastName: body.lastName!.trim(),
            address: body.address!.trim(),
            apartment: body.apartment?.trim() ?? "",
            city: body.city!.trim(),
            postalCode: body.postalCode?.trim() ?? "",
            items: body.items!,
            subtotal: body.subtotal ?? 0,
            shipping: body.shipping ?? 0,
            total: body.total!,
            paymentMethod: "cod",
        });

        return NextResponse.json({
            success: true,
            orderId: order.orderId,
            paymentStatus: order.paymentStatus,
            fulfillmentStatus: order.fulfillmentStatus,
        });
    } catch (error) {
        if (error instanceof MongoServerError && error.code === 11000) {
            return NextResponse.json({ error: "This order was already submitted." }, { status: 409 });
        }

        if (error instanceof Error) {
            console.error("[POST /api/orders]", error.message);

            if (error.message.includes("MONGODB_URI")) {
                return NextResponse.json({ error: error.message }, { status: 500 });
            }

            if (process.env.NODE_ENV === "development") {
                const hint =
                    error.message.includes("Authentication failed") || error.message.includes("bad auth")
                        ? "MongoDB rejected the username or password in MONGODB_URI. In Atlas: Database Access → your user → Edit → reset password, then paste the new connection string and restart npm run dev."
                        : undefined;

                return NextResponse.json(
                    { error: "Could not place order.", details: error.message, ...(hint ? { hint } : {}) },
                    { status: 500 }
                );
            }
        }

        return NextResponse.json({ error: "Could not place order." }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const orderId = request.nextUrl.searchParams.get("orderId")?.trim();
        const email = request.nextUrl.searchParams.get("email")?.trim();

        if (!orderId || !email) {
            return NextResponse.json(
                { error: "orderId and email query parameters are required." },
                { status: 400 }
            );
        }

        const order = await findOrderByOrderIdAndEmail(orderId, email);

        if (!order) {
            return NextResponse.json({ error: "Order not found." }, { status: 404 });
        }

        return NextResponse.json({
            orderId: order.orderId,
            paymentStatus: order.paymentStatus,
            fulfillmentStatus: order.fulfillmentStatus,
            total: order.total,
            createdAt: order.createdAt,
            items: order.items.map((item) => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            })),
        });
    } catch (error) {
        if (error instanceof Error && error.message.includes("MONGODB_URI")) {
            return NextResponse.json({ error: "Orders database is not configured." }, { status: 500 });
        }

        return NextResponse.json({ error: "Could not fetch order." }, { status: 500 });
    }
}
