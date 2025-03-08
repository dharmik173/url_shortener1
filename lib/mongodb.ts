import mongoose, { Connection } from "mongoose";

interface Cached {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

let cached: Cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDB() {
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
  (global as any).mongoose = cached;

  return cached.conn;
}
