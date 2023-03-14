import mongoose, { Schema, Document } from "mongoose";

export interface productModel extends Document {
  title: string;
  description: string;
  price: number;
}

const productSchema: Schema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    price: { type: Number },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<productModel>("Product", productSchema);
