import express from "express";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.get("/get-signature", (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Use folder if needed
  const folder = "Portfolio"; // must match frontend folder if used
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}&upload_preset=${process.env.CLOUDINARY_UPLOAD_PRESET}`;

  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign + process.env.CLOUDINARY_API_SECRET)
    .digest("hex");

  res.json({
  timestamp,
  signature,
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
  apiKey: process.env.CLOUDINARY_API_KEY,
  folder
});

});

export default router;
