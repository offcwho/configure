"use client"
import { useAdmin } from "@/entities/admin/hooks/useAdmin"
import { useEffect, useState } from "react"

export default function ConfigurePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const [isParams, setIsParams] = useState('');

    const getParams = async () => {
        const { id } = await params
        setIsParams(id);
    }
    const { AdminForm, AdminFileInput, AdminTextInput } = useAdmin({ api: "/products", id: isParams, method: "patch" });

    useEffect(() => {
        getParams();
    }, [])

    return (
        <AdminForm button="QWErt">
            <div className="">
                <AdminTextInput
                    type="text"
                    name="name"
                    placeholder="Название продукта"
                />
            </div>
            <div className="">
                <AdminTextInput
                    type="text"
                    name="description"
                    placeholder="Описание продукта"
                />
            </div>
            <div className="">
                <AdminTextInput
                    type="text"
                    name="content"
                    placeholder="Контент продукта"
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
                    placeholder="Цена продукта"
                />
            </div>
        </AdminForm>
    )
}