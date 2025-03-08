import mongoose, { Schema, model, models } from "mongoose";

const UrlSchema = new Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export const Url = models.Url || model("Url", UrlSchema);
