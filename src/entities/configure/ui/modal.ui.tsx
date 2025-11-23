// modal.ui.tsx
"use client"

import { RdyModal } from "rdy-comp"
import { ConfigureDataBtnType } from "../module/buttons.data"
import { useEffect, useState } from "react"
import { getComponents } from "@/services/configure.service"
import { easeOut, motion } from "framer-motion"
import Image from "next/image"
import { Star } from "lucide-react"

interface Props {
    socket?: string
    ddr?: string
    data: {
        title: string
        type: string
    }
    onComponentSelect: (component: Component) => void;
}

export interface Component {
    id: number
    name: string
    description: string
    price: string
    images: {}
    rating: number
    power: string
}

export const ConfigureModal: React.FC<Props> = ({ socket, ddr, data, onComponentSelect }) => {
    const [response, setResponse] = useState<Component[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const components = await getComponents(data.type, socket, ddr);
            setResponse(components || []);
        } catch (error) {
            console.error('Error fetching components:', error);
            setResponse([]);
        } finally {
            setLoading(false);
        }
    }

    const handleComponentSelect = (component: Component) => {
        onComponentSelect(component);
    }

    useEffect(() => {
        console.log(socket, ddr)
        if (data.type) {
            fetchData();
        }
    }, [data])

    useEffect(() => {
        if (data.type) {
            fetchData();
        }
    }, [socket])

    const container = {
        hidden: {},
        show: {
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.1
            }
        }
    };

    const card = {
        hidden: { opacity: 0, bottom: -200 + "px" },
        show: {
            opacity: 1,
            bottom: 0,
            transition: { duration: 0.5, ease: easeOut }
        }
    };

    return (
        <RdyModal
            id={'configure-modal'}
            title={data.title || "Выберите компонент"}
            className="bg-(--background)! text-(--text)! max-w-7xl!  max-h-7xl! h-full"
        >
            <div className="h-full overflow-y-auto">
                {loading ? (
                    <div className="text-center py-8 text-white">Загрузка компонентов...</div>
                ) : response.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        Компоненты не найдены
                    </div>
                ) : (
                    <motion.ul
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="gap-4 grid grid-cols-2"
                    >
                        {response.map((item, index) => (
                            <motion.li
                                className="relative"
                                variants={card}
                                key={item.id || index}
                            >
                                <button
                                    onClick={() => handleComponentSelect(item)}
                                    className="w-full text-left p-4 bg-(--card) hover:bg-(--card-hover)! text-(--text) hover:shadow-2xl rounded-lg hover:cursor-pointer transition duration-300"
                                >
                                    <div className="flex flex-col items-start">
                                        <Image
                                            src={'/asd'}
                                            width={300}
                                            height={300}
                                            alt={item.name}
                                        />
                                        <div className="">
                                            <div className="flex flex-col mb-4">
                                                <div className="font-medium text-2xl mb-0.5">
                                                    {item.name}
                                                </div>
                                                {item.description && (
                                                    <div className="text-sm text-(--second-text) mb-2">
                                                        {item.description}
                                                    </div>
                                                )}
                                                <div className="flex gap-2 text-[20px] items-center text-amber-200">
                                                    <Star />
                                                    <span>{item.rating}</span>
                                                </div>
                                            </div>
                                            <div className="text-left">
                                                <div className="font-semibold text-3xl">
                                                    {item.price} ₽
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </div>
        </RdyModal >
    )
}