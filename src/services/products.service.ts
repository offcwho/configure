import api from "@/api/config.api"
import { API_ROUTE } from "@/lib/routes/api.route"

export const findAll = async () => {
    const response = await api.get(
        API_ROUTE.products.findAll()
    );

    return response.data;
}