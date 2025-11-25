"use client"

import { findOne } from "@/services/products.service"
import { useEffect, useState } from "react"
import { Product } from "../module/product.type";
import { BACKEND_IMAGE } from "@/lib/constants";
import { useToast } from "rdy-comp";
import { Button } from "@heroui/react";
import { easeInOut, motion } from "framer-motion";

export const SingleProductUi = ({ id }: { id: string }) => {
    const [data, setData] = useState<Product>();
    const { showToast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            const response = await findOne(id);
            setData(response);
        }
        fetchData();
    }, [])


    return (
        <>
            {data && (
                <motion.div
                    initial={{ opacity: 0, bottom: -50 + "px" }}
                    animate={{
                        opacity: 1,
                        bottom: 0,
                        transition: { duration: .5, ease: easeInOut }
                    }}
                    className="bg-(--card) p-6 rounded-2xl grid-cols-2 grid gap-10 relative">
                    <div className="">
                        <img src={BACKEND_IMAGE + data.images} alt="" className="rounded-xl w-full" />
                    </div>
                    <div className="py-4 flex flex-col justify-between">
                        <div className="">
                            <div className="mb-10">
                                <h2 className="text-white text-3xl capitalize mb-6">{data.name}</h2>
                                <p className="text-(--text-secondary) text-xl">{data.description}</p>
                            </div>
                            <p className="text-(--text-secondary)">{data.content}</p>
                        </div>
                        <div className="flex items-start gap-5 flex-col justify-between">
                            <div className="text-(--text) text-3xl">
                                {data.price} ₽
                            </div>
                            <Button className="w-full bg-(--accent) text-(--text)">Добавить в корзину</Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    )
}