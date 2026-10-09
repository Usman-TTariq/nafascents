import { MongoClient, type Db } from "mongodb";

const options = {};

declare global {
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient> | undefined;
    // eslint-disable-next-line no-var
    var _mongoClientUri: string | undefined;
}

function getClientPromise(): Promise<MongoClient> {
    const uri = process.env.MONGODB_URI?.trim();

    if (!uri) {
        throw new Error("Missing MONGODB_URI environment variable.");
    }

    if (uri.includes("@CLUSTER.mongodb.net") || uri.includes("USER:PASSWORD")) {
        throw new Error(
            "MONGODB_URI still uses placeholder values. Copy the real connection string from MongoDB Atlas."
        );
    }

    if (process.env.NODE_ENV === "development") {
        if (!global._mongoClientPromise || global._mongoClientUri !== uri) {
            global._mongoClientUri = uri;
            const client = new MongoClient(uri, options);
            global._mongoClientPromise = client.connect();
        }
        return global._mongoClientPromise;
    }

    const client = new MongoClient(uri, options);
    return client.connect();
}

export async function getDb(): Promise<Db> {
    const client = await getClientPromise();
    const dbName = process.env.MONGODB_DB_NAME ?? "scents";
    return client.db(dbName);
}

export const ORDERS_COLLECTION = "orders";
