'use client'

import { ProductType } from "..";
import { ProductsCard } from "./products-card.ui";
import { useSearch } from "@/components/providers/search.provider";

export const ProductsUi = () => {
    const { searchResults } = useSearch();

    return (
        <div className="py-4">
            <ul className="grid grid-cols-5 sm:grid-cols-1 sm:gap-1 emd:grid-cols-2 md:grid-cols-3 md:gap-3 xl:grid-cols-4 auto-rows-fr">
                {searchResults?.map((item: ProductType, index: number) => (
                    <ProductsCard data={item} key={index} animate={index} />
                ))}
            </ul>
        </div>
    )
}