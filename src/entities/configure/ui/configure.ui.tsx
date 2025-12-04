'use client'

import { useUser } from "@/components/providers/UserContext";
import { ConfigureCard } from "@/components/ui/configure-card.ui";
import { Container } from "@/components/ui/container";
import { APP_ROUTE } from "@/lib/routes/app.route";
import { findUserConfigurations } from "@/services/configure.service";
import { cn, Pagination, PaginationItemType } from "@heroui/react";
import { AnimatePresence, easeOut, motion } from "framer-motion";
import { ChevronLeft, Settings, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface Configure {
    id: number
    name: string
    socket: string
    ddr: string
    watt: string
    price: number
    userId: number
    components: [
        {
            component: {
                id: string,
                name: string,
                type: string,
            }
        }
    ];
}

export const ConfgiureUi = () => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState<Configure[]>();
    const { user } = useUser();
    const fetchData = async () => {
        try {
            const response = await findUserConfigurations();
            setData(response);
            setIsLoaded(true)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
        setIsUpdate(false);
    }, [isUpdate]);

    const cardUser = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.2,
                duration: 0.5,
                ease: easeOut
            }
        }
    };

    return (
        <div className="py-4 h-full flex flex-col">
            <Container className="h-full flex gap-5 sm:flex-col-reverse xl:flex-row">
                <div className="flex gap-3 flex-col h-full w-full">
                    {data ? (
                        <motion.ul
                            className="pb-4 grid xl:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 gap-3 w-full h-full"
                        >
                            {data.map((item, index) => (
                                <ConfigureCard
                                    data={item}
                                    key={index}
                                    isLoaded={isLoaded}
                                    index={index}
                                    user={user?.id === item.userId ? true : false}
                                    onConfigureDelete={() => setIsUpdate(true)}
                                />
                            ))}
                        </motion.ul>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="flex items-center justify-center gap-4 text-(--text)"
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            repeat: Infinity,
                                            ease: "linear",
                                            duration: 2,
                                        }}
                                    >
                                        <Settings />
                                    </motion.div>
                                    <div>Загрузка конфигурации...</div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    )}
                </div>
                <motion.div
                    variants={cardUser}
                    initial="hidden"
                    animate="visible"
                    className="h-fit bg-(--card) p-5 rounded-2xl md:min-w-[300px] sticky top-4"
                >
                    <h3 className="text-(--text) text-2xl mb-3">{user?.name}</h3>
                    <p className="text-amber-300 flex gap-1 items-center text-xl mb-1"><Star size={18} />{0}</p>
                    <span className="text-(--text-secondary)">Созданно конфигураций:  {data?.length}</span>
                </motion.div>
            </Container>
        </div>
    )
}