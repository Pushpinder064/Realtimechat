import { Request, Response } from "express";

// a real implementation would upload the file (e.g. to Cloudinary / S3)
// this simply returns the local path or mimics upload for now
export async function upload(req: Request, res: Response) {
  if (!req.file) return res.status(400).json({ error: "No file" });
  // Ideally, upload to cloud and return URL
  res.json({ url: `/uploads/${req.file.filename}` }); // or use req.file.path
}
