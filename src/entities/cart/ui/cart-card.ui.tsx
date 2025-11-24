"use client"

import { Button, Card } from "@heroui/react";
import { CartType } from "..";
import Image from "next/image";
import { APP_ROUTE } from "@/lib/routes/app.route";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BACKEND_IMAGE } from "@/lib/constants";

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


export const CartCardUi = ({ data, animate }: { data: CartType, animate: number }) => {
    const router = useRouter();
    return (
        <motion.li
            variants={variants}
            initial="hidden"
            animate="visible"
            custom={animate}
            onClick={() => router.push(APP_ROUTE.products.show(String(data.product.id)))}
            className="w-full flex flex-col h-auto bg-(--card) text-(--text) hover:bg-(--card-hover)! p-4 justify-between cursor-pointer rounded-2xl"
        >
            <img
                src={`${BACKEND_IMAGE}${data.product.images}`}
                width={400}
                height={400}
                className="w-full! max-h-[300px] rounded-xl"
                alt="image"
                loading="lazy"
            />
            <div className="mb-4">
                <h3>{data.product.name}</h3>
                <p className="text-(--text-secondary)">{data.product.description}</p>
            </div>
            <div className="">
                <Button className="w-full rounded-lg bg-(--accent) text-(--text)">{data.product.price} ₽</Button>
            </div>
        </motion.li>
    )
}