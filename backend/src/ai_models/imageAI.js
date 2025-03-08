import * as dotenv from "dotenv";
import axios from "axios";
import FormData from "form-data";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

//Upload the photo to the cloudinary 

const uploadToCloudinary = async (image) => {
    const photoUrl = await cloudinary.uploader.upload(image);
    return photoUrl.secure_url
}

 

export const generateImage =  async (prompt) => {
   try {
      const data = new FormData();
      data.append("prompt", prompt);
      data.append("style", "realistic");
      data.append("aspect_ratio", "1:1");
      data.append("seed", "5");

      const config = {
         method: "post",
         url: "https://api.vyro.ai/v2/image/generations",
         headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            ...data.getHeaders(),
         },
         data: data,
         responseType: "arraybuffer",
      };

      const response = await axios(config);
      const base64Image = Buffer.from(response.data, "binary").toString("base64");
      
      if (response.data && base64Image ) {
         const image= `data:image/jpeg;base64,${base64Image}` // Sends Base64 image
         const imageUrl = await uploadToCloudinary(image)
         return imageUrl
      } else {
         return "Image generation failed"
      }
   } catch (error) {
      console.error("Error generating image:", error);
      return  "Internal server error"
   }
};