"use client";

import { RdyButton, useModal, useToast } from "rdy-comp";
import { CONFIGURE_DATA_BTN } from "../module/buttons.data";
import { Component, ConfigureModal } from "./modal.ui";
import { useEffect, useRef, useState } from "react";
import { create, show, update } from "@/services/configure.service";
import { Button } from "@heroui/react";
import { SquarePen, Trash2, X } from "lucide-react";
import Image from "next/image";

interface BackendComponentWrap {
    id: number;
    configureId: number;
    componentId: number;
    quantity: number;
    component: {
        id: number;
        name: string;
        description: string | null;
        price: string | null;
        images: any;
        type: string;
    };
}

interface BackendResponse {
    configure: {
        id: number;
        name: string;
        socket?: string;
        ddr?: string;
    };
    components: BackendComponentWrap[];
}

interface SelectedComponent {
    id: number;
    name: string;
    price: string | null;
    type: string;
    description?: string | null;
    socket?: string;
    images?: any;
}

export interface CreateFormData {
    name: string;
    configureId: string;
    components: Array<{ componentId: number }>;
}

export const ConfigureForm = ({ configureId }: { configureId: string }) => {
    const [data, setData] = useState<BackendResponse | null>(null);
    const [selectedComponents, setSelectedComponents] = useState<SelectedComponent[]>([]);
    const userChangedRef = useRef(false);
    const [selectedButton, setSelectedButton] = useState<{ type: string; title: string }>({
        type: "",
        title: ""
    });

    const { openModal, closeModal } = useModal();
    const { showToast } = useToast()

    const fetchData = async () => {
        try {
            const response = await show(configureId);

            userChangedRef.current = false;

            setData(response);

            if (response?.components) {
                const normalized = response.configure.components.map((wrap: { component: any; }) => {
                    const base = wrap.component;

                    return {
                        id: base.id,
                        name: base.name,
                        price: base.price,
                        images: base.images,
                        description: base.description,
                        type: base.type,
                    };
                });

                setSelectedComponents(normalized);
            }
        } catch (err) {
            console.error("Ошибка загрузки:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [configureId]);

    const handleSelectComponent = (btn: { type: string; title: string }) => {
        fetchData();
        setSelectedButton(btn);
        openModal("configure-modal");
    };

    const handleAddComponent = (component: Component) => {
        userChangedRef.current = true;

        const selected: SelectedComponent = {
            ...component,
            type: selectedButton.type
        };

        setSelectedComponents(prev => {
            const exists = prev.find((component) => component.type === selectedButton.type);
            if (exists) {
                return prev.map((component) => component.type === selectedButton.type ? selected : component);
            }
            return [...prev, selected];
        });
        closeModal("configure-modal")
    };


    const handleRemoveComponent = (type: string) => {
        userChangedRef.current = true;

        setSelectedComponents((prev) => prev.filter((component) => component.type !== type));
    };

    const getSelected = (type: string) =>
        selectedComponents.find((component) => component.type === type);


    useEffect(() => {
        if (userChangedRef.current === true) {
            handleSubmit();
            userChangedRef.current = false;
        }
    }, [selectedComponents]);

    const handleSubmit = async () => {
        if (!data) return;

        const formData: CreateFormData = {
            name: data.configure.name,
            configureId: String(data.configure.id),
            components: selectedComponents.map((component) => ({
                componentId: Number(component.id),
            })),
        };

        try {
            await update(formData);
            console.log("Отправлено:", formData);
            fetchData();
            showToast({
                title: "Success!",
                message: "Конфигурация успешно сохранена.",
                type: "success"
            })
        } catch (err) {
            console.error("Ошибка:", err);
        }
    };

    if (!data) {
        return (
            <div className="p-6">
                <div>Загрузка конфигурации...</div>
            </div>
        );
    }

    return (
        <div className="p-6 flex flex-col justify-center h-full">
            <h2 className="text-3xl font-semibold mb-3 text-(--text)">Конфигуратор</h2>
            <div className="grid grid-cols-2 gap-5">
                {/* Выбранные компоненты */}
                <div className="col-span-1 flex flex-col items-center justify-center">
                    {selectedComponents.length > 0 ? (
                        <div className="bg-(--card) p-3 rounded-lg w-full h-full">
                            {selectedComponents.map((c) => (
                                <div
                                    key={c.type}
                                    className="flex justify-between items-center p-3 bg-(--selected) rounded border border-(--border) mb-2"
                                >
                                    <div>
                                        <div className="font-medium text-(--text)">{c.name}</div>
                                        <div className="text-sm text-(--text-secondary)">
                                            {c.price ?? "0"} ₽ • {c.type}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center bg-(--card) w-full rounded-lg text-(--text)">
                            <h3>Вы ничего не выбрали</h3>
                        </div>
                    )}
                    <div className="mt-4 p-4 flex justify-between items-start gap-4 flex-col w-full bg-(--card) rounded-lg">
                        <div className="w-full flex gap-2 text-lg text-(--text)">
                            <h5>Общая стоимость:</h5>
                            <span>
                                {selectedComponents
                                    .reduce((s, c) => s + Number(c.price ?? 0), 0)
                                    .toLocaleString()}{" "}
                                ₽
                            </span>
                        </div>
                        <Button
                            className="bg-(--accent) disabled:bg-gray-400 text-white"
                            disabled={selectedComponents.length > 0 ? false : true}>
                            Оформить заказ
                        </Button>
                    </div>
                </div>
                {/* Кнопки выбора компонентов */}
                <div className="">
                    <ul className="flex flex-col justify-between gap-3">
                        {CONFIGURE_DATA_BTN.map((btn) => {
                            const selected = getSelected(btn.type);

                            return (
                                <li key={btn.type}>
                                    {selected ? (
                                        <div
                                            className="flex justify-between gap-3 items-center p-4 rounded-lg border border-(--border) bg-(--selected) max-h-20 h-20"
                                            onClick={() => handleSelectComponent(btn)}
                                        >
                                            <div className="flex justify-between w-full">
                                                <div className="text-(--text) font-normal">{btn.title}</div>
                                                <h4 className="text-(--text-secondary)">{selected.name}</h4>
                                            </div>

                                            <Button
                                                onClick={() => handleRemoveComponent(btn.type)}
                                                className="rounded-full px-0! min-w-0 bg-transparent text-(--text) hover:text-red-500 hover:opacity-100!"
                                            >
                                                <X />
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            onClick={() => handleSelectComponent(btn)}
                                            className="w-full justify-between flex py-9 border-1 border-(--border) bg-(--card) hover:bg-(--card-hover) text-gray-800 h-20 max-h-20"
                                        >
                                            <h4 className="text-(--text)/70">{btn.title}</h4>
                                            <span className="text-gray-400">Не выбрано</span>
                                        </Button>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

            </div>

            {/* Модалка */}
            <ConfigureModal
                ddr={data.configure.ddr}
                socket={data.configure.socket}
                data={selectedButton}
                onComponentSelect={handleAddComponent}
            />
        </div >
    );
};
