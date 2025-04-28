import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
// import { getServerSession } from "next-auth"; // skip for now

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export async function POST(req: NextRequest) {
  try {
    // const session = await getServerSession();
    // if (!session || !session.user?.id) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    // const creatorId = session.user.id;
    const creatorId = "some-temporary-test-id"; // temp

    const formData = await req.formData();

    const tierName = formData.get("tierName")?.toString().trim();
    const priceStr = formData.get("price")?.toString().trim();
    const description = formData.get("description")?.toString().trim() || "";
    const benefitsRaw = formData.get("benefits")?.toString().trim() || "";
    const imageFile = formData.get("image") as File | null;

    if (!tierName || !priceStr) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const price = Number(priceStr);
    if (isNaN(price) || price <= 0) {
      return NextResponse.json({ error: "Invalid price value" }, { status: 400 });
    }

    const benefits = benefitsRaw
      ? benefitsRaw.split("\n").map(b => b.trim()).filter(b => b !== "")
      : [];

    let imageUrl = "";

    if (imageFile) {
      // Validate file type
      if (!ALLOWED_IMAGE_TYPES.includes(imageFile.type)) {
        return NextResponse.json({ error: "Unsupported image format. Only JPG and PNG allowed." }, { status: 400 });
      }

      // Validate file size
      if (imageFile.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: "Image size too large. Max 2MB allowed." }, { status: 400 });
      }

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `${uuidv4()}-${imageFile.name}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      await mkdir(uploadDir, { recursive: true }); // Ensure folder exists
      const filepath = path.join(uploadDir, filename);

      await writeFile(filepath, buffer); // Save the file

      imageUrl = `/uploads/${filename}`; // Public URL
    }

    const tier = await prisma.tier.create({
      data: {
        creatorId,
        tierName,
        price,
        description,
        benefits,
        imageUrl,
      },
    });

    return NextResponse.json(tier, { status: 201 });
  } catch (error) {
    console.error("Error creating tier:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
