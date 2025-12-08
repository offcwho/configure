import z from "zod";

export const feedbackSchema = z.object({
    content: z.string(),
    rating: z.int(),
});

export const feedbackToUserSchema = z.object({
    content: z.string()
});