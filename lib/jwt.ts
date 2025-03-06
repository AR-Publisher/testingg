import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

const SECRET: Secret = process.env.JWT_SECRET as string;
if (!SECRET) {
  throw new Error("JWT_SECRET is missing in .env file");
}

// Function to sign JWT
export function signJwt(payload: object, expiresIn: number = 3600): string {
  const options: SignOptions = { expiresIn }; // expiresIn must be a number
  return jwt.sign(payload, SECRET, options);
}

// Function to verify JWT
export function verifyJwt(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, SECRET);
    return typeof decoded === "string" ? null : (decoded as JwtPayload);
  } catch (error) {
    return null;
  }
}
