import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export async function uploadPDF(filePath: string) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading PDF:", error);
    throw error;
  }
}

export async function uploadImage(filePath: string) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
