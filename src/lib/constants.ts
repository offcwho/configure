export const BACKEND_URL: string = "https://configure-backend-production.up.railway.app/api";
export const ACCESS_TOKEN: string = process.env.JWT_ACCESS_TOKEN || "";

export const BACKEND_HEADERS = { 'Content-Type' : 'application/json' };