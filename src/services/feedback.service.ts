import api from "@/api/config.api"
import { getAuthHeaders } from "@/api/headers.api"
import { feedbackSchema, feedbackToUserSchema } from "@/entities/feedback/schemas/feedback.schema"
import { API_ROUTE } from "@/lib/routes/api.route"
import z from "zod"

export const create = async (productId: string, data: z.infer<typeof feedbackSchema>) => {
    const response = await api.post(
        API_ROUTE.feedback.create(productId),
        data,
        { headers: await getAuthHeaders() }
    );
    return response.data;
}

export const createToUser = async (feedbackId: string, data: z.infer<typeof feedbackToUserSchema>) => {
    const response = await api.post(
        API_ROUTE.feedback.createToUser(feedbackId),
        data,
        { headers: await getAuthHeaders() }
    );
    return response.data;
}

export const findAll = async (productId: string) => {
    const response = await api.get(
        API_ROUTE.feedback.findAll(productId)
    );
    return response.data
}