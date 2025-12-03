"use client"

import { findCart } from "@/services/cart.service"
import { useEffect, useState } from "react";
import { CartCard, CartType } from "..";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { OrdersUi } from "@/components/ui/orders.ui";
import { checkout } from "@/services/order.service";
import { useRouter } from "next/navigation";
import { useToast } from "rdy-comp";

export const CartUi = () => {
    const [data, setData] = useState<CartType[]>();

    const router = useRouter();
    const { showToast } = useToast();

    const fetchData = async () => {
        const response = await findCart();
        setData(response);
    }

    useEffect(() => {
        fetchData();
    }, [])

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

    const handleSubmit = async () => {
        try {
            await checkout();
        } catch (err: any) {
            showToast({
                title: "Не удалось создать заказ",
                type: "error"
            })
        } finally {
            router.refresh();
            showToast({
                title: "Заказ создан!",
                type: "success"
            })
        }
    }

    const total = data?.reduce((sum, item) => {
        return sum + (item.product?.price || 0);
    }, 0) || 0;

    return (
        <>
            <Container className="h-full">
                <div className="flex flex-col py-4 h-full relative">
                    <OrdersUi />
                    <motion.div
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        custom={2}
                        className="mt-4"
                    >
                        <h3 className="text-2xl text-(--text) mb-3">Корзина:</h3>
                        {data ? (
                            <ul className={`w-full grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-1 emd:grid-cols-2 gap-3 h-full md:pb-25`}>
                                {data?.map((item, index) => (
                                    <CartCard data={item} key={index} animate={index} />
                                ))}
                            </ul>
                        ) : <p className="text-(--text-secondary) w-full text-center mt-10">Корзина пуста</p>}
                    </motion.div>
                </div >
            </Container>
            <motion.div
                variants={variants}
                custom={3}
                initial="hidden"
                animate="visible"
                className={`fixed sm:bottom-[52px] md:bottom-2.5 md:h-25 w-full bottom-0 left-0 flex sm:px-4 md:px-0`}>
                <Container className="sm:px-0 md:px-4">
                    <div
                        className="bg-(--card-hover) sm:flex-col md:flex-row gap-4 w-full h-full rounded-2xl max-w-150 mx-auto flex items-center justify-between md:px-5 sm:px-3 py-3 "
                    >
                        <div className="flex sm:flex-col md:flex-row sm:justify-center sm:gap-1 md:gap-5">
                            <h5 className="text-(--text)">Стоимость: {total} ₽</h5>
                            <p className="text-(--text-secondary)">Количество продуктов: {data?.length}</p>
                        </div>
                        <Button className="bg-(--accent) text-(--text) px-4 sm:w-full md:w-auto" onPress={() => handleSubmit()}>
                            Оформить заказ
                        </Button>
                    </div>
                </Container>
            </motion.div>
        </>
    )
}