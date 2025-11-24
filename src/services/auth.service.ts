import { z } from 'zod';
import api from '@/api/config.api';
import { loginSchema, registerSchema } from "@/entities/auth/schemas/auth.schema";
import { API_ROUTE } from "@/lib/routes/api.route";
import { getAuthHeaders } from '@/api/headers.api';

export interface UserProps {
    id: number;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
}

export const login = async (data: z.infer<typeof loginSchema>) => {
    const response = await api.post(API_ROUTE.auth.login(), data);
    return response.data
}

export const register = async (data: z.infer<typeof registerSchema>) => {
    return api.post(API_ROUTE.auth.register(), data);
}

export const logout = async () => {
    return api.post(API_ROUTE.auth.logout(), {
        headers: await getAuthHeaders(),
    });
}

export const getUser = async (): Promise<UserProps> => {
    const response = await api.get(API_ROUTE.auth.user(), {
        headers: await getAuthHeaders(),
    });

    return response.data;
}