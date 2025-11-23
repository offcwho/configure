import { Product } from "@/entities/products/module/product.type";
import { findAll } from "@/services/order.service"
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { Button } from "@heroui/react";
import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export interface Order {
    id: number;
    state: string;
    product: Product;
}

export const OrdersUi = () => {
    const [data, setData] = useState<Order[]>();

    const fetchData = async () => {
        try {
            const response = await findAll();

            setData(response);
        } catch (err) {

        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const variants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: ((i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.4,
                ease: "easeOut",
            },
        })) as any,
    };


    return (
        <div className="text-(--text)">
            <h2 className="text-2xl mb-2">Ваши заказы:</h2>
            <Swiper
                spaceBetween={20}
                slidesPerView={6}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1200: { slidesPerView: 4 },
                    1400: { slidesPerView: 5 },
                }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                className="bg-(--card) py-5! px-5! rounded-lg"
            >
                {data?.map((item, index) => (
                    <SwiperSlide className="bg-(--card-hover) flex! flex-col rounded-sm p-3" key={index}>
                        <motion.div
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            custom={index}
                            className="relative"
                        >
                            <Image
                                src={'/asd'}
                                width={300}
                                height={300}
                                alt={`${item.product.name} Image`}
                            />
                            <div className="mb-3">
                                <h5 className="text-lg mb-1">{item.product.name}</h5>
                                <div className="flex gap-2 items-center text-success-400">
                                    {item.state === "created" ? (
                                        <p className="">Заказ создан</p>
                                    ) : <p className="">Заказ в пути</p>}
                                </div>
                            </div>
                            <Button className="bg-(--accent) text-(--text)">{item.product.price} ₽</Button>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
} 