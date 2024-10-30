import mongoose, { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
}

const usersSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
    },
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

export const Users = model<IUser>("Users", usersSchema);
