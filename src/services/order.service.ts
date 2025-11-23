import api from "@/api/config.api"
import { getAuthHeaders } from "@/api/headers.api"
import { BACKEND_HEADERS } from "@/lib/constants"
import { API_ROUTE } from "@/lib/routes/api.route"

export const checkout = async () => {
    const response = await api.post(
        API_ROUTE.order.checkout(),
        { headers: await getAuthHeaders() },
    )

    return response.data;
}

export const findAll = async () => {
    const response = await api.get(
        API_ROUTE.order.findAll(),
        { headers: await getAuthHeaders() }
    );

    return response.data;
}