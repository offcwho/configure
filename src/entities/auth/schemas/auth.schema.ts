import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Введите корректный email"),
    password: z.string().min(6, 'Минимальная длина пароля 6 символов'),
});

export const registerSchema = z.object({
    name: z.string().min(1, "Поле обязательно для заполнения"),
    email: z.email("Введите корректный email"),
    phone: z.int(),
    password: z.string()
        .min(8, 'Пароль должен содержать минимум 8 символов')
        .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
        .regex(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
        .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"]
});