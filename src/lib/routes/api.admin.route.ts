import { BACKEND_URL } from "../constants";

export const API_ADMIN_ROUTE = {
    root: (path: string | "") => BACKEND_URL + path,
    home: () => API_ADMIN_ROUTE.root('/admin'),

    product: {
        index: () => API_ADMIN_ROUTE.root('/products'),
        edit: (id: string) => API_ADMIN_ROUTE.root('/products/' + id),
        create: () => API_ADMIN_ROUTE.root('/products/create')
    },
    component: {
        index: () => API_ADMIN_ROUTE.root('/component'),
        edit: (id: string) => API_ADMIN_ROUTE.root('/component/' + id),
        create: () => API_ADMIN_ROUTE.root('/component/create'),
    }
};