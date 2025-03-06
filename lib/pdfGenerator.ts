import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generate1099K = async (userId: string, taxData: any) => {
    return new Promise<string>((resolve, reject) => {
      const doc = new PDFDocument();
      const filePath = path.join(process.cwd(), "public", `1099K_${userId}.pdf`);
      const stream = fs.createWriteStream(filePath);
  
      doc.pipe(stream);
  
      doc.fontSize(20).text("Form 1099-K", { align: "center" });
      doc.moveDown();
      doc.fontSize(14).text(`User ID: ${userId}`);
      doc.text(`Year: ${taxData.year}`);
      doc.text(`Total Processed Payments: $${taxData.total}`);
      doc.moveDown();
      doc.text("This document is generated for tax reporting purposes.");
      doc.end();
  
      stream.on("finish", () => resolve(filePath));
      stream.on("error", (err) => reject(err));
    });
  };
  