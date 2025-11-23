import { findAll } from "@/services/order.service";
import { BACKEND_URL } from "../constants";

export const API_ROUTE = {
    root: (url: string | "") => BACKEND_URL + url,

    auth: {
        register: () => API_ROUTE.root('/auth/register'),
        login: () => API_ROUTE.root('/auth/login'),
        user: () => API_ROUTE.root('/auth/user'),
        logout: () => API_ROUTE.root('/auth/logout'),
    },

    configure: {
        create: () => API_ROUTE.root('/configure'),
        update: (id: string) => API_ROUTE.root('/configure?configureId=' + id),
        findUserConfigurations: () => API_ROUTE.root('/configure/user/configure'),
        createFindOne: (name: string) => API_ROUTE.root('/configure/find/' + name),
        show: (id: string) => API_ROUTE.root('/configure/' + id),
        component: (id: string) => API_ROUTE.root('/configure?configureId=' + id),
        removeComponent: (configureId: string, componentId: string) => API_ROUTE.root(`/configure/component?configureId=${configureId}&componentId=${componentId}`),
        remove: (id: string) => API_ROUTE.root('/configure/' + id)
    },
    components: {
        type: (type: string, socket?: string, ddr?: string) => API_ROUTE.root(`/component?type=${type}${socket !== null ? '&socket=' + socket : ''}${ddr !== null ? '&ddr=' + ddr : ''}`)
    },
    cart: {
        addToCart: (id: string) => API_ROUTE.root('/cart/' + id),
        findCart: () => API_ROUTE.root('/cart'),
    },
    products: {
        findAll: () => API_ROUTE.root('/products'),
    },
    order: {
        findAll: () => API_ROUTE.root('/order'),
        checkout: () => API_ROUTE.root('/order'),
    },
    upload: {
        upload: (id: string) => API_ROUTE.root('/upload/' + id),
    }
}