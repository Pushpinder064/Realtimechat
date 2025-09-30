"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = upload;
// a real implementation would upload the file (e.g. to Cloudinary / S3)
// this simply returns the local path or mimics upload for now
function upload(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.file)
            return res.status(400).json({ error: "No file" });
        // Ideally, upload to cloud and return URL
        res.json({ url: `/uploads/${req.file.filename}` }); // or use req.file.path
    });
}
