"use client"

import { useAdmin } from "@/entities/admin/hooks/useAdmin"

export default function CreatePage() {
    const { AdminForm, AdminFileInput, AdminTextInput, AdminSelectInput } = useAdmin({ api: "/component", method: "post" });

    const componentType = [
        {
            value: "MOTHERBOARD",
            title: "Материнская плата",
        },
        {
            value: "CPU",
            title: "Процессор",
        },
        {
            value: "GPU",
            title: "Видеокарта",
        },
        {
            value: "MEMORY",
            title: "Оперативная память",
        },
        {
            value: "COOLING",
            title: "Кулер для процессора",
        },
        {
            value: "DISK",
            title: "Диск",
        },
        {
            value: "POWER",
            title: "Блок питания",
        },
        {
            value: "CASE",
            title: "Корпус",
        },
    ];

    return (
        <AdminForm button="Сохранить">
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
                <AdminSelectInput
                    name="type"
                    label="Тип компонента"
                    data={componentType}
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