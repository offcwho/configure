"use client"

import { Container } from "@/components/ui/container"
import { ConfigureHeader } from "@/entities/configure"
import { Moon, Sun } from "lucide-react"
import { RdyModal } from "rdy-comp"
import { HEADER_DATA, HeaderMenu } from ".."
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
    const containerRef = useRef<HTMLDivElement>(null);

    const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();

        if (!containerRef.current) return;
        const parentRect = containerRef.current.getBoundingClientRect();

        setHoverRect({
            width: rect.width,
            left: rect.left - parentRect.left,
        });
    };

    const handleTheme = () => {
        const newTheme = !theme;
        setTheme(newTheme);
        if (newTheme) {
            document.documentElement.dataset.theme = "dark";
            localStorage.setItem('theme', "true");
        } else {
            document.documentElement.dataset.theme = "light";
            localStorage.setItem('theme', 'false');
        }
        console.log(newTheme ? "Светлая тема" : "Темная тема");
    };

    useEffect(() => {
        setTheme(!theme);
    }, [])

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header className={`flex w-full py-4 z-1001 bg-(--card) sticky top-0 ${scrolled && `bg-gray-800/80!`} ${className} transition-colors duration-400`}>
                <Container>
                    <div className="flex justify-between">
                        <nav className={`flex gap-5 relative`} ref={containerRef}>
                            {hoverRect && (
                                <div
                                    className="absolute bottom-0 h-full z-0 bg-(--selected) transition-all duration-300"
                                    style={{
                                        width: hoverRect.width,
                                        transform: `translateX(${hoverRect.left}px)`,
                                    }}
                                />
                            )}
                            {HEADER_DATA.map((item, index) => (
                                <li className="flex items-center justify-center z-1" key={index}>
                                    <Link
                                        onMouseEnter={handleHover}
                                        href={String(item.href)}
                                        className="text-white px-4 h-full w-full text-center font-medium cursor-pointer  flex items-center justify-center transition-colors duration-300"
                                    >
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </nav>
                        <HeaderMenu />
                    </div>
                </Container>
                <div className="flex items-center">
                    <button
                        className="mr-5"
                        onClick={() => handleTheme()}>
                        {theme ? (
                            <Moon />
                        ) : (
                            <Sun className="text-(--text)" />
                        )}
                    </button>
                </div>
            </header>
            <RdyModal
                id={'create-configure'}
                title={'Создание конфигурации'}
                close
                className="z-9999 bg-(--card)! text-(--text-secondary)!"
            >
                <ConfigureHeader />
            </RdyModal>
        </>
    )
}