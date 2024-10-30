import { Request } from "express";
import { Fields, Files, IncomingForm } from "formidable";



export function multipartFormSubmission(req: Request): Promise<{ files: Files; fields: Fields }> {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve({ files, fields });
      }  
    });
  });
}
