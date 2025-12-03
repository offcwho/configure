"use client"

import { Container } from "@/components/ui/container"
import { ConfigureHeader } from "@/entities/configure"
import { Moon, Sun } from "lucide-react"
import { RdyModal } from "rdy-comp"
import { HEADER_DATA, HeaderMenu, HeaderSearch } from ".."
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

interface Props {
    className?: string;
}

export const HeaderUi: React.FC<Props> = ({ className }) => {
    const [theme, setTheme] = useState(true)
    const [hoverRect, setHoverRect] = useState({
        width: 0,
        left: 0
    });

    return (
        <>
            <header className={`flex w-full py-4 z-1001 bg-(--card) sticky top-0 ${className} transition-colors duration-400`}>
                <Container>
                    <div className="flex justify-between gap-10">
                        <nav className={`flex gap-5 relative`}>
                            {HEADER_DATA.map((item, index) => (
                                <li className="flex items-center justify-center z-1" key={index}>
                                    <Link
                                        href={String(item.href)}
                                        className="text-white px-4 h-full w-full text-center font-medium cursor-pointer  flex items-center justify-center transition-colors duration-300"
                                    >
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </nav>
                        <HeaderSearch />
                        <HeaderMenu />
                    </div>
                </Container>
            </header>
            <RdyModal
                id={'create-configure'}
                title={'Создание конфигурации'}
                close
                className="z-9999 bg-(--card)! text-(--text-secondary)! md:text-sm!"
            >
                <ConfigureHeader />
            </RdyModal>
        </>
    )
}