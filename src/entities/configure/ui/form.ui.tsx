"use client";

import { RdyButton, useModal, useToast } from "rdy-comp";
import { CONFIGURE_DATA_BTN } from "../module/buttons.data";
import { Component, ConfigureModal } from "./modal.ui";
import { useEffect, useRef, useState } from "react";
import { create, show, update } from "@/services/configure.service";
import { Button, Tooltip } from "@heroui/react";
import { Cpu, MemoryStick, PcCase, SquarePen, Trash2, X, Zap } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BACKEND_IMAGE } from "@/lib/constants";

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
        power?: string;
    };
}

interface BackendResponse {
    configure: {
        id: number;
        name: string;
        socket?: string;
        ddr?: string;
        watt?: string;
        formFactor?: string;
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
    power?: string;
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
    const router = useRouter();

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
                        power: base.power,
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

    const variants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: ((i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.4,
                ease: "easeOut",
            },
        })) as any,
    };

    const DATA_C = [
        {

        },
        {
            icon: <PcCase />,
        },
    ]

    return (
        <div className="p-6 md:px-6 sm:px-0 flex flex-col justify-center h-full min-h-fit">
            <h2 className="md:text-3xl font-semibold mb-3 text-(--text) sm:text-lg">Конфигуратор</h2>
            <div className="xl:grid xl:grid-cols-2 gap-5 sm:flex sm: flex-col">
                {/* Выбранные компоненты */}
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                    className="col-span-1 flex flex-col items-center justify-center relative overflow-auto"
                >
                    {selectedComponents.length > 0 ? (
                        <div className="bg-(--card) p-3 rounded-lg w-full h-full">
                            {selectedComponents.map((c, index) => (
                                <AnimatePresence key={index}>
                                    <motion.div
                                        variants={variants}
                                        initial="hidden"
                                        animate="visible"
                                        exit={{
                                            opacity: 0,
                                        }}
                                        custom={index}
                                        key={c.type}
                                        className="flex items-center p-3 bg-(--card-secondary) rounded mb-2 gap-4"
                                    >
                                        <img src={BACKEND_IMAGE + c.images} alt="" className="w-20 h-20 rounded-lg"/>
                                        <div>
                                            {c.type === "POWER" &&
                                                c.power &&
                                                data.configure.watt && (
                                                    c.power < data.configure.watt && (
                                                        <p className="text-red-500">{`Вы выбрали слишком слабый блок питания, необходимо >${data.configure.watt}`}</p>
                                                    )
                                                )}
                                            <div className="font-medium text-(--text)">{c.name}</div>
                                            <div className="text-sm text-(--text-secondary)">
                                                {c.price ?? "0"} ₽ • {c.type}
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center bg-(--card) w-full rounded-lg text-(--text)">
                            <h3>Вы ничего не выбрали</h3>
                        </div>
                    )}
                    <motion.div
                        variants={variants}
                        className="w-full bg-(--card) mt-2 rounded-lg flex text-(--text) justify-around px-4 py-3"
                        initial="hidden"
                        animate="visible"
                        custom={2}
                    >
                        <Tooltip content="Socket" className="bg-(--selected) text-(--text-secondary)">
                            <div className="flex gap-2 items-center">
                                <Cpu size={20} />
                                <span>{data.configure.socket}</span>
                            </div>
                        </Tooltip>
                        <Tooltip content="RAM" className="bg-(--selected) text-(--text-secondary)">
                            <div className="flex gap-2 items-center">
                                <MemoryStick size={20} />
                                <span className="uppercase">{data.configure.ddr}</span>
                            </div>
                        </Tooltip>
                        <Tooltip content="WaTT" className="bg-(--selected) text-(--text-secondary)">
                            <div className={`flex gap-2 items-center`}>
                                <Zap size={20} />
                                <span>{data.configure.watt}</span>
                            </div>
                        </Tooltip>
                        <Tooltip content="Form Factor" className="bg-(--selected) text-(--text-secondary)">
                            <div className="flex gap-2 items-center">
                                <PcCase size={20} />
                                <span>{data.configure.formFactor}</span>
                            </div>
                        </Tooltip>
                    </motion.div>
                    <motion.div
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        custom={3}
                        className="mt-2 p-4 flex justify-between items-start gap-4 flex-col w-full bg-(--card) rounded-lg"
                    >
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
                            disabled={selectedComponents.length > 0 ? false : true}
                            onPress={() => router.push(`/order/${configureId}`)}
                        >
                            Оформить заказ
                        </Button>
                    </motion.div>
                </motion.div>
                {/* Кнопки выбора компонентов */}
                <div className="">
                    <ul className="flex flex-col justify-between gap-3">
                        {CONFIGURE_DATA_BTN.map((btn, index) => {
                            const selected = getSelected(btn.type);
                            return (
                                <motion.li
                                    variants={variants}
                                    key={btn.type}
                                    initial="hidden"
                                    animate="visible"
                                    custom={index}
                                    className="relative"
                                >
                                    {selected ? (
                                        <div
                                            className="flex justify-between gap-3 items-center p-4 rounded-lg border border-(--selected) bg-(--card) hover:bg-(--card-hover) transition-colors duration-300 md:max-h-20 md:h-20 sm:h-auto sm:max-h-auto cursor-pointer"
                                            onClick={() => handleSelectComponent(btn)}
                                        >
                                            <div className="flex justify-between w-full sm:flex-col md:flex-row">
                                                <div className="text-(--text) flex md:gap-4 sm:gap-1 items-center sm:mb-2 md:mb-0">
                                                    {btn.icon}
                                                    <div className="text-(--text) font-normal">{btn.title}</div>
                                                </div>
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
                                            <div className="text-(--text-secondary) flex gap-4 items-center">
                                                {btn.icon}
                                                <h4 className="text-(--text)/70">{btn.title}</h4>
                                            </div>
                                            <span className="text-gray-400">Не выбрано</span>
                                        </Button>
                                    )}
                                </motion.li>
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
