'use client'

import { useSearch } from "@/components/providers/search.provider";
import { Search } from "lucide-react"
import { useEffect, useState } from "react"

export const HeaderSearchUi = () => {
    const [value, setValue] = useState('');
    const { performSearch } = useSearch();

    useEffect(() => {
        performSearch(value)
    }, [value])

    return (
        <div className="group flex bg-(--card-hover) w-full rounded-xl">
            <input
                placeholder="Найти сборку"
                type="text"
                className="w-full outline-none px-5 text-(--text)"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            />
            <button className="text-(--text) px-5">
                <Search />
            </button>
        </div>
    )
}