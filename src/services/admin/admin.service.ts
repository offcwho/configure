import api, { api_file } from "@/api/config.api"
import { getAuthHeaders } from "@/api/headers.api"

export const create = async ({ route, data }: { route: string, data: FormData }) => {
    const response = await api_file.post(
        route,
        data,
        { headers: await getAuthHeaders() },
    );
    return response.data;
}

export const update = async ({ route, data }: { route: string, data: FormData }) => {
    const response = await api_file.patch(
        route,
        data,
        { headers: await getAuthHeaders() },
    );
    return response.data;
}

export const findAll = async ({ route }: { route: string }) => {
    const response = await api.get(
        route
    );
    return response.data
}