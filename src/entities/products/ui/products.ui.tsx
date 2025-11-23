'use client'

import { findAll } from "@/services/products.service"
import { useEffect, useState } from "react";
import { ProductType } from "..";
import { ProductsCard } from "./products-card.ui";

export const ProductsUi = () => {
    const [data, setData] = useState<ProductType[]>();

    const fetchData = async () => {
        const response = await findAll();

        setData(response);
    }

    useEffect(() => {
        fetchData();
    }, [])

    console.log(data)

    return (
        <div className="py-4">
            <ul className="grid grid-cols-5 sm:grid-cols-1 sm:gap-1 emd:grid-cols-2 md:grid-cols-3 md:gap-3 xl:grid-cols-5">
                {data?.map((item, index) => (
                    <ProductsCard data={item} key={index} animate={index}/>
                ))}
            </ul>
        </div>
    )
}