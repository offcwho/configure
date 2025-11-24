export const APP_ADMIN_ROUTE = {
    root: (path: string | "") => "/admin" + path,
    home: () => APP_ADMIN_ROUTE.root('/admin'),

    product: {
        index: () => APP_ADMIN_ROUTE.root('/products'),
        edit: (id: string) => APP_ADMIN_ROUTE.root('/products/' + id),
        create: () => APP_ADMIN_ROUTE.root('/products/create')
    },
    component: {
        index: () => APP_ADMIN_ROUTE.root('/component'),
        edit: (id: string) => APP_ADMIN_ROUTE.root('/component/' + id),
        create: () => APP_ADMIN_ROUTE.root('/component/create'),
    }
};