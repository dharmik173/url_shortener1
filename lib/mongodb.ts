import mongoose, { Connection } from "mongoose";

interface Cached {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

const globalWithMongoose = global as unknown as { mongoose?: Cached };

const cached: Cached = globalWithMongoose.mongoose || {
  conn: null,
  promise: null,
};

export async function connectToDB(): Promise<Connection> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI as string, {
        dbName: "url_shortcut",
        bufferCommands: false,
      })
      .then((mongooseInstance) => mongooseInstance.connection);
  }

  cached.conn = await cached.promise;
  globalWithMongoose.mongoose = cached;

  return cached.conn;
}
