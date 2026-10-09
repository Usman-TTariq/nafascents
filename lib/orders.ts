import { getDb, ORDERS_COLLECTION } from "./mongodb";

export type OrderItem = {
    slug: string;
    name: string;
    quantity: number;
    price: number;
};

export type PaymentStatus = "pending" | "collected" | "cancelled";

export type FulfillmentStatus = "new" | "processing" | "shipped" | "delivered" | "cancelled";

export type OrderDocument = {
    orderId: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    address: string;
    apartment: string;
    city: string;
    postalCode: string;
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    total: number;
    paymentMethod: "cod";
    paymentStatus: PaymentStatus;
    fulfillmentStatus: FulfillmentStatus;
    createdAt: Date;
    updatedAt: Date;
};

export type CreateOrderInput = Omit<
    OrderDocument,
    "paymentStatus" | "fulfillmentStatus" | "createdAt" | "updatedAt"
>;

export async function createOrder(input: CreateOrderInput): Promise<OrderDocument> {
    const db = await getDb();
    const collection = db.collection<OrderDocument>(ORDERS_COLLECTION);

    const now = new Date();
    const order: OrderDocument = {
        ...input,
        email: input.email.trim().toLowerCase(),
        paymentStatus: "pending",
        fulfillmentStatus: "new",
        createdAt: now,
        updatedAt: now,
    };

    await collection.createIndex({ orderId: 1 }, { unique: true });
    await collection.createIndex({ email: 1, createdAt: -1 });

    await collection.insertOne(order);

    return order;
}

export async function findOrderByOrderIdAndEmail(
    orderId: string,
    email: string
): Promise<OrderDocument | null> {
    const db = await getDb();
    const collection = db.collection<OrderDocument>(ORDERS_COLLECTION);

    return collection.findOne({
        orderId,
        email: email.trim().toLowerCase(),
    });
}
