import api from "@/api/config.api"
import { getAuthHeaders } from "@/api/headers.api"
import { createConfigureSchema } from "@/entities/configure/schemas/create-configure.schema"
import { CreateFormData } from "@/entities/configure/ui/form.ui"
import { API_ROUTE } from "@/lib/routes/api.route"
import z from "zod"

export const create = async (data: z.infer<typeof createConfigureSchema>) => {
    const response = await api.post(
        API_ROUTE.configure.create(),
        data,
        { headers: await getAuthHeaders() },
    );

    return response.data;
}

export const update = async (data: CreateFormData) => {
    const response = await api.patch(
        API_ROUTE.configure.update(data.configureId),
        data,
        { headers: await getAuthHeaders() },
    );

    return response.data;
}

export const findUserConfigurations = async () => {
    const response = await api.get(
        API_ROUTE.configure.findUserConfigurations(),
        { headers: await getAuthHeaders() }
    );

    return response.data;
}

export const getComponents = async (type: string, socket: string, ddr: string) => {
    const response = await api.get(API_ROUTE.components.type(type, socket, ddr));

    return response.data;
}

export const createFindOne = async (name: string) => {
    const response = await api.get(API_ROUTE.configure.createFindOne(name));

    return response.data;
}

export const show = async (id: string) => {
    const response = await api.get(API_ROUTE.configure.show(id));

    return response.data;
}