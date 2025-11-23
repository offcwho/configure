"use client"

import { RdyInput } from "rdy-comp";

interface Props {
    className?: string;
}

export const SearchUi: React.FC<Props> = ({ className }) => {
    return (
        <div className={`${className} px-4 py-4 bg-(--card) rounded-b-3xl`}>
            <RdyInput
                id="search"
                className="rounded-2xl bg-(--card-hover)! focus:outline-none placeholder:text-(--text-secondary)!"
                placeholder="Поиск..."
                bordered={{
                    onFocus: 'var(--selected)',
                    onBlur: 'var(--border)'
                }}
            />
        </div>
    )
}