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
    const { AdminForm, AdminFileInput, AdminTextInput } = useAdmin({ api: "/component", id: isParams, method: "patch" });

    useEffect(() => {
        getParams();
    }, [])

    return (
        <AdminForm button="QWErt">
            <div className="">
                <AdminTextInput
                    type="text"
                    name="name"
                    placeholder="Название компонента"
                />
            </div>
            <div className="">
                <AdminTextInput
                    type="text"
                    name="description"
                    placeholder="Описание компонента"
                />
            </div>
            <div className="">
                <AdminTextInput
                    type="text"
                    name="type"
                    placeholder="Тип компонента"
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
                    placeholder="Цена компонента"
                />
            </div>
            <div className="">
                <AdminTextInput
                    type="text"
                    name="socket"
                    placeholder="Сокет"
                />
            </div>
            <div className="">
                <AdminTextInput
                    type="text"
                    name="ddr"
                    placeholder="Тип оперативной памяти"
                />
            </div>
            <div className="">
                <AdminTextInput
                    type="number"
                    name="watt"
                    placeholder="Ватты"
                />
            </div>
            <div className="">
                <AdminTextInput
                    type="text"
                    name="formFactor"
                    placeholder="Форм фактор"
                />
            </div>
            <div className="">
                <AdminTextInput
                    type="text"
                    name="power"
                    placeholder="Мощность блока питания"
                />
            </div>
        </AdminForm>
    )
}