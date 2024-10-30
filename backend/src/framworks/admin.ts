import mongoose, { Schema, model, Document } from "mongoose";

interface IAdmin extends Document {
  email: string;
  password: string;
}

const adminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Admins = model<IAdmin>("Admins", adminSchema);
