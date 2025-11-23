import api from "@/api/config.api";
import { getAuthHeaders } from "@/api/headers.api";
import { API_ROUTE } from "@/lib/routes/api.route";

export const upload = async (id: string, data: FormData) => {
    console.log(data);
    const response = await api.post(
        API_ROUTE.upload.upload(id),
        data,
        {
            headers: {
                ...(await getAuthHeaders()),
                'Content-Type': ""
            }
        }
    );
    return response.data;
};
