"use client"

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Container } from "./container";
import { logout } from "@/services/auth.service";
import { LogOut, Moon, Sun } from "lucide-react";
import { RdyButton, RdyModal, useModal, useToast } from "rdy-comp";
import { useUser } from "../providers/UserContext";
import { ConfigureHeader } from "@/entities/configure";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Spacer } from "@heroui/react";

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    const [theme, setTheme] = useState(true)
    const { user } = useUser();
    const { showToast } = useToast();
    const { openModal } = useModal();
    const [hoverRect, setHoverRect] = useState({
        width: 0,
        left: 0
    });
    const containerRef = useRef(null);



    const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const parentRect = containerRef.current.getBoundingClientRect();

        setHoverRect({
            width: rect.width,
            left: rect.left - parentRect.left,
        });
    };

    const handleLogOut = async () => {
        const LogOut = await logout();
        if (LogOut) {
            showToast({
                title: 'Вы успешно вышли из аккаунта',
                type: 'success',
            })
            window.location.reload();
        }
    }

    const handleTheme = () => {
        const newTheme = !theme;
        setTheme(newTheme);
        document.documentElement.dataset.theme = newTheme ? "light" : "dark";
        localStorage.setItem('theme', String(newTheme));
        console.log(newTheme ? "Светлая тема" : "Темная тема");
    };

    useEffect(() => {
        const storage = localStorage.getItem('theme');
        document.documentElement.dataset.theme = "dark";
        setTheme(storage === "true");
    }, []);

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

    const HEADER_DATA = [
        {
            text: "Home"
        },
        {
            text: "Catalog"
        },
        {
            text: "FAQ"
        }
    ];

    const DROPDOWN_DATA = [
        {
            key: "profile",
            title: "Профиль"
        },
        {
            key: "configure",
            title: "Мои Конфигурации"
        }
    ];

    return (
        <header className={`flex w-full py-4 bg-(--card) sticky top-0 ${scrolled && `bg-gray-800/80!`} transition-colors duration-400`}>
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
                                    href="/"
                                    className="text-white px-4 h-full w-full text-center font-medium cursor-pointer  flex items-center justify-center transition-colors duration-300"
                                >
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                    </nav>
                    <ul className="flex gap-3">
                        {!user ? (
                            <>
                                <li className="flex w-full h-full items-center justify-center">
                                    <Link
                                        href="/login"
                                        className="text-white h-full w-full px-3 py-2 text-center font-medium cursor-pointer hover:bg-gray-800 flex items-center justify-center transition-colors duration-300"
                                    >
                                        Log in
                                    </Link>
                                </li>
                                <li className="flex w-full h-full items-center justify-center">
                                    <Link
                                        href="/register"
                                        className="text-white h-full w-full px-3 py-2 bg-gray-800 text-center font-medium cursor-pointer hover:bg-gray-600 flex items-center justify-center transition-colors duration-300"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-center">
                                    <Button
                                        className="bg-(--accent) text-(--text) hover:opacity-100!"
                                        onClick={() => openModal('create-configure')}
                                    >Создать конфигурацию</Button>
                                </li>
                                <li>
                                    <Dropdown className="bg-(--selected)">
                                        <DropdownTrigger>
                                            <button className="h-[50px] w-[50px] rounded-full flex items-center justify-center">
                                                <Avatar name={user.name} className="h-full w-full bg-(--selected) text-(--text)" />
                                            </button>
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Static Actions">
                                            <DropdownSection items={DROPDOWN_DATA} className="mb-3">
                                                {(item) => (
                                                    <DropdownItem
                                                        key={item.key}
                                                        className="hover:bg-(--accent)! text-gray-100! transition-colors duration-300"
                                                        href={`/${item.key}`}
                                                    >
                                                        {item.title}
                                                    </DropdownItem>
                                                )}
                                            </DropdownSection>
                                            <DropdownSection className="mb-0">
                                                <DropdownItem
                                                    key={'logout'}
                                                    className="py-1 px-3 text-red-500 hover:bg-red-500! hover:text-white! transition-colors duration-300"
                                                    onClick={() => handleLogOut()}
                                                >
                                                    Выйти из аккаунта
                                                </DropdownItem>
                                            </DropdownSection>
                                        </DropdownMenu>
                                    </Dropdown>
                                </li>
                            </>
                        )}
                    </ul>
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
            <RdyModal
                id={'create-configure'}
                title={'Создание конфигурации'}
                close
                className=""
            >
                <ConfigureHeader />
            </RdyModal>
        </header >
    );
}