import { APP_ADMIN_ROUTE } from "@/lib/routes/app.admin.route";

export const SIDEBAR_DATA = [
    {
        href: APP_ADMIN_ROUTE.product.index(),
        title: "Product",
        icon: null,
    },
    {
        href: APP_ADMIN_ROUTE.component.index(),
        title: "Component",
        icon: null,
    },
];