import api from "@/api/config.api"
import { getAuthHeaders } from "@/api/headers.api"
import { API_ROUTE } from "@/lib/routes/api.route"

export const addToCart = async (id: string) => {
    const response = await api.post(
        API_ROUTE.cart.addToCart(id),
        { headers: await getAuthHeaders() },
    );

    return response.data
}

export const findCart = async () => {
    const response = await api.get(
        API_ROUTE.cart.findCart(),
        { headers: await getAuthHeaders() }
    );

    return response.data;
}