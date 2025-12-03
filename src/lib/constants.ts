export const BACKEND_URL: string = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000/api";
export const BACKEND_IMAGE: string = process.env.NEXT_PUBLIC_IMAGES || "https://localhost:9000/";
export const ACCESS_TOKEN: string = process.env.JWT_ACCESS_TOKEN || "";

export const BACKEND_HEADERS = { 'Content-Type': 'application/json' };
export const BACKEND_HEADERS_FILE = { 'Content-Type': '' };
