import mongoose, { Schema, model, Document } from "mongoose";

interface IBooks extends Document {
  coverImage: string;
  pages: string;
  author: string;
  title: string;
  year: string;
  description :string;
  isbn:string
}

const booksSchema = new Schema<IBooks>(
  {
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    year: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    pages: {
      type: String,
    },
    description :{
      type:String
    },
    isbn:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

export const Books = model<IBooks>("Books", booksSchema);
