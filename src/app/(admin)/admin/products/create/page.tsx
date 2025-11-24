"use client"

import { useAdmin } from "@/entities/admin/hooks/useAdmin"

export default function CreatePage() {
    const { AdminForm, AdminFileInput, AdminTextInput } = useAdmin({ api: "/products", method: "post" });

    return (
        <AdminForm button="Создать запись">
            <div className="">
                <AdminTextInput
                    type="text"
                    name="name"
                    label="Название продукта"
                />
            </div>
            <div className="">
                <AdminTextInput
                    type="text"
                    name="description"
                    label="Описание продукта"
                />
            </div>
            <div className="">
                <AdminTextInput
                    type="text"
                    name="content"
                    label="Контент продукта"
                />
            </div>
            <div className="">
                <AdminFileInput
                    name="images"
                />
            </div>
            <div className="">
                <AdminTextInput
                    type="number"
                    name="price"
                    label="Цена продукта"
                />
            </div>
        </AdminForm>
    )
}