"use client"

import { useUser } from "@/components/providers/UserContext"
import { Container } from "@/components/ui/container";
import { DROPDOWN_DATA } from "@/entities/header";
import { logout } from "@/services/auth.service";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/react";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useToast } from "rdy-comp";

export const AdminHeaderUi = () => {
    const { user } = useUser();
    const { showToast } = useToast();

    const handleLogOut = async () => {
        const LogOut = await logout();
        if (LogOut) {
            showToast({
                title: 'Вы успешно вышли из аккаунта',
                type: 'success',
            });
            window.location.reload();
        }
    }
    if (!user) return;

    return (
        <header className="bg-(--card)">
            <div className="justify-between flex py-4 px-8 items-center">
                <Link href="/" className="text-(--text) text-xl">Back to site</Link>
                <ul>
                    <li className="flex justify-center ">
                        <Dropdown className="bg-(--selected)">
                            <DropdownTrigger>
                                <Button className="h-[50px] w-[50px] flex items-center justify-center sm:w-full! sm:h-full! md:w-12! md:h-12! sm:rounded-none md:rounded-full! sm:py-3 md:py-0 bg-transparent text-(--text) px-0 min-w-0">
                                    <Avatar name={user.name} className="h-full w-full bg-(--selected) text-(--text) md:block sm:hidden" />
                                    <User className="sm:block md:hidden text-(--text)" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownSection className="mb-0">
                                    <DropdownItem
                                        key={'logout'}
                                        className="py-1 px-3 text-red-500 hover:bg-red-500! hover:text-white! transition-colors duration-300"
                                        onClick={() => handleLogOut()}
                                    >
                                        <div className="flex items-center gap-4 py-1">
                                            <LogOut size={20} />
                                            <span> Выйти из аккаунта</span>
                                        </div>
                                    </DropdownItem>
                                </DropdownSection>
                            </DropdownMenu>
                        </Dropdown>
                    </li>
                </ul>
            </div>
        </header>
    )
}