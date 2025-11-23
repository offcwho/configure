import { useAddToCart } from "@/entities/cart/hooks/useAddToCart"
import { Configure } from "@/entities/configure/ui/configure.ui"
import { APP_ROUTE } from "@/lib/routes/app.route"
import { remove } from "@/services/configure.service"
import { Button, Skeleton, Tooltip } from "@heroui/react"
import { motion } from "framer-motion"
import { Cpu, Microchip, Trash, Trash2, Zap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "rdy-comp"

interface Props {
    data: Configure;
    isLoaded: boolean;
    index: number;
    user: boolean;
    onConfigureDelete: () => void;
}

export const ConfigureCard: React.FC<Props> = ({ data, isLoaded, index, user, onConfigureDelete }) => {
    const router = useRouter();
    const { showToast } = useToast();
    const { handleAdd } = useAddToCart();

    const tags = [
        {
            title: <Cpu size={20} />,
            count: data.socket,
            tooltip: "Socket Type",
            color: ""
        },
        {
            title: <Microchip size={20} />,
            count: data.ddr,
            tooltip: "Memory Type",
            color: ""
        },
        {
            title: <Zap size={20} />,
            count: data.watt,
            tooltip: "Power usage",
            color: ""
        },
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await remove(id)
            if (response) {
                showToast({
                    title: "Запись удалена",
                    message: `Вы успешно удалили конфигурацию №${id}`,
                    type: "success"
                })
                onConfigureDelete();
            }
        } catch (err) {
            showToast({
                title: "Ошибка",
                message: err.message,
                type: "error",
            });
        }
    }

    return (
        <motion.li
            variants={cardVariants}
            custom={index}
            initial="hidden"
            animate="visible"
            className="bg-(--card) px-5 py-4 rounded-2xl relative h-full"
        >
            <div
                className="h-full flex flex-col justify-between cursor-pointer"
                onClick={() => router.push(APP_ROUTE.configure.show(String(data.id)))}
            >
                <div className="h-full">
                    <Skeleton isLoaded={isLoaded}>
                        <h4 className="text-2xl mb-2 text-(--text)">{data.name}</h4>
                    </Skeleton>
                    <div className="flex gap-4 text-gray-500 flex-col">
                        {data.components.map((item, index) => (
                            <Skeleton
                                className=""
                                isLoaded={isLoaded}
                                key={index}
                            >
                                <div>
                                    {item.component.name}
                                </div>
                            </Skeleton>
                        ))}
                    </div>
                </div>
                <div className="flex gap-2 justify-between items-center mt-3">
                    <div className="flex gap-2">
                        {tags.map((tag, index) => (
                            <Tooltip content={tag.tooltip} className="bg-(--selected) text-gray-200" key={index}>
                                <div className="flex gap-2 py-1.5 px-3 rounded-full bg-(--selected) items-center text-gray-300">
                                    {tag.title}
                                    {tag.count}
                                </div>
                            </Tooltip>
                        ))}
                    </div>
                    <div className="flex gap-1.5">
                        <Button className="bg-(--accent)" onPress={() => handleAdd(String(data.id))}>
                            <p className="text-(--text)">{data.price} ₽</p>
                        </Button>
                        {user && (
                            <Button
                                onPress={() => handleDelete(String(data.id))}
                                className="z-100 w-10 h-10 min-w-0 p-0 flex bg-(--card-hover) text-(--text-secondary) hover:text-red-400">
                                <Trash2 size={20} />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </motion.li>
    )
}