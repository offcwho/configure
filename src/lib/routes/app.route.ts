export const APP_ROUTE = {
    root: (path: string | "") => path,
    home: () => APP_ROUTE.root('/'),

    auth: {
        login: () => APP_ROUTE.root('/login'),
        register: () => APP_ROUTE.root('/register'),
    },

    wishes: {
        index: () => APP_ROUTE.root('/wishes'),
        create: () => APP_ROUTE.root('/wishes'),
        update: (id: string) => APP_ROUTE.root('/wishes/' + id),
        getOne: (id: string) => APP_ROUTE.root('/wishes/' + id),
    },
    configure: {
        show: (id: string) => APP_ROUTE.root('/configure/' + id),
    },
    cart: {
        index: () => APP_ROUTE.root('/cart')
    },
    products: {
        index: () => APP_ROUTE.root('/products'),
        show: (id: string) => APP_ROUTE.root('/product/' + id),
    }
};